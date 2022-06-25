function displayFields(form, customHTML) {
  var matricUsuario = getValue('WKUser');
  var task = getValue('WKNumState');

  customHTML.append('<script>');
  customHTML.append('function getState() { return ' + task + '; };');
  customHTML.append("function getUserCode() { return '" + matricUsuario + "'; };");
  customHTML.append('function getMobile() { return ' + form.getMobile() + '; };');
  customHTML.append("function getFormMode() { return '" + form.getFormMode() + "'; };");
  customHTML.append("function getCardId() { return '" + form.getDocumentId() + "'; };");
  customHTML.append('function isManager() { return ' + getValue('WKManagerMode') + '; };');
  customHTML.append('</script>');

  form.setShowDisabledFields(true);
  form.setHidePrintLink(true);

  var tipoChavePIX = form.getValue('tipoChavePIX');
  if (isEmpty(tipoChavePIX)) form.setVisibleById('divChavePIX', false);
  else form.setVisibleById('divChavePIX', true);

  if (form.getFormMode() == 'ADD') {
    var gestor = buscarGestorPorUsuario(matricUsuario);
    if (gestor == null) {
      form.setVisibleById('painelGestor', false);
      form.setVisibleById('painelSolicitante', false);
      form.setVisibleById('painelMeioTransporte', false);
      form.setVisibleById('painelDespesas', false);

      customHTML.append(
        '<div class="fluig-style-guide"><div class="alert alert-danger" role="alert">Este usuário não tem gestor cadastrado, contactar o administrador do sistema</div></div>'
      );

      return;
    }
    form.setValue('matricGestor', gestor.matricula);

    var usuario = getUserById(matricUsuario);
    form.setValue('matricSolicitante', usuario.id);
    form.setValue('solicitante', usuario.nome);
    form.setValue('emailSolic', usuario.email);
  }

  if (task == tasks.INICIO || task == tasks.INICIO_0) {
    form.setVisibleById('painelGestor', false);
  }

  if ((task != tasks.INICIO && task != tasks.INICIO_0 && task != tasks.CORRIGIR) || form.getFormMode() == 'VIEW') {
    form.setVisibleById('btnClear_banco', false);
    form.setVisibleById('divAdicionarDespesas', false);
    customHTML.append('<script>');
    customHTML.append("(() => {document.querySelectorAll('.actionsDespesas').forEach(el => el.style.display = 'none')})()");
    customHTML.append('</script>');
  }

  if (task != tasks.APROVACAO_DESPESAS || form.getFormMode() == 'VIEW') {
    form.setVisibleById('divBtnsAprovacaoGestor', false);
  }

  var resultadoAprovacao = form.getValue('resultadoAprovacao');
  if (!isEmpty(resultadoAprovacao)) {
    var aviso = '';
    var className = '';
    if (resultadoAprovacao == 'reprovado') {
      aviso = 'Solicitação reprovada pelo gestor';
      className = 'alert-danger';
    }
    if (resultadoAprovacao == 'correcao') {
      aviso = 'Gestor solicitou uma correção das informações';
      className = 'alert-warning';
    }
    if (resultadoAprovacao == 'aprovado') {
      aviso = 'Solicitação aprovada pelo gestor';
      className = 'alert-success';
    }

    customHTML.append('<script>');
    customHTML.append(
      "(() => {document.querySelector('#aviso').innerHTML = '<div class=\"alert " + className + '" role="alert">' + aviso + "</div>' })()"
    );
    customHTML.append('</script>');
  }
}
