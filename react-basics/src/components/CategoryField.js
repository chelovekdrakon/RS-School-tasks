import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import AdjustCategory from './AdjustCategory';
import styled from 'styled-components';

const FieldWrapper = styled.li`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    border: 1px solid LightBlue;
    border-radius: 0.2rem;

    width: ${props => `${props.category * 100}%`};

    > div {
        display: flex;
        align-items: center;

        > span {
            display: flex;
            align-items: center;
        }
    }

    > i {
        flex: 1;
        margin: 0 2%;
    }
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;

    > div {
        max-width: ${props => `${props.category * 18}rem`};
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    > a {
        width: 2.5rem;
    }

    &:hover {
        cursor: pointer;
    }
`;


const CategoryField = (props) => {
    return (
        <FieldWrapper category={props.category}>
            <StyledLabel category={props.category}>
                <Link to={props.value}>
                    <Checkbox
                        checked={props.checked}
                        onClick={() => props.checked ? console.log('not today, bro') : props.pick(props.value)}
                    />
                </Link>
                <div> {props.value} </div>
            </StyledLabel>

            <MaterialIcon icon="mode_edit" size="tiny" />

            <AdjustCategory value={props.value} />
        </FieldWrapper>
    );
}

export default CategoryField;
