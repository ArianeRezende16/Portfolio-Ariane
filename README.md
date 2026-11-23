
# Portfólio Web — Ariane

## Sobre o projeto

Portfólio web desenvolvido como atividade final
do 4º bimestre do curso Técnico em Tecnologia
da Informação do Senac.

O projeto apresenta minha trajetória acadêmica,
habilidades, conhecimentos tecnológicos e projetos
desenvolvidos durante minha formação.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap
- LocalStorage
- JSON

## Funcionalidades

- Apresentação pessoal e habilidades
- Quatro áreas do conhecimento
- Quatro tendências tecnológicas
- Galeria de projetos com carrosséis
- Ampliação das imagens dos projetos
- Formulário de contato
- Armazenamento local das mensagens
- Painel administrativo com CRUD
- Envio automático de notificações por e-mail

## Armazenamento das mensagens

O projeto utiliza a API LocalStorage do JavaScript.

As mensagens são armazenadas no navegador em
formato JSON, sem utilizar banco de dados relacional.

Quando não existem dados armazenados, o sistema
cria automaticamente 20 mensagens fictícias para
facilitar os testes.

O armazenamento é individual para cada navegador.

## Painel administrativo

Para acessar:

1. Abra a página inicial do portfólio.
2. Role até o rodapé.
3. Clique em "Área administrativa".

No painel é possível:

- Cadastrar novas mensagens (Create)
- Visualizar mensagens (Read)
- Editar mensagens (Update)
- Excluir mensagens (Delete)

O painel fica oculto até ser aberto pelo botão.

Observação: o acesso é oculto na interface,
mas não possui autenticação por senha.

## Automação do formulário

Ferramenta escolhida: Formspree.

O Formspree foi escolhido por permitir integrar
formulários HTML e JavaScript a um serviço
externo de recebimento de mensagens, sem
necessidade de um servidor próprio.

Ao enviar uma mensagem pelo formulário:

1. Os dados são salvos no LocalStorage.
2. O JavaScript envia os dados ao Formspree.
3. O Formspree recebe a mensagem.
4. Uma notificação é encaminhada ao e-mail
   configurado como destinatário.

As mensagens cadastradas diretamente pelo painel
administrativo não disparam notificações.

## Como executar o projeto

1. Baixe os arquivos do repositório.
2. Coloque a pasta Portfolio-Ariane em
   C:\xampp\htdocs.
3. Inicie o Apache no XAMPP.
4. Abra o navegador e acesse:
   http://localhost/Portfolio-Ariane/

Não é necessário iniciar o MySQL.

## Repositório

https://github.com/ArianeRezende16/Portfolio-Ariane
