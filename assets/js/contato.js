
document.addEventListener("DOMContentLoaded", function () {

    // Armazenamento das mensagens
    const chave = "mensagensPortfolio";

    // ENDEREÇO DO SEU FORMULÁRIO NO FORMSPREE
    const enderecoFormspree = "https://formspree.io/f/xdegpagl";


    // Criar 20 mensagens de teste no primeiro acesso
    if (localStorage.getItem(chave) === null) {

        const mensagensTeste = [];

        for (let i = 1; i <= 20; i++) {

            mensagensTeste.push({
                id: i,
                nome: "Pessoa Teste " + i,
                email: "teste" + i + "@exemplo.com",
                assunto: "Assunto de teste " + i,
                mensagem: "Mensagem fictícia para testar o sistema.",
                data: new Date().toISOString()
            });

        }

        localStorage.setItem(
            chave,
            JSON.stringify(mensagensTeste)
        );
    }


    // Elementos do formulário
    const formulario = document.getElementById("formContato");
    const status = document.getElementById("statusContato");
    const botao = document.getElementById("botaoEnviar");


    // Enviar mensagem
    formulario.addEventListener("submit", async function (evento) {

        evento.preventDefault();

        // Capturar informações
        const novaMensagem = {
            id: Date.now(),
            nome: document.getElementById("nome").value.trim(),
            email: document.getElementById("email").value.trim(),
            assunto: document.getElementById("assunto").value.trim(),
            mensagem: document.getElementById("mensagem").value.trim(),
            data: new Date().toISOString()
        };

        // Validar campos
        if (!novaMensagem.nome || !novaMensagem.email ||
            !novaMensagem.assunto || !novaMensagem.mensagem) {

            status.textContent = "Preencha todos os campos!";
            return;
        }

        // Salvar no LocalStorage
        const mensagens = JSON.parse(
            localStorage.getItem(chave) || "[]"
        );

        mensagens.push(novaMensagem);

        try {
            localStorage.setItem(chave, JSON.stringify(mensagens));
        } catch (erro) {
            status.textContent = "Erro ao salvar a mensagem no navegador.";
            return;
        }

        // Verificar se a integração foi configurada
        if (enderecoFormspree.includes("COLE_ID_AQUI")) {
            status.textContent =
                "Mensagem salva localmente. Falta configurar o Formspree.";
            return;
        }

        // Evitar envios duplicados
        botao.disabled = true;
        botao.textContent = "Enviando...";
        status.textContent = "Mensagem salva. Enviando notificação...";

        try {

            // Enviar os dados para o Formspree
            const resposta = await fetch(enderecoFormspree, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: novaMensagem.nome,
                    email: novaMensagem.email,
                    subject: novaMensagem.assunto,
                    message: novaMensagem.mensagem
                })
            });

            if (!resposta.ok) {
                throw new Error("Erro no envio: " + resposta.status);
            }

            status.textContent =
                "Mensagem salva e recebida pelo Formspree!";

            formulario.reset();

        } catch (erro) {

            console.error(erro);

            status.textContent =
                "Mensagem salva no navegador, mas a notificação não foi enviada.";

        } finally {

            botao.disabled = false;
            botao.textContent = "Enviar mensagem";

        }

    });

});
