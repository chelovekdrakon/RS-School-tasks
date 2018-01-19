import React, { Component } from 'react';
import Input from '../components/Input';
import ClearButton from '../components/ClearButton';
import StyledHeader from '../components/StyledHeader';
import { Checkbox, LinearProgress } from 'material-ui';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            linearProgress: 50
        }
    }

    _onChange = (e) => {
        this.setState({
            value: `${e.target.value}`
        });
    }

    clearInput = () => {
        this.setState({
            value: '',
        });
    }

    render() {
        return (
            <StyledHeader>
                <h1> To-Do List </h1>

                <div />

                <label>
                    <Checkbox />
                    Show done
                </label>

                <div>
                    <Input onChange={this._onChange} value={this.state.value} placeholder='Search' />
                    <ClearButton onClick={this.clearInput}/>
                </div>

                <LinearProgress mode="determinate" value={this.state.linearProgress} />

            </StyledHeader>
        );
    }
}

export default Header;
