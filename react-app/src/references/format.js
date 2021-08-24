import  {compose,curry } from '@karsegard/composite-js'
import { format } from 'date-fns'

const format_number = str => new Number(str);


const decimals = dec => num => num.toFixed(dec);


const percentage = num => `${num}%`;


export const oneDecimal = compose(decimals(1),format_number);
export const oneDecimalPct = compose(percentage,decimals(1),format_number);
export const twoDecimal = compose(decimals(2),format_number);
export const twoDecimalPct = compose(percentage,decimals(2),format_number)


export const format_date = curry((fmt,date)=> format(date,fmt));

export const dateSysToHuman = format_date("dd/MM/yyyy")
export const dateHumanToSys = format_date("yyyy-MM-dd")