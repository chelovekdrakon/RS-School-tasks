import React from 'react';
import MainWrapper from '../components/StyledMain';
import MainSection from '../components/MainSection';
import { connect } from 'react-redux';
import { addCategory, addTodo } from '../actions';

const Main = (props) => {
    return (
        <MainWrapper>
            <MainSection
                aside category={1}
                placeholder='Enter category title'
                onAdd={props.addCategoryField}
                list={props.categories}
            />
            {props.todos ? <MainSection
                placeholder='Enter todo task'
                onAdd={props.addTodoField}
                list={props.todos}
                           /> : <div> Hello </div>}
        </MainWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        todos: state.todos.get('toRender')
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
