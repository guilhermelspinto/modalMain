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
        ${data.map(({ title, data }) => `
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
        this.modalStyle = new ModalMainStyles()
        this.template = "";
        this.closeOnClick = true;
        this.title = "";
        this.templateNode = "";
        this.buttons = null;
        this.headButtons = null;
    }

    create(callback) {
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
        this.setHeadButtons();

        // this.modalStyle.applyStyle();

        this.show(this.templateNode);

        if (callback && typeof callback === "function") {
            callback();
        }
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

        buttons.forEach(({ type, title, clicked, attr }) => {
            const buttonNode = document.createElement("button");

            buttonNode.classList.add(type);
            buttonNode.innerHTML = title;

            if (attr) {
                if (Array.isArray(attr)) {
                    attr.forEach(({ key, value }) => {
                        buttonNode.setAttribute(key, value);
                    });
                } else if (typeof attr == 'object') {
                    buttonNode.setAttribute(attr.key, attr.value);
                }
            }

            buttonsContainer.appendChild(buttonNode);
        });

        buttonsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button");
            if (button) {
                const buttonIndex = Array.from(buttonsContainer.children).indexOf(button);
                const { clicked } = buttons[buttonIndex];
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

        buttons.forEach(({ type, title, clicked }) => {
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

    setHeadButtons() {
        if (typeof this.headButtons !== 'object' || this.headButtons === null) return
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-head-container");
        buttonsContainer.classList.add("hidden-button-container");

        const buttonsListHeadContainer = document.createElement("div");
        buttonsListHeadContainer.classList.add("buttons-list-head-container");

        // Create the span element and set its innerHTML to &#8942;
        const spanElement = document.createElement("span");
        spanElement.innerHTML = "&#8942;";

        spanElement.addEventListener('click', function () {
            buttonsContainer.classList.toggle('hidden-button-container');
        })

        // Append the span element to buttonsListHeadContainer
        buttonsListHeadContainer.appendChild(spanElement);

        const header = this.templateNode.querySelector(".modal-main header");
        const closeContainer = this.templateNode.querySelector(".modal-main header .close-modal-container");

        // Insert buttonsListHeadContainer right before closeContainer
        header.insertBefore(buttonsListHeadContainer, closeContainer);

        // Append buttonsContainer to buttonsListHeadContainer
        buttonsListHeadContainer.appendChild(buttonsContainer);

        const buttons = this.headButtons;

        buttons.forEach(({ type, title, clicked, attr }) => {
            const buttonNode = document.createElement("button");
            buttonNode.classList.add(type);
            buttonNode.innerHTML = title;

            if (attr) {
                if (Array.isArray(attr)) {
                    attr.forEach(({ key, value }) => {
                        buttonNode.setAttribute(key, value);
                    });
                } else if (typeof attr == 'object') {
                    buttonNode.setAttribute(attr.key, attr.value);
                }
            }

            buttonsContainer.appendChild(buttonNode);
        });

        buttonsContainer.addEventListener("click", (event) => {
            const button = event.target.closest("button");
            if (button) {
                const buttonIndex = Array.from(buttonsContainer.children).indexOf(button);
                const { clicked } = buttons[buttonIndex];
                if (typeof clicked === "function") {
                    clicked();
                }

                if (this.closeOnClick) {
                    this.close(event);
                }
            }
        });
    }


    show(template) {

        template.querySelector(".close-modal-container").addEventListener("click", this.close.bind(this));

        this.target.appendChild(template);

        unfade(template);
        adjustHeight(template);

    }

    close(event = null) {
        let modal;
        if (event) {
            const closeButton = event.target;
            modal = closeButton.closest(".modal-main");
        } else {
            modal = this.target.querySelector(".modal-main");
        }

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
    if (typeof this.headButtons !== 'object' || this.headButtons === null) {
        template.querySelector(".modal-main header .buttons-list-head-container .buttons-head-container").style.top = `${headHeight - 1}px`;
    }

}


class ModalMainStyles {
    constructor() {
        this.modalElement = document.querySelector('.modal-main');
        this.styles =
        {
            "default": {
                ":root":
                [
                    { "--color-default": "#555555" },
                    { "--color-green": "#50B690" },
                    { "--color-blue": "#2757A4FF" },
                    { "--color-yellow": "#ffd218" },
                    { "--color-orange": "#F3901C" },
                    { "--color-red": "#D94352" }
                ],
                ".box-shadow": [
                    {"position": "fixed"},
                    {"display": "none"},
                    {"width": "100%"},
                    {"height": "100%"},
                    {"top": "0"},
                    {"left": "0"},
                    {"background": "#5555"},
                    {"z-index": "999"},
                    {"justify-content": "center"},
                    {"align-items": "center"},
                    {"backdrop-filter": "blur(10px)"}
                ],
                ".modal-main": [
                    {"position": "relative"},
                    {"display": "block"},
                    {"background": "#fff"},
                    {"overflow": "hidden"},
                    {"border-radius": "5px"},
                    {"width": "768px"},
                    {"max-width": "980px"},
                    {"min-width": "500px"},
                    {"min-height": "150px"},
                    {"max-height": "80%"},
                    {"height": "fit-content"}
                ],
                ".modal-main .modal-main-container": [
                    {"position": "relative"},
                    {"display": "block"},
                    {"height": "auto"},
                    {"overflow-y": "scroll"},
                    {"max-height": "calc(100% - 91px)"}
                ]
            }
        };
    }

    applyStyle(styleName = "default") {
        let styles = this.styles[styleName];
        if (styles) {
            for (let [selector, propertiesArray] of Object.entries(styles)) {
                let elements = document.querySelectorAll(selector);
                elements.forEach((element) => {
                    propertiesArray.forEach((propertyObject) => {
                        for (let [property, value] of Object.entries(propertyObject)) {
                            element.style[property] = value;
                        }
                    });
                });
            }
        }
    }
    
}
