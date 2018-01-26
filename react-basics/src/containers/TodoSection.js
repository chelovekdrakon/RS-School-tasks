import React from 'react';
import TodoList from '../components/TodoList';
import styled from 'styled-components';
import SectionHeader from '../components/SectionHeader';
import { addTodo, toggleTodo } from '../actions';
import { connect } from 'react-redux';

const SectionWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    width: 65%;
    padding: 0% 2%;
`;
const PLACE_HOLDER = 'Enter todo task';

const TodoSection = (props) => {
    return (
        <SectionWrapper>
            <SectionHeader placeholder={PLACE_HOLDER} onSubmit={props.addTodoField} />
            <TodoList list={props.list} showDone={props.showDone} pick={props.pickTodoField} />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.get('todos'),
        list: state.todos.get('adjustedBySearch'),
        showDone: state.displayFilter
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addTodoField(value) {
            dispatch(addTodo(value))
        },
        pickTodoField(value) {
            dispatch(toggleTodo(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoSection);
