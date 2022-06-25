function adicionarMascaraDespesas(indice) {
  if (indice) {
    $('#valorDinheiro___' + indice).mask('#.##0,00', { reverse: true });
    $('#valorCartao___' + indice).mask('#.##0,00', { reverse: true });
    return;
  }

  document.querySelectorAll('[valorDinheiro]').forEach(field => $(field).mask('#.##0,00', { reverse: true }));
  document.querySelectorAll('[valorCartao]').forEach(field => $(field).mask('#.##0,00', { reverse: true }));
}

function adicionarDespesa() {
  const indice = wdkAddChild('despesas');
  document.getElementById('codigo___' + indice).value = indice;
  adicionarMascaraDespesas(indice);
}

function removerDespesa(item) {
  const formMode = getFormMode();
  if (formMode == 'VIEW') return;
  fnWdkRemoveChild(item);
  atualizarSomaDespesas();
}

function getDespesas() {
  return Array.from(document.querySelectorAll('[tablename="despesas"] > tbody > tr'))
    .filter(row => row.querySelector('#tipoDespesa') == null)
    .map(row => {
      const tipoDespesa = row.querySelector('[tipoDespesa]').value;
      const valorDinheiro = row.querySelector('[valorDinheiro]').value;
      const valorCartao = row.querySelector('[valorCartao]').value;
      const observacao = row.querySelector('[observacao]').value;
      return {
        tipoDespesa,
        valorDinheiro,
        valorCartao,
        observacao
      };
    });
}

function getSomaDespesas() {
  const despesas = getDespesas();
  return despesas.reduce(
    (acm, act) => {
      acm.valorDinheiro += toNumber(act.valorDinheiro);
      acm.valorCartao += toNumber(act.valorCartao);
      return acm;
    },
    { valorDinheiro: 0, valorCartao: 0 }
  );
}

function atualizarSomaDespesas() {
  const somaDespesas = getSomaDespesas();

  const $valorTotalDinheiro = document.getElementById('valorTotalDinheiro');
  const $valorTotaCartaoCorp = document.getElementById('valorTotaCartaoCorp');
  const $valorDevolver = document.getElementById('valorDevolver');

  const valorAntecipado = document.getElementById('valorAntecipado').value;
  const valorDevolver = somaDespesas.valorDinheiro - toNumber(valorAntecipado);

  $valorTotalDinheiro.value = moneyFormat(somaDespesas.valorDinheiro);
  $valorTotaCartaoCorp.value = moneyFormat(somaDespesas.valorCartao);
  $valorDevolver.value = moneyFormat(valorDevolver);
}

function adicionarAnexo(button) {
  const td = button.closest('td');
  const $codigo = td.querySelector('[codigo]');

  const documentDescription = `comprovante_despesa_${$codigo.value}`;
  JSInterface.showCamera(documentDescription);
}
