import {useSearchParams} from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import {useEffect, useState} from "react";
import {searchMovies} from "../../services/apiServise.js";
import styles from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const MoviesPage = () => {
    const [params, setParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const query = params.get('query') || '';
    const [value, setValue] = useState(query);

    useEffect(() => {
        setValue(query)
    }, [query]);

    useEffect(() => {
        const controller = new AbortController();

        if (!query.trim()) {
            setMovies([]);
            return;
        }
        
        const getMovies = async () => {
            try {
                setLoading(true);
                setError('');
                const data = await searchMovies(query, controller.signal);
                setMovies(data);
            } catch (e) {
                if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
                    setError('Search failed.');
                }
            } finally {
                setLoading(false);
            }
        }
        getMovies()
        return () => {
           controller.abort();
        }
    }, [query])

    const onSubmit = (e) => {
        e.preventDefault()
        const q = value.trim()
        setParams(q ? { query: q } : {})
    }

    return (
        <div>
            <h1 className={styles.title}>Search movies</h1>
            <form onSubmit={onSubmit} className={styles.form}>
                <input
                    className="input"
                    placeholder="Type a movie title…"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-label="Search movies"
                />
                <button className="button" type="submit">Search</button>
            </form>

            {loading && <Loader/>}
            {error && <div className="error">{error}</div>}
            {movies.length > 0 && <MovieList movies={movies}/>}
        </div>
    )
}

export default MoviesPage;