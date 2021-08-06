import PouchDB from 'pouchdb-browser';


export default name => {

   return  new PouchDB(name);
};