function obtenerNivelZoom() {
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;

  // Calcular el nivel de zoom
  var zoomLevel = windowWidth / documentWidth;

  return zoomLevel;
}

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

  // Evento para cambiar el tema de color
  document.getElementById('color-theme-btn').addEventListener('change', function() {
    let root = document.documentElement;

    if (this.checked) {
      // Set the variables for the light theme
      root.style.setProperty('--color-text', '#000000');
      root.style.setProperty('--color-bg', '#ffffff');
      root.style.setProperty('--color-invert', 'invert(0)');
      root.style.setProperty('--color-invert-hover', 'invert(1)');
      // bg.style.backgroundImage = "url('img/cosmic_bg3.jpg')";
    } else {
      
      // Set the variables for the dark theme
      
      root.style.setProperty('--color-text', '#ffffff');
      root.style.setProperty('--color-bg', '#000000');
      root.style.setProperty('--color-invert', 'invert(1)');
      root.style.setProperty('--color-invert-hover', 'invert(0)');
      // bg.style.backgroundImage = "url('img/cosmic_bg.jpg')";

    }
  });


  


  window.addEventListener('wheel', function(event) {
    event.preventDefault();
    if (!canScroll || ctrlKeyDown) return;
    if (event.deltaY > 0) {
      canScroll = false;
      currentSection = currentSection == sections.length - 1 ? sections.length - 1 : currentSection + 1;
      scrollToSection(sections[currentSection]);
      this.setTimeout(() => {
        canScroll = true;
      }
      , 325);
        
    } else {
      canScroll = false;
      currentSection = currentSection == 0 ? 0 : currentSection - 1;
      scrollToSection(sections[currentSection]);
      this.setTimeout(() => {
        canScroll = true;
      }
      , 325);
    }
}, { passive: false });

window.addEventListener('touchmove', function(event) {
  if (!canScroll) return;
  const deltaY = event.touches[0].clientY - startY;
  startY = event.touches[0].clientY;
event.preventDefault();
  if (deltaY < -8) {
    canScroll = false;
    currentSection = currentSection == sections.length - 1 ? sections.length - 1 : currentSection + 1;
    scrollToSection(sections[currentSection]);
    this.setTimeout(() => {
      canScroll = true;
    }
    , 325);
      
  } else if (deltaY > 8){
    canScroll = false;
    currentSection = currentSection == 0 ? 0 : currentSection - 1;
    scrollToSection(sections[currentSection]);
    this.setTimeout(() => {
      canScroll = true;
    }
    , 325);
  }
}, { passive: false });
//Function to change the currentSection variable

});

let startY = 0;
let currentSection = 0;
let canScroll = true;
let sections = ['', 'proyectos', 'contacto'];

// Función para scrollear a la sección x
function scrollToSection(section) {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

function go_to(section) {
  currentSection = section;
  scrollToSection(sections[currentSection]);
}

document.addEventListener('touchstart', function(e) {
  startY = e.touches[0].clientY; // Almacena la posición inicial del toque en la pantalla
});


// Obtener referencias a los elementos
const pfp = document.getElementById('pfp');
const alterego = document.querySelectorAll('.alterego');
const normalego = document.querySelectorAll('.normalego');
const textos = ["cosmic3d", "Jesús Navarro", "Ajedrecista y amante de los gatos", "Software Developer Junior C/C++ | Game Developer"]
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
  // clearInterval(intervalo);
});
// Agregar un evento 'mouseover' al elemento #pfp
pfp.addEventListener('mouseleave', function() {
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
});

let ctrlKeyDown = false;

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey) {
    ctrlKeyDown = true;
    console.log(e.code);
    if (e.code === "BracketRight" ||
        e.code === "NumpadAdd" ||
        e.code === "Slash" ||
        e.code === "NumpadSubtract") {
      e.preventDefault();
      console.log("Prevented zoom");
    }
    return false;
  }
});

document.addEventListener("keyup", function (e) {
  console.log(e.code);
  if (e.ctrlKey || e.code === "ControlLeft" || e.code === "ControlRight") {
    ctrlKeyDown = false;
    console.log("Ctrl key up");
  }
});

/* SWIPER */
/* var swiper = new Swiper(".mySwiper", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
}); */