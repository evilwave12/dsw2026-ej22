document.addEventListener('DOMContentLoaded', () => {
  const crearEspecialidadesBtn = document.getElementById('btn-especialidad');

  crearEspecialidadesBtn.addEventListener('click', () => {
    window.location.href = 'crear_especialidades.html';
  });
});


const key = "especialidadesClave";
const itemsPorPagina = 3;
let paginaActual = 1;

const arrayEspecialidades = [
  {
    id: 1,
    nombre: "Cardiología",
    descripcion:
      "Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.",
    estado: "Active",
  },
  {
    id: 2,
    nombre: "Neurología",
    descripcion:
      "Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales.",
    estado: "Active",
  },
  {
    id: 3,
    nombre: "Dermatología",
    descripcion:
      "Atención integral de enfermedades de la piel, uñas y cabello.",
    estado: "Inactive",
  },
  {
    id: 4,
    nombre: "Pediatría",
    descripcion: "Cuidado médico de lactantes, niños y adolescentes.",
    estado: "Active",
  },
  {
    id: 5,
    nombre: "Traumatología",
    descripcion:
      "Prevención, diagnóstico y tratamiento de lesiones del aparato locomotor.",
    estado: "Active",
  },
  {
    id: 6,
    nombre: "Oftalmología",
    descripcion:
      "Diagnóstico y tratamiento de enfermedades y trastornos oculares.",
    estado: "Active",
  },
  {
    id: 7,
    nombre: "Ginecología",
    descripcion:
      "Atención médica integral de la salud del sistema reproductor femenino.",
    estado: "Inactive",
  },
  {
    id: 8,
    nombre: "Psiquiatría",
    descripcion:
      "Diagnóstico, prevención y tratamiento de trastornos mentales y conductuales.",
    estado: "Active",
  },
  {
    id: 9,
    nombre: "Urología",
    descripcion:
      "Tratamiento de patologías del sistema urinario y aparato reproductor masculino.",
    estado: "Active",
  },
  {
    id: 10,
    nombre: "Endocrinología",
    descripcion:
      "Manejo del sistema endocrino, hormonas y trastornos metabólicos.",
    estado: "Active",
  },
];

const cuerpoTabla = document.getElementById("table-cuerpo");
const contadorPaginas = document.getElementById("contador-paginas");
const textoResumen = document.querySelector(".texto-table-footer");
const btnPrev = document.querySelector(".flecha-izq");
const btnNext = document.querySelector(".flecha-der");

// Iconos de acciones (Editar y Eliminar)
const iconoEditarSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="pencil lucide lucide-pencil preview-icon">
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 
        .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
    </svg>
                  
`;

const iconoEliminarSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="trash lucide lucide-trash preview-icon">
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
`;

// LocalStorage arranca aca bo'

function inicializarStorage() {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(arrayEspecialidades));
  }
  //inicializa el storage, si no hay nada previamente en localStorage esto lo llena con el array, eso de stringify
  // es una funcion que serializa y vuelve json el array,
  // asi lo podemos trabajar mas comodos, con las funciones nativas de array :p
}

function obtenerEspecialidades() {
  const data = localStorage.getItem(key);
  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

function renderizar() {
  const lista = obtenerEspecialidades();
  const totalPaginas = Math.ceil(lista.length / itemsPorPagina) || 1;

  // delimitacion de pagina, es decir, calcula posicion de la lista para empezar a leer
  const inicio = (paginaActual - 1) * itemsPorPagina;

  //esto toma elementos de la pagina en la que te paras, ignoras el resto y chau manjar
  const itemsVisibles = lista.slice(inicio, inicio + itemsPorPagina);

  cuerpoTabla.innerHTML = "";

  itemsVisibles.forEach((esp) => {
    //esp es cada especialidad del ciclo forEach
    const tr = document.createElement("tr");
    //columnas
    // nombre
    const tdNombre = document.createElement("td");
    const spanNombre = document.createElement("span");
    spanNombre.textContent = esp.nombre;
    tdNombre.appendChild(spanNombre);

    // descripcion
    const tdDesc = document.createElement("td");
    tdDesc.textContent = esp.descripcion;

    // estado
    const tdEstado = document.createElement("td");
    const spanEstado = document.createElement("span");

    // si es "Active" usa clase verde, si no, usa la roja
    if (esp.estado === "Active") {
      spanEstado.className = "disponibilidad-table";
    } else {
      spanEstado.className = "disponibilidad-table-inactivo";
    }
    spanEstado.textContent = esp.estado;
    tdEstado.appendChild(spanEstado);

    //acciones
    const tdAcciones = document.createElement("td");
    const divAcciones = document.createElement("div");
    divAcciones.className = "acciones";

    const btnEditar = document.createElement("span");
    btnEditar.innerHTML = iconoEditarSVG;
    btnEditar.addEventListener("click", () => editarEspecialidad(esp.nombre));

    const btnEliminar = document.createElement("span");
    btnEliminar.innerHTML = iconoEliminarSVG;
    btnEliminar.addEventListener("click", () =>
      eliminarEspecialidad(esp.nombre),
    );

    divAcciones.appendChild(btnEditar);
    divAcciones.appendChild(btnEliminar);
    tdAcciones.appendChild(divAcciones);

    // unimos las celdas en una sola fila
    tr.appendChild(tdNombre);
    tr.appendChild(tdDesc);
    tr.appendChild(tdEstado);
    tr.appendChild(tdAcciones);

    cuerpoTabla.appendChild(tr);
  });

  // Actualizar controles de paginación
  renderizarPaginacion(lista.length, totalPaginas, itemsVisibles.length);
}

function renderizarPaginacion(totalItems, totalPaginas, cantidadVisibles) {
  textoResumen.textContent = `Mostrando ${cantidadVisibles} de ${totalItems} especialidades registradas`;

  contadorPaginas.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    if (i === paginaActual) {
      btn.className = "btn-num activo";
    } else {
      btn.className = "btn-num";
    }

    btn.textContent = i;
    btn.addEventListener("click", () => {
      paginaActual = i;
      renderizar();
    });
    contadorPaginas.appendChild(btn);
  }

  if (paginaActual === 1) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }

  if (paginaActual === totalPaginas) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

function editarEspecialidad(nombre) {
  alert(`Editar especialidad: ${nombre}`);
}

function eliminarEspecialidad(nombre) {
  alert(`Eliminar especialidad: ${nombre}`);
}

btnPrev.addEventListener("click", () => {
  if (paginaActual > 1) {
    paginaActual--;
    renderizar();
  }
});

btnNext.addEventListener("click", () => {
  const lista = obtenerEspecialidades();
  let totalPaginas = Math.ceil(lista.length / itemsPorPagina);
  if (totalPaginas === 0) {
    totalPaginas = 1;
  }

  if (paginaActual < totalPaginas) {
    paginaActual++;
    renderizar();
  }
});

inicializarStorage();
renderizar();
