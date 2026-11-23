
document.addEventListener("DOMContentLoaded", function () {

    // Elementos do painel
    const painel = document.getElementById("painelAdmin");
    const abrir = document.getElementById("abrirAdmin");
    const fechar = document.getElementById("fecharAdmin");
    const tabela = document.getElementById("tabelaMensagens");

    // Chave usada no LocalStorage
    const chave = "mensagensPortfolio";

// Elementos do formulário de edição
const formEditar = document.getElementById("formEditarAdmin");
const cancelarEdicao = document.getElementById("cancelarEdicao");

// Guarda o ID da mensagem selecionada
let idEditando = null;


    // Mostrar as mensagens na tabela
    function carregarMensagens() {

        tabela.innerHTML = "";

        // Recuperar mensagens salvas
        const mensagens = JSON.parse(
            localStorage.getItem(chave) || "[]"
        );

        if (mensagens.length === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 6;
            celula.textContent = "Nenhuma mensagem cadastrada.";

            linha.appendChild(celula);
            tabela.appendChild(linha);
            return;
        }

        // Criar uma linha para cada mensagem
        mensagens.forEach(function (mensagem) {

            const linha = document.createElement("tr");

            const dados = [
                mensagem.nome,
                mensagem.email,
                mensagem.assunto,
                mensagem.mensagem,
                new Date(mensagem.data).toLocaleString("pt-BR")
            ];

           
dados.forEach(function (valor) {

    const celula = document.createElement("td");
    celula.textContent = valor;

    linha.appendChild(celula);

});

// Criar coluna de ações
const celulaAcoes = document.createElement("td");

// Criar botão Excluir
const botaoExcluir = document.createElement("button");

botaoExcluir.textContent = "Excluir";
botaoExcluir.className = "btn btn-sm btn-danger";

// Excluir mensagem ao clicar
botaoExcluir.addEventListener("click", function () {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta mensagem?"
    );

    if (!confirmar) {
        return;
    }

    // Buscar os registros atuais
    const listaAtual = JSON.parse(
        localStorage.getItem(chave) || "[]"
    );

    // Manter todos, menos o registro selecionado
    const listaAtualizada = listaAtual.filter(function (item) {
        return item.id !== mensagem.id;
    });

    // Salvar novamente no LocalStorage
    localStorage.setItem(
        chave,
        JSON.stringify(listaAtualizada)
    );

    // Atualizar a tabela
    carregarMensagens();

});


// Criar botão Editar
const botaoEditar = document.createElement("button");

botaoEditar.textContent = "Editar";
botaoEditar.className = "btn btn-sm btn-primary me-2";

// Preencher o formulário com a mensagem escolhida
botaoEditar.addEventListener("click", function () {

    idEditando = mensagem.id;

    document.getElementById("adminNome").value = mensagem.nome;
    document.getElementById("adminEmail").value = mensagem.email;
    document.getElementById("adminAssunto").value = mensagem.assunto;
    document.getElementById("adminMensagem").value = mensagem.mensagem;

    formEditar.hidden = false;

    formEditar.scrollIntoView({
        behavior: "smooth"
    });

});

// Colocar os dois botões na tabela
celulaAcoes.appendChild(botaoEditar);
celulaAcoes.appendChild(botaoExcluir);

linha.appendChild(celulaAcoes);


tabela.appendChild(linha);

        });

    }


// Salvar as alterações de uma mensagem
formEditar.addEventListener("submit", function (evento) {

    evento.preventDefault();

    if (idEditando === null) {
        return;
    }

    // Recuperar mensagens do LocalStorage
    const mensagens = JSON.parse(
        localStorage.getItem(chave) || "[]"
    );

    // Encontrar a mensagem selecionada
    const mensagem = mensagens.find(function (item) {
        return item.id === idEditando;
    });

    if (!mensagem) {
        alert("Mensagem não encontrada!");
        return;
    }

    // Atualizar os dados
    mensagem.nome = document.getElementById("adminNome").value.trim();
    mensagem.email = document.getElementById("adminEmail").value.trim();
    mensagem.assunto = document.getElementById("adminAssunto").value.trim();
    mensagem.mensagem = document.getElementById("adminMensagem").value.trim();

    // Verificar campos vazios
    if (!mensagem.nome || !mensagem.email ||
        !mensagem.assunto || !mensagem.mensagem) {
        alert("Preencha todos os campos!");
        return;
    }

    // Salvar novamente no LocalStorage
    localStorage.setItem(chave, JSON.stringify(mensagens));

    // Fechar o formulário de edição
    formEditar.reset();
    formEditar.hidden = true;
    idEditando = null;

    // Atualizar a tabela
    carregarMensagens();

    alert("Mensagem atualizada com sucesso!");

});

// Cancelar uma edição
cancelarEdicao.addEventListener("click", function () {

    formEditar.reset();
    formEditar.hidden = true;
    idEditando = null;

});


// CADASTRAR NOVA MENSAGEM

const botaoNovo = document.getElementById("novoAdmin");
const formNovo = document.getElementById("formNovoAdmin");
const cancelarCadastro = document.getElementById("cancelarCadastro");

// Abrir formulário de cadastro
botaoNovo.addEventListener("click", function () {

    // Fechar uma edição, caso esteja aberta
    formEditar.hidden = true;
    formEditar.reset();
    idEditando = null;

    formNovo.reset();
    formNovo.hidden = false;

    formNovo.scrollIntoView({
        behavior: "smooth"
    });

});

// Salvar nova mensagem
formNovo.addEventListener("submit", function (evento) {

    evento.preventDefault();

    // Pegar os dados digitados
    const novaMensagem = {
        id: Date.now(),
        nome: document.getElementById("novoNome").value.trim(),
        email: document.getElementById("novoEmail").value.trim(),
        assunto: document.getElementById("novoAssunto").value.trim(),
        mensagem: document.getElementById("novaMensagem").value.trim(),
        data: new Date().toISOString()
    };

    // Verificar se os campos estão preenchidos
    if (!novaMensagem.nome || !novaMensagem.email ||
        !novaMensagem.assunto || !novaMensagem.mensagem) {

        alert("Preencha todos os campos!");
        return;

    }

    // Recuperar as mensagens existentes
    const mensagens = JSON.parse(
        localStorage.getItem(chave) || "[]"
    );

    // Adicionar a nova mensagem
    mensagens.push(novaMensagem);

    // Salvar no LocalStorage em JSON
    localStorage.setItem(
        chave,
        JSON.stringify(mensagens)
    );

    // Atualizar a tabela
    carregarMensagens();

    // Fechar e limpar o formulário
    formNovo.reset();
    formNovo.hidden = true;

    alert("Mensagem cadastrada com sucesso!");

});

// Cancelar cadastro
cancelarCadastro.addEventListener("click", function () {

    formNovo.reset();
    formNovo.hidden = true;

});

    // Abrir painel
    abrir.addEventListener("click", function () {

        carregarMensagens();

        painel.hidden = false;

        painel.scrollIntoView({
            behavior: "smooth"
        });

    });

    // Fechar painel
    fechar.addEventListener("click", function () {

        painel.hidden = true;

    });

});
