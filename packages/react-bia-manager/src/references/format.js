import  {compose,curry } from '@karsegard/composite-js'
import { format } from 'date-fns'

const format_number = str => new Number(str);


const decimals = dec => num => num.toFixed(dec);


const percentage = num => `${num}%`;


export const oneDecimal = compose(decimals(1),format_number);
export const oneDecimalPct = compose(percentage,decimals(1),format_number);
export const twoDecimal = compose(decimals(2),format_number);
export const twoDecimalPct = compose(percentage,decimals(2),format_number)


export const format_date = curry((fmt,_date)=> {
  //  console.log(typeof(date), (date instanceof Date))
  try{
    
    let date = _date
    if(! (date instanceof Date)){

        date = new Date(date)
    }


    return format(date,fmt)

  }catch(e){
    console.warn(e)
    return _date.toString();
  }

});

export const dateSysToHuman = format_date("dd.MM.yyyy")
export const dateHumanToSys = format_date("yyyy-MM-dd")