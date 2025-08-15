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
        let mounted = false

        async function fetchTrends() {
            try {
                setLoading(true);
                setError('');

                const data = (await getTrending()) ?? [];

                if (!mounted) setTrends(data);
            } catch (error) {
                console.error(error);
                if (!mounted) setError(error);
            } finally {
                if (!mounted) {
                    setLoading(false);
                }

            }
        }

        fetchTrends();

        return () => {
            mounted = true;
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