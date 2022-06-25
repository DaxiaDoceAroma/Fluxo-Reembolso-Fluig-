const showModal = getModalZoom();

async function openZoom(field) {
  if (field === 'banco') {
    const config = {
      title: 'Banco',
      description: 'Selecione o banco abaixo',
      selectedClass: 'info',
      dataset: 'ds_bancos',
      displayFields: [
        {
          label: 'Código',
          field: 'codigo'
        },
        {
          label: 'Descrição',
          field: 'descricao'
        }
      ],
      resultFields: ['codigo', 'descricao', 'codDescricao'],
      filters: [
        {
          field: 'sqlLimit',
          initialValue: '255',
          finalValue: '255',
          type: ConstraintType.MUST
        }
      ],
      orderBy: ['codigo'],
      searchField: 'codDescricao',
      preFetch: true,
      multiSelect: false,
      limit: 10
    };

    const banco = await showModal(config);
    if (banco) {
      document.getElementById('banco').value = banco.codDescricao;
    }
  }
}
