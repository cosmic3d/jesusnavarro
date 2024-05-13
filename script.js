function obtenerNivelZoom () {
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;

  // Calcular el nivel de zoom
  var zoomLevel = windowWidth / documentWidth;

  return zoomLevel;
}



var mainSwiper = null;
//Language
let initialLanguage = navigator.language.split('-')[0]; // Obtenemos el idioma del navegador
loadProjects(initialLanguage); // Cargamos los proyectos en el idioma del navegador
changeLanguage(initialLanguage); // Cambiamos el idioma de la página al idioma del navegador

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById(initialLanguage).selected = true; // Seleccionamos el idioma del navegador en el select



  const bg = document.getElementById('bg');
  let obj_X = 0;
  let obj_Y = 0;
  let bgPosX = 0;
  let bgPosY = 0;
  let bgPosXMax = 20;
  let bgPosYMax = 20;

  // Evento para el movimiento del mouse
  document.addEventListener('mousemove', function (e) {
    const mouseX = e.clientX / window.innerWidth; // Normaliza la posición X del ratón
    const mouseY = e.clientY / window.innerHeight; // Normaliza la posición Y del ratón

    // Calcula el desplazamiento del fondo en base a la posición del ratón
    obj_X = (mouseX - 0.5) * 50;
    obj_Y = (mouseY - 0.5) * 50;
  });
  setInterval(function () {
    const velocidad = 0.1;
    const limit = 10;
    let bgXMove = 0;
    let bgYMove = 0;
    // Suaviza el desplazamiento del fondo
    bgXMove = (obj_X - bgPosX) * velocidad;
    bgYMove = (obj_Y - bgPosY) * velocidad;
    if (bgXMove > limit) {
      bgXMove = limit;
    }
    if (bgXMove < -limit) {
      bgXMove = -limit;
    }
    if (bgYMove > limit) {
      bgYMove = limit;
    }
    if (bgYMove < -limit) {
      bgYMove = -limit;
    }
    bgPosX += bgXMove;
    bgPosY += bgYMove;
    // Hacemos que el máximo desplazamiento cambie según el nivel de zoom
    bgPosXMax = 28 / window.devicePixelRatio;
    bgPosYMax = 28 / window.devicePixelRatio;
    //Limitamos el desplazamiento del fondo
    bgPosX = Math.min(bgPosXMax, Math.max(-bgPosXMax, bgPosX));
    bgPosY = Math.min(bgPosYMax, Math.max(-bgPosYMax, bgPosY));

    // Aplica el desplazamiento al fondo
    bg.style.transform = `translate(${bgPosX}px, ${bgPosY}px)`;
  }, 10);
  window.addEventListener('mouseout', function () {
    obj_X = 0;
    obj_Y = 0;
  });






  // Scroll especial
  //   window.addEventListener('wheel', function(event) {
  //     event.preventDefault();
  //     if (!canScroll || ctrlKeyDown) return;
  //     if (event.deltaY > 0) {
  //       canScroll = false;
  //       currentSection = currentSection == sections.length - 1 ? sections.length - 1 : currentSection + 1;
  //       scrollToSection(sections[currentSection]);
  //       this.setTimeout(() => {
  //         canScroll = true;
  //       }
  //       , 325);

  //     } else {
  //       canScroll = false;
  //       currentSection = currentSection == 0 ? 0 : currentSection - 1;
  //       scrollToSection(sections[currentSection]);
  //       this.setTimeout(() => {
  //         canScroll = true;
  //       }
  //       , 325);
  //     }
  // }, { passive: false });

  // //Scroll especial para móviles

  // window.addEventListener('touchmove', function(event) {
  //   if (!canScroll) return;
  //   const deltaY = event.touches[0].clientY - startY;
  //   startY = event.touches[0].clientY;
  // event.preventDefault();
  //   if (deltaY < -10) {
  //     canScroll = false;
  //     currentSection = currentSection == sections.length - 1 ? sections.length - 1 : currentSection + 1;
  //     scrollToSection(sections[currentSection]);
  //     this.setTimeout(() => {
  //       canScroll = true;
  //     }
  //     , 325);

  //   } else if (deltaY > 10){
  //     canScroll = false;
  //     currentSection = currentSection == 0 ? 0 : currentSection - 1;
  //     scrollToSection(sections[currentSection]);
  //     this.setTimeout(() => {
  //       canScroll = true;
  //     }
  //     , 325);
  //   }
  // }, { passive: false });



  mainSwiper = new Swiper(".mainSwiper", {
    slidesPerView: 1,
    speed: 450,
    direction: 'vertical',
    simulateTouch: true,
    mousewheel: {
      invert: true, // Opcional: true para invertir el desplazamiento del mouse
      sensitivity: 1, // Opcional: ajusta la sensibilidad del desplazamiento
      releaseOnEdges: false, // Opcional: desactiva el swiper si el mouse alcanza los bordes
    },
    breakpoints: {
      // when window width is >= 1024px
      1024: {
        mousewheel: {
          invert: false, // Opcional: true para invertir el desplazamiento del mouse
          sensitivity: 1, // Opcional: ajusta la sensibilidad del desplazamiento
          releaseOnEdges: false, // Opcional: desactiva el swiper si el mouse alcanza los bordes
        },
        simulateTouch: false,
      }
    },
  });


  // changeLanguage(initialLanguage); // Llamamos a la función para que se ejecute al cargar la página

});

