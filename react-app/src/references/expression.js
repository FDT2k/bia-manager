
import mexp from 'math-expression-evaluator';
export const evaluateEquation = (values, formula) => {
    const regex = /\{(\s*([\w\.-]+)\s*)\}/g;
    let m = null;
    let evaluator = formula;
    while ((m = regex.exec(formula))) {
        let key = m[1];

        let value = parseFloat(values[m[1]]);
        evaluator = evaluator.replace(m[0], value);
        console.log(evaluator)
    }
    return mexp.eval(evaluator);
}