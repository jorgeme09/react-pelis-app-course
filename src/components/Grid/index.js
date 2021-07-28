import React from 'react';
import {
    Content,
    Wrapper
} from './grid.styles'

const Grid = ({header, children}) => {
    return <Wrapper>
        <h1>{header}</h1>
        <Content>
            {children}
        </Content>
    </Wrapper>
}

export default Grid