var tasks = {
  INICIO_0: 0,
  INICIO: 4,
  APROVACAO_DESPESAS: 5,
  EFETUAR_PAGAMENTO: 10,
  CORRIGIR: 12,
  NOTIFICAR_REPROVACAO: 15,
  NOTIFICAR_PAGAMENTO: 20,
  FINAL: 17
};

function getUserById(user) {
  var constraints = [DatasetFactory.createConstraint('colleaguePK.colleagueId', user, user, ConstraintType.MUST)];
  var dsColleague = DatasetFactory.getDataset('colleague', null, constraints, null);
  return {
    id: dsColleague.getValue(0, 'colleaguePK.colleagueId'),
    nome: dsColleague.getValue(0, 'colleagueName'),
    email: dsColleague.getValue(0, 'mail')
  };
}

function isEmpty(value) {
  return value === null || value === undefined || ((value || '') + '').trim() === '';
}

function buscarGestorPorUsuario(user) {
  var constraintsUsuario = [
    DatasetFactory.createConstraint('tablename', 'usuarios', 'usuarios', ConstraintType.MUST),
    DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
    DatasetFactory.createConstraint('sqlLimit', 1, 1, ConstraintType.MUST),
    DatasetFactory.createConstraint('matricula', user, user, ConstraintType.MUST)
  ];

  var dsUsuarios = DatasetFactory.getDataset('ds_gestores', null, constraintsUsuario, ['documentid;desc']);
  if (dsUsuarios.rowsCount == 0) return null;

  var constraints = [
    DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST),
    DatasetFactory.createConstraint('sqlLimit', 1, 1, ConstraintType.MUST),
    DatasetFactory.createConstraint('documentid', dsUsuarios.getValue(0, 'documentid'), dsUsuarios.getValue(0, 'documentid'), ConstraintType.MUST)
  ];

  var dsGestor = DatasetFactory.getDataset('ds_gestores', null, constraints, ['documentid;desc']);
  if (dsGestor.rowsCount == 0) return null;
  return {
    matricula: dsGestor.getValue(0, 'matriculaGestor'),
    nome: dsGestor.getValue(0, 'gestor')
  };
}

function validaCPF(cpf_validar) {
  var cpf = cpf_validar.toString().replace('.', '').replace('-', '');

  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }

  var add = 0;
  for (i = 0; i < 9; i++) {
    add += parseInt(new java.lang.Character(cpf.charAt(i)).toString()) * (10 - i);
  }

  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(new java.lang.Character(cpf.charAt(9)).toString())) {
    return false;
  }

  add = 0;
  for (i = 0; i < 10; i++) {
    add += parseInt(new java.lang.Character(cpf.charAt(i)).toString()) * (11 - i);
  }

  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) {
    rev = 0;
  }
  if (rev != parseInt(new java.lang.Character(cpf.charAt(10)).toString())) {
    return false;
  }

  return true;
}

function validaCNPJ(cnpj_validar) {
  var cnpj = cnpj_validar.toString().replace('.', '').replace('-', '').replace('/', '');

  if (
    cnpj.length !== 14 ||
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  var tamanho = cnpj.length - 2;
  var numeros = cnpj.substring(0, tamanho);
  var digitos = cnpj.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;
  for (var i = tamanho; i >= 1; i--) {
    soma += parseInt(new java.lang.Character(numeros.charAt(tamanho - i))) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(new java.lang.Character(digitos.charAt(0)))) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += parseInt(new java.lang.Character(numeros.charAt(tamanho - i))) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(new java.lang.Character(digitos.charAt(1)))) {
    return false;
  }

  return true;
}

function validarCPFouCNPJ(value) {
  if (isEmpty(value)) return false;
  var valueValidate = (value + '').replace(/\D/g, '');
  if (valueValidate.length === 11) return validaCPF(valueValidate);
  if (valueValidate.length === 14) return validaCNPJ(valueValidate);
  return false;
}
