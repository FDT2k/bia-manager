import { compose, divElement, withVariables } from '@karsegard/react-compose';

export const withGridArea =  withVariables(
    _ => `gridArea`,
    x => `${x}`,
    ['area']
);


export const ComponentWithArea = compose(
    withGridArea
)(divElement);
