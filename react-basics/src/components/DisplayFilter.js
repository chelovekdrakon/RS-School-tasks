import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'material-ui';

const StyledLabel = styled.label`
    display: flex;
    width: 10.5%;
    flex-flow: nowrap row;
    justify-content: space-around;
    align-items: center;
    font-size: 1.6rem;

    > div:first-child {
        width: 14% !important;
    }

    :hover {
        cursor: pointer;
        user-select: none;
    }
`;

const DisplayFilter = (props) => {
    return (
        <StyledLabel>
            <Checkbox />
            Show done
        </StyledLabel>
    );
}

export default DisplayFilter;
