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
        max-width: ${props => `${props.category * 18}rem`};
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    &:hover {
        cursor: pointer;
    }
`;

const onClick = (props) => {
    if (props.category) {
        return props.checked ? console.log('not today, bro') : props.onClick(props.value);
    } else {
        return props.onClick(props.value);
    }
};

const FieldLabel = (props) => {
    return (
        <StyledLabel>
            <Link to={`${props.value}`}>
                <Checkbox
                    checked={props.checked}
                    onClick={() => onClick(props)}
                />
            </Link>
            <div> {props.value} </div>
        </StyledLabel>
    );
}

export default FieldLabel;
