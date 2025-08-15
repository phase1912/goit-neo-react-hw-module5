import Navigation from "../Navigation/Navigation.jsx";
import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import styles from "./App.module.css";

const App = () => {
    const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'))
    const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'))
    const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'))
    const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'))

    return (
        <div className={styles.main}>
            <nav className="nav">
                <div className="navInner">
                    <Navigation/>
                </div>
            </nav>

            <main className={`${styles.content} container`}>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/movies" element={<MoviesPage/>}/>
                        <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
                            <Route path="cast" element={
                                <Suspense fallback={<Loader/>}>
                                    {React.createElement(lazy(() => import('../MovieCast/MovieCast.jsx')))}
                                </Suspense>
                            }/>
                            <Route path="reviews" element={
                                <Suspense fallback={<Loader/>}>
                                    {React.createElement(lazy(() => import('../MovieReviews/MovieReviews.jsx')))}
                                </Suspense>
                            }/>
                        </Route>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}

export default App;