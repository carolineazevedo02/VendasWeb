$(document).ready(function() {
    // Função para carregar e exibir as vendas salvas no localStorage
    function carregarVendasSalvas() {
        let vendasSalvas = JSON.parse(localStorage.getItem('vendasSalvas')) || [];

        vendasSalvas.forEach(function(venda) {
            adicionaVendaNaTabela(venda);
        });

        let table = new DataTable('#test');
    }

    carregarVendasSalvas();

    // Função para adicionar uma nova venda na tabela
    function adicionaVendaNaTabela(venda) {
        let vendaTr = montaTr(venda);
        let tabela = $("#tabela-vendas");
        tabela.append(vendaTr);
    }

    // Função para montar a estrutura HTML de uma venda na tabela
    function montaTr(venda) {
        let vendaTr = $("<tr></tr>");
        vendaTr.addClass("venda");
        vendaTr.append(montaTd(venda.data, "info-data"));
        vendaTr.append(montaTd(venda.hora, "info-hora"));
        vendaTr.append(montaTd(venda.vendedor, "info-vendedor"));
        vendaTr.append(montaTd(venda.total, "info-total"));

        return vendaTr;
    }

    // Função para montar uma célula de dados da tabela
    function montaTd(dado, classe) {
        let td = $("<td></td>");
        td.addClass(classe);
        td.text(dado);

        return td;
    }
});
