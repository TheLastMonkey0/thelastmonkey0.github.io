/* Resize con Split-grid (librería) */
Split({
	columnGutters: [{
    track: 1,
    element: document.querySelector('.vertical-gutter'),
  }],
  rowGutters: [{
  	track: 1,
    element: document.querySelector('.horizontal-gutter'),
  }]
})

/* Selectores */
const $html = document.querySelector('#html');
const $css = document.querySelector('#css');
const $js = document.querySelector('#js');


/* Funciones */
// Resetear web a valores iniciales
function resetWeb() {
  localStorage.setItem('css', '');
  localStorage.setItem('js', '');
  localStorage.setItem('html', '');
}


// Creamos la web para previsulaizarla en el iframe
function createWeb () {
  const css = $css.value
  const html = $html.value
  const js = $js.value

  localStorage.setItem('css', css);
  localStorage.setItem('js', js);
  localStorage.setItem('html', html);

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
  <style>
  ${css}
  </style>
  </head>
  <body>
  ${html}
  <script type="module">
  ${js}
  </script>
  </body>
  </html>
  `
}

// Mostramos la web creada en el iframe
function showWeb() {
  const web = createWeb();
  const iframe = document.querySelector('iframe');

  iframe.setAttribute('srcdoc', web);
}

// Crea y descarga el proyecto en un .zip
function createZip() {
  let zip = new JSZip();

  // Agrega los tres archivos con el código del usuario
  zip.file("index.html", $html.value);
  zip.file("style.css", $css.value);
  zip.file("main.js", $js.value);

  // Genera el archivo zip 
  zip.generateAsync({type:"blob"})

  .then(function(content) {

      // Descarga el archivo Zip
      saveAs(content, "yourProject.zip");

  });
}

/* Código principal */
// if (!localStorage.getItem('html')) resetWeb();
$css.value = localStorage.getItem('css');
$html.value = localStorage.getItem('html');
$js.value = localStorage.getItem('js');
showWeb();


// HTML inicial al pulsar en HTML Board
$html.addEventListener('click', () => {
  if($html.value == '') {
    $html.value = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Pruebe aquí su código</h1>
</body>
</html>
    `
  }
  showWeb();
})

// Actualizamos la web al hacer click en cualquier parte (solución al picker color)
document.addEventListener('click', () => {

  setTimeout(showWeb, 100);
})

// Cuando se pulsa una tecla...
document.addEventListener('keyup', (e) => {

  // Pulsando F4 se descarga el proyecto
  if (e.key == 'F4') {
    createZip();
  }

  // Borramos todo el código pulsando ESC
  if (e.key == 'Escape') {

    let conf = confirm("¿Estas seguro de borrar todo tu código?");
    
    if (conf) {
      resetWeb();
      $css.value = localStorage.getItem('css');
      $html.value = localStorage.getItem('html');
      $js.value = localStorage.getItem('js');
    }
  }
  // Se actualiza el iframe pasandole la web creada
  showWeb();
});



