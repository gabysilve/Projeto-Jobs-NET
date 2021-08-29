const validaCEP = (cep) => cep.toString().length == 8;


const buscaCEP = async () => {
    LimpaEndereco();
    let validacao = true;
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (validaCEP(cep)) {
        const data = await fetch(url);
        const endereco = await data.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('erroCEP').style.display = 'block';
            document.getElementById('erroBlocoCEP').style.border = '.1875rem solid red';
            validacao = false;
        } else {
            document.getElementById('erroCEP').style.display = 'none';
            document.getElementById('erroBlocoCEP').style.border = 'none';
            completaEndereco(endereco);
            validacao = true;
        }
    } else {
        document.getElementById('erroCEP').style.display = 'block';
        document.getElementById('erroBlocoCEP').style.border = '.1875rem solid red';
        validacao = false;
    }
    return validacao;
}

document.getElementById('cep').addEventListener('focusout', buscaCEP);

const completaEndereco = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;

}

const LimpaEndereco = () => {
    document.getElementById('endereco').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
}

const formulario = () => {
    let form = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        celular: document.getElementById('phone').value,
        cargo: document.getElementById('cargo').value,
        nascimento: document.getElementById('nascimento').value,
        estadocivil: document.getElementById('estadocivil').value,
        sexo: document.getElementById('sexo').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        email: document.getElementById('email').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,

    };
    console.log(form);
    return form
}

const criarCandidato = async (candidato) => {
    try {
        const usuario = fetch('http://localhost:5000/registro', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'content-Trype': 'application/json'
            },
            body: JSON.stringify(formulario())
        });
        if (usuario.status === 200) {
            alert('DEU BOA')
        }
    } catch (error) {
        alert('DEU RUIM');
    }
}

function check_form() {

    var valid = true;
    if (!validacaoCPF() || !buscaCEP()) { valid = false; }

    if (!valid) {
        alert('Por favor, preencha todos os campos corretamente.');
        return false;
    } else {
        return true;
    }
}