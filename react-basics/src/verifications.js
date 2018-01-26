export const checkSelection = (props, categoryName) => {
    const selectedLength = props.selectedPath.length;
    const thisLength = [...props.pathToNode, categoryName].length;

    if (props.selected === categoryName
        && selectedLength === thisLength) {
            return true;
        } else {
            return false;
        }
}
