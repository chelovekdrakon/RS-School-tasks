import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import AdjustTodo from '../components/AdjustTodo';
import FieldWrapper from '../wrappers/FieldWrapper';
import Immutable from 'immutable';
import {
    addSubCategory,
    deleteCategory,
    pickCategory,
    toggleTodo
} from '../actions';
import { connect } from 'react-redux';


const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: ${props => props.category ? `flex-end` : `stratch`};

    > li {
        padding: ${props => props.category ? `0` : `3% 0%`};
    }
`;


const TodoList = (props) => {
    const list = props.category ? Array.from(props.list.values()) : props.list;

    return (
        <ListWrapper category={props.category}>
            {
                list.map( element => {
                    if (Immutable.Map.isMap(element)) {
                        return (
                            <TodoList key={props.category}
                                category={props.category - 0.1}
                                list={element}
                                deleteCategory={props.deleteCategory}
                                addSubcategory={props.addSubcategory}
                            />
                        );
                    } else {
                        let checked
                        if (props.category) {
                            checked = props.selected === element ? true : false;
                        } else {
                            checked = props.done.get(element);
                        }

                        return props.done.get(element) ? (
                            <FieldWrapper category={props.category} key={element}>
                                <TodoField
                                    value={element}
                                    category={props.category}
                                    pick={props.category ? props.pickCategoryField : props.pickTodoField}
                                    checked={checked}
                                />
                                {props.category && <AdjustTodo
                                    deleteCategory={props.deleteCategoryField}
                                    addSubcategory={props.addSubcategoryField}
                                    value={element}
                                                   />}
                            </FieldWrapper>
                        ) : null;
                    }
                }
                )
            }
        </ListWrapper>
        );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        todos: state.todos.get('toRender'),
        selected: state.todos.get('selectedCategory'),
        done: state.todos.get('done'),
        filter: state.displayFilter
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addSubcategoryField(value) {
            dispatch(addSubCategory(value))
        },
        deleteCategoryField(value) {
            dispatch(deleteCategory(value))
        },
        pickCategoryField(value) {
            dispatch(pickCategory(value))
        },
        pickTodoField(value) {
            dispatch(toggleTodo(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoList);
