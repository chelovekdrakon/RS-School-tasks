import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledH = styled.h1`
    font-size: 3rem;
    width: 25%;
    font-family: 'Roboto', sans-serif;
`;

const Logo = (props) => {
    return (
        <StyledH>
            <Link to="/" onClick={props.restart}>
                To-Do List
            </Link>
        </StyledH>
    );
}

export default Logo;
