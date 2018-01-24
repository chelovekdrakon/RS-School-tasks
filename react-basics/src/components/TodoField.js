import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MaterialIcon from 'material-icons-react';

const TodoField = (props) => {
    return (
        <div>
            <label>
                <Checkbox
                    checked={props.checked}
                    onClick={() => props.pick(props.value)}
                />                
                <div> {props.value} </div>
            </label>
            <MaterialIcon icon="mode_edit" size="tiny" />
        </div>
    );
}

export default TodoField;
