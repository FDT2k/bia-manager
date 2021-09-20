
import {parse} from './parser'

const progress = (total,current) => postMessage({progress:Math.round(current*100/total)})
const total_count = (total) => postMessage({total:total})

console.log('hello world')
onmessage = e=> parse(e.data,progress,total_count,postMessage);
