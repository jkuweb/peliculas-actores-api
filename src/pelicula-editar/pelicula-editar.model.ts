
export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  description: string;
  actors?: string[];
  cover_url: string;
}