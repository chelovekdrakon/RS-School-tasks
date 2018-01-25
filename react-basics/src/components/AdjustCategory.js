import React from 'react';
import MaterialIcon from 'material-icons-react';
import { addSubCategory, deleteCategory } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    > * {
        display: flex;
        align-items: center;
    }
`;

const AdjustCategory = (props) => {
    return (
        <Wrapper>
            <Link to="/" onClick={() => props.deleteCategoryField(props.value)} >
                <MaterialIcon icon="delete" />
            </Link>
            <span onClick={() => props.addSubcategoryField(props.value)} >
                <MaterialIcon icon="playlist_add" />
            </span>
        </Wrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        selected: state.todos.get('selectedCategory'),
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addSubcategoryField(value) {
            dispatch(addSubCategory(value))
        },
        deleteCategoryField(value) {
            dispatch(deleteCategory(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(AdjustCategory);
