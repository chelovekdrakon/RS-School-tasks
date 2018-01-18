import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: 12%;
    position: relative;

    font-family: 'Roboto', sans-serif;
    color: grey;
    border: 1px solid GhostWhite;
    border-radius: 15%;

    &:focus {
        outline: none;
    }

    &:hover {
        background: GhostWhite;
        color: DarkGrey;
        cursor: pointer;
    }
`;

const Clear = (props) => {
    return (
        <Button onClick={props.onClick}> x </Button>
    );
};

export default Clear;
