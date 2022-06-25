function validateForm(form) {
  var task = getValue('WKNumState');

  var message = '';

  if (task == tasks.INICIO || task == tasks.INICIO_0 || task == tasks.CORRIGIR) {
    if (isEmpty(form.getValue('matricGestor'))) message += 'Gestor não encontrado';

    // if (isEmpty(form.getValue('dataViagem'))) message += '';
    // if (isEmpty(form.getValue('dataRetorno'))) message += '';
    // if (isEmpty(form.getValue('finalidadeVisita'))) message += '';
    // if (isEmpty(form.getValue('roteiro'))) message += '';
    if (form.getValue('tipoChavePIX') == '') {
      if (isEmpty(form.getValue('banco'))) message += 'Informe o Banco <br/>';
      if (isEmpty(form.getValue('tipoConta'))) message += 'Informe o Tipo da Conta <br/>';
      if (isEmpty(form.getValue('agencia'))) message += 'Informe a Agência <br/>';
      if (isEmpty(form.getValue('conta'))) message += 'Informe a Conta <br/>';
    } else if (form.getValue('tipoChavePIX') == 'cpf_cnpj' && validarCPFouCNPJ(form.getValue('chavePIX')) === false)
      message += 'Informe um CPF ou CNPJ válido';
    else if (isEmpty(form.getValue('chavePIX'))) message += 'Informe a Chave PIX <br/>';

    // if (isEmpty(form.getValue('veiculoProprio'))) message += '';
    // if (isEmpty(form.getValue('taxiUber'))) message += '';
    // if (isEmpty(form.getValue('metro'))) message += '';
    // if (isEmpty(form.getValue('veiculoEmpresa'))) message += '';
    // if (isEmpty(form.getValue('onibus'))) message += '';
    // if (isEmpty(form.getValue('aviao'))) message += '';
    // if (isEmpty(form.getValue('veiculoAlugado'))) message += '';
    // if (isEmpty(form.getValue('trem'))) message += '';
    if (!isEmpty(form.getValue('veiculoProprio')) || !isEmpty(form.getValue('veiculoEmpresa')) || !isEmpty(form.getValue('veiculoAlugado')))
      if (isEmpty(form.getValue('distanciaPercorrida'))) message += 'Informe a Distância Percorrida <br/>';

    // if (isEmpty(form.getValue('valorAntecipado'))) message += '';

    var despesasIndexes = form.getChildrenIndexes('despesas');
    if (despesasIndexes.length < 1) message += 'Informe ao menos uma despesa';
    despesasIndexes.forEach(function (indice) {
      var tipoDespesa = form.getValue('tipoDespesa___' + indice);
      if (isEmpty(tipoDespesa)) message += 'Informe o Tipo da Despesa (Linha ' + indice + ')<br/>';
      if (isEmpty(form.getValue('valorDinheiro___' + indice)) && isEmpty(form.getValue('valorCartao___' + indice)))
        message += 'Informe o Valor em Dinheiro ou Cartão Corporativo (Linha ' + indice + ') <br/>';
      if (tipoDespesa == 'outras' && isEmpty(form.getValue('observacao___' + indice))) message += 'Descreva a despesa (Linha ' + indice + ')<br/>';
    });
  }

  if (task == tasks.APROVACAO_DESPESAS) {
    if (isEmpty(form.getValue('resultadoAprovacao'))) message += 'Resultado da aprovação não informado';
    if (form.getValue('resultadoAprovacao') != 'aprovado') if (isEmpty(form.getValue('observacoesGestor'))) message += 'Justifique a decisão';
  }

  if (!isEmpty(message)) throw message + '<br/> <hr/>';
}
