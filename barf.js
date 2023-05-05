// Resize Lines
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

// Selectores
const $html = document.querySelector('#html');
const $css = document.querySelector('#css');
const $js = document.querySelector('#js');


// Functions
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
  <html lang="en">
  <head>
  <style>
  ${css}
  </style>
  </head>
  <body>
  ${html}
  <script>
  ${js}
  </script>
  </body>
  </html>
  `
}

function showWeb() {
  const web = createWeb();
  const iframe = document.querySelector('iframe');

  iframe.setAttribute('srcdoc', web);
}

function createZip() {
  let zip = new JSZip();

  // Agrega un archivo de texto 

  zip.file("index.html", $html.value);
  zip.file("style.css", $css.value);
  zip.file("main.js", $js.value);

  // Genera el archivo zip de forma asíncrona

  zip.generateAsync({type:"blob"})

  .then(function(content) {

      // Descargar el archivo Zip

      saveAs(content, "yourProject.zip");

  });
}

//Aqui empieza la magia
if (!localStorage.getItem('html')) resetWeb();
$css.value = localStorage.getItem('css');
$html.value = localStorage.getItem('html');
$js.value = localStorage.getItem('js');
showWeb();


// HTML inicial al pulsar en HTML Board
$html.addEventListener('click', () => {
  if($html.value == '') {
    $html.value = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Redflexión Consultores Mola</h1>
</body>
</html>
    `
  }
  showWeb();
})

// Cuando se escribe, se actualiza el iframe pasandole la web creada
document.addEventListener('keyup', (e) => {
  if (e.key == 'F4') {
    createZip();
    return
  }
  showWeb();
});

//Borramos todo el código pulsando ESC
document.addEventListener('keyup', (e) => {
  if (e.key == 'Escape') {
    resetWeb();
    $css.value = localStorage.getItem('css');
    $html.value = localStorage.getItem('html');
    $js.value = localStorage.getItem('js');
    showWeb();
    return
  }
  
  
});
