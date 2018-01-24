import React, { Component } from 'react';
import InputField from '../components/InputField';
import ClearButton from '../components/ClearButton';
import StyledHeader from '../wrappers/StyledHeader';
import { Checkbox, LinearProgress } from 'material-ui';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
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
        const values = Array.from(this.props.done.values());
        const allTodos = this.props.done.size;
        const done = values.filter(el => el).length;
        const linearProgress = (100 / allTodos) * done;
        return (
            <StyledHeader>
                <h1> To-Do List </h1>

                <div />

                <label>
                    <Checkbox />
                    Show done
                </label>

                <div>
                    <InputField onChange={this._onChange} value={this.state.value} placeholder='Search' />
                    <ClearButton onClick={this.clearInput}/>
                </div>

                <LinearProgress mode="determinate" value={linearProgress || 0} />

            </StyledHeader>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        done: state.todos.get('done'),
        todos: state.todos.get('todos')
    }
}

const mapActionToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapActionToProps)(Header);
