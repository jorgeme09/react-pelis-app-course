import { useState, useEffect, useRef } from 'react';
import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState({value: ''});
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const fetchMovies = async (page, searchTerm = '') => {
        try {
            setErrorMsg('')
            setError(false)
            setLoading(true)
            const movies = await API.fetchMovies(searchTerm, page)
            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
            setErrorMsg(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setState(initialState)
        fetchMovies(1, searchTerm.value)
    }, [searchTerm])

    useEffect(() => {
        if(!isLoadingMore) return
        fetchMovies(state.page + 1, searchTerm.value)
        setIsLoadingMore(false)
    }, [isLoadingMore, searchTerm, state.page])

    return {
        state,
        loading,
        error,
        errorMsg,
        setSearchTerm,
        searchTerm,
        setIsLoadingMore
    }
}