let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let mode = darkMode ? 'dark' : 'light';
console.log(mode);

// Evento para cambiar el tema de color
function changeTheme () {
  let root = document.documentElement;
  mode = mode === 'light' ? 'dark' : 'light';

  console.log(mode);
  if (mode === 'light') {
    // Variables para el tema claro
    root.style.setProperty('--color-text', '#000000');
    root.style.setProperty('--color-text-hover', '#ffffff');
    root.style.setProperty('--color-bg', '#ffffff');
    root.style.setProperty('--color-invert', 'invert(0)');
    root.style.setProperty('--color-invert-hover', 'invert(1)');
    root.style.setProperty('--color-brightness', 'brightness(1.2)');
    // bg.style.backgroundImage = "url('img/cosmic_bg3.jpg')";
  } else {

    // Variables para el tema oscuro

    root.style.setProperty('--color-text', '#ffffff');
    root.style.setProperty('--color-text-hover', '#000000');
    root.style.setProperty('--color-bg', '#000000');
    root.style.setProperty('--color-invert', 'invert(1)');
    root.style.setProperty('--color-invert-hover', 'invert(0)');
    root.style.setProperty('--color-brightness', 'brightness(0.4)');
    // bg.style.backgroundImage = "url('img/cosmic_bg.jpg')";

  }
}

// let startY = 0;
// let currentSection = 0;
// let canScroll = true;
// let sections = ['', 'sobre-mi', 'proyectos', 'contacto'];

// Función para scrollear a la sección x
// function scrollToSection(section) {
//   const element = document.getElementById(section);
//   if (element) {
//     element.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     });
//   } else {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   }
// }

// function go_to(section) {
//   currentSection = section;
//   scrollToSection(sections[currentSection]);
// }

// document.addEventListener('touchstart', function(e) {
//   startY = e.touches[0].clientY; // Almacena la posición inicial del toque en la pantalla
// });


function go_to (section) {
  mainSwiper.slideTo(section, 500, true);
}


// Obtener referencias a los elementos
let pfp = document.getElementById('pfp');
let alterego = document.querySelectorAll('.alterego');
let normalego = document.querySelectorAll('.normalego');
const textos = ["cosmic3d", "Jesús Navarro", "Ajedrecista \u2659 y amante de los gatos \uD83D\uDC08", "Software Developer Junior C/C++ | Game Developer"]
let i = [0, 0, 0, 0];
let timeouts = [];
const totalTime = 1500;

