import React from 'react';
import styled from 'styled-components';
import CategoryField from './CategoryField';
import { INPUT_FIELD } from '../constants';
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
    let inputField = categoryName === INPUT_FIELD ? true : false;
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
            onEdit={() => props.onEdit(pathToThisNode)}
            onConfirm={input => props.onConfirm([...props.pathToNode], input)}
            onTransit={() => props.onTransit(pathToThisNode, props.match.params.todo)}
            inputField={inputField}
        />
    );
}

const getCategoryList = (props, categoryName, mapUnderCategory) => {
    let pathToThisNode = [...props.pathToNode, categoryName];
    return (
        <CategoryList
            {...props}
            key={`${categoryName}-map`}
            indexCorrection={props.indexCorrection - 0.03}
            list={mapUnderCategory}
            pathToNode={pathToThisNode}
        />
    );
}

const CategoryList = (props) => {
    const res = [];

    props.list.forEach( (mapUnderCategory, categoryName) => {
        let element = getCategoryField(props, categoryName);
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
