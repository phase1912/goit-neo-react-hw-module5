import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGEyZWI1ZDJlMzUwYmYyM2MxMjdiOWFmNTkzYjUyZiIsIm5iZiI6MTc1NTI2MTEzOS45OSwic3ViIjoiNjg5ZjI4ZDNlMWIzYTdiNDIxOGQ5ZmY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ESWypb5bQdkw9QKrAo8wqIqHo3cmMNRqAfzA7c0-rYE`,
    },
});

export const imgUrl = (path, size = 'w500') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const getTrending = async (signal) => {
    const { data } = await api.get('/trending/movie/day', { params: { language: 'en-US' }, signal });
    return data.results || [];
}

export const searchMovies = async (query, signal, page = 1) => {
    const { data } = await api.get('/search/movie', {
        params: { query, include_adult: false, language: 'en-US', page }, signal
    });
    return data.results || [];
}

export const getMovieDetails = async (id, signal) => {
    const { data } = await api.get(`/movie/${id}`, { params: { language: 'en-US' }, signal });
    return data;
}

export const getMovieCredits = async (id, signal) => {
    const { data } = await api.get(`/movie/${id}/credits`, { signal });
    return data.cast || [];
}

export const getMovieReviews = async (id, signal) => {
    const { data } = await api.get(`/movie/${id}/reviews`, { signal });
    return data.results || [];
}
