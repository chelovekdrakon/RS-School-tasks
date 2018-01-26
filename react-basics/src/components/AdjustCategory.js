import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {withRouter} from 'react-router';

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    > * {
        display: flex;
        align-items: center;

        &:hover {
            cursor: pointer;
        }
    }
`;

const AdjustCategory = (props) => {
    return (
        <Wrapper>
            <Link to={props.value === props.selected ? `/` : `/${props.selected}`} onClick={props.onDelete} >
                <MaterialIcon icon="delete" />
            </Link>
            <span onClick={props.onAdd} >
                <MaterialIcon icon="playlist_add" />
            </span>
        </Wrapper>
    );
}


export default withRouter(AdjustCategory);
