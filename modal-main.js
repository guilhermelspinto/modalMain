class modalMainTemplates {
    alertMessage(template) {
        this.body = `
        <div class="modal-main-message">
            ${template}
        </div>
        `
    }
}

class modalMain extends modalMainTemplates {

    target = document.querySelector("body")

    template = ""
    title = ""

    templateNode = ""
    body = ""

    buttons = ""

    create() {
        let templateCreate = `
                <div class="modal-main opacity-0">
                    <header>
                        <span>${this.title}</span>
                        <div class="close-modal-container">
                            <span style="font-family: monospace">X</span>
                        </div>
                    </header>
                </div>
`

        this.template = templateCreate

        this.templateNode = document.createElement("div")
        this.templateNode.classList.add("box-shadow")
        this.templateNode.innerHTML = this.template

        if (this.body) {
            let bodyContainer = document.createElement("div")
            bodyContainer.classList.add("modal-main-container")
            bodyContainer.innerHTML = this.body

            this.templateNode.querySelector(".modal-main").appendChild(bodyContainer)
        }

        this.setButtons()

        this.show(this.templateNode)
    }

    setButtons() {
        let obj = this

        let buttonsContainer = document.createElement("div")
        buttonsContainer.classList.add("buttons-container")
        obj.templateNode.querySelector(".modal-main-container").appendChild(buttonsContainer)

        if (this.buttons) {
            obj.buttons.map(function (e, i) {
                //cria node botão coloca a classe o texto e a função
                let buttonNode = document.createElement("button")
                buttonNode.classList.add(e.type)
                buttonNode.innerHTML = e.title
                if(typeof e.clicked === "function"){
                    buttonNode.onclick = e.clicked
                }
                buttonNode.addEventListener("click", obj.close)
                obj.templateNode.querySelector(".buttons-container").appendChild(buttonNode)
            })
        } else {
            let buttonNode = document.createElement("button")
            buttonNode.classList.add("cancel")
            buttonNode.innerHTML = "Ok"
            buttonNode.onclick = obj.close
            obj.templateNode.querySelector(".buttons-container").appendChild(buttonNode)
        }
    }

    show(template) {
        template.querySelector(".close-modal-container").onclick = this.close
        this.target.appendChild(template)
        unfade(template)
    }

    close() {
        let boxShadow = document.querySelector(".box-shadow")
        fade(boxShadow)

    }
}


function unfade(element, display = "flex") {
    var op = 0.1;  // initial opacity
    element.style.display = display;
    element.style.opacity = op;
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 6);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.remove()
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 6);
}