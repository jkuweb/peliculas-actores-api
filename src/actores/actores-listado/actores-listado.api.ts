import axios from "axios";
import { Actor } from "./actores-listado.model";

export const obtenerActores = async (): Promise<Actor[]> => {
  try {
    const actores = await axios.get("http://localhost:3000/actors")
    return actores.data;
  } catch (error) {
    throw new Error("Error al obtener los datos de actores")
  }
}