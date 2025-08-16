import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMovieReviews} from "../../services/apiServise.js";
import styles from "./MovieReviews.module.css";
import Loader from "../Loader/Loader.jsx";

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        
        const getReviews = async () => {
            try {
                setLoading(true);
                setError('');
                
                const data = await getMovieReviews(movieId, controller.signal);
                
                setReviews(data);
            } catch (e) {
                if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
                    setError('Failed to load reviews.')
                }
            } finally {
                setLoading(false);
            }
        }
        
        getReviews();
        return () => {
            controller.abort();
        }
    }, [movieId]);

    if (loading) return <Loader/>
    if (error) return <div className="error">{error}</div>
    if (!reviews.length) return <div className="empty">No reviews yet.</div>

    return (
        <div className={styles.list}>
            {reviews.map((r) => (
                <article key={r.id} className={`card ${styles.item}`}>
                    <div className={styles.head}>
                        <div className={styles.author}>{r.author || 'Anonymous'}</div>
                        {r.created_at ?
                            <div className={styles.date}>{new Date(r.created_at).toLocaleString()}</div> : null}
                    </div>
                    <div className={styles.body}>{r.content}</div>
                </article>
            ))}
        </div>
    )
}

export default MovieReviews;