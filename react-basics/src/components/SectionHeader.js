import React from 'react';
import styled from 'styled-components';
import InputContainer from '../components/InputContainer';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    padding: 1rem 7% 3rem;
`;

const SectionHeader = (props) => {
    return (
        <StyledHeader>
            <InputContainer placeholder={props.placeholder} onSubmit={props.onSubmit} />
        </StyledHeader>
    );
}

export default SectionHeader;
