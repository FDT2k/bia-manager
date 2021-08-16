import { is_nil } from "@karsegard/composite-js";


export const find_norme = (norme, gender, age) => {
    let _n = norme[gender];

    let picked;
    for (let i = 0; i < _n.length; i++) {

        let item = _n[i];

        if (!is_nil(item.age_range)) {
            let [min, max] = item.age_range;

            if (age >= min && age <= max) {
                picked = _n[i].values;
                break;
            } else {
                continue;
            }
        } else if (!is_nil(item.age_min)) {

            if (age >= item.age_min) {
                picked = _n[i].values;
                break;
            } else {
                continue;
            }
        }

    }

    return picked;

}



export const ffmi = {
    'M': [
        {
            'age_range': [18, 34],
            'values': [16.8, 21.1]
        },
        {
            'age_range': [35, 54],
            'values': [17.2, 21.7]
        },
        {
            'age_range': [55, 74],
            'values': [16.6, 21.2]
        },
        {
            'age_min': 75,
            'values': [16.6, 21.2]
        }
    ],

    'F': [
        {
            'age_range': [18, 34],
            'values': [13.8, 17.6]
        },
        {
            'age_range': [35, 54],
            'values': [14.4, 18.0]
        },
        {
            'age_range': [55, 74],
            'values': [14.1, 19.0]
        },
        {
            'age_min': 75,
            'values': [12.9, 18.7]
        }
    ]
}


export const fmi = {
    'M': [
        {
            'age_range': [18, 34],
            'values': [2.2, 7.0]
        },
        {
            'age_range': [35, 54],
            'values': [2.5, 7.9]
        },
        {
            'age_range': [55, 74],
            'values': [2.8, 9.3]
        },
        {
            'age_min': 75,
            'values': [3.7, 10.1]
        }
    ],

    'F': [
        {
            'age_range': [18, 34],
            'values': [3.5, 8.7]
        },
        {
            'age_range': [35, 54],
            'values': [3.4, 9.9]
        },
        {
            'age_range': [55, 74],
            'values': [4.5, 13.5]
        },
        {
            'age_min': 75,
            'values': [4.9, 14.3]
        }
    ]
}


export const angle = {
    'M': [
        {
            'age_range': [20, 34],
            'values': [6.5, 8.5]
        },
        {
            'age_range': [35, 54],
            'values': [6.3, 8.2]
        },
        {
            'age_range': [55, 74],
            'values': [5.4, 7.3]
        },
    ],

    'F': [
        {
            'age_range': [18, 34],
            'values': [5.6, 7.5]
        },
        {
            'age_range': [35, 54],
            'values': [5.6, 7.3]
        },
        {
            'age_range': [55, 74],
            'values': [5.0, 6.6]
        }
    ]
}




export const pct_fm = {
    'M': [
        {
            'age_range': [15, 24],
            'values': [9.3, 24.4]
        },
        {
            'age_range': [25, 34],
            'values': [11.0, 26.8]
        },
        {
            'age_range': [35, 44],
            'values': [11.0, 28.1]
        },
        {
            'age_range': [45, 54],
            'values': [11.8, 28.7]
        },
        {
            'age_range': [55, 64],
            'values': [12, 30.6]
        },
        {
            'age_range': [65, 74],
            'values': [14.6, 32.6]
        },
        {
            'age_range': [75, 84],
            'values': [15.5, 31.2]
        },
        {
            'age_min': 85,
            'values': [17.1, 33.4]
        },
    ],

    'F': [
        {
            'age_range': [15, 24],
            'values': [19, 34.9]
        },
        {
            'age_range': [25, 34],
            'values': [17.7, 35.4]
        },
        {
            'age_range': [35, 44],
            'values': [17.8, 35.9]
        },
        {
            'age_range': [45, 54],
            'values': [18.0, 36.5]
        },
        {
            'age_range': [55, 64],
            'values': [21.4, 40.5]
        },
        {
            'age_range': [65, 74],
            'values': [24.4, 44.4]
        },
        {
            'age_range': [75, 84],
            'values': [25.9, 45.2]
        },
        {
            'age_min': 85,
            'values': [22.6, 46.9]
        },
    ]
}



export const pct_ffm = {
    'M': [
        {
            'age_range': [15, 24],
            'values': [75.6, 90.7]
        },
        {
            'age_range': [25, 34],
            'values': [73.2, 89.0]
        },
        {
            'age_range': [35, 44],
            'values': [71.9, 89.0]
        },
        {
            'age_range': [45, 54],
            'values': [71.3, 88.2]
        },
        {
            'age_range': [55, 64],
            'values': [69.4, 88.0]
        },
        {
            'age_range': [65, 74],
            'values': [67.4, 85.4]
        },
        {
            'age_range': [75, 84],
            'values': [68.8, 84.5]
        },
        {
            'age_min': 85,
            'values': [66.6, 82.9]
        },
    ],

    'F': [
        {
            'age_range': [15, 24],
            'values': [65.1, 81]

        },
        {
            'age_range': [25, 34],
            'values': [64.6, 82.3]
        },
        {
            'age_range': [35, 44],
            'values': [64.1, 82.2]
        },
        {
            'age_range': [45, 54],
            'values': [63.5, 82.0]
        },
        {
            'age_range': [55, 64],
            'values': [59.5, 78.6]
        },
        {
            'age_range': [65, 74],
            'values': [55.6, 75.6]
        },
        {
            'age_range': [75, 84],
            'values': [54.8, 74.1]
        },
        {
            'age_min': 85,
            'values': [53.1, 77.4]
        },
    ]
}


export const alpha = {
    M: [
        {
            'age_range': [20, 34],
            'values': [6.5, 8.5]
        },
        {
            'age_range': [35, 54],
            'values': [6.3, 8.2]
        },
        {
            'age_range': [55, 74],
            'values': [5.4, 7.3]
        }
    ],
    F: [

        {
            'age_range': [20, 34],
            'values': [5.6, 7.5]
        },
        {
            'age_range': [35, 54],
            'values': [5.6,7.3]
        },
        {
            'age_range': [55, 74],
            'values': [5.0,6.6]
        }
    ]
}

const normes =  {
    ffmi,
    fmi,
    pct_ffm,
    pct_fm,
    alpha
}

export default normes;