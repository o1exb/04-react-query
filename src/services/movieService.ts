import axios from "axios";
import type { Movie } from "../types/movie";

export interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export async function searchMovies(
  query: string,
  page: number,
  signal?: AbortSignal
): Promise<TMDBSearchResponse> {
  const res = await API.get<TMDBSearchResponse>("/search/movie", {
    params: { query, page },
    signal,
  });
  return res.data;
}
