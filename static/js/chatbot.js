// chatbot.js
document.addEventListener("DOMContentLoaded", function () {
    const chat = document.getElementById("chat");
    const input = document.getElementById("input");
    const botaoEnviar = document.getElementById("botao-enviar");

    botaoEnviar.addEventListener('click', enviarMensagem);
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "Enter") {
            enviarMensagem();
        }
    });

    async function enviarMensagem() {
        if (!input.value.trim()) return;

        const mensagem = input.value.trim();
        input.value = "";

        const novaBolhaUsuario = criaBolhaUsuario();
        novaBolhaUsuario.textContent = mensagem;
        chat.appendChild(novaBolhaUsuario);

        // Agora, vamos extrair o resultado da Promise antes de usá-lo
        const respostaPromise = obterInformacoesDoTemaSimulado(mensagem.toLowerCase());
        const resposta = await respostaPromise;

        const novaBolhaBot = criaBolhaBot();
        novaBolhaBot.innerHTML = resposta;
        chat.appendChild(novaBolhaBot);

        vaiParaFinalDoChat();
    }

    async function obterInformacoesDoTemaSimulado(tema) {
        // Carrega o JSON simulado localmente
        const dadosSimulados = await carregarJSONLocalmente("dadosChatbot.json");

        // Busca informações no JSON
        const informacoes = dadosSimulados.temas[tema];

        if (informacoes) {
            return informacoes.join('<br>');
        } else {
            // Se o tema não existir, retorna uma resposta simulada genérica
            const respostasSimuladas = dadosSimulados.respostas_simuladas;
            return respostasSimuladas[Math.floor(Math.random() * respostasSimuladas.length)];
        }
    }

    function criaBolhaBot() {
        const bolhaBot = document.createElement('p');
        bolhaBot.classList = 'chat__bolha chat__bolha--bot';
        return bolhaBot;
    }

    function vaiParaFinalDoChat() {
        chat.scrollTop = chat.scrollHeight;
    }

    async function carregarJSONLocalmente(caminho) {
        try {
            const respostaSimuladaJSON = await fetch(caminho);
            const dadosSimulados = await respostaSimuladaJSON.json();
            return dadosSimulados;
        } catch (erro) {
            console.error("Erro ao carregar o JSON:", erro);
            // Pode tratar o erro de outra forma se necessário
            return {};
        }
    }
});



//// chatbot.js

// const chatbotResponses = {
//     "olá": "Olá! Como posso ajudar?",
//     "como você está": "Eu sou apenas um programa, não tenho emoções, mas obrigado por perguntar!",
//     "programação": "A programação é a arte de contar ao computador o que fazer. Posso te ajudar com alguma dúvida específica?",
//     "default": "Desculpe, não entendi. Pode fornecer mais informações?"
// };

// document.addEventListener("DOMContentLoaded", function() {
//     const chat = document.getElementById("chat");
//     const input = document.getElementById("input");
//     const botaoEnviar = document.getElementById("botao-enviar");

//     botaoEnviar.addEventListener('click', enviarMensagem);
//     input.addEventListener("keyup", function(event) {
//         event.preventDefault();
//         if (event.key === "Enter") {
//             enviarMensagem();
//         }
//     });

//     function enviarMensagem() {
//         if (input.value.trim() === "") return;

//         const mensagem = input.value.trim();
//         input.value = "";

//         const bolhaUsuario = criaBolha("chat__bolha--usuario", mensagem);
//         chat.appendChild(bolhaUsuario);

//         const resposta = obterRespostaDoChatbot(mensagem);
//         const bolhaBot = criaBolha("chat__bolha--bot", resposta);
//         chat.appendChild(bolhaBot);

//         vaiParaFinalDoChat();
//     }

//     function obterRespostaDoChatbot(mensagem) {
//         mensagem = mensagem.toLowerCase();

//         for (const key in chatbotResponses) {
//             if (mensagem.includes(key)) {
//                 return chatbotResponses[key];
//             }
//         }

//         return chatbotResponses["default"];
//     }

//     function criaBolha(classe, conteudo) {
//         const bolha = document.createElement('p');
//         bolha.classList = `chat__bolha ${classe}`;
//         bolha.textContent = conteudo;
//         return bolha;
//     }

//     function vaiParaFinalDoChat() {
//         chat.scrollTop = chat.scrollHeight;
//     }

//     function limparConversa() {
//         chat.innerHTML = "<p class='chat__bolha chat__bolha--bot'>Olá! Eu sou o assistente virtual da EcoMart ~<br/><br/>Como posso te ajudar?</p>";
//     }
// });


 // async function enviarMensagem() {
    //     if (input.value.trim() === "") return;

    //     const mensagem = input.value.trim();
    //     input.value = "";

    //     const bolhaUsuario = criaBolha("chat__bolha--usuario", mensagem);
    //     chat.appendChild(bolhaUsuario);

    //     // Responde com informações específicas do tema
    //     const resposta = await obterInformacoesDoTemaSimulado(mensagem.toLowerCase());
    //     const bolhaBot = criaBolha("chat__bolha--bot", resposta);
    //     chat.appendChild(bolhaBot);

    //     vaiParaFinalDoChat();
    // }

    // async function obterInformacoesDoTemaSimulado(tema) {
    //     const informacoesSimuladas = {
            
    //     };

    //     const informacoes = informacoesSimuladas[tema];

    //     if (informacoes) {
    //         return informacoes.join('<br>');
    //     } else {
    //         return 'Desculpe, não tenho informações para o tema especificado.';
    //     }
    // }


// function criaBolha(classe, conteudo) {
    //     const bolha = document.createElement('p');
    //     bolha.classList = `chat__bolha ${classe}`;
    //     bolha.innerHTML = conteudo;
    //     return bolha;
    // }
