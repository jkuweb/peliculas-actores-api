import axios from "axios";
import { Movie } from "./pelicula-editar.model";


export const obtenerPelicula = async (id: string): Promise<Movie> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/movies/${id}`)
    return data
  } catch (error) {
    throw new Error("Se ha producido un error a la hora de editar la pelicula")
  }
}

export const actualizarPelicula = async (pelicula: Movie): Promise<void> => {
  console.log(pelicula)
  try {
    await axios.put(`http://localhost:3000/movies/${pelicula.id}`, pelicula)
  } catch (error) {
    throw new Error("Error al actualizar la película")
  }
}

