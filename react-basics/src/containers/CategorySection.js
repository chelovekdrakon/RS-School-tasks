import React from 'react';
import CategoryList from '../components/CategoryList';
import styled from 'styled-components';
import SectionHeader from '../components/SectionHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    pickCategory,
    confirmAdding,
    addSubCategory,
    deleteCategory,
    trasitTodo,
    addCategory
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
                indexCorrection={1}
                pathToNode={[]}
                selected={props.selected}
                selectedPath={props.selectedPath}
                list={props.categories}
                onPick={props.pickCategoryField}
                onDelete={props.deleteCategoryField}
                onAdd={props.addSubcategoryField}
                onConfirmAdd={props.confirmAdd}
                onTransit={props.onTransit}
            />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList,
        selected: state.todos.get('selectedCategory'),
        selectedPath: state.todos.get('pathToSelectedNode')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addCategoryField(value) {
            dispatch(addCategory(value))
        },
        pickCategoryField(pathToNode, value) {
            dispatch(pickCategory(pathToNode, value))
        },
        confirmAdd(pathToParent, input) {
            dispatch(confirmAdding(pathToParent, input))
        },
        addSubcategoryField(value) {
            dispatch(addSubCategory(value))
        },
        deleteCategoryField(value) {
            dispatch(deleteCategory(value))
        },
        onTransit(pathToNewCategory, todoName) {
            dispatch(trasitTodo(pathToNewCategory, todoName))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(CategorySection));
