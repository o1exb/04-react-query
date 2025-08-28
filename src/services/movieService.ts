import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  results: Movie[];
}

export async function fetchMovies(
  query: string,
  signal?: AbortSignal
): Promise<Movie[]> {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    signal,
  });

  return response.data.results;
}
