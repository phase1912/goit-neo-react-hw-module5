import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieCredits, imgUrl} from "../../services/apiServise.js";
import styles from "./MovieCast.module.css";
import Loader from "../Loader/Loader.jsx";

const MovieCast = () => {
    const { movieId } = useParams()
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let mounted = false
        const getCast = async () => {
            try {
                setLoading(true);
                setError('')
                const data = await getMovieCredits(movieId)
                if (!mounted) setCast(data)
            } catch (e) {
                if (!mounted) setError('Failed to load cast.')
            } finally {
                if (!mounted) setLoading(false)
            }
        }
        getCast()
        return () => {
            mounted = true
        }
    }, [movieId])

    if (loading) return <Loader/>
    if (error) return <div className="error">{error}</div>
    if (!cast.length) return <div className="empty">No cast info.</div>

    return (
        <div className={styles.list}>
            {cast.map((p) => (
                <div key={p.cast_id || p.credit_id} className={`card ${styles.item}`}>
                    <div className={styles.avatar}>
                        {p.profile_path ? (
                            <img src={imgUrl(p.profile_path, 'w185')} alt={p.name} loading="lazy"/>
                        ) : null}
                    </div>
                    <div className={styles.head}>{p.name}</div>
                    <div className={styles.sub}>{p.character}</div>
                </div>
            ))}
        </div>
    )
}

export default MovieCast;