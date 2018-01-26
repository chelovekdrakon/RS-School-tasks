import React from 'react';
import CategoryList from '../components/CategoryList';
import styled from 'styled-components';
import SectionHeader from '../components/SectionHeader';
import { addCategory, pickCategory } from '../actions';
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
                list={props.categories}
                selected={props.selected}
                pick={props.pickCategoryField}
            />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        selected: state.todos.get('selectedCategory')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addCategoryField(value) {
            dispatch(addCategory(value))
        },
        pickCategoryField(value) {
            dispatch(pickCategory(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(CategorySection);
