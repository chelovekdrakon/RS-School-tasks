import React, { Component } from 'react';
import MainWrapper from '../components/StyledMain';
import MainSection from '../components/MainSection';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryField: '',
            todoField: '',
            categories: ['bla', ['eoraskjhdjkashdkjashdashaskldjaskljdlkasjaklsjdklajslkdj', 'kwo', ['lol', 'patch']]],
            todos: ['aksljzxcm,n', 'bla'],
        }
    }

    addCategory = (e) => {
        const newArray = Array.from(this.state.categories);
        const imputValue = this.state.categoryField;

        if (newArray.indexOf(imputValue) > -1) {
            console.log('you already have this category');
            return false;
        } else {
            newArray.unshift(imputValue);
            this.setState({
                categories: newArray,
                categoryField: '',
            })
        }
        console.log(this.state, this.state.set.add);
    }

    deleteCategory = (e) => {
        const element = e.currentTarget.getAttribute('data-key');
        const arr = this.state.categories;
        const newArray = arr.filter( el => el !== element);

        this.setState({
            categories: newArray,
        })
    }

    addSubcategory = (e) => {
        console.log(e.currentTarget.getAttribute('data-key'));
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
                    aside category={1}
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
