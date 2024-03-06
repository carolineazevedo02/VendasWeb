let listaDeProdutos = localStorage.getItem('listaDeProdutos')
    ? JSON.parse(localStorage.getItem('listaDeProdutos'))
    : [];

let lista = document.getElementById('lista');
const botaoAdicionar = document.getElementById('adicionar');
const inputProduto = document.getElementById('produto');
atualizarVisualizacaoLista();

botaoAdicionar.addEventListener('click', function () {
    adicionarProduto(inputProduto.value);
});

inputProduto.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter' || this.value === '') {
        return;
    }

    adicionarProduto(this.value);
});

function adicionarProduto(produto) {
    if (produto === '') {
        return;
    }

    listaDeProdutos.push(produto);
    const listaDeProdutosJson = JSON.stringify(listaDeProdutos);
    localStorage.setItem('listaDeProdutos', listaDeProdutosJson);
    atualizarVisualizacaoLista();
    limparInput();
}

function atualizarVisualizacaoLista() {
    lista.innerHTML = '';
    for (let [indice, valor] of listaDeProdutos.entries()) {
        const li = document.createElement('li');
        li.classList.add('elemento');

        // Criar elemento para o texto à esquerda
        const texto = document.createElement('span');
        texto.innerText = valor;
        li.appendChild(texto);

        // Criar botão de excluir à direita
        const botaoExcluir = criarBotaoExcluir(indice);
        li.appendChild(botaoExcluir);

        lista.appendChild(li);
    }
}



function excluirProduto(indiceProduto) {
    listaDeProdutos.splice(indiceProduto, 1);
    const listaDeProdutosJson = JSON.stringify(listaDeProdutos);
    localStorage.setItem('listaDeProdutos', listaDeProdutosJson);
    atualizarVisualizacaoLista();
}

function criarBotaoExcluir(indice) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.setAttribute('onClick', `excluirProduto(${indice})`);
    botaoExcluir.classList.add('botaoExcluir');
    botaoExcluir.innerText = 'Excluir';
    return botaoExcluir;
}

function limparInput() {
    inputProduto.value = '';
    inputProduto.focus();
}
