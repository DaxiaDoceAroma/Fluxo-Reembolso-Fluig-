function enableFields(form) {
  var task = getValue('WKNumState');

  function disableAll() {
    var fields = [
      'observacoesGestor',
      'dataViagem',
      'dataRetorno',
      'finalidadeVisita',
      'roteiro',
      'tipoConta',
      'agencia',
      'conta',
      'tipoChavePIX',
      'chavePIX',
      'veiculoProprio',
      'taxiUber',
      'metro',
      'veiculoEmpresa',
      'onibus',
      'aviao',
      'veiculoAlugado',
      'trem',
      'distanciaPercorrida',
      'valorAntecipado',
      'tipoDespesa',
      'valorDinheiro',
      'valorCartao',
      'observacao'
    ];

    var despesasIndexes = form.getChildrenIndexes('despesas');
    despesasIndexes.forEach(function (indice) {
      fields.push('tipoDespesa___' + indice);
      fields.push('valorDinheiro___' + indice);
      fields.push('valorCartao___' + indice);
      fields.push('observacao___' + indice);
    });

    fields.forEach(function (field) {
      form.setEnabled(field, false);
    });
  }

  disableAll();

  if (task == tasks.INICIO || task == tasks.INICIO_0) {
    form.setEnabled('dataViagem', true);
    form.setEnabled('dataRetorno', true);
    form.setEnabled('finalidadeVisita', true);
    form.setEnabled('roteiro', true);
    form.setEnabled('tipoConta', true);
    form.setEnabled('agencia', true);
    form.setEnabled('conta', true);
    form.setEnabled('tipoChavePIX', true);
    form.setEnabled('chavePIX', true);
    form.setEnabled('veiculoProprio', true);
    form.setEnabled('taxiUber', true);
    form.setEnabled('metro', true);
    form.setEnabled('veiculoEmpresa', true);
    form.setEnabled('onibus', true);
    form.setEnabled('aviao', true);
    form.setEnabled('veiculoAlugado', true);
    form.setEnabled('trem', true);
    form.setEnabled('distanciaPercorrida', true);
    form.setEnabled('valorAntecipado', true);
    form.setEnabled('tipoDespesa', true);
    form.setEnabled('valorDinheiro', true);
    form.setEnabled('valorCartao', true);
    form.setEnabled('observacao', true);
  }

  if (task == tasks.APROVACAO_DESPESAS) {
    form.setEnabled('observacoesGestor', true);
  }

  if (task == tasks.CORRIGIR) {
    form.setEnabled('dataViagem', true);
    form.setEnabled('dataRetorno', true);
    form.setEnabled('finalidadeVisita', true);
    form.setEnabled('roteiro', true);
    form.setEnabled('tipoConta', true);
    form.setEnabled('agencia', true);
    form.setEnabled('conta', true);
    form.setEnabled('tipoChavePIX', true);
    form.setEnabled('chavePIX', true);
    form.setEnabled('veiculoProprio', true);
    form.setEnabled('taxiUber', true);
    form.setEnabled('metro', true);
    form.setEnabled('veiculoEmpresa', true);
    form.setEnabled('onibus', true);
    form.setEnabled('aviao', true);
    form.setEnabled('veiculoAlugado', true);
    form.setEnabled('trem', true);
    form.setEnabled('distanciaPercorrida', true);
    form.setEnabled('valorAntecipado', true);
    form.setEnabled('tipoDespesa', true);
    form.setEnabled('valorDinheiro', true);
    form.setEnabled('valorCartao', true);
    form.setEnabled('observacao', true);

    var despesasIndexes = form.getChildrenIndexes('despesas');
    despesasIndexes.forEach(function (indice) {
      form.setEnabled('tipoDespesa___' + indice, true);
      form.setEnabled('valorDinheiro___' + indice, true);
      form.setEnabled('valorCartao___' + indice, true);
      form.setEnabled('observacao___' + indice, true);
    });
  }
}