normalego.forEach((element) => {
  element.innerHTML = '';
  element.style.display = 'block';
  mostrarTexto(element, textos[parseInt(element.getAttribute('num'))], parseInt(element.getAttribute('num')));

});

// Función para mostrar texto letra por letra
function mostrarTexto (elemento, texto, index) {
  elemento.innerHTML += texto[i[index]];
  i[index]++;
  if (i[index] < texto.length) {
    const timeoutId = setTimeout(function () {
      mostrarTexto(elemento, texto, index);
    }, (totalTime / texto.length) / (Math.random() + 1.2));
    timeouts.push(timeoutId);
  }
}

// Agregar un evento 'mouseenter' al elemento #pfp
pfp.addEventListener('mouseenter', function () {
  mostrarAlterEgo();
  // clearInterval(intervalo);
});

function mostrarAlterEgo () {
  i = [0, 0, 0, 0];
  timeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  timeouts = [];
  alterego.forEach((element) => {
    element.innerHTML = '';
    element.style.display = 'block';
    mostrarTexto(element, textos[parseInt(element.getAttribute('num'))], parseInt(element.getAttribute('num')));
  });
  normalego.forEach((element) => {
    element.style.display = 'none';

  });
}
// Agregar un evento 'mouseover' al elemento #pfp
pfp.addEventListener('mouseleave', function () {

  mostrarNormalEgo();
});

function mostrarNormalEgo () {
  i = [0, 0, 0, 0];
  timeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  timeouts = [];
  alterego.forEach((element) => {
    element.style.display = 'none';
  });
  normalego.forEach((element) => {
    element.innerHTML = '';
    element.style.display = 'block';
    mostrarTexto(element, textos[parseInt(element.getAttribute('num'))], parseInt(element.getAttribute('num')));

  });
}
let ctrlKeyDown = false;

// Evitamos el zoom en la medida de lo posible porque no me sale de los cojones que hagan zoom

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey) {
    ctrlKeyDown = true;
    if (e.code === "BracketRight" ||
      e.code === "NumpadAdd" ||
      e.code === "Slash" ||
      e.code === "NumpadSubtract") {
      e.preventDefault();
    }
    return false;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.ctrlKey || e.code === "ControlLeft" || e.code === "ControlRight") {
    ctrlKeyDown = false;
  }
});


/* La anchura de slide-content-info será siempre la de slide-content-img siempre que se haga resize */
window.addEventListener('resize', function () {
  setContentSizeToImgSize();
});

function setContentSizeToImgSize () {
  let slides = document.getElementsByClassName("slide-content");
  for (let i = 0; i < slides.length; i++) {
    let info = slides[i].querySelector(".slide-content-info"); // Obtener el primer hijo con clase "slide-content-info"
    let img = slides[i].querySelector(".slide-content-img"); // Obtener el último hijo con clase "slide-content-img"
    info.style.width = img.offsetWidth + 'px'; // Usar offsetWidth para obtener el ancho real del elemento
  }
}




// Utilizamos jsons para cambiar entre lenguajes con un evento ee change en el select
const idiomas = {
  "es": "languages/es.json",
  "en": "languages/en.json",
  "ca": "languages/ca.json",
  "de": "languages/de.json",
};

document.getElementById('idiomas').addEventListener('change', function () {
  const idioma = this.value;
  changeLanguage(idioma);
});

function loadProjects (language, callback) {
  fetch(`languages/${language}.json`)
    .then(response => response.json())
    .then(data => {
      renderProjects(data.projects);
      if (callback) callback(); // Inicializa Swiper después de renderizar los proyectos
    });
}


