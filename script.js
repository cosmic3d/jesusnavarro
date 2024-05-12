function obtenerNivelZoom() {
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  
  // Calcular el nivel de zoom
  var zoomLevel = windowWidth / documentWidth;
  
  return zoomLevel;
}

var mainSwiper = null;
document.addEventListener('DOMContentLoaded', function() {
  const bg = document.getElementById('bg');
  let obj_X = 0;
  let obj_Y = 0;
  let bgPosX = 0;
  let bgPosY = 0;
  let  bgPosXMax = 20;
    let  bgPosYMax = 20;

  // Evento para el movimiento del mouse
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth; // Normaliza la posición X del ratón
    const mouseY = e.clientY / window.innerHeight; // Normaliza la posición Y del ratón

    // Calcula el desplazamiento del fondo en base a la posición del ratón
    obj_X = (mouseX - 0.5) * 50;
    obj_Y = (mouseY - 0.5) * 50;
  });
  setInterval(function() {
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
  window.addEventListener('mouseout', function() {
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

// Selecciona todos los elementos con la clase 'github-button'
const github_buttons = document.querySelectorAll('.github-button'); //PUEDE QUE EN EL FUTURO DEJE DE FUNCIONAR AL CAMBIAR EL IDIOMA

// Añade un manejador de eventos a cada botón
github_buttons.forEach(github_button => {
    github_button.addEventListener('click', function() {
        // Abre la URL del atributo 'href' en una nueva ventana
        const href = github_button.getAttribute('href');
        if (href) {
            window.open(href, '_blank');
        } else {
            console.error('No se encontró el atributo href');
        }
    });
});



var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  speed: 500,
  parallax: false,
  grabCursor: true,
  breakpoints: {
    // when window width is >= 1024px
    1024: {
      slidesPerView: 2,
      // parallax: false
    }
  },
  //     freeMode: {
  //     freeMode: {
  //   enabled: true,
  //   sticky: false,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true
});

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

setContentSizeToImgSize(); // Llamar a la función para que se ejecute al cargar la página
changeLanguage(initialLanguage); // Llamamos a la función para que se ejecute al cargar la página

});

