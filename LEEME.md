# Las Delicias de Sara — versión editable

## Estructura

- index.html: estructura de la página.
- estilos.css: diseño, colores y adaptación a iPad mini.
- app.js: comandas, selección, doble toque, ticket y TPV con pitido.
- productos.js: los 51 artículos y sus precios en céntimos.
- imagenes/productos-sprites.jpg: mapa regular de 7 columnas y 8 filas.
- imagenes/logo-sara.jpg: logo.
- imagenes/carta-qr.jpg: QR de la carta digital.
- imagenes/favicon-32.png y imagenes/apple-touch-icon.png (180×180): icono de la pestaña y de la pantalla de inicio del iPad, recortados de la cabeza del logo.

Todos los archivos de código están sin minificar. No hay imágenes en Base64, bibliotecas externas, herramientas de compilación ni dependencias.

## Uso

Descomprime el ZIP manteniendo la estructura. No abras index.html dentro del ZIP.
Para alojarla en una web, publica todo el contenido de esta carpeta, no solo el HTML.
Para probarla en un ordenador puedes abrir index.html en un navegador compatible. Si el visor de archivos del iPad no ejecuta JavaScript, usa la web servida mediante HTTP en Safari.

## Edición

- Colores: variables de :root en estilos.css.
- Artículos y precios: productos.js. priceCents usa enteros (515 = 5,15 €).
- Cada artículo tiene un ID único y spriteIndex fijo, independiente del orden del catálogo.
- El atlas tiene 56 posiciones, numeradas de 0 a 55. Las posiciones 51 a 55 están libres.
- Al añadir un artículo, asigna una posición libre y coloca su imagen en esa celda sin desplazar las demás.

## Controles

Un toque suma una unidad. Dos toques rápidos (menos de 300 ms) eliminan el artículo completo. Los botones + y − de la comanda ajustan cantidades. Cobrar abre el ticket; Pagar con TPV inicia la simulación contactless.

El pago es una simulación local y no solicita información bancaria. El sonido se genera con Web Audio. La comanda se reinicia al recargar la página. El destino del QR puede necesitar internet.
