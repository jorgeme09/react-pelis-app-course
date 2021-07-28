import React, { useState, useEffect } from 'react';
//API
import API from '../API';
//CONFIG
import { 
    POSTER_SIZE,
    BACKDROP_SIZE,
    IMAGE_BASE_URL
} from '../config'
//COMPONENTS
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import Searchbar from './Searchbar';
import Button from './Button';
//HOOK
import { useHomeFetch } from '../hooks/useHomeFetch';
//IMAGE
import NoImage from '../images/no_image.jpg'

const Home = () => {
    const { 
        state,
        loading,
        error,
        errorMsg,
        setSearchTerm,
        searchTerm,
        setIsLoadingMore
    } = useHomeFetch();
    const mostFamousMovie = state.results[0];
    console.log(state);
    return (
        <>
            {
                !searchTerm.value && mostFamousMovie ? 
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${mostFamousMovie.backdrop_path}`}
                        title={mostFamousMovie.original_title}
                        text={mostFamousMovie.overview}
                    />
                : null
            }
            <Searchbar setSearchTerm={setSearchTerm}/>
            <Grid header={!searchTerm.value ? "Most Popular Movies": "Search Results"}>
                {state.results.map(movie => (
                    <Thumb
                        image={
                            movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage
                        }
                        key={movie.id}
                        clickable
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <Button text='Load More' callback={() => setIsLoadingMore(true)}></Button>
            )}
        </>
    )
}

export default Home