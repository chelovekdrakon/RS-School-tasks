import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    color: grey;
    font-family: 'Roboto', sans-serif;
    font-size: 1.4rem;
    border-radius: 0 5px 5px 0;
    border: 1px solid Gainsboro;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Button = (props) => {
    return (
        <StyledButton onClick={props.onSubmit}>
            {props.buttonCall}
        </StyledButton>
    );
}

export default Button;
