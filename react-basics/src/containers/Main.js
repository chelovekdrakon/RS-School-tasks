import React, { Component } from 'react';
import MainWrapper from '../components/StyledMain';
import MainSection from '../components/MainSection';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryField: '',
            todoField: '',
            categories: ['eoraskjhdjkashdkjashdashaskldjaskljdlkasjaklsjdklajslkdj', 'bla'],
            todos: ['aksljzxcm,n', 'bla'],
        }
    }

    addCategory = (e) => {
        const newArray = Array.from(this.state.categories);
        newArray.unshift(this.state.categoryField);
        this.setState({
            categories: newArray,
            categoryField: '',
        })
    }

    deleteCategory = (e) => {
        console.log(e.target);
        console.log('delete');
    }

    addSubcategory = (e) => {
        console.log(e.target);
        console.log('addSub');
    }

    addTodo = (e) => {
        const newArray = Array.from(this.state.todos);
        newArray.push(this.state.todoField);
        this.setState({
            todos: newArray,
            todoField: '',
        })
    }

    onCategoryTap = (e) => {
        console.log(e.target.value);
        this.setState({
            categoryField: e.target.value
        })
    }

    onTodoTap = (e) => {
        this.setState({
            todoField: e.target.value
        })
    }

    render() {
        return (
            <MainWrapper>
                <MainSection
                    aside category
                    placeholder='Enter category title'
                    todos={this.state.categories}
                    onAdd={this.addCategory}
                    onTap={this.onCategoryTap}
                    value={this.state.categoryField}
                    deleteCategory={this.deleteCategory}
                    addSubcategory={this.addSubcategory}
                />
                <MainSection
                    placeholder='Enter todo task'
                    todos={this.state.todos}
                    onAdd={this.addTodo}
                    onTap={this.onTodoTap}
                    value={this.state.todoField}
                />
            </MainWrapper>
        );
    }
}

export default Main;
