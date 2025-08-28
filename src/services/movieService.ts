import axios from "axios";
import type { TMDBSearchResponse } from "../types/movie";

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
  const res = await API.get("/search/movie", {
    params: { query, page },
    signal,
  });
  return res.data as TMDBSearchResponse;
}
