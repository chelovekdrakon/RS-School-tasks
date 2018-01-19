import React from 'react';
import Input from '../components/Input';
import AddButton from '../components/AddButton';

const AddField = (props) => {
    return (
        <div>
            <Input
                onChange={props.onTap}
                value={props.value}
                placeholder={props.placeholder} />
            <AddButton onSubmit={props.onSubmit} />
        </div>
    );
}

export default AddField;
