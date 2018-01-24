import React, { Component } from 'react';
import InputField from '../components/InputField';
import AddButton from '../components/AddButton';

class AddField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    onTap = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    clear = () => {
        this.setState({
            inputValue: ''
        })
    }

    render() {
        return (
            <div>
                <InputField
                    onChange={this.onTap}
                    value={this.state.inputValue}
                    placeholder={this.props.placeholder} />

                <AddButton value={this.state.inputValue} onSubmit={this.props.onSubmit} clear={this.clear} />
            </div>
        );
    }
}

export default AddField;
