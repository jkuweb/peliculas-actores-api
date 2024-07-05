export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  cover_url: string;
}

export interface Actor {
  id: string;
  name: string;
  bio: string;
  movies: string[];
  cover_url: string;
}

export interface CrearBotonesParams {
  texto: string
  id: string
  nombreClase: string
  onClick: (id: string) => void
}