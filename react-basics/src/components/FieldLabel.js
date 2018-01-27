import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLabel = styled.label`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    > div:first-child {
        width: 3rem !important;
    }

    > div:last-child {
        max-width: ${props => `${props.indexCorrection * 16 || 50}rem`};
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    &:hover {
        cursor: pointer;
    }
`;

const FieldLabel = (props) => {
    return (
        <StyledLabel indexCorrection={props.indexCorrection}>
            <Link to={props.path}>
                <Checkbox checked={props.checked} onClick={props.onClick} />
            </Link>
            <div> {props.value} </div>
        </StyledLabel>
    );
}

export default FieldLabel;
