import { crearElementoImagen } from "../../helpers/crear-elemento-imagen"
import { crearElementoParrafo } from "../../helpers/crear-elemento-parrafo"
import { crearGrupoBotones } from "../../helpers/crear-grupo-botones"
import { obtenerActores } from "./actores-listado.api"
import { Actor } from "./actores-listado.model"

const editaActor = (id: string) => {
  console.log("editar")
}

const borraActor = (id: string) => {
  console.log("borrar")
}

const crearContenedorActores = (actor: Actor): HTMLDivElement => {
  const id = actor.id;
  console.log(actor)
  const elementoActor = document.createElement("div");
  elementoActor.classList.add("container")
  const imagen = crearElementoImagen(actor.image, actor.name)
  elementoActor.appendChild(imagen)
  const nombre = crearElementoParrafo(actor.name)
  elementoActor.appendChild(nombre)
  const biografia = crearElementoParrafo(actor.bio)
  elementoActor.appendChild(biografia)
  const grupoBotones = crearGrupoBotones(id, editaActor, borraActor)
  elementoActor.appendChild(grupoBotones)
  return elementoActor
}

export const pintarActores = async () => {
  const actores = await obtenerActores()
  const listado = document.querySelector("#listado-actores");
  if (listado && listado instanceof HTMLDivElement) {
    actores.forEach(actor => {
      const contenedorActores = crearContenedorActores(actor)
      listado.appendChild(contenedorActores)
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado")
  }
}

document.addEventListener("DOMContentLoaded", pintarActores)