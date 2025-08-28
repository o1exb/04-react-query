import { useState, useRef, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  async function handleSearch(query: string) {
    setMovies([]);
    setError(false);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      const list = await fetchMovies(query, controller.signal);
      if (list.length === 0) toast("No movies found for your request.");
      setMovies(list);
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "name" in e &&
        (e as { name?: string }).name === "CanceledError"
      ) {
        return;
      }
      if (
        typeof e === "object" &&
        e !== null &&
        "name" in e &&
        (e as { name?: string }).name === "AbortError"
      ) {
        return;
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => () => abortRef.current?.abort(), []);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelected} />
      )}
      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
      <Toaster position="top-right" />
    </>
  );
}
