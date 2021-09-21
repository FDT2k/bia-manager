import db  from '@/hooks/dexie/db'


onmessage = event => {

    const {data}  = event;

    postMessage('Hey');
};
