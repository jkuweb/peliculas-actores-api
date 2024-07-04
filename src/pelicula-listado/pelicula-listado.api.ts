import Axios from "axios";
import { Movie } from "./pelicula-listado.model"


export const obtenerPeliculas = async (): Promise<Movie[]> => {
  try {
    const { data } = await Axios.get("http://localhost:3000/movies")
    return data
  } catch (error) {
    throw new Error("error al obtener las peliculas")
  }
}

export const borrarPelicula = async (id: string): Promise<void> => {
  try {
    await Axios.delete(`http://localhost:3000/movies/${id}`)
  } catch (error) {
    throw new Error("Error al borrar la pelicula")
  }

}