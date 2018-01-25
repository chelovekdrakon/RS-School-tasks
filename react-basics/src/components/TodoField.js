import React from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';
import FieldLabel from './FieldLabel';

const FieldWrapper = styled.li`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    border: 1px solid LightBlue;
    border-radius: 0.2rem;
    padding: 3% 1%;
`;

const TodoField = (props) => {
    return (
        <FieldWrapper>
            <FieldLabel
                value={props.value}
                checked={props.checked}
                onClick={props.pick}
            />
            <MaterialIcon icon="mode_edit" size="tiny" />
        </FieldWrapper>
    );
}

export default TodoField;
