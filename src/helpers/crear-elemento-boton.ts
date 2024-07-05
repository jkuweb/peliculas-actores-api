
export interface CrearBotonesParams {
  texto: string
  id: string
  nombreClase: string
  onClick: (id: string) => void
}

export const crearElementoBoton = (crearBotonParams: CrearBotonesParams): HTMLButtonElement => {
  const { texto, id, nombreClase, onClick } = crearBotonParams
  const boton = document.createElement("button")
  boton.textContent = texto
  boton.addEventListener('click', () => {
    onClick(id)
  })
  boton.classList.add(nombreClase)
  return boton
}