import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 80%;
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

const Search = (props) => {
    return (
        <Input value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
    );
};

export default Search;
