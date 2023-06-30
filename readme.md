# ModalMain Framework

O ModalMain Framework é uma biblioteca JavaScript para criar modais personalizados em páginas da web. Ele fornece uma estrutura flexível e fácil de usar para criar e exibir modais com diferentes tipos de conteúdo.

## Funcionalidades

- Criação de modais personalizados.
- Suporte para diferentes tipos de conteúdo, como mensagens, tabelas e múltiplos templates.
- Possibilidade de adicionar botões personalizados aos modais.
- Animações de fade in e fade out para exibição e fechamento do modal.
- Ajuste automático de altura do conteúdo do modal.

## Instalação

1. Inclua o arquivo `modalmain.css` no cabeçalho do seu documento HTML:

```html
<link rel="stylesheet" href="modalmain.css">
```

2. Inclua o arquivo `modalmain.js` no final do corpo do seu documento HTML:

```html
<script src="modalmain.js"></script>
```

## Uso

### Criando um Modal

Para criar um modal, você deve instanciar a classe `ModalMain` e configurar suas propriedades e conteúdo. Em seguida, chame o método `create()` para exibir o modal.

```javascript
const modal = new ModalMain();

// Configurar propriedades e conteúdo do modal

modal.create();
```

### Configurando o Título do Modal

Você pode definir o título do modal utilizando a propriedade `title` da classe `ModalMain`. O título será exibido no cabeçalho do modal.

```javascript
modal.title = "Meu Modal";
```

### Adicionando Conteúdo ao Modal

Existem diferentes métodos na classe `ModalMainTemplates` para adicionar conteúdo ao modal:

- `alertMessage(template)`: Adiciona uma mensagem ao modal.

```javascript
modal.alertMessage("Este é um exemplo de mensagem.");
```

- `setBody(template)`: Define o corpo do modal com um template personalizado.

```javascript
modal.setBody("<p>Conteúdo personalizado do modal.</p>");
```

- `tableItem(data)`: Adiciona uma tabela ao modal com base em um array de dados.

```javascript
const data = [
  { title: "Item 1", data: "Valor 1" },
  { title: "Item 2", data: "Valor 2" },
  { title: "Item 3", data: "Valor 3" }
];

modal.tableItem(data);
```

- `multipleTemplate(templateArr)`: Adiciona múltiplos templates ao modal.

```javascript
const templates = [
  "<p>Template 1</p>",
  "<p>Template 2</p>",
  "<p>Template 3</p>"
];

modal.multipleTemplate(templates);
```

### Adicionando Botões ao Modal

Você pode adicionar botões personalizados ao modal utilizando a propriedade `buttons` da classe `ModalMain`. Cada botão é definido como um objeto com as propriedades `type`, `title`, `clicked` e `attr`.

- `type`: Classe CSS do botão.
- `title`: Texto exibido no botão

.
- `clicked`: Função chamada ao clicar no botão.
- `attr`: Atributos adicionais a serem definidos para o botão.

```javascript
modal.buttons = [
  {
    type: "success",
    title: "Salvar",
    clicked: () => {
      // Lógica para salvar os dados
    },
    attr: [
      { key: "data-id", value: "1" },
      { key: "data-action", value: "save" }
    ]
  },
  {
    type: "cancel",
    title: "Cancelar",
    clicked: () => {
      // Lógica para cancelar
    }
  }
];
```

### Fechando o Modal

O modal pode ser fechado clicando no botão de fechar ou clicando fora da área do modal. Você pode definir se o modal deve ser fechado ao clicar fora da área usando o método `setCloseOnClick()` da classe `ModalMain`.

```javascript
modal.setCloseOnClick(true);
```

### Exemplo Completo

Aqui está um exemplo completo de uso do ModalMain Framework:

```javascript
const modal = new ModalMain();

modal.title = "Meu Modal";

modal.alertMessage("Este é um exemplo de mensagem.");

modal.buttons = [
  {
    type: "success",
    title: "Salvar",
    clicked: () => {
      // Lógica para salvar os dados
    }
  },
  {
    type: "info",
    title: "Cancelar",
    clicked: () => {
      // Lógica para cancelar
    }
  }
];

modal.setCloseOnClick(true);

modal.create();
```

## Contribuição

O ModalMain Framework é um projeto de código aberto e as contribuições são bem-vindas. Se você tiver alguma sugestão, correção de bugs ou melhorias, sinta-se à vontade para abrir uma **[issue](https://github.com/guilhermelspinto/modalMain/issues)** ou enviar um **[pull request](https://github.com/guilhermelspinto/modalMain/pulls)**.

## Licença

O ModalMain Framework é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

---

Esse README.md fornece uma visão geral do ModalMain Framework, incluindo suas funcionalidades, requisitos de instalação, exemplos de uso, guia de contribuição e informações de licença.
