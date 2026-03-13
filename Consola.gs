function abreIndexConsola() {
  const template = HtmlService.createTemplateFromFile('IndexConsola');
  
  // Pasamos los datos reales al template
  template.cotizacionesReales = obtenerCotizacionesEnc_ABCD();
  
  const htmlOutput = template.evaluate()
      .setWidth(1000)
      .setHeight(620)
      .setTitle('Consola VRGS');
  
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Consola VRGS');
}

// Función puente necesaria para conectar el HTML con la Biblioteca
function incluirEncabezado() {
  return masterHeaderV1.obtenerEncabezado();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function obtenerCotizacionesEnc_ABCD() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enc");
  if (!hoja) return [];
  
  const ultimaFila = hoja.getLastRow();
  if (ultimaFila < 2) return [];
  
  const valores = hoja.getRange(2, 1, ultimaFila - 1, 26).getValues();

  return valores.map((fila, index) => ({
    numero: index + 1,
    idcot: fila[0] || '',
    timestamp: fila[1] instanceof Date ? fila[1].toLocaleString('es-MX') : '',
    titulo: fila[2] || '',
    idcon: fila[3] || '',
    status: fila[25] || '' // Columna Z

  })).reverse();
}

// Para refrescar desde el HTML
function getDatosActualizados() {
  return obtenerCotizacionesEnc_ABCD();
}
function obtenerCotizacionesEnc_ABCD() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Enc");
  if (!hoja) return [];
  
  const ultimaFila = hoja.getLastRow();
  if (ultimaFila < 2) return [];
  
  // Tomamos columnas A:D desde fila 2 hasta la última
  const valores = hoja.getRange(2, 1, ultimaFila - 1, 4).getValues();
  
  return valores.map((fila, index) => ({
    numero: index + 1,
    idcot: fila[0] || '', // Columna A
    timestamp: fila[1] instanceof Date ? fila[1].toLocaleString('es-MX') : fila[1] || '', // Columna B
    titulo: fila[2] || '', // Columna C
    idcon: fila[3] || '',   // Columna D
    status: fila[25] || '' // Columna Z
  })).reverse();
}
