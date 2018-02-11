import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const PanelWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    button {
        border-radius: 0.2rem;
        padding: 1.2rem;
        margin: 0 1rem;
    }
`;

const SaveCancelPanel = (props) => {
    return (
        <PanelWrapper>
            <Link to={`/${props.match.params.category}`}>
                <Button onSubmit={props.onSave} buttonCall="Save changes" />
            </Link>
            <Link to={`/${props.match.params.category}`}>
                <Button buttonCall="Cancel" />
            </Link>
        </PanelWrapper>
    );
};

export default withRouter(SaveCancelPanel);
