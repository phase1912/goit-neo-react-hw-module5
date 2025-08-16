import {useEffect, useState} from "react";
import {getTrending} from "../../services/apiServise.js";
import Loader from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";

export default function HomePage() {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchTrends() {
            try {
                setLoading(true);
                setError('');

                const data = (await getTrending(controller.signal)) ?? [];

                setTrends(data);
            } catch (error) {
                if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
                    setError('Failed to load trending movies.')
                }
            } finally { 
                setLoading(false);
            }
        }

        fetchTrends();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <div>
            <h1 className={styles.title}>Trending today</h1>
            {error && <div className="error">{error}</div>}
            {loading && <Loader/>}
            {trends.length > 0 && <MovieList movies={trends}/>}
        </div>
    );
}