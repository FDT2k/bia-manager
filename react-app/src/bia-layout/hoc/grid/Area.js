import {withBaseClass,withModifiers,withVariables,compose, bem,divElement} from 'bia-layout/utils'

export const withGridArea =  withVariables(
    _ => `gridArea`,
    x => `${x}`,
    ['area']
);


export const ComponentWithArea = compose(
    withGridArea
)(divElement);
