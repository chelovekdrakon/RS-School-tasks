import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import ClearButton from './ClearButton';
import { withRouter } from 'react-router';

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

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.timerID = '';

        this.state = {
            value: '',
        }
    }

    _onChange = (e) => {
        let verified = e.target.value.match(/[a-zA-Z0-9_\s]*/gim);
        verified = verified ? verified.join('') : '';
        this.setState({
            value: verified
        });

        verified = verified.replace(/\s/gim, '_');
        this.props.history.push(`/${verified}`);
    }

    clearInput = () => {
        this.setState({
            value: '',
        });
    }

    componentDidUpdate(prevProps, prevState) {
        clearTimeout(this.timerID);
        if (this.state.value !== '') {
            this.timerID = setTimeout(this.props.onTap, 170, this.state.value);
        } else {
            this.props.onTap(this.state.value);
        }
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

export default withRouter(SearchBar);
