export const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p")
  parrafo.textContent = texto
  return parrafo;
}