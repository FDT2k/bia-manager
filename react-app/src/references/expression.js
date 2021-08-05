
import mexp from 'math-expression-evaluator';

const abs = {
    type:0,
    token:"ABS",
    show:"ABS",
    value:function(a){
        return Math.abs(a);
    }
}


const sqrt = {
    type:0,
    token:"SQRT",
    show:"SQRT",
    value:function(a){
        return Math.sqrt(a);
    }
}

mexp.addToken([abs,sqrt]);  


export const evaluateEquation = (values, formula) => {
    const regex = /\{(\s*([\w\.-]+)\s*)\}/g;
    let m = null;
    let evaluator = formula;
    while ((m = regex.exec(formula))) {
        let key = m[1];

        let value = parseFloat(values[m[1]]);
        evaluator = evaluator.replace(m[0], value);
    }
    return {result: mexp.eval(evaluator), log:evaluator }
}