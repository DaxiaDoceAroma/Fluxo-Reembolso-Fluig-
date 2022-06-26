function beforeSendValidate(numState, nextState) {
  if (numState == 5) {
    const $resultadoAprovacao = document.getElementById('resultadoAprovacao');
    if (nextState == 10) $resultadoAprovacao.value = 'aprovado';
    if (nextState == 12) $resultadoAprovacao.value = 'correcao';
    if (nextState == 15) $resultadoAprovacao.value = 'reprovado';
  }
}
