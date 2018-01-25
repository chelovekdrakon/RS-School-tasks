import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import { toggleTodo } from '../actions';
import { connect } from 'react-redux';

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stratch;
`;

const TodoList = (props) => {
    const list = Array.from(props.list.keys());
    return (
        <ListWrapper>
            {
                list.map( element => {
                    let done = props.list.getIn([`${element}`, 'isDone']);
                    return (
                        <TodoField
                            key={element}
                            value={element}
                            pick={props.pickTodoField}
                            checked={done}
                        />
                    );
                })
            }
        </ListWrapper>
        );
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.get('todos'),
        list: state.todos.get('selectedListMap')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        pickTodoField(value) {
            dispatch(toggleTodo(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoList);
