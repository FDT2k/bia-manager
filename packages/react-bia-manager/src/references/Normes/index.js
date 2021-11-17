import { is_nil } from "@karsegard/composite-js";


export const find_norme = (norme, gender, age) => {
    let _n = norme[gender];

    if (_n && _n.length > 0) {
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
    return null

}

export const raw = [
    { type: 'ffmi', sex: 'M', age_range: [18, 34], values: [16.8, 21.1] },
    { type: 'ffmi', sex: 'M', age_range: [35, 54], values: [17.2, 21.7] },
    { type: 'ffmi', sex: 'M', age_range: [55, 74], values: [16.6, 21.2] },
    { type: 'ffmi', sex: 'M', age_min: 75, values: [16.6, 21.2] },
    { type: 'ffmi', sex: 'F', age_range: [18 - 34], values: [13.8, 17.6] },
    { type: 'ffmi', sex: 'F', age_range: [35, 54], values: [14.4, 18.0] },
    { type: 'ffmi', sex: 'F', age_range: [55, 74], values: [14.1, 19.0] },
    { type: 'ffmi', sex: 'F', age_min: 75, values: [12.9, 18.7], },
    { type: 'fmi', sex: 'M', age_range: [18, 34], values: [2.2, 7.0] },
    { type: 'fmi', sex: 'M', age_range: [35, 54], values: [2.5, 7.9] },
    { type: 'fmi', sex: 'M', age_range: [55, 74], values: [2.8, 9.3] },
    { type: 'fmi', sex: 'M', age_min: 75, values: [3.7, 10.1] },
    { type: 'fmi', sex: 'F', age_range: [18, 34], values: [3.5, 8.7] },
    { type: 'fmi', sex: 'F', age_range: [35, 54], values: [3.4, 9.9] },
    { type: 'fmi', sex: 'F', age_range: [55, 74], values: [4.5, 13.5] },
    { type: 'fmi', sex: 'F', age_min: 75, values: [4.9, 14.3] },
    { type: 'alpha', sex: 'M', age_range: [20, 34], values: [6.5, 8.5] },
    { type: 'alpha', sex: 'M', age_range: [35, 54], values: [6.3, 8.2] },
    { type: 'alpha', sex: 'M', age_range: [55, 74], values: [5.4, 7.3] },
    { type: 'alpha', sex: 'F', age_range: [18, 34], values: [5.6, 7.5] },
    { type: 'alpha', sex: 'F', age_range: [35, 54], values: [5.6, 7.3] },
    { type: 'alpha', sex: 'F', age_range: [55, 74], values: [5.0, 6.6] },
    { type: 'pct_fm', sex: 'M', age_range: [15, 24], values: [9.3, 24.4] },
    { type: 'pct_fm', sex: 'M', age_range: [25, 34], values: [11.0, 26.8] },
    { type: 'pct_fm', sex: 'M', age_range: [35, 44], values: [11.0, 28.1] },
    { type: 'pct_fm', sex: 'M', age_range: [45, 54], values: [11.8, 28.7] },
    { type: 'pct_fm', sex: 'M', age_range: [55, 64], values: [12, 30.6] },
    { type: 'pct_fm', sex: 'M', age_range: [65, 74], values: [14.6, 32.6] },
    { type: 'pct_fm', sex: 'M', age_range: [75, 84], values: [15.5, 31.2] },
    { type: 'pct_fm', sex: 'M', age_min: 85, values: [17.1, 33.4] },
    { type: 'pct_fm', sex: 'F', age_range: [15, 24], values: [19, 34.9] },
    { type: 'pct_fm', sex: 'F', age_range: [25, 34], values: [17.7, 35.4] },
    { type: 'pct_fm', sex: 'F', age_range: [35, 44], values: [17.8, 35.9] },
    { type: 'pct_fm', sex: 'F', age_range: [45, 54], values: [18.0, 36.5] },
    { type: 'pct_fm', sex: 'F', age_range: [55, 64], values: [21.4, 40.5] },
    { type: 'pct_fm', sex: 'F', age_range: [65, 74], values: [24.4, 44.4] },
    { type: 'pct_fm', sex: 'F', age_range: [75, 84], values: [25.9, 45.2] },
    { type: 'pct_fm', sex: 'F', age_min: 85, values: [22.6, 46.9] },
    { type: 'pct_ffm', sex: 'M', age_range: [15, 24], values: [75.6, 90.7] },
    { type: 'pct_ffm', sex: 'M', age_range: [25, 34], values: [73.2, 89.0] },
    { type: 'pct_ffm', sex: 'M', age_range: [35, 44], values: [71.9, 89.0] },
    { type: 'pct_ffm', sex: 'M', age_range: [45, 54], values: [71.3, 88.2] },
    { type: 'pct_ffm', sex: 'M', age_range: [55, 64], values: [69.4, 88.0] },
    { type: 'pct_ffm', sex: 'M', age_range: [65, 74], values: [67.4, 85.4] },
    { type: 'pct_ffm', sex: 'M', age_range: [75, 84], values: [68.8, 84.5] },
    { type: 'pct_ffm', sex: 'M', age_min: 85, values: [66.6, 82.9] },
    { type: 'pct_ffm', sex: 'F', age_range: [15, 24], values: [65.1, 81] },
    { type: 'pct_ffm', sex: 'F', age_range: [25, 34], values: [64.6, 82.3] },
    { type: 'pct_ffm', sex: 'F', age_range: [35, 44], values: [64.1, 82.2] },
    { type: 'pct_ffm', sex: 'F', age_range: [45, 54], values: [63.5, 82.0] },
    { type: 'pct_ffm', sex: 'F', age_range: [55, 64], values: [59.5, 78.6] },
    { type: 'pct_ffm', sex: 'F', age_range: [65, 74], values: [55.6, 75.6] },
    { type: 'pct_ffm', sex: 'F', age_range: [75, 84], values: [54.8, 74.1] },
    { type: 'pct_ffm', sex: 'F', age_min: 85, values: [53.1, 77.4] },
    { type: 'pct_dffm', sex: 'M', age_range: [15, 24], values: [19.5, 23.3] },
    { type: 'pct_dffm', sex: 'M', age_range: [25, 34], values: [19.7, 23.3] },
    { type: 'pct_dffm', sex: 'M', age_range: [35, 44], values: [19.5, 23.4] },
    { type: 'pct_dffm', sex: 'M', age_range: [45, 54], values: [19.2, 22.9] },
    { type: 'pct_dffm', sex: 'M', age_range: [55, 64], values: [18.7, 22.9] },
    { type: 'pct_dffm', sex: 'M', age_range: [65, 74], values: [18.2, 22.6] },
    { type: 'pct_dffm', sex: 'M', age_min: 75, values: [18.2, 22.6] },
    { type: 'pct_dffm', sex: 'F', age_range: [15, 24], values: [17.6, 20.8] },
    { type: 'pct_dffm', sex: 'F', age_range: [25, 34], values: [17.5, 20.4] },
    { type: 'pct_dffm', sex: 'F', age_range: [35, 44], values: [16.9, 20.3] },
    { type: 'pct_dffm', sex: 'F', age_range: [45, 54], values: [16.8, 20.3] },
    { type: 'pct_dffm', sex: 'F', age_range: [55, 64], values: [16.4, 19.8] },
    { type: 'pct_dffm', sex: 'F', age_range: [65, 74], values: [14.9, 19.2] },
    { type: 'pct_dffm', sex: 'F', age_min: 75, values: [14.9, 19.2] },

    { type: 'fds_main', sex: 'F', age_range: [18, 19], values: [22.4, 41.6] },
    { type: 'fds_main', sex: 'F', age_range: [20, 24], values: [22.6, 44.2] },
    { type: 'fds_main', sex: 'F', age_range: [25, 29], values: [22.9, 45.7] },
    { type: 'fds_main', sex: 'F', age_range: [30, 34], values: [22.0, 45.6] },
    { type: 'fds_main', sex: 'F', age_range: [35, 39], values: [22.4, 49.2] },
    { type: 'fds_main', sex: 'F', age_range: [40, 44], values: [22.0, 46.0] },
    { type: 'fds_main', sex: 'F', age_range: [45, 49], values: [23.5, 44.7] },
    { type: 'fds_main', sex: 'F', age_range: [50, 54], values: [24.7, 42.7] },
    { type: 'fds_main', sex: 'F', age_range: [55, 59], values: [22.1, 41.7] },
    { type: 'fds_main', sex: 'F', age_range: [60, 64], values: [17.7, 39.7] },
    { type: 'fds_main', sex: 'F', age_range: [65, 69], values: [22.3, 36.7] },
    { type: 'fds_main', sex: 'F', age_range: [70, 74], values: [12.8, 40.0] },
    { type: 'fds_main', sex: 'F', age_range: [75, 79], values: [16.0, 34.0] },
    { type: 'fds_main', sex: 'F', age_range: [80, 84], values: [8.8, 29.6] },
    { type: 'fds_main', sex: 'F', age_min: 85, values: [7.3, 26.5] },

    { type: 'fds', sex: 'F', age_range: [18, 19], values: [22.5, 38.9] },
    { type: 'fds', sex: 'F', age_range: [20, 24], values: [21.9, 41.1] },
    { type: 'fds', sex: 'F', age_range: [25, 29], values: [21.4, 45.8] },
    { type: 'fds', sex: 'F', age_range: [30, 34], values: [23.4, 41.8] },
    { type: 'fds', sex: 'F', age_range: [35, 39], values: [22.8, 46.4] },
    { type: 'fds', sex: 'F', age_range: [40, 44], values: [24.1, 45.3] },
    { type: 'fds', sex: 'F', age_range: [45, 49], values: [22.6, 44.6] },
    { type: 'fds', sex: 'F', age_range: [50, 54], values: [24.5, 42.9] },
    { type: 'fds', sex: 'F', age_range: [55, 59], values: [19.7, 43.3] },
    { type: 'fds', sex: 'F', age_range: [60, 64], values: [17.7, 38.9] },
    { type: 'fds', sex: 'F', age_range: [65, 69], values: [18.8, 36.8] },
    { type: 'fds', sex: 'F', age_range: [70, 74], values: [15.0, 37.0] },
    { type: 'fds', sex: 'F', age_range: [75, 79], values: [14.1, 33.3] },
    { type: 'fds', sex: 'F', age_range: [80, 84], values: [9.5, 29.9] },
    { type: 'fds', sex: 'F', age_min: 85, values: [6.9, 26.5] },




    { type: 'fds_main', sex: 'M', age_range: [18, 19], values: [38.0, 64.4] },
    { type: 'fds_main', sex: 'M', age_range: [20, 24], values: [36.5, 71.3] },
    { type: 'fds_main', sex: 'M', age_range: [25, 29], values: [38.0, 68.0] },
    { type: 'fds_main', sex: 'M', age_range: [30, 34], values: [40.8, 69.2] },
    { type: 'fds_main', sex: 'M', age_range: [35, 39], values: [40.1, 71.7] },
    { type: 'fds_main', sex: 'M', age_range: [40, 44], values: [38.0, 70.4] },
    { type: 'fds_main', sex: 'M', age_range: [45, 49], values: [35.2, 68.4] },
    { type: 'fds_main', sex: 'M', age_range: [50, 54], values: [32.6, 69.0] },
    { type: 'fds_main', sex: 'M', age_range: [55, 59], values: [36.4, 70.8] },
    { type: 'fds_main', sex: 'M', age_range: [60, 64], values: [35.1, 60.7] },
    { type: 'fds_main', sex: 'M', age_range: [65, 69], values: [29.4, 56.6] },
    { type: 'fds_main', sex: 'M', age_range: [70, 74], values: [23.9, 59.5] },
    { type: 'fds_main', sex: 'M', age_range: [75, 79], values: [17.4, 56.2] },
    { type: 'fds_main', sex: 'M', age_range: [80, 84], values: [12.5, 48.9] },
    { type: 'fds_main', sex: 'M', age_min: 85, values: [10.0, 34.8] },



    { type: 'fds', sex: 'M', age_range: [18, 19], values: [32.9, 63.7] },
    { type: 'fds', sex: 'M', age_range: [20, 24], values: [34.2, 68.2] },
    { type: 'fds', sex: 'M', age_range: [25, 29], values: [35.4, 65.4] },
    { type: 'fds', sex: 'M', age_range: [30, 34], values: [37.9, 67.1] },
    { type: 'fds', sex: 'M', age_range: [35, 39], values: [36.2, 71.0] },
    { type: 'fds', sex: 'M', age_range: [40, 44], values: [36.4, 70.4] },
    { type: 'fds', sex: 'M', age_range: [45, 49], values: [45.6, 74.4] },
    { type: 'fds', sex: 'M', age_range: [50, 54], values: [41.4, 77.0] },
    { type: 'fds', sex: 'M', age_range: [55, 59], values: [35.1, 67.1] },
    { type: 'fds', sex: 'M', age_range: [60, 64], values: [34.6, 60.6] },
    { type: 'fds', sex: 'M', age_range: [65, 69], values: [29.5, 55.1] },
    { type: 'fds', sex: 'M', age_range: [70, 74], values: [23.6, 58.0] },
    { type: 'fds', sex: 'M', age_range: [75, 79], values: [18.8, 54.4] },
    { type: 'fds', sex: 'M', age_range: [80, 84], values: [12.0, 46.8] },
    { type: 'fds', sex: 'M', age_min: 85, values: [11.4, 35.0] },



    { type: 'ideal_weight', sex: 'M', height: 157, values: 61.6, },
    { type: 'ideal_weight', sex: 'M', height: 158, values: 62.0, },
    { type: 'ideal_weight', sex: 'M', height: 159, values: 62.4, },
    { type: 'ideal_weight', sex: 'M', height: 160, values: 62.8, },
    { type: 'ideal_weight', sex: 'M', height: 161, values: 63.2, },
    { type: 'ideal_weight', sex: 'M', height: 162, values: 63.6, },
    { type: 'ideal_weight', sex: 'M', height: 163, values: 64.0, },
    { type: 'ideal_weight', sex: 'M', height: 164, values: 64.4, },
    { type: 'ideal_weight', sex: 'M', height: 165, values: 64.8, },
    { type: 'ideal_weight', sex: 'M', height: 166, values: 65.2, },
    { type: 'ideal_weight', sex: 'M', height: 167, values: 65.7, },
    { type: 'ideal_weight', sex: 'M', height: 168, values: 66.2, },
    { type: 'ideal_weight', sex: 'M', height: 169, values: 66.7, },
    { type: 'ideal_weight', sex: 'M', height: 170, values: 67.3, },
    { type: 'ideal_weight', sex: 'M', height: 171, values: 67.8, },
    { type: 'ideal_weight', sex: 'M', height: 172, values: 68.3, },
    { type: 'ideal_weight', sex: 'M', height: 173, values: 68.9, },
    { type: 'ideal_weight', sex: 'M', height: 174, values: 69.4, },
    { type: 'ideal_weight', sex: 'M', height: 175, values: 70.0, },
    { type: 'ideal_weight', sex: 'M', height: 176, values: 70.5, },
    { type: 'ideal_weight', sex: 'M', height: 177, values: 71.1, },
    { type: 'ideal_weight', sex: 'M', height: 178, values: 71.6, },
    { type: 'ideal_weight', sex: 'M', height: 179, values: 72.2, },
    { type: 'ideal_weight', sex: 'M', height: 180, values: 72.8, },
    { type: 'ideal_weight', sex: 'M', height: 181, values: 73.4, },
    { type: 'ideal_weight', sex: 'M', height: 182, values: 74.0, },
    { type: 'ideal_weight', sex: 'M', height: 183, values: 74.7, },
    { type: 'ideal_weight', sex: 'M', height: 184, values: 75.4, },
    { type: 'ideal_weight', sex: 'M', height: 185, values: 76.1, },
    { type: 'ideal_weight', sex: 'M', height: 186, values: 76.7, },
    { type: 'ideal_weight', sex: 'M', height: 187, values: 77.4, },
    { type: 'ideal_weight', sex: 'M', height: 188, values: 78.0, },
    { type: 'ideal_weight', sex: 'M', height: 189, values: 78.7, },
    { type: 'ideal_weight', sex: 'M', height: 190, values: 79.3, },
    { type: 'ideal_weight', sex: 'M', height: 191, values: 80.0, },
    { type: 'ideal_weight', sex: 'M', height: 192, values: 80.7, },
    { type: 'ideal_weight', sex: 'M', height: 193, values: 81.4, },


    { type: 'ideal_weight', sex: 'F', height: 147, values: 52.0 },
    { type: 'ideal_weight', sex: 'F', height: 148, values: 52.4 },
    { type: 'ideal_weight', sex: 'F', height: 149, values: 52.8 },
    { type: 'ideal_weight', sex: 'F', height: 150, values: 53.2 },
    { type: 'ideal_weight', sex: 'F', height: 151, values: 53.7 },
    { type: 'ideal_weight', sex: 'F', height: 152, values: 54.2 },
    { type: 'ideal_weight', sex: 'F', height: 153, values: 54.7 },
    { type: 'ideal_weight', sex: 'F', height: 154, values: 55.2 },
    { type: 'ideal_weight', sex: 'F', height: 155, values: 55.7 },
    { type: 'ideal_weight', sex: 'F', height: 156, values: 56.2 },
    { type: 'ideal_weight', sex: 'F', height: 157, values: 56.7 },
    { type: 'ideal_weight', sex: 'F', height: 158, values: 57.2 },
    { type: 'ideal_weight', sex: 'F', height: 159, values: 57.7 },
    { type: 'ideal_weight', sex: 'F', height: 160, values: 58.2 },
    { type: 'ideal_weight', sex: 'F', height: 161, values: 58.7 },
    { type: 'ideal_weight', sex: 'F', height: 162, values: 59.3 },
    { type: 'ideal_weight', sex: 'F', height: 163, values: 59.8 },
    { type: 'ideal_weight', sex: 'F', height: 164, values: 60.4 },
    { type: 'ideal_weight', sex: 'F', height: 165, values: 60.9 },
    { type: 'ideal_weight', sex: 'F', height: 166, values: 61.5 },
    { type: 'ideal_weight', sex: 'F', height: 167, values: 62.1 },
    { type: 'ideal_weight', sex: 'F', height: 168, values: 62.6 },
    { type: 'ideal_weight', sex: 'F', height: 169, values: 63.2 },
    { type: 'ideal_weight', sex: 'F', height: 170, values: 63.7 },
    { type: 'ideal_weight', sex: 'F', height: 171, values: 64.3 },
    { type: 'ideal_weight', sex: 'F', height: 172, values: 64.8 },
    { type: 'ideal_weight', sex: 'F', height: 173, values: 65.3 },
    { type: 'ideal_weight', sex: 'F', height: 174, values: 65.9 },
    { type: 'ideal_weight', sex: 'F', height: 175, values: 66.4 },
    { type: 'ideal_weight', sex: 'F', height: 176, values: 66.9 },
    { type: 'ideal_weight', sex: 'F', height: 177, values: 67.5 },
    { type: 'ideal_weight', sex: 'F', height: 178, values: 68.0 },
    { type: 'ideal_weight', sex: 'F', height: 179, values: 68.5 },
    { type: 'ideal_weight', sex: 'F', height: 180, values: 69.1 },
    { type: 'ideal_weight', sex: 'F', height: 181, values: 69.6 },
    { type: 'ideal_weight', sex: 'F', height: 182, values: 70.2 },
    { type: 'ideal_weight', sex: 'F', height: 183, values: 70.8 },


]


























































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
            'values': [5.6, 7.3]
        },
        {
            'age_range': [55, 74],
            'values': [5.0, 6.6]
        }
    ]
}



const normes = {
    ffmi,
    fmi,
    pct_ffm,
    pct_fm,
    alpha
}

export default normes;