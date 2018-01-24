import React from 'react';
import MaterialIcon from 'material-icons-react';
import { addSubCategory, deleteCategory } from '../actions';
import { connect } from 'react-redux';

const AdjustCategory = (props) => {
    return (
        <div>
            <span onClick={() => props.deleteCategoryField(props.value)} >
                <MaterialIcon icon="delete" />
            </span>
            <span onClick={() => props.addSubcategoryField(props.value)} >
                <MaterialIcon icon="playlist_add" />
            </span>
        </div>
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
