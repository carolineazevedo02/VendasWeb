let vendas = [],
    totalVenda = 0;

$(document).ready(function () {

    $(document).on('click', '#lancarVenda', function (event) {
        event.preventDefault();
        let form = $("#form-cadastra"),
            venda = obtemVendaDoFormulario(form),
            vendaProdutos = obtemProduto(form),
            erros = validaVenda(vendaProdutos, venda);

        if (erros.length > 0) {
            exibeMensagensDeErro(erros);
            return;
        }

        adicionaNovaVendaNaTabela(vendaProdutos);

        adicionaRodape(venda);
        $("#nome").val("");
        $("#valor").val("");
        $("#quantidade").val("");
    });

    $(document).on('click', '#adicionarVenda', function (event) {
        event.preventDefault();
        armazenarDadosLocalStorage();
        // let tbody = document.getElementById('tabela-nova-venda');
        // tbody.innerHTML = '';
        $("#tabela-nova-venda").html('');
        $("#info-total-venda").html('')
        $("#vendedor").val("");

    });
});

function obtemVendaDoFormulario() {
    let venda = {
        vendedor: $("#vendedor").val(),
    }

    return venda;
}

function obtemProduto() {
    let vendaProdutos = {
        nome: $("#nome").val(),
        valor: $("#valor").val(),
        quantidade: $("#quantidade").val(),
        total: calculaTotal($("#valor").val(), $("#quantidade").val()),
    }
    vendas.push(vendaProdutos);
    return vendaProdutos;
}

function montaTr(vendaProdutos) {
    let vendaTr = $("<tr></tr>");
    vendaTr.addClass("venda");

    vendaTr.append(montaTd(vendaProdutos.nome, "info-produto"));
    vendaTr.append(montaTd(vendaProdutos.valor, "info-valor-unitario"));
    vendaTr.append(montaTd(vendaProdutos.quantidade, "info-quantidade"));
    vendaTr.append(montaTd(vendaProdutos.total, "info-total"));

    return vendaTr;
}

function montaTd(dado, classe) {
    let td = $("<td></td>");
    td.addClass(classe);
    td.text(dado);

    return td;
}

function validaVenda(vendaProdutos) {
    let erros = [];
    if (vendaProdutos.nome == 0) {
        erros.push("Informe o produto!");
    }

    if (vendaProdutos.quantidade == 0) {
        erros.push("Informe a quantidade!");
    }

    if (vendaProdutos.valor == 0) {
        erros.push("Informe o valor!");
    }

    if (vendaProdutos.quantidade < 0) {
        erros.push("A quantidade não pode ser negativa!");
    }

    if (vendaProdutos.valor < 0) {
        erros.push("O valor não pode ser negativo!");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    let ul = $("#mensagem-erro");
    ul.html("");

    erros.forEach(function (erro) {
        let li = $("<li></li>");
        li.text(erro);
        ul.append(li);
    });
}

function adicionaNovaVendaNaTabela(venda) {
    let vendaTr = montaTr(venda);
    let tabela = $("#tabela-nova-venda");
    tabela.append(vendaTr);
}

function adicionaRodape() {
    let rodape = $("#info-total-venda");
    rodape.text(totalVenda);
}

function calculaTotal(valor, quantidade) {
    let total = 0;
    total = valor * quantidade;
    totalVenda += total;
    return total;
}


function armazenarDadosLocalStorage() {
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getUTCMonth() + 1;
    var ano = dataAtual.getFullYear();

    var horas = dataAtual.getHours();
    var minutos = dataAtual.getMinutes();

    var dadosVenda = {
        total: $("#info-total-venda").val(),
        data: dia + '/' + mes + '/' + ano,
        hora: horas + ':' + minutos,
        vendedor: $("#vendedor").val()
    };

    // Salvando a venda no localStorage
    var vendasSalvas = JSON.parse(localStorage.getItem('vendasSalvas')) || [];
    vendasSalvas.push(dadosVenda);
    localStorage.setItem('vendasSalvas', JSON.stringify(vendasSalvas));
}
