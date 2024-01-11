const formularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();
  generarCalculoCalorias();
});

function generarCalculoCalorias() {
  const campos = capturarCampos();
  const datos = capturarDatos(campos);
  if (!validarCampos(datos)) {
    mostrarMensajeDeError("Por favor asegúrese de llenar todos los campos");
    return;
  }
  const calculo = calcularCalorias(datos);
  mostrarResultado(datos, calculo);
}

function capturarCampos() {
  const campos = {
    nombre: document.querySelector("#nombre"),
    tipoDocumento: document.querySelector("#tipoDocumento"),
    numeroDocumento: document.querySelector("#numeroDocumento"),
    edad: document.querySelector("#edad"),
    peso: document.querySelector("#peso"),
    altura: document.querySelector("#altura"),
    actividad: document.querySelector("#actividad"),
    genero: document.querySelector('input[name="genero"]:checked'),
  };
  return campos;
}

function capturarDatos(campos) {
  const datos = {
    nombre: campos.nombre.value,
    tipoDocumento: campos.tipoDocumento.value,
    numeroDocumento: campos.numeroDocumento.value,
    edad: campos.edad.value,
    peso: campos.peso.value,
    altura: campos.altura.value,
    actividad: campos.actividad.value,
    genero: campos.genero.id,
  };
  return datos;
}

function validarCampos(datos) {
  if (
    !datos.edad ||
    !datos.peso ||
    !datos.altura ||
    !datos.nombre ||
    !datos.numeroDocumento ||
    !datos.tipoDocumento
  ) {
    return false;
  }
  return true;
}
function calcularCalorias(datos) {
  const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
  };
  let calculoCalorias =
    datos.actividad *
      (multiplicadorTMB.peso * datos.peso +
        multiplicadorTMB.altura * datos.altura -
        multiplicadorTMB.edad * datos.edad) +
    (datos.genero === "masculino" ? 5 : -161);

  return calculoCalorias;
}
function grupoPoblacional(datos) {
  if (datos.edad >= 15 && datos.edad <= 29) return "Joven";
  if (datos.edad >= 30 && datos.edad <= 59) return "Adultos";
  return "Adultos mayores";
}

function mostrarResultado(datos, calculoCalorias) {
  const grupo = grupoPoblacional(datos);
  resultado.innerHTML = `<div id="calculo" class="d-flex flex-column justify-content-center align-items-center h-100">
  <div class="card text-bg-dark mb-3">
    <div class="card-body text-center">
      <div><h5 class="card-title pb-4 pt-2">RESULTADOS</h5></div>
      <p class="card-text pb-2">El paciente <strong>${datos.nombre}
      </strong> identificado con ${datos.tipoDocumento} 
      N°. ${datos.numeroDocumento}, requiere un total de 
      ${Math.floor(calculoCalorias)} kcal para el 
      sostenimiento de su TBM.</p>
      <div><p>El paciente pertenece al grupo poblacional: <strong>${grupo}</strong></p></div>
    </div>
  </div>
  </div>`;
  aparecerResultado();
  formularioCalculadora.reset();
}
function mostrarMensajeDeError(msg) {
  aparecerResultado();
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
