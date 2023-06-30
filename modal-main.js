class ModalMainTemplates {
    constructor() {
        this.body = "";
        this.error = "";
    }

    alertMessage(template) {
        this.body = `
      <div class="modal-main-message">
        ${template}
      </div>
    `;
    }

    setBody(template) {
        this.body = `
      ${template}
    `;
    }

    tableItem(data) {
        if (!Array.isArray(data)) {
            throw new Error("The parameter of the tableItem function must be an array");
        }

        this.body = `
      <div class="modal-main-table-itens">
        ${data.map(({title, data}) => `
          <div class="modal-main-table-item">
            <span>${title}</span>
            <span>${data}</span>
          </div>
        `).join("")}
      </div>
    `;
    }

    multipleTemplate(templateArr) {
        if (!Array.isArray(templateArr)) {
            throw new Error("The parameter of the multipleTemplate function must be an array");
        }

        this.body = templateArr.join("");
    }
}


class ModalMain extends ModalMainTemplates {
    constructor() {
        super();
        this.target = document.querySelector("body");
        this.template = "";
        this.closeOnClick = true;
        this.title = "";
        this.templateNode = "";
        this.buttons = null;
    }

    create() {
        const templateCreate = `
      <div class="modal-main modal-opacity-opacity-0">
        <header>
          <span>${this.title}</span>
          <div class="close-modal-container">
            <span style="font-family: monospace">X</span>
          </div>
        </header>
      </div>
    `;

        this.template = templateCreate;

        this.templateNode = document.createElement("div");
        this.templateNode.classList.add("box-shadow");
        this.templateNode.innerHTML = this.template;

        if (this.body) {

            const bodyContainer = document.createElement("div");
            bodyContainer.classList.add("modal-main-container");
            bodyContainer.innerHTML = this.body;

            this.templateNode.querySelector(".modal-main").appendChild(bodyContainer);
        }

        this.setButtons();

        this.show(this.templateNode);
    }

    setButtons() {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");
        this.templateNode.querySelector(".modal-main").appendChild(buttonsContainer);

        const buttons = this.buttons || [{
            type: "Cancel",
            title: "Ok",
            clicked: this.close.bind(this)
        }];

        buttons.forEach(({type, title, clicked, attr}) => {
            const buttonNode = document.createElement("button");

            buttonNode.classList.add(type);
            buttonNode.innerHTML = title;

            if (attr) {
                if (attr.length === 1) {
                    buttonNode.setAttribute(attr.key, attr.value);
                } else if (attr.length > 1) {
                    attr.forEach(({key, value}) => {
                        buttonNode.setAttribute(key, value);
                    });
                }
            }

            buttonsContainer.appendChild(buttonNode);
        });

        buttonsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button");
            if (button) {
                const buttonIndex = Array.from(buttonsContainer.children).indexOf(button);
                const {clicked} = buttons[buttonIndex];
                if (typeof clicked === "function") {
                    clicked();
                }
                if (this.closeOnClick) {
                    this.close(event);
                }
            }
        });
    }


    updateButtons() {
        const buttonsContainer = this.templateNode.querySelector(".buttons-container")
        buttonsContainer.innerHTML = ""
        const buttons = this.buttons;

        buttons.forEach(({type, title, clicked}) => {
            const buttonNode = document.createElement("button");
            buttonNode.classList.add(type);
            buttonNode.innerHTML = title;
            if (typeof clicked === "function") {
                buttonNode.addEventListener("click", clicked);
            }

            if (this.closeOnClick) {
                buttonNode.addEventListener("click", this.close.bind(this));
            }

            buttonsContainer.appendChild(buttonNode);
        });
    }

    show(template) {

        template.querySelector(".close-modal-container").addEventListener("click", this.close.bind(this));

        this.target.appendChild(template);

        unfade(template);
        adjustHeight(template);

    }

    close(event) {
        const closeButton = event.target;
        const modal = closeButton.closest(".modal-main");

        if (modal) {
            const boxShadow = modal.parentNode;
            fade(boxShadow);
        }
    }

    setCloseOnClick(closeOnClick) {
        this.closeOnClick = closeOnClick
    }

}

function unfade(element, display = "flex") {
    let opacity = 0.1;

    element.style.display = display;
    element.style.opacity = opacity;

    const timer = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = `alpha(opacity=${opacity * 100})`;
        opacity += opacity * 0.1;
    }, 6);
}

function fade(element) {
    let opacity = 1;

    const timer = setInterval(() => {
        if (opacity <= 0.1) {
            clearInterval(timer);
            element.remove();
        }
        element.style.opacity = opacity;
        element.style.filter = `alpha(opacity=${opacity * 100})`;
        opacity -= opacity * 0.1;
    }, 6);
}

function adjustHeight(template) {
    const modalHeight = template.querySelector(".modal-main").offsetHeight;
    const bodyContainerHeight = template.querySelector(".modal-main .modal-main-container").offsetHeight;
    const headHeight = template.querySelector(".modal-main header").offsetHeight;
    const buttonsContainerHeight = template.querySelector(".modal-main .buttons-container").offsetHeight;

    const bodyMaxHeight = modalHeight - headHeight - buttonsContainerHeight;

    if (bodyContainerHeight > bodyMaxHeight) {
        template.querySelector(".modal-main .modal-main-container").style.height = `${bodyMaxHeight}px`;
    }
}
