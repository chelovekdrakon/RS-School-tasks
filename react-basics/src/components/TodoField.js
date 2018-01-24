import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

const FieldWrapper = styled.li`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    border: 1px solid LightBlue;
    border-radius: 0.2rem;
    padding: 3% 1%;
`;

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


const TodoField = (props) => {
    return (
        <FieldWrapper>
            <StyledLabel>
                <Checkbox
                    checked={props.checked}
                    onClick={() => props.pick(props.value)}
                />
                <div> {props.value} </div>
            </StyledLabel>
            <MaterialIcon icon="mode_edit" size="tiny" />
        </FieldWrapper>
    );
}

export default TodoField;