function renderProjects (projects) {
  const container = document.querySelectorAll('.swiper-wrapper')[1];
  container.innerHTML = '';  // Limpia los proyectos actuales
  projects.forEach(project => {
    let github_button = '';
    if (project.gb_custom == true) {
      github_button = project.link ? `<ul class="proyect-icons github-button fa-2xl" href="${project.link}" style="background-color: ${project.gb_clr};">
    <li class="github-icon"><i class="${project.gb_icon}"></i></li>
    <li class="github-text"><a class="subtitle">${project.gb_txt}</a></li>
    </ul>` : '';
    }
    else {
      github_button = project.link ? `<ul class="proyect-icons github-button fa-2xl" href="${project.link}">
      <li class="github-icon"><i class="devicon-github-original"></i></li>
      <li class="github-text"><a class="subtitle">code</a></li>
      </ul>` : '';
    }

    const center = project.link ? '' : 'style="display: flex; justify-content: center; align-items: center;"'
    const html = `
      <div class="swiper-slide">
        <div class="slide-content">
          <div class="slide-content-info">
            <h2 class="title">${project.title}</h2>
            <p class="subtitle">${project.subtitle}</p>
            <section ${center}>
            <ul class="proyect-icons fa-xl">
              ${project.icons.map(icon => `<li><i class="${icon.class} abilities" title="${icon.title}"></i></li>`).join('')}
            </ul>
            ${github_button}
            </section>
          </div>
          <img src="${project.image}" alt="${project.title}" class="slide-content-img">
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
}

function changeLanguage (language) {
  fetch(`languages/${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Actualiza texto e imágenes de los proyectos
      renderProjects(data.projects);
      // Actualiza todos los elementos basados en su id y la correspondencia en el JSON
      Object.keys(data).forEach(key => {
        const element = document.getElementById(key);
        if (element && key !== 'projects') {
          element.innerText = data[key];
        }
      });
      textos[2] = data.bioAlterEgo;
      textos[3] = data.bioNormal;
      mostrarNormalEgo();
    });
}

function initSwiperProjects () {
  const swiperContainer = document.querySelector('.mySwiper .swiper-wrapper');
  const slides = swiperContainer.querySelectorAll('.swiper-slide');
  const loopMode = slides.length >= 3; // Asumiendo que el número mínimo para bucle es 4

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    speed: 500,
    parallax: false,
    grabCursor: true,
    freeMode: false,
    loop: loopMode, // Use the variable to enable or disable loop
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 2.25,
        loop: false,
        freeMode: true,
        freeModeMomentum: true, // Disable momentum in free mode
        freeModeMomentumRatio: 20, // Set momentum ratio to 0 in free mode
        // freeModeMomentumBounce: false, // Disable bounce effect in free mode
        // freeModeSticky: false, // Enable sticky behavior in free mode
      }
    }
  });
  setContentSizeToImgSize(); // Llamar a la función para que se ejecute al cargar los proyectos
  // Selecciona todos los elementos con la clase 'github-button'
  const github_buttons = document.querySelectorAll('.github-button'); //PUEDE QUE EN EL FUTURO DEJE DE FUNCIONAR AL CAMBIAR EL IDIOMA

  // Añade un manejador de eventos a cada botón
  github_buttons.forEach(github_button => {
    github_button.addEventListener('click', function () {
      // Abre la URL del atributo 'href' en una nueva ventana
      const href = github_button.getAttribute('href');
      if (href) {
        window.open(href, '_blank');
      } else {
        console.error('No se encontró el atributo href');
      }
    });
  });
}

// Llama a esta función después de cargar y renderizar los proyectos
loadProjects(initialLanguage, initSwiperProjects);










//Seleccionamos el id initialLanguage y lo hacemos selected en el select


// Autoresize textarea
const textArea = document.getElementById('message');

textArea.addEventListener('input', autoResize, false);

function autoResize () {
  this.style.height = 'auto';
  if (this.scrollHeight < 300) {  // Comprueba si la altura del contenido es menor que el máximo
    this.style.height = this.scrollHeight + 'px';
  } else {
    this.style.height = '300px';  // Si excede el máximo, establece la altura en 300px
  }
}
