const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();
  calcularCalorias();
});

function calcularCalorias() {
  aparecerResultado();

  const nombre = document.querySelector("#nombre");
  const tipoDocumento = document.querySelector("#tipoDocumento");
  const numeroDocumento = document.querySelector("#numeroDocumento");
  const edad = document.querySelector("#edad");
  const peso = document.querySelector("#peso");
  const altura = document.querySelector("#altura");
  const actividad = document.querySelector("#actividad");
  const genero = document.querySelector('input[name="genero"]:checked');

  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };

  let edadValor = edad.value;

  if (!edad.value || !peso.value || !altura.value) {
    mostrarMensajeDeError("Por favor asegúrese de llenar todos los campos");
    return;
  }

  let calculoCalorias =
    actividad.value *
      (multiplicadorTMB.peso * peso.value +
        multiplicadorTMB.altura * altura.value -
        multiplicadorTMB.edad * edad.value) +
    (genero.id === "masculino" ? 5 : -161);

  let grupoPoblacional = "Adultos mayores";

  if (edadValor >= 15 && edadValor <= 29) {
    grupoPoblacional = "Joven";
  } else if (edadValor >= 30 && edadValor <= 59) {
    grupoPoblacional = "Adultos";
  }

  resultado.innerHTML = `<div class="d-flex flex-column justify-content-center align-items-center h-100">
  <div class="card text-center">
    <div class="card-header">
    Resultados
    </div>
    <div class="card-body">
      
      <p class="card-text">El paciente ${nombre.value} identificado con ${
    tipoDocumento.value
  }
      N°. ${numeroDocumento.value}, requiere un total de ${Math.floor(
    calculoCalorias
  )} kcal para el sostenimiento de su TBM</p>
  <p>El paciente pertenece al grupo poblacional: ${grupoPoblacional} </p>
      
    </div>
    <div class="card-footer text-body-secondary">
      
    </div>
  </div>

</div>
`;

  let card = (nombre.value = null);
  numeroDocumento.value = null;
  peso.value = null;
  edad.value = null;
  altura.value = null;
  tipoDocumento.value = "";
  actividad.value = "";
}

function mostrarMensajeDeError(msg) {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
}

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
