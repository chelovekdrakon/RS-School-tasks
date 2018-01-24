import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';

const TodoField = (props) => {
    return (
        <div>
            <label>
                {
                    props.category ? (
                        <Link to={props.value}>
                            <Checkbox
                                checked={props.checked}
                                onClick={() => props.checked ? console.log('not today, bro') : props.pick(props.value)} />
                        </Link>
                    ) : (
                        <Checkbox
                            checked={props.checked}
                            onClick={() => props.pick(props.value)} />
                    )
                }
                <div> {props.value} </div>
            </label>
            <MaterialIcon icon="mode_edit" size="tiny" />
        </div>
    );
}

export default TodoField;
