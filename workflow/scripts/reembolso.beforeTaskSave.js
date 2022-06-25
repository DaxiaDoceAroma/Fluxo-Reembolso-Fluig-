function beforeTaskSave(colleagueId, nextSequenceId, userList) {
  var task = getValue('WKCurrentState');
  if (task == 4 || task == 12) {
    var message = '';
    var depesas = getDespesas();
    var anexos = hAPI.listAttachments();
    var anexosOBJ = {};

    for (var i = 0; i < anexos.size(); i++) {
      var anexoDescription = anexos.get(i).getDocumentDescription() + '';
      anexosOBJ[anexoDescription] = anexos.get(i);
    }

    depesas.forEach(function (despesa) {
      if (despesa.tipoDespesa == 'passagemOnibus' || despesa.tipoDespesa == 'passagemMetro' || despesa.tipoDespesa == 'passagemTrem') return;
      var nomeAnexoEsperado = 'comprovante_despesa_' + despesa.codigo;
      if (anexosOBJ[nomeAnexoEsperado] == null) message += 'Adicionar anexo para a despesa com código ' + despesa.codigo + ' <br />';
    });

    if (message) throw '<br />' + message + '<br /> <hr />';
  }
}
