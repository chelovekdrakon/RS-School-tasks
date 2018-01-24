import React from 'react';
import CategoryList from './CategoryList';
import styled from 'styled-components';
import InputContainer from '../components/InputContainer';
import { addCategory } from '../actions';
import { connect } from 'react-redux';

const SectionWrapper = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: '35%';
`;

const PLACE_HOLDER = 'Enter category title'

const CategorySection = (props) => {
    return (
        <SectionWrapper>
            <header>
                <InputContainer placeholder={PLACE_HOLDER} onSubmit={props.addCategoryField} />
            </header>

            <CategoryList category={1} list={props.categories} />
        </SectionWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addCategoryField(value) {
            dispatch(addCategory(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(CategorySection);
