import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 3% 3% 0;
`;


const HistoryAPI = (props) => {
    return (
        <Wrapper>
            <Button onSubmit={props.onUndo} disabled={!props.canUndo} buttonCall="Undo" />
            <Button onSubmit={props.onRedo} disabled={!props.canRedo} buttonCall="Redo" />
        </Wrapper>
    );
};

export default HistoryAPI;
