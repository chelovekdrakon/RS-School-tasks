import React from 'react';
import styled from 'styled-components';
import TodoField from '../components/TodoField';
import AdjustTodo from '../components/AdjustTodo';
import TodoWrapper from '../components/TodoWrapper';
import Immutable from 'immutable';
import { addSubCategory, deleteCategory, pickCategory } from '../actions';
import { connect } from 'react-redux';



const MyList = styled.ul`
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
    const lol = <div>hello</div>;
    if (props.list) {
    const list = props.category ? Array.from(props.list.values()) : props.list;
    return (
        <MyList category={props.category}>
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
                        let checked = props.selected === element ? true : false;
                        return (
                            <TodoWrapper category={props.category} key={element}>
                                <TodoField
                                    value={element}
                                    pickCategoryField={props.pickCategoryField}
                                    checked={checked}
                                />
                                {props.category && <AdjustTodo
                                    deleteCategory={() => props.deleteCategoryField(element)}
                                    addSubcategory={() => props.addSubcategoryField(element)}
                                    data={element}
                                                   />}
                            </TodoWrapper>
                        );
                    }
                }
                )
            }
        </MyList>
        );
    } else {
        return lol;
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        todos: state.todos.get('toRender'),
        selected: state.todos.get('selectedCategory')
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
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoList);
