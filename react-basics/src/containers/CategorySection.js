import React from 'react';
import CategoryList from '../components/CategoryList';
import styled from 'styled-components';
import SectionHeader from '../components/SectionHeader';
import { addCategory, pickCategory, confirmAdding } from '../actions';
import { connect } from 'react-redux';

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
                category={1}
                pathToNode={[]}
                list={props.categories}
                selected={props.selected}
                selectedPath={props.selectedPath}
                pick={props.pickCategoryField}
                addSubCategory={props.addSubCategory}
            />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
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
        addSubCategory(pathToParent, input) {
            dispatch(confirmAdding(pathToParent, input))
        },
    }
}

export default connect(mapStateToProps, mapActionToProps)(CategorySection);
