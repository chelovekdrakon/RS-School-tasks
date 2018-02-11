import React from 'react';
import CategoryList from '../components/CategoryList';
import styled from 'styled-components';
import SectionHeader from '../components/SectionHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    pickCategory,
    addSubCategory,
    deleteCategory,
    trasitTodo,
    addCategory,
    editCategory,
    confirmEdit
} from '../actions';

const SectionWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: '35%';
    padding: 0% 2%;
`;

const CategorySection = (props) => {
    return (
        <SectionWrapper>
            <SectionHeader placeholder='Enter category title' onSubmit={props.addCategoryField} />
            <CategoryList
                {...props}
                indexCorrection={1}
                pathToNode={[]}
                selected={props.selected}
                selectedPath={props.selectedPath}
                list={props.categories}
            />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.present.categoryList,
        selected: state.present.todos.get('selectedCategory'),
        selectedPath: state.present.todos.get('pathToSelectedNode')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addCategoryField(value) {
            dispatch(addCategory(value))
        },
        onPick(pathToNode, value) {
            dispatch(pickCategory(pathToNode, value))
        },
        onAdd(value) {
            dispatch(addSubCategory(value))
        },
        onDelete(value) {
            dispatch(deleteCategory(value))
        },
        onTransit(pathToNewCategory, todoName) {
            dispatch(trasitTodo(pathToNewCategory, todoName))
        },
        onEdit(categoryPath, newCategoryName) {
            dispatch(editCategory(categoryPath, newCategoryName))
        },
        onConfirm(pathToParent, input) {
            dispatch(confirmEdit(pathToParent, input))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(CategorySection));
