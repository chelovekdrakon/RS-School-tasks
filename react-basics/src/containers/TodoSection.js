import React from 'react';
import TodoList from '../containers/TodoList';
import styled from 'styled-components';
import InputContainer from '../components/InputContainer';
import { addTodo } from '../actions';
import { connect } from 'react-redux';

const SectionWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 65%;
`;
const PLACE_HOLDER = 'Enter todo task';


const TodoSection = (props) => {
    return (
        <SectionWrapper>
            <header>
                <InputContainer placeholder={PLACE_HOLDER} onSubmit={props.addTodoField} />
            </header>
            <TodoList />
        </SectionWrapper>
    );
}


const mapStateToProps = (state) => {
    return {

    }
}

const mapActionToProps = (dispatch) => {
    return {
        addTodoField(value) {
            dispatch(addTodo(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoSection);
