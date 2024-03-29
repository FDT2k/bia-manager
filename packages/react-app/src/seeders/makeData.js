import { nanoid } from '@reduxjs/toolkit'
import namor from 'namor'

const keys = [
    "nom",
    "prenom",
    "dateNaissance",
    "age",
    "sexe",
    "groupeEthno",
    "groupePath",
    "tailleHab",
    "poidsHab",
  ]

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  return {
    id: nanoid(),
    nom: namor.generate({ words: 1, numbers: 0 }),
    prenom: namor.generate({ words: 1, numbers: 0 }),
   
  }
}

export default function makeData(...lens) {
  console.log('generating data');
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
