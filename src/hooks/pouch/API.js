
import {curry} from '@geekagency/composite-js'
import {spec} from '@geekagency/composite-js/ObjectUtils'
const getAll = db=> _=> {
    console.log(db)
    return db.allDocs({
        include_docs: true,
        attachments: true
      }).then(res=> res.rows.map(item=> item.doc));
};
const import_data = db=> rows=> {
    console.log(db)
   return db.bulkDocs(rows);
};



const api = {getAll,import_data}

export default spec(api)