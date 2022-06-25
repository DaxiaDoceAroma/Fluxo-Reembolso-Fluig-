function main() {
  const formMode = getFormMode();
  if (formMode != 'VIEW') {
    const $btnAdicionarDespesas = document.getElementById('btnAdicionarDespesas');
    $btnAdicionarDespesas.addEventListener('click', adicionarDespesa);

    const $btnBanco = document.getElementById('btnSearch_banco');
    $btnBanco.addEventListener('click', () => openZoom('banco'));

    const $btnClearBanco = document.getElementById('btnClear_banco');
    $btnClearBanco.addEventListener('click', () => (document.getElementById('banco').value = ''));

    document.querySelectorAll('[btnAprovacao]').forEach(btn => btn.addEventListener('click', aprovacaoGestor));

    configurarMascaras();
  }
}
