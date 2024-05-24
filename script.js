//Chave da API que retorna as informações sobre as condições climaticas da cidade consultada
const apiKey = "75693928";

let cidadesConsultadas = [];

//função chamada através do Clique do botão Consultar
function botaoClique() {
    var verificaInput = document.getElementById("cidade-consultada").value;

    if (!verificaInput || verificaInput.trim() === "") {
        alert("O campo Cidade está vazio. Por favor, preencha o campo.");
        return; // Encerra o processo
    }

    // Se o campo não estiver vazio, continua o processo
    const inputCidade = document.querySelector(".cidade-consultada").value;
    buscarCidade(inputCidade);
}

//função que retorna os dados da API
async function buscarCidade(inputCidade) {
    try {
        const resposta = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${apiKey}&city_name=${inputCidade}&lang=pt_br`);
        if (!resposta.ok) {
            throw new Error('Erro na requisição da API');
        }
        const dados = await resposta.json();
        atualizarDados(dados);
        adicionarAoHistorico(inputCidade, dados);
    } catch (error) {
        alert("Cidade não encontrada, verifique se o nome está correto.");
    }
}

//função que após a API retornar os dados com sucesso, atualiza os valores e retorna na tela
function atualizarDados(dados) {
    document.querySelector(".cidade").innerHTML = "Nome da cidade: " + dados.results.city;
    document.querySelector(".data").innerHTML = `Data: ${dados.results.date}`;
    document.querySelector(".tempAtual").innerHTML = "Temperatura Atual: " + dados.results.temp + "°C";
    document.querySelector(".tempMaxima").innerHTML = "Temperatura Máxima: " + dados.results.forecast[0].max + "°C";
    document.querySelector(".tempMinima").innerHTML = "Temperatura Mínima:  " + dados.results.forecast[0].min + "°C";
    document.querySelector(".climaDescricao").innerHTML = "Tipo do clima: " + dados.results.description;
    document.querySelector(".icone-tempo").src = `https://assets.hgbrasil.com/weather/icons/conditions/${dados.results.condition_slug}.svg`;
    document.querySelector(".icone-tempo").style.display = "block";
    document.querySelector(".chuva").innerHTML = "Probabilidade de chuva: " + dados.results.forecast[0].rain_probability + "%";
    document.querySelector(".faseLuaConsulta").innerHTML = "Fase da Lua: " + dados.results.moon_phase;
    document.querySelector(".icone-lua").src = `https://assets.hgbrasil.com/weather/icons/moon/${dados.results.moon_phase}.png`;
    document.querySelector(".icone-lua").style.display = "block";

    mostrarProximosDias(dados);
}

//função para o usuário poder consultar as previsões para os próximos 3 dias (o campo só aparece depois de a cidade ser consultada)
function mostrarProximosDias(dados) {
    var display = document.querySelector(".proximos-dias").style.display;
    if (display == "none") {
        document.querySelector(".proximos-dias").style.display = 'block';
    }
    document.querySelector(".dia0").innerHTML = `Dia ${dados.results.forecast[0].date}`;
    document.querySelector(".dia1").innerHTML = `Dia ${dados.results.forecast[1].date}`;
    document.querySelector(".dia2").innerHTML = `Dia ${dados.results.forecast[2].date}`;
    document.querySelector(".dia3").innerHTML = `Dia ${dados.results.forecast[3].date}`;

    atualizarProximoDia(dados);
}

//função que cria o evento para atualizar as informações em tela, de acordo com a data que o usuário selecionar
function atualizarProximoDia(dados) {
    document.getElementById("comboProximosDias").addEventListener("change", function () {
        var selecionado = this.value;

        if (selecionado === "dia0") {
            document.querySelector(".cidade").innerHTML = "Nome da cidade: " + dados.results.city;
            document.querySelector(".data").innerHTML = `Data: ${dados.results.date}`;
            document.querySelector(".tempAtual").innerHTML = "Temperatura Atual: " + dados.results.temp + "°C";
            document.querySelector(".tempMaxima").innerHTML = "Temperatura Máxima: " + dados.results.forecast[0].max + "°C";
            document.querySelector(".tempMinima").innerHTML = "Temperatura Mínima:  " + dados.results.forecast[0].min + "°C";
            document.querySelector(".climaDescricao").innerHTML = "Tipo do clima: " + dados.results.description;
            document.querySelector(".icone-tempo").src = `https://assets.hgbrasil.com/weather/icons/conditions/${dados.results.condition_slug}.svg`;
            document.querySelector(".icone-tempo").style.display = "block";
            document.querySelector(".chuva").innerHTML = "Probabilidade de chuva: " + dados.results.forecast[0].rain_probability + "%";
            document.querySelector(".faseLuaConsulta").innerHTML = "Fase da Lua: " + dados.results.moon_phase;
            document.querySelector(".icone-lua").src = `https://assets.hgbrasil.com/weather/icons/moon/${dados.results.moon_phase}.png`;
            document.querySelector(".icone-lua").style.display = "block";
        } else if (selecionado === "dia1") {
            document.querySelector(".cidade").innerHTML = "Nome da cidade: " + dados.results.city;
            document.querySelector(".data").innerHTML = `Data: ${dados.results.forecast[1].date}`;
            document.querySelector(".tempAtual").innerHTML = "";
            document.querySelector(".tempMaxima").innerHTML = "Temperatura Máxima: " + dados.results.forecast[1].max + "°C";
            document.querySelector(".tempMinima").innerHTML = "Temperatura Mínima:  " + dados.results.forecast[1].min + "°C";
            document.querySelector(".climaDescricao").innerHTML = "Tipo do clima: " + dados.results.forecast[1].description;
            document.querySelector(".icone-tempo").src = `https://assets.hgbrasil.com/weather/icons/conditions/${dados.results.forecast[1].condition}.svg`;
            document.querySelector(".chuva").innerHTML = "Probabilidade de chuva: " + dados.results.forecast[1].rain_probability + "%";
            document.querySelector(".faseLuaConsulta").innerHTML = "";
            document.querySelector(".icone-lua").style.display = "none";
        } else if (selecionado === "dia2") {
            document.querySelector(".cidade").innerHTML = "Nome da cidade: " + dados.results.city;
            document.querySelector(".data").innerHTML = `Data: ${dados.results.forecast[2].date}`;
            document.querySelector(".tempAtual").innerHTML = "";
            document.querySelector(".tempMaxima").innerHTML = "Temperatura Máxima: " + dados.results.forecast[2].max + "°C";
            document.querySelector(".tempMinima").innerHTML = "Temperatura Mínima:  " + dados.results.forecast[2].min + "°C";
            document.querySelector(".climaDescricao").innerHTML = "Tipo do clima: " + dados.results.forecast[2].description;
            document.querySelector(".icone-tempo").src = `https://assets.hgbrasil.com/weather/icons/conditions/${dados.results.forecast[2].condition}.svg`;
            document.querySelector(".chuva").innerHTML = "Probabilidade de chuva: " + dados.results.forecast[2].rain_probability + "%";
            document.querySelector(".faseLuaConsulta").innerHTML = "";
            document.querySelector(".icone-lua").style.display = "none";
        } else if (selecionado === "dia3") {
            document.querySelector(".cidade").innerHTML = "Nome da cidade: " + dados.results.city;
            document.querySelector(".data").innerHTML = `Data: ${dados.results.forecast[3].date}`;
            document.querySelector(".tempAtual").innerHTML = "";
            document.querySelector(".tempMaxima").innerHTML = "Temperatura Máxima: " + dados.results.forecast[3].max + "°C";
            document.querySelector(".tempMinima").innerHTML = "Temperatura Mínima:  " + dados.results.forecast[3].min + "°C";
            document.querySelector(".climaDescricao").innerHTML = "Tipo do clima: " + dados.results.forecast[3].description;
            document.querySelector(".icone-tempo").src = `https://assets.hgbrasil.com/weather/icons/conditions/${dados.results.forecast[3].condition}.svg`;
            document.querySelector(".chuva").innerHTML = "Probabilidade de chuva: " + dados.results.forecast[3].rain_probability + "%";
            document.querySelector(".faseLuaConsulta").innerHTML = "";
            document.querySelector(".icone-lua").style.display = "none";
        } else {
            // Executar se nenhum dos valores esperados for selecionado
            console.log("Opção inválida selecionada");
        }
    });
}

//função para adicionar a cidade consultada ao select de cidades ja consultadas caso ainda não tenha no histórico
function adicionarAoHistorico(cidade, dados) {
    if (!cidadesConsultadas.some(item => item.cidade === cidade)) {
        cidadesConsultadas.push({ cidade, dados });
        atualizarSelectHistorico(dados);
    }
}

//função para atualizar o select com as cidades ja consultadas e atualizar as informações na tela caso o usuuário selecione outra cidade
function atualizarSelectHistorico() {
    const selectHistorico = document.getElementById("historicoCidades");
    const ultimaCidadeIndex = cidadesConsultadas.length - 1;

    selectHistorico.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa as opções atuais e adiciona a opção padrão

    cidadesConsultadas.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.cidade;
        selectHistorico.appendChild(option);
    });

    // Define a última cidade consultada como a opção selecionada
    if (ultimaCidadeIndex >= 0) {
        selectHistorico.value = ultimaCidadeIndex;
    }

    document.getElementById("historicoCidades").addEventListener("change", function () {
        const selecionado = this.value;
        if (selecionado !== "") {
            const dados = cidadesConsultadas[selecionado].dados;
            atualizarDados(dados);
        }
    });
}

//Inicialização - evento para o select de cidaes ja consultadas
document.addEventListener("DOMContentLoaded", function () {
    const historicoContainer = document.querySelector(".historicoCidades");
    const selectHistorico = document.createElement("select");
    selectHistorico.id = "historicoCidades";
    historicoContainer.appendChild(selectHistorico);
});