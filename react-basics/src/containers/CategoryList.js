import React from 'react';
import styled from 'styled-components';
import CategoryField from '../components/CategoryField';
import AdjustTodo from '../components/AdjustTodo';
import FieldWrapper from '../wrappers/FieldWrapper';
import Immutable from 'immutable';
import {
    addSubCategory,
    deleteCategory,
    pickCategory
} from '../actions';
import { connect } from 'react-redux';


const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;


const CategoryList = (props) => {
    const list = Array.from(props.list.values());
    return (
        <ListWrapper>
            {
                list.map( element => {
                    if (Immutable.Map.isMap(element)) {
                        return (
                            <CategoryList
                                category={props.category - 0.1}
                                list={element}
                                deleteCategory={props.deleteCategory}
                                addSubcategory={props.addSubcategory}
                            />
                        );
                    } else {
                        let checked = props.selected === element ? true : false;
                        return (
                            <FieldWrapper category={props.category} key={element}>
                                <CategoryField
                                    value={element}
                                    pick={props.pickCategoryField}
                                    checked={checked}
                                />
                                <AdjustTodo
                                    value={element}
                                    deleteCategory={props.deleteCategoryField}
                                    addSubcategory={props.addSubcategoryField}
                                />
                            </FieldWrapper>
                        );
                    }
                })
            }
        </ListWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
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
        },
    }
}

export default connect(mapStateToProps, mapActionToProps)(CategoryList);
