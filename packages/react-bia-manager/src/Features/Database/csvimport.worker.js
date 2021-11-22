
import parse from './parser'

  console.log('worker')
onmessage = e=> parse(e,postMessage);
