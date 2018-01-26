import React from 'react';
import MaterialIcon from 'material-icons-react';
import AdjustCategory from './AdjustCategory';
import styled from 'styled-components';
import FieldLabel from './FieldLabel';

const FieldWrapper = styled.li`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    border: 1px solid LightBlue;
    border-radius: 0.2rem;

    width: ${props => `${props.category * 100}%`};

    > i {
        flex: 1;
        margin: 0 2%;
    }
`;


const CategoryField = (props) => {
    return (
        <FieldWrapper category={props.category}>
            <FieldLabel
                path={`/${props.value}`}
                category={props.category}
                value={props.value}
                checked={props.checked}
                onClick={() => props.checked ? console.log('not today, bro') : props.pick(props.value)}
            />
            <MaterialIcon icon="mode_edit" size="tiny" />
            <AdjustCategory value={props.value} />
        </FieldWrapper>
    );
}

export default CategoryField;
