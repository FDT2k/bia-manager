import ohash from 'object-hash'

const subject_hashes = (subjects, cb) => {
  console.log('hashing subjects')

  let results = [];
  for (let i = 0; i < subjects.length; i++) {
    
    let { hash, id, mesures, mesures_dates, ...rest } = subjects[i];
  
    results.push ({
      ...subjects[i],
      hash:ohash(rest)
    })
  }
  cb(results)

}

const mesures_hashes = (mesures, cb) => {
  let results = [];
  for (let i = 0; i < mesures.length; i++) {
    let { hash,subject_id,mesure_id,id,last_updated, ...rest } = mesures[i];
    results.push ({
      ...mesures[i],
      hash:ohash(rest)
    })
  }

  cb(results)

}
const parse = ({ data: { message, data } }, callback) => {
  console.log('hello', message, data.length)
  switch (message) {
    case 'subject_hashes':
      subject_hashes(data, callback);
      break;
    case 'mesures_hashes':
      mesures_hashes(data, callback);
      break;
  }

}

onmessage = e => parse(e, postMessage);
