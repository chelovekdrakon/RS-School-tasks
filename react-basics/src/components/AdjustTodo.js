import React from 'react';
import MaterialIcon from 'material-icons-react';
// import MdDelete from 'react-icons/lib/md/delete';

const AdjustTodo = (props) => {
    return (
        <div>
            <span onClick={() => props.deleteCategory(props.value)} >
                <MaterialIcon icon="delete" />
            </span>
            <span onClick={() => props.addSubcategory(props.value)} >
                <MaterialIcon icon="playlist_add" />
            </span>
        </div>
    );
}

export default AdjustTodo;
