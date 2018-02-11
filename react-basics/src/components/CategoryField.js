import React from 'react';
import MaterialIcon from 'material-icons-react';
import AdjustCategory from '../components/AdjustCategory';
import styled from 'styled-components';
import FieldLabel from '../components/FieldLabel';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InputContainer from './InputContainer';
import { ADD_SUBCATEGORY } from '../constants';

const FieldWrapper = styled.li`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    border: 1px solid LightBlue;
    border-radius: 0.2rem;

    width: ${props => `${props.indexCorrection * 100}%`};
    min-width: 80%;


    > span {
        flex: 1;
        margin: 0 2%;

        &:hover {
            cursor: pointer;
        }
    }
`;


const CategoryField = (props) => {
    return (
        <FieldWrapper indexCorrection={props.indexCorrection}>
            {
                props.inputField ? (
                    <InputContainer
                        placeholder={ADD_SUBCATEGORY}
                        onSubmit={props.onConfirm}
                    />
                ) : (
                    <FieldLabel
                        path={`/${props.value}`}
                        indexCorrection={props.indexCorrection}
                        value={props.value}
                        checked={props.checked}
                        onClick={props.onPick}
                    />
                )
            }

            <span onClick={props.onEdit}>
                <MaterialIcon icon="mode_edit" size="tiny" />
            </span>

            <Route exact path="/:category?"
                render={routeProps => (
                    <AdjustCategory
                        path={props.path}
                        selected={props.selected}
                        value={props.value}
                        onDelete={props.onDelete}
                        onAdd={props.onAdd}
                    />
                )}
            />

            <Route exact path="/:category/:todo"
                render={routeProps => (
                    <Link
                        to={`/${props.value}`}
                        onClick={props.onTransit}
                    >
                        <MaterialIcon icon="reply" />
                    </Link>
                )}
            />

        </FieldWrapper>
    );
}

export default CategoryField;
