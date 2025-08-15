import {Link, useLocation} from "react-router-dom";
import styles from "./MovieList.module.css";
import {imgUrl} from "../../services/apiServise.js";

const MovieList = ({ movies }) => {
    const location = useLocation();

    return (
        <ul className={styles.list}>
            {movies.map(movie => {
                return <li key={movie.id}>
                    <Link className={`card ${styles.item}`} to={`/movies/${movie.id}`}
                          state={{ from: location }}>
                        <div className={styles.poster}>
                            {movie.poster_path ? (
                                <img src={imgUrl(movie.poster_path, 'w342')} alt={movie.title} loading="lazy"/>
                            ) : (
                                <span className="badge">No poster</span>
                            )}
                        </div>
                        <div className={styles.title}>{movie.title}</div>
                        <div className={styles.meta}>
                            {movie.release_date ?
                                <span className="badge">{movie.release_date.slice(0, 4)}</span> : null}
                            {typeof movie.vote_average === 'number' ? (
                                <span className="badge">⭐ {movie.vote_average.toFixed(1)}</span>
                            ) : null}
                        </div>
                    </Link>
                </li>
            })}
        </ul>
    )
}

export default MovieList;