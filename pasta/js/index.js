const visitasContador = document.getElementById("visitas")
preencherContador();

function preencherContador() {
 Promise.all([swapiGet('apikey2')]).then(function (results) {
    visitasContador.innerHTML = results[0].data.value;
  });
}

function swapiGet(param) {
return axios.get(`https://api.countapi.xyz/hit/Ghost/${param}`);
}