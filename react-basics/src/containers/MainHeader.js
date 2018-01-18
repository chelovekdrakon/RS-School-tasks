import React, { Component } from 'react';
import AddTodo from './AddTodo';

class MainHeader extends Component {
    render() {
        return (
            <header>
                <AddTodo placeholder='Enter category title'/>
                <AddTodo placeholder='Enter name of To-Do'/>
            </header>
        );
    }
}

export default MainHeader;
