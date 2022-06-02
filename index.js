const Redux = require('redux')
const { createStore, combineReducers } = Redux

const criarContrato = (nome) => {
    return {
        type: "CRIAR_CONTRATO",
        payload: {
            nome
        }
    }
}

function cancelarContrato(nome) {
    return {
        type: "CANCELAR_CONTRATO",
        payload: {
            nome
        }
    }
}

const solicitarCashback = (nome, valor) => {
    return {
        type: "SOLICITAR_CASHBACK",
        payload: {
            nome,
            valor
        }
    }
}

const contratosReducer = (listaDeContratosAtual = [], acao) => {
    if (acao.type === "CRIAR_CONTRATO") {
        return [
            ...listaDeContratosAtual,
            acao.payload
        ]
    }

    if (acao.type === "CANCELAR_CONTRATO") {
        return listaDeContratosAtual.filter(contrato => contrato.nome !== acao.payload.nome)
    }

    return listaDeContratosAtual
}

const cashbackReducer = (historicoCashback = [], acao) => {
    if (acao.type === "SOLICITAR_CASHBACK") {
        return [
            ...historicoCashback,
            acao.payload
        ]
    }

    return historicoCashback;
}

const todosOsReducers = combineReducers({
    contratos: contratosReducer,
    cashbacks: cashbackReducer
})

const store = createStore(todosOsReducers)

function transacao() {
    const nomes = ['Raul', 'Luar', 'Gabriel', 'Pedro'];
    const operacoes = {
        0: criacaoContratoAndDispatchar,
        1: cancelarContratoAndDispatchar,
        2: calcularCashbackAndDispatchar
    };

    const operationIndex = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    const personNameIndex = Math.floor(Math.random() * (nomes.length - 0 + 1) + 0);
    const operacaoSorteada = operacoes[operationIndex];
    const nomeSorteado = nomes[personNameIndex];

    operacaoSorteada(store, nomeSorteado);
    console.log(store.getState());
}

function criacaoContratoAndDispatchar(store, nome) {
    const criarContratoAction = criarContrato(nome);
    store.dispatch(criarContratoAction);
}

function cancelarContratoAndDispatchar(store, nome) {
    const cancelarContratoAction = cancelarContrato(nome);
    store.dispatch(cancelarContratoAction);
}

function calcularCashbackAndDispatchar(store, nome) {
    const cashbackValue = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    const solicitarCashbackAction = solicitarCashback(nome, cashbackValue);
    store.dispatch(solicitarCashbackAction);
}

setInterval(transacao, 5000);
