import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    flex-flow: wrap row;
    justify-content: space-between;
    align-items: center;
    padding: 2% 7%;
    color: grey;

    > div:first-child {
        font-size: 3rem;
        width: 25%;
        font-family: 'Roboto', sans-serif;
    }

    > div:nth-child(2) {
        width: 30%;
    }

    > label {
        display: flex;
        width: 10.5%;
        flex-flow: nowrap row;
        justify-content: space-around;
        align-items: center;
        font-size: 1.6rem;

        > div:first-child {
            width: 14% !important;
        }

        :hover {
            cursor: pointer;
            user-select: none;
        }
    }

    > div:nth-child(4) {
        display: flex;
        flex-flow: nowrap row;
        justify-content: center;
        align-items: stretch;
        width: 25%;
        font-size: 1.6rem;

        border: 1px solid Gainsboro;
        padding: 0.2%;
        border-radius: 3px;
    }

    > div:last-child {
        margin: 4% 0 0 !important;
        height: 0.7rem !important;
    }
`;

export default StyledHeader;
