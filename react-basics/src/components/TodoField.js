import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MaterialIcon from 'material-icons-react';
import { pickCategory } from '../actions';
import { connect } from 'react-redux';

const TodoField = (props) => {
    return (
        <div>
            <label>
                <Checkbox onClick={() => props.pickCategoryField(props.value)} />
                <div> {props.value} </div>
            </label>
            <MaterialIcon icon="mode_edit" size="tiny" />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryList.get('nestedCategories'),
        todos: state.todos
    }
}

const mapActionToProps = (dispatch) => {
    return {
        pickCategoryField(value) {
            dispatch(pickCategory(value))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoField);
