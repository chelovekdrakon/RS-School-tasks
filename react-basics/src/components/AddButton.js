import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    color: grey;
    font-family: 'Roboto', sans-serif;
    font-size: 1.9rem;
    border-radius: 0 5px 5px 0;
    border: 1px solid Gainsboro;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
`;

const AddButton = (props) => {
    return (
        <Button onClick={props.onSubmit}>
            Add
        </Button>
    );
}

export default AddButton;
