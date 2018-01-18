import styled from 'styled-components';

const StyledMain = styled.main`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;

    font-size: 2rem;

    > header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;

        width: 100%;
        padding: 1% 7%;

        > div:last-child {
            margin-left: 45%;
        }

        > div {
            display: flex;
            flex-wrap: nowrap;

            > input {
                border: 1px solid;
                border-radius: 5px 0 0 5px;
                border-color: Gainsboro transparent Gainsboro Gainsboro;
            }
        }
    }
`;

export default StyledMain;
