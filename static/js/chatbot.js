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
        if (input.value.trim() === "") return;

        const mensagem = input.value.trim();
        input.value = "";

        const bolhaUsuario = criaBolha("chat__bolha--usuario", mensagem);
        chat.appendChild(bolhaUsuario);

        // Responde com informações específicas do tema
        const resposta = await obterInformacoesDoTemaSimulado(mensagem.toLowerCase());
        const bolhaBot = criaBolha("chat__bolha--bot", resposta);
        chat.appendChild(bolhaBot);

        vaiParaFinalDoChat();
    }

    // Função para obter informações simuladas do tema
    async function obterInformacoesDoTemaSimulado(tema) {
        const informacoesSimuladas = {
            'ux/ui': [
                'UX (User Experience) refere-se à experiência do usuário ao interagir com um produto.',
                'UI (User Interface) se concentra no design visual e interativo do produto.',
                'Princípios de design são fundamentais para criar experiências UX/UI eficazes.'
            ],
            'programacao': [
                'A programação é a arte de escrever instruções para computadores executarem tarefas.',
                'Linguagens de programação como JavaScript, Python e Java são amplamente utilizadas.',
                'Desenvolvimento web, mobile e software são áreas comuns de programação.'
            ],
            'marketing': [
                'Marketing envolve estratégias para promover produtos ou serviços.',
                'Marketing digital inclui publicidade online, SEO e mídias sociais.',
                'Entender o público-alvo é crucial para campanhas de marketing eficazes.'
            ],
            'gestao/vendas': [
                'Gestão envolve liderar e administrar recursos em uma organização.',
                'Vendas incluem o processo de persuadir clientes a adquirirem produtos ou serviços.',
                'Habilidades de comunicação e negociação são essenciais em vendas e gestão.'
            ],
            'nova economia': [
                'A nova economia refere-se a modelos de negócios inovadores e disruptivos.',
                'Tecnologias emergentes desempenham um papel crucial na nova economia.',
                'Colaboração e agilidade são elementos-chave na nova economia.'
            ],
            'hub de inovação': [
                'Hubs de inovação são espaços que promovem a colaboração e o desenvolvimento de ideias.',
                'Empresas, startups e empreendedores geralmente se reúnem em hubs de inovação.',
                'Esses hubs impulsionam a criatividade e a troca de conhecimento.'
            ],
            'tecnologia': [
                'Tecnologia abrange o estudo, desenvolvimento e aplicação de ferramentas e sistemas.',
                'Avanços tecnológicos transformam rapidamente a sociedade e os negócios.',
                'Setores como inteligência artificial, blockchain e IoT estão na vanguarda da tecnologia.'
            ],
            'institutos de tecnologia': [
                'Institutos de tecnologia são instituições de ensino focadas em disciplinas tecnológicas e científicas.',
                'Essas instituições oferecem programas de graduação e pesquisa em áreas como engenharia e ciência da computação.',
                'Colaborações entre empresas e institutos de tecnologia impulsionam inovações.'
            ]
        };

        const informacoes = informacoesSimuladas[tema];

        if (informacoes) {
            return informacoes.join('<br>');
        } else {
            return 'Desculpe, não tenho informações para o tema especificado.';
        }
    }

    function criaBolha(classe, conteudo) {
        const bolha = document.createElement('p');
        bolha.classList = `chat__bolha ${classe}`;
        bolha.innerHTML = conteudo;
        return bolha;
    }

    function vaiParaFinalDoChat() {
        chat.scrollTop = chat.scrollHeight;
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