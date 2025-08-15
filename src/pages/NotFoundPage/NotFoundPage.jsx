import {Link} from "react-router-dom";
import styles from "./NotFoundPage.module.css"

export default function NotFoundPage() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.text}>Page not found</p>
            <p style={{ marginTop: 20 }}>
                <Link to="/" className="button">Go home</Link>
            </p>
        </div>
    )
}