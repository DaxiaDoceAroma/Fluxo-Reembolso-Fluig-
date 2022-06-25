function toNumber(numberString) {
  if (!numberString) return 0;
  if (!Number.isNaN(Number(numberString))) return Number(numberString);
  const numberWithoutFormat = (numberString + '').replace(/\./g, '').replace(',', '.');
  const numberFinal = Number(numberWithoutFormat);
  if (isNaN(numberFinal)) return 0;
  return numberFinal;
}

function moneyFormat(number = 0) {
  return number.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function configurarMascaras() {
  adicionarMascaraDespesas();
  $('#distanciaPercorrida').mask('#.##0', { reverse: true });
  $('#agencia').mask('0000', { reverse: true });
  $('#conta').mask('#0-0', { reverse: true });
  $('#valorAntecipado').mask('#.##0,00', { reverse: true });
  FLUIGC.calendar('#dataViagem');
  FLUIGC.calendar('#dataRetorno');
  adicionarMascaraPIX(document.getElementById('tipoChavePIX').value);
}
