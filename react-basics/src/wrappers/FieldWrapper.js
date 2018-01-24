import styled from 'styled-components';

const FieldWrapper = styled.li`
    border: 1px solid LightBlue;
    border-radius: 0.2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: ${props => `${props.category * 100}%`};

    > div {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;

        &:last-child {
            justify-content: flex-end;
        }
    }

    > div:first-child {
        display: flex;
        justify-content: ${props => props.category ? 'flex-start' : 'space-between'};
        width: ${props => props.category ? '75%' : '100%'};
        padding: 0 1%;

        > label {
            display: flex;
            align-items: center;

            > div:first-child {
                width: 3rem !important;
            }

            > div:last-child {
                max-width: ${props => `${props.category * 18}rem`};
                white-space: nowrap;
                overflow: hidden;
                text-overflow:ellipsis;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    > div:nth-child(2) {
        width: ${props => props.category ? '15%' : '100%'};
    }
`;

export default FieldWrapper;
