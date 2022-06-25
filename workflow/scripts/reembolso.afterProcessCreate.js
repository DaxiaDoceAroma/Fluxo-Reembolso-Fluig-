function afterProcessCreate(processId) {
  hAPI.setCardValue('solicitacao', processId);
  hAPI.setCardValue('status', 'aberto');
}
