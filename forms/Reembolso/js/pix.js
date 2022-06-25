function alterarTipoChavePIX({ target }) {
  document.getElementById('chavePIX').value = '';
  const value = target.value;
  const $divChavePIX = document.getElementById('divChavePIX');

  if (value) {
    $divChavePIX.style.display = 'block';
    adicionarMascaraPIX(value);
    return;
  }

  $divChavePIX.style.display = 'none';
}

function adicionarMascaraPIX(tipo) {
  $('#chavePIX').unmask();

  if (tipo === 'cpf_cnpj') {
    const options = {
      onKeyPress(value, _, field, options) {
        const mask = value.length <= 14 ? '000.000.000-00#' : '00.000.000/0000-00';
        $(field).mask(mask, options);
      }
    };

    $('#chavePIX').mask('000.000.000-00#', options);
  } else if (tipo === 'telefone') $('#chavePIX').mask('(00) 00000-0000');
  else if (tipo === 'aleatoria')
    $('#chavePIX').mask('CCCCCCCC-CCCC-CCCC-CCCC-CCCCCCCCCCCC', {
      translation: {
        C: {
          pattern: /[0-9a-zA-Z]/,
          optional: true
        }
      }
    });
}
