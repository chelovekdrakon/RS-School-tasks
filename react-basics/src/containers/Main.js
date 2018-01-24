import React from 'react';
import MainWrapper from '../wrappers/MainWrapper';
import MainSection from '../components/MainSection';
import { connect } from 'react-redux';
import { addCategory, addTodo } from '../actions';
import { Route } from 'react-router-dom';

const Main = (props) => {
    return (
        <MainWrapper>
            <MainSection
                aside category={1}
                placeholder='Enter category title'
                onAdd={props.addCategoryField}
                list={props.categories}
            />
            <Route
                exact
                path="/:category"
                component={routeProps => props.selected !== '' ? (
                    <MainSection
                        placeholder='Enter todo task'
                        onAdd={props.addTodoField}
                        list={props.todos}
                    />
                ) : null}
            />
        </MainWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        todos: state.todos.get('toRender'),
        selected: state.todos.get('selectedCategory'),
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addCategoryField(value) {
            dispatch(addCategory(value))
        },
        addTodoField(value) {
            dispatch(addTodo(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(Main);