let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let mode = darkMode ? 'dark' : 'light';
  console.log(mode);

  // Evento para cambiar el tema de color
  function changeTheme() {
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


function go_to(section) {
  mainSwiper.slideTo(section, 500, true);
}


// Obtener referencias a los elementos
const pfp = document.getElementById('pfp');
const alterego = document.querySelectorAll('.alterego');
const normalego = document.querySelectorAll('.normalego');
const textos = ["cosmic3d", "Jesús Navarro", "Ajedrecista \u2659 y amante de los gatos \uD83D\uDC08", "Software Developer Junior C/C++ | Game Developer"]
let i = [0,0,0,0];
let timeouts = [];
const totalTime = 1500;

normalego.forEach((element) => {
  element.innerHTML = '';
  element.style.display = 'block';
  mostrarTexto(element, textos[parseInt(element.id)], parseInt(element.id));
  
});

// Función para mostrar texto letra por letra
function mostrarTexto(elemento, texto, index) {
  elemento.innerHTML += texto[i[index]];
  i[index]++;
  if (i[index] < texto.length) {
    const timeoutId = setTimeout(function() {
      mostrarTexto(elemento, texto, index);
    }, (totalTime/texto.length) / (Math.random() + 1.2));
    timeouts.push(timeoutId);
  }
}

// Agregar un evento 'mouseenter' al elemento #pfp
pfp.addEventListener('mouseenter', function() {
  
  mostrarAlterego();
  // clearInterval(intervalo);
});

function mostrarAlterego() {
  i = [0,0,0,0];
  timeouts.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  timeouts = [];
  alterego.forEach((element) => {
    element.innerHTML = '';
    element.style.display = 'block';
    mostrarTexto(element, textos[parseInt(element.id)], parseInt(element.id));
  });
  normalego.forEach((element) => {
    element.style.display = 'none';

  });
}
// Agregar un evento 'mouseover' al elemento #pfp
pfp.addEventListener('mouseleave', function() {
  
  mostrarNormalego();
});

function mostrarNormalego() {
  i = [0,0,0,0];
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
    mostrarTexto(element, textos[parseInt(element.id)], parseInt(element.id));
    
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
window.addEventListener('resize', function() {
  setContentSizeToImgSize();
});

function setContentSizeToImgSize() {
  let slides = document.getElementsByClassName("slide-content");
  for (let i = 0; i < slides.length; i++) {
    let info = slides[i].querySelector(".slide-content-info"); // Obtener el primer hijo con clase "slide-content-info"
    let img = slides[i].querySelector(".slide-content-img"); // Obtener el último hijo con clase "slide-content-img"
    info.style.width = img.offsetWidth + 'px'; // Usar offsetWidth para obtener el ancho real del elemento
  }
}




// Utilizamos jsons para cambiar entre lenguajes con un evento ee change en el select
const idiomas = {
  "es": "languages/espanol.json",
  "en": "languages/english.json"
};

document.getElementById('idiomas').addEventListener('change', function() {
  const idioma = this.value;
  changeLanguage(idioma);
});

function changeLanguage(idioma) {
  fetch(idiomas[idioma])
    .then(response => response.json())
    .then(data => {
      //INICIO
      textos[2] = data.yo;
      textos[3] = data.trabajo;
      mostrarNormalego();
      document.getElementById('proyectosTitle').innerText = data.proyectosTitle;
      document.getElementById('contactoTitle').innerText = data.contacto;
      //LENGUAJES
      document.getElementById('es').innerText = data.es;
      document.getElementById('en').innerText = data.en;
      document.getElementById('ca').innerText = data.ca;
      document.getElementById('de').innerText = data.de;
    });
}

let initialLanguage = navigator.language.split('-')[0]; // Obtenemos el idioma del navegador
document.getElementById(initialLanguage).selected = true;


//Seleccionamos el id initialLanguage y lo hacemos selected en el select


// Autoresize textarea
const textArea = document.getElementById('message');

textArea.addEventListener('input', autoResize, false);

function autoResize() {
  this.style.height = 'auto';
  if (this.scrollHeight < 300) {  // Comprueba si la altura del contenido es menor que el máximo
    this.style.height = this.scrollHeight + 'px';
  } else {
    this.style.height = '300px';  // Si excede el máximo, establece la altura en 300px
  }
}



//Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

  var formData = new FormData(this); // Recoge los datos del formulario

  var xhr = new XMLHttpRequest(); // Crea una nueva instancia de XMLHttpRequest
  xhr.open('POST', this.action, true); // Inicializa la petición como POST al archivo server.php

  xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
          // Maneja la respuesta exitosa
          document.getElementById('formulario').style.display = 'none'; // Oculta el formulario
          var responseMessage = document.getElementById('responseMessage');
          responseMessage.style.display = 'block'; // Muestra el mensaje de respuesta
          responseMessage.textContent = 'Thank you for your message! We will get back to you soon.'; // Mensaje de éxito
      } else {
          // Maneja la respuesta fallida
          document.getElementById('formulario').style.display = 'none'; // Oculta el formulario
          var responseMessage = document.getElementById('responseMessage');
          responseMessage.style.display = 'block'; // Muestra el mensaje de respuesta
          responseMessage.textContent = 'Oops! Something went wrong. Please try again later.'; // Mensaje de error
      }
  };

  xhr.onerror = function() {
      // Maneja los errores de conexión
      document.getElementById('formulario').style.display = 'none';
      var responseMessage = document.getElementById('responseMessage');
      responseMessage.style.display = 'block';
      responseMessage.textContent = 'Error connecting to the server. Please try again later.';
  };

  xhr.send(formData); // Envía los datos del formulario
});
