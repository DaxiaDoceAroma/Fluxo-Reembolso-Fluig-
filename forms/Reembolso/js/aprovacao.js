function aprovacaoGestor({ target }) {
  const statesBackup = [...parent.ECM.workflowView.availableStates];
  const $resultadoAprovacao = document.getElementById('resultadoAprovacao');

  if (target.id === 'aprovar') {
    $resultadoAprovacao.value = 'aprovado';
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 10);
    parent.ECM_WKFView.validateSendRequest();
  } else if (target.id === 'correcao') {
    $resultadoAprovacao.value = 'correcao';
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 12);
    parent.ECM_WKFView.validateSendRequest();
  } else if (target.id === 'reprovar') {
    $resultadoAprovacao.value = 'reprovado';
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 15);
    parent.ECM_WKFView.validateSendRequest();
  }

  parent.ECM.workflowView.availableStates = [...statesBackup];
}
