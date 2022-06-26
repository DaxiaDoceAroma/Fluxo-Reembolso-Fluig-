function aprovacaoGestor(event) {
  event.preventDefault();
  const { target } = event;
  const statesBackup = [...parent.ECM.workflowView.availableStates];

  if (target.id === 'aprovar') {
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 10);
    parent.ECM_WKFView.validateSendRequest();
  } else if (target.id === 'correcao') {
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 12);
    parent.ECM_WKFView.validateSendRequest();
  } else if (target.id === 'reprovar') {
    parent.ECM.workflowView.availableStates = statesBackup.filter(state => state.sequence === 15);
    parent.ECM_WKFView.validateSendRequest();
  }

  parent.ECM.workflowView.availableStates = [...statesBackup];
}
