import React, { useState, useEffect, useRef } from 'react'
import {
    Content,
    Wrapper
} from './searchbar.styles'
import searchIcon from '../../images/search-icon.svg'

const Searchbar = ({setSearchTerm}) => {
    const [state, setState] = useState({value: ''});
    const initial = useRef(true);

    const handleChange = (event) => {
        setState({value:event.currentTarget.value})
    }

    useEffect(() => {
        if(initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state)
        }, 500)

        return () => clearTimeout(timer)
    }, [setSearchTerm, state])

    return(
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input 
                    type="text" 
                    placeholder="Search Movie"
                    onChange={handleChange}
                    value={state.value}
                />
            </Content>
        </Wrapper>
    )
}

export default Searchbar