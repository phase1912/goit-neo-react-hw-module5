import {useEffect, useRef, useState} from "react";
import {Link, NavLink, Outlet, useLocation, useParams} from "react-router-dom";
import {getMovieDetails, imgUrl} from "../../services/apiServise.js";
import Loader from "../../components/Loader/Loader.jsx";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const backRef = useRef(location.state?.from || '/');

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = false;

        async function fetchDetails() {
            try {
                setLoading(true);
                setError('');

                const details = await getMovieDetails(movieId);

                if (!mounted) {
                    setMovie(details);
                }
            } catch (error) {
                console.log(error);
                if (!mounted) {
                    setError(error);
                }
            } finally {
                if (!mounted) {
                    setLoading(false);
                }
            }
        }

        fetchDetails();

        return () => {
            mounted = true;
        }
    }, [movieId]);

    if (loading) return <Loader/>;
    if (error) return <div className="error">{error}</div>
    if (!movie) return null

    const tabClass = ({ isActive }) => (isActive ? 'tabActive' : 'tab')

    return (
        <div>
            <div className={styles.back}>
                <Link to={backRef.current} className="button">← Go back</Link>
            </div>

            <header className={styles.header}>
                <div className="card">
                    {movie.poster_path ? (
                        <img className={styles.poster} src={imgUrl(movie.poster_path, 'w500')} alt={movie.title}/>
                    ) : (
                        <div className={styles.poster}/>
                    )}
                </div>

                <div>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <div className={styles.sub}>
                        {movie.release_date && <span className="badge">{movie.release_date.slice(0, 4)}</span>}
                        {typeof movie.vote_average === 'number' && (
                            <span className="badge">⭐ {movie.vote_average.toFixed(1)}</span>
                        )}
                        {movie.runtime ? <span className="badge">{movie.runtime} min</span> : null}
                    </div>
                    <p>{movie.overview}</p>
                    {movie.genres?.length ? (
                        <p className="badge" style={{ marginTop: 10 }}>
                            {movie.genres.map((g) => g.name).join(' • ')}
                        </p>
                    ) : null}

                    <div className={styles.links}>
                        <NavLink to="cast" className={tabClass}>Cast</NavLink>
                        <NavLink to="reviews" className={tabClass}>Reviews</NavLink>
                    </div>
                </div>
            </header>

            <section className={styles.section}>
                <Outlet/>
            </section>
        </div>
    )
}

export default MovieDetailsPage;