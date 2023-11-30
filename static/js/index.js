let chat = document.querySelector('#chat');
let input = document.querySelector('#input');
let botaoEnviar = document.querySelector('#botao-enviar');

async function enviarMensagem() {
    if(input.value == "" || input.value == null) return;
    let mensagem = input.value;
    input.value = "";

    let novaBolha = criaBolhaUsuario();
    novaBolha.innerHTML = mensagem;
    chat.appendChild(novaBolha);

    let novaBolhaBot = criaBolhaBot();
    chat.appendChild(novaBolhaBot);
    vaiParaFinalDoChat();
    
// Envia requisição com a mensagem para a API do ChatBot
    const resposta = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({'msg':mensagem}),
    });

    const decodificador = new TextDecoder();
    const leitorDaResposta = resposta.body.getReader();
    let respostaParcial = "";
    while (true) {
        // Aguarda e recebe o próximo pedaço da resposta da API
        const { done: terminou, value: pedacoDaResposta } = await leitorDaResposta.read();
        if (terminou) break;

        // Concatena o novo pedaço da resposta com a resposta parcial e atualiza na tela
        respostaParcial += decodificador.decode(pedacoDaResposta).replace(/\n/g, '<br>');
        novaBolhaBot.innerHTML = respostaParcial;
        vaiParaFinalDoChat();
    }
    
}

function criaBolhaUsuario() {
    let bolha = document.createElement('p');
    bolha.classList = 'chat__bolha chat__bolha--usuario';
    return bolha;
}

function criaBolhaBot() {
    let bolha = document.createElement('p');
    bolha.classList = 'chat__bolha chat__bolha--bot';
    return bolha;
}

function vaiParaFinalDoChat() {
    chat.scrollTop = chat.scrollHeight;
}

botaoEnviar.addEventListener('click', enviarMensagem);
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        botaoEnviar.click();
    }
});

function limparConversa(){
    const limpar = fetch("http://127.0.0.1:5000/limparhistorico", {
        method: "POST"
    });
    chat.innerHTML = "<p class='chat__bolha chat__bolha--bot'>Olá! Eu sou o assistente virtual da EcoMart ~<br/><br/>Como posso te ajudar?</p>";
}