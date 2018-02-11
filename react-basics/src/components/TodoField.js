import React from 'react';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';
import FieldLabel from './FieldLabel';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

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
                path={`/${props.match.params.category}`}
                value={props.value}
                checked={props.checked}
                onClick={props.onClick}
            />
            <Link to={`${props.match.params.category}/${props.value}`}>
                <MaterialIcon icon="mode_edit" size="tiny" />
            </Link>
        </FieldWrapper>
    );
}

export default withRouter(TodoField);
