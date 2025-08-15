import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGEyZWI1ZDJlMzUwYmYyM2MxMjdiOWFmNTkzYjUyZiIsIm5iZiI6MTc1NTI2MTEzOS45OSwic3ViIjoiNjg5ZjI4ZDNlMWIzYTdiNDIxOGQ5ZmY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ESWypb5bQdkw9QKrAo8wqIqHo3cmMNRqAfzA7c0-rYE`,
    },
})

export const imgUrl = (path, size = 'w500') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null

export const getTrending = async () => {
    const { data } = await api.get('/trending/movie/day', { params: { language: 'en-US' } })
    return data.results || []
}

export const searchMovies = async (query, page = 1) => {
    const { data } = await api.get('/search/movie', {
        params: { query, include_adult: false, language: 'en-US', page },
    })
    return data.results || []
}

export const getMovieDetails = async (id) => {
    const { data } = await api.get(`/movie/${id}`, { params: { language: 'en-US' } })
    return data
}

export const getMovieCredits = async (id) => {
    const { data } = await api.get(`/movie/${id}/credits`)
    return data.cast || []
}

export const getMovieReviews = async (id) => {
    const { data } = await api.get(`/movie/${id}/reviews`)
    return data.results || []
}
