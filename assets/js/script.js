
document.addEventListener("DOMContentLoaded", function () {

    // Todas as imagens dos projetos
    const imagens = document.querySelectorAll(".imagem-projeto");

    // Janela ampliada
    const modalElemento = document.getElementById("modalImagem");
    const modal = new bootstrap.Modal(modalElemento);

    // Elementos da janela
    const imagemAmpliada = document.getElementById("imagemAmpliada");
    const tituloImagem = document.getElementById("tituloImagem");

    // Botões da janela ampliada
    const anterior = document.getElementById("imagemAnterior");
    const proxima = document.getElementById("proximaImagem");

    // Controle do carrossel
    let imagensDoProjeto = [];
    let indiceAtual = 0;


    // Exibir imagem ampliada
    function mostrarImagem() {

        const imagem = imagensDoProjeto[indiceAtual];

        imagemAmpliada.src = imagem.src;
        imagemAmpliada.alt = imagem.alt;
        tituloImagem.textContent = imagem.alt;

        // Esconder setas se existir apenas uma imagem
        anterior.hidden = imagensDoProjeto.length < 2;
        proxima.hidden = imagensDoProjeto.length < 2;

    }


    // Abrir imagem ao clicar
    imagens.forEach(function (imagem) {

        imagem.addEventListener("click", function () {

            // Descobrir o carrossel da imagem
            const carrossel = imagem.closest(".carousel");

            if (carrossel) {

                // Pegar somente as imagens desse projeto
                imagensDoProjeto = Array.from(
                    carrossel.querySelectorAll(".imagem-projeto")
                );

            } else {

                imagensDoProjeto = [imagem];

            }

            // Começar exatamente na foto clicada
            indiceAtual = imagensDoProjeto.indexOf(imagem);

            mostrarImagem();

            // Abrir janela ampliada
            modal.show();

        });

        // Permitir abrir também pelo teclado
        imagem.setAttribute("tabindex", "0");
        imagem.setAttribute("role", "button");

        imagem.addEventListener("keydown", function (evento) {

            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                imagem.click();
            }

        });

    });


    // Seta para voltar
    anterior.addEventListener("click", function () {

        indiceAtual--;

        if (indiceAtual < 0) {
            indiceAtual = imagensDoProjeto.length - 1;
        }

        mostrarImagem();

    });


    // Seta para avançar
    proxima.addEventListener("click", function () {

        indiceAtual++;

        if (indiceAtual >= imagensDoProjeto.length) {
            indiceAtual = 0;
        }

        mostrarImagem();

    });


    // Setas do teclado na imagem ampliada
    modalElemento.addEventListener("keydown", function (evento) {

        if (imagensDoProjeto.length < 2) {
            return;
        }

        if (evento.key === "ArrowLeft") {
            anterior.click();
        }

        if (evento.key === "ArrowRight") {
            proxima.click();
        }

    });

});
