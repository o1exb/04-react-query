import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function fetchMovies(
  query: string,
  signal?: AbortSignal
): Promise<Movie[]> {
  const response = await axiosInstance.get("/search/movie", {
    params: { query },
    signal,
  });
  return response.data.results;
}

export async function fetchMovieDetails(movieId: number) {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
}
