import React,{PureComponent} from 'react';
import styled from 'styled-components';
import { changeTodo } from '../actions';
import { connect } from 'react-redux';
import InputField from '../components/InputField';
import SaveCancelPanel from '../components/SaveCancelPanel';
import { withRouter } from 'react-router';
import FieldLabel from '../components/FieldLabel';

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 2%;

    > input {
        border: 1px solid Gainsboro;
        border-radius: 0.3rem;
        padding: 0.5rem;
        margin: 0.5rem 0;
    }

    > textarea {
        resize: none;
        width: 100%;
        height: 40rem;

        border-color: Gainsboro;
        font-family: "Roboto", sans-serif;
        outline: none;
    }

    > label {
        margin: 0.5rem;

        > a {
            width: 2.5rem;
        }

        > div {
            font-size: 1.4rem;
            font-family: "Roboto", sans-serif;
        }
    }
`;

class EditSection extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newTodoName: this.props.match.params.todo,
            todoName: this.props.match.params.todo,
            category: this.props.match.params.category,
            description: '',
            isDone: false
        }
    }

    componentDidMount() {
        this.setState({
            description: this.props.todos.getIn([this.state.category, this.state.todoName, 'description']),
            isDone: this.props.todos.getIn([this.state.category, this.state.todoName, 'isDone'])
        })

    }

    onInoutTap = (e) => {
        this.setState({
            newTodoName: e.target.value
        })
    }

    onDescriptionTap = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onToggleDone = () => {
        const isDone = this.state.isDone ? false : true;
        this.setState({
            isDone: isDone
        });
    }

    render() {
        return (
            <SectionWrapper>
                <SaveCancelPanel onSave={() => this.props.saveChanges(this.state)} />

                <InputField
                    onChange={this.onInoutTap}
                    value={this.state.newTodoName}
                    placeholder='Enter new todo name'
                />

                <FieldLabel
                    path={`${this.props.match.url}`}
                    value='Done'
                    checked={this.state.isDone}
                    onClick={this.onToggleDone}
                />

                <textarea value={this.state.description} onChange={this.onDescriptionTap} placeholder="Description"/>
            </SectionWrapper>
        );
    }
}

const mapStateToProps = (state, ) => {
    return {
        todos: state.todos.get('todos')
    }
}

const mapActionToProps = (dispatch) => {
    return {
        saveChanges(state) {
            dispatch(changeTodo(state))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapActionToProps)(EditSection));
