
import {parse} from './parser'

const progress = (total,current) => postMessage({progress:Math.round(current*100/total)})
const total_count = (total) => postMessage({total:total})

const import_subject = (subject,index_key) => postMessage({type:'import_subject',subject,index_key})
const import_mesure = (mesure,index_key) => postMessage({type:'import_mesure',mesure,index_key})
const import_list_item = (key,value) => postMessage({type:'import_list_item',key,value})
  
onmessage = e=> parse(e.data,progress,total_count,postMessage,import_subject,import_mesure,import_list_item);
