import { crearElementoBoton } from "./crear-elemento-boton"

// type GrupoBotones = {
//   id: string,
//   editar: () => void,
//   borrar: () => void
// }

export const crearGrupoBotones = (id, editar, borrar): HTMLDivElement => {
  // const { id, editar, borrar } = infoBotones
  const grupoBotones = document.createElement("div")
  grupoBotones.classList.add("grupo-botones")

  const botonEditar = crearElementoBoton({
    texto: "editar",
    id: id,
    nombreClase: "boton-editar",
    onClick: editar
  })
  const botonBorrar = crearElementoBoton({
    texto: "borrar",
    id: id,
    nombreClase: "boton-borrar",
    onClick: borrar
  })
  grupoBotones.appendChild(botonEditar)
  grupoBotones.appendChild(botonBorrar)

  return grupoBotones
}