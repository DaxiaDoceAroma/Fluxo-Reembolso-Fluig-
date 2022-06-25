function getDespesas() {
  var despesas = [];

  var indexes = hAPI.getChildrenIndexes('despesas');
  var campos = ['codigo', 'tipoDespesa', 'valorDinheiro', 'valorCartao', 'observacao'];

  indexes.forEach(function (index) {
    var despesa = {};
    campos.forEach(function (campo) {
      despesa[campo] = hAPI.getCardValue(campo + '___' + index);
    });
    despesas.push(despesa);
  });

  return despesas;
}
