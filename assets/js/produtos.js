// Função para cadastrar um produto
function cadastrarProduto() {
    // Obter os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var preco = document.getElementById('preco').value;
    var quantidade = document.getElementById('quantidade').value;
    var categoria = document.getElementById('categoria').value;
    var descricao = document.getElementById('descricao').value;

    // Verificar se os campos foram preenchidos
    if (nome && preco && quantidade && categoria && descricao) {
        // Criar um objeto representando o produto
        var produto = {
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            categoria: categoria,
            descricao: descricao
        };

        // Armazenar o produto no localStorage
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));

        // Limpa os campos do formulário
        document.getElementById('produtoForm').reset();

        // Atualizar a lista de produtos exibida na página
        exibirListaProdutos();
    } else {
        alert("Preencha todos os campos antes de cadastrar o produto.");
    }
}

// Função para exibir a lista de produtos na página
function exibirListaProdutos() {
    var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    var listaProdutos = document.getElementById('listaProdutos');

    // Limpa a lista antes de exibir os produtos
    listaProdutos.innerHTML = "";

    // Exibe cada produto na lista ordenada
    produtos.forEach(function(produto, index) {
        var li = document.createElement('li');
        li.textContent = `${index + 1}. ${produto.nome} - R$ ${produto.preco} - ${produto.quantidade} unidades - ${produto.categoria} - ${produto.descricao}`;
        listaProdutos.appendChild(li);
    });
}


