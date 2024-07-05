import axios from "axios";
import { Movie } from "./pelicula-crear.model";

export const crearPelicula = async (pelicula: Movie): Promise<Movie> => {
  const response = await axios.post(`http://localhost:3000/movies/`, pelicula)
  return response.data
}