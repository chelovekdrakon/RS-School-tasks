import React, { PureComponent } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import styled from 'styled-components';

const FieldWrapper = styled.div`
    display: flex;

    > input {
        width: 100%;
        border: 1px solid;
        border-radius: 5px 0 0 5px;
        border-color: Gainsboro transparent Gainsboro Gainsboro;
    }
`;

class AddField extends PureComponent {
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
            <FieldWrapper>
                <InputField
                    onChange={this.onTap}
                    value={this.state.inputValue}
                    placeholder={this.props.placeholder}
                />
                <Button
                    onSubmit={() => {
                        this.props.onSubmit(this.state.inputValue);
                        this.clear();
                    }}
                    buttonCall="Add"
                />
            </FieldWrapper>
        );
    }
}

export default AddField;
