import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: none;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: LightGrey;
        font-family: 'Roboto', sans-serif;
        font-weight: 100;
        font-style: italic;
        font-size: 1.5rem;
    }
`;

const Input = (props) => {
    return (
        <StyledInput value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
    );
};

export default Input;
