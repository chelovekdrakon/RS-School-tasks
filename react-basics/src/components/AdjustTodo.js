import React from 'react';
import MaterialIcon from 'material-icons-react';

const AdjustTodo = (props) => {
    return (
        <div>
            <span onClick={props.deleteCategory}>
                <MaterialIcon icon="delete" />
            </span>
            <span onClick={props.addSubcategory}>
                <MaterialIcon icon="playlist_add" />
            </span>
        </div>
    );
}

export default AdjustTodo;
