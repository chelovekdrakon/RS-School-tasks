import React from 'react';
import styled from 'styled-components';
import CategoryField from '../components/CategoryField';
import { INPUT_FIELD, ADD_SUBCATEGORY } from '../constants';
import InputContainer from '../components/InputContainer';
import { checkSelection } from '../math';
import { withRouter } from 'react-router';


const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`;

const getCategoryField = (props, categoryName) => {
    let checked = checkSelection(props, categoryName);
    let pathToThisNode = [...props.pathToNode, categoryName];
    return (
        <CategoryField
            key={categoryName}
            indexCorrection={props.indexCorrection}
            value={categoryName}
            path={categoryName === props.selected ? `/` : `/${props.selected}`}
            onPick={() => checked ? console.log('not today, bro') : props.onPick(pathToThisNode, categoryName)}
            checked={checked}
            onDelete={() => props.onDelete(pathToThisNode)}
            onAdd={() => props.onAdd(pathToThisNode)}
            onTransit={() => props.onTransit(pathToThisNode, props.match.params.todo)}
        />
    );
}

const getCategoryList = (props, categoryName, mapUnderCategory) => {
    let pathToThisNode = [...props.pathToNode, categoryName];
    return (
        <CategoryList
            key={`${categoryName}-map`}
            indexCorrection={props.indexCorrection - 0.03}
            list={mapUnderCategory}
            pathToNode={pathToThisNode}
            confirmAdd={props.confirmAdd}
            selected={props.selected}
            selectedPath={props.selectedPath}
            onPick={props.onPick}
            onDelete={props.onDelete}
            onAdd={props.onAdd}
            onConfirmAdd={props.onConfirmAdd}
            onTransit={props.onTransit}
            match={props.match}
        />
    );
}

const getInputField = (props, categoryName) => {
    return (
        <InputContainer
            key={`${categoryName}-${INPUT_FIELD}`}
            placeholder={ADD_SUBCATEGORY}
            onSubmit={input => props.onConfirmAdd([...props.pathToNode], input)}
        />
    );
}

const CategoryList = (props) => {
    const res = [];

    props.list.forEach( (mapUnderCategory, categoryName) => {
        let element = null;
        if (categoryName === INPUT_FIELD) {
            element = getInputField(props, categoryName)
        } else {
            element = getCategoryField(props, categoryName);
        }
        res.push(element);

        if (mapUnderCategory.size > 0) {
            let nestedList = getCategoryList(props, categoryName, mapUnderCategory);
            res.push(nestedList);
        }
    })

    return (
        <ListWrapper>
            {res}
        </ListWrapper>
    );
}

export default withRouter(CategoryList);
