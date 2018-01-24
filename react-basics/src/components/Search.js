import React, { Component } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import ClearButton from './ClearButton';

const SearchWrapper = styled.div`
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    align-items: stretch;
    width: 25%;
    font-size: 1.6rem;

    border: 1px solid Gainsboro;
    padding: 0.2%;
    border-radius: 3px;
`;

class Search extends Component {
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
    return (
        <SearchWrapper>
            <InputField onChange={this._onChange} value={this.state.value} placeholder='Search' />
            <ClearButton onClick={this.clearInput}/>
        </SearchWrapper>
    );
}
}

export default Search;
