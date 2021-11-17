import fs from 'fs/promises';


import openDB from './sqlcipher'

const size = async file => {
    const stats = await fs.stat(file)
    return stats.size;
}


export const determine_file_type = async (file) => {
    let ext = file.split('.').pop();

    if (ext === 'json' || ext === 'sqlite') {
        return ext
    } else {

        const fd = await fs.open(file)
        const { buffer } = await fd.read(Buffer.alloc(30), 0, 30, 0);
        fd.close();

        const content = buffer.toString('utf8');
        if (content.startsWith('{')) {
            return 'json'
        }/* else if (await openDB(file) !== null) {
            console.error('bloup',openDB(file))
            return 'sqlite'
        }*/

    }

    return null;
}


