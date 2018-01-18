import React, { Component } from 'react';
import Input from '../components/Input';
import AddButton from '../components/AddButton';

class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    _onChange = (e) => {
        this.setState({
            value: `${e.target.value}`
        });
    }

    onSubmit = (e) => {
        console.log('now you should add Component with value = this.state.value', this.state.value);
        this.setState({
            value: ''
        });
    }

    render() {
        return (
            <div>
                <Input onChange={this._onChange} value={this.state.value} placeholder={this.props.placeholder} style={{width: "40%"}}/>
                <AddButton onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default AddTodo;
