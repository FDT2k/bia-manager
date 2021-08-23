import  {compose } from '@karsegard/composite-js'
const format_number = str => new Number(str);


const decimals = dec => num => num.toFixed(dec);


const percentage = num => `${num}%`;


export const oneDecimal = compose(decimals(1),format_number);
export const oneDecimalPct = compose(percentage,decimals(1),format_number);
export const twoDecimal = compose(decimals(2),format_number);
export const twoDecimalPct = compose(percentage,decimals(2),format_number)
