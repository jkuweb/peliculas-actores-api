export const crearElementoImagen = (imgUrl: string, imgAlt?: string): HTMLImageElement => {
  const imagen = document.createElement("img")
  imagen.src = imgUrl
  imagen.alt = imgAlt || ''
  return imagen;
}