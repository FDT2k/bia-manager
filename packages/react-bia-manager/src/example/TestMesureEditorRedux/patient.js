export default  {
        lastname: 'asdgasd',
        firstname: 'asdgasdg',
        birthdate: '1952-11-27',
        age: 68,
        gender: 'F',
        groups: {
          ethno: 'Caucasien',
          patho: 'OB-CH'
        },
        usual_height: '181',
        usual_weight: '0',
        mesures: [
          {
            date: '2011-05-23',
            height: '181.0',
            weight: '138.2',
            bmi: '42.2',
            left_side: false,
            machine: 'Xitron',
            data: {
              z50: '468',
              a50: '5.3',
              res50: '466',
              rea50: '43',
              z5: '525',
              a5: '2.4',
              res5: '525',
              rea5: '22',
              z100: '445',
              a100: '5.1',
              res100: '443',
              rea100: '40'
            },
            smoker: false,
            sport: {
              type: 'inconnue',
              rate: 'inconnue'
            },
            comments: '',
            examinator: 'Karsegard',
            bmi_ref: '42.2'
          },
          {
            date: '2011-06-27',
            height: '181.0',
            weight: '124.9',
            bmi: '38.1',
            left_side: false,
            machine: 'Xitron',
            data: {
              z50: '498',
              a50: '5.0',
              res50: '496',
              rea50: '43',
              z5: '554',
              a5: '2.2',
              res5: '554',
              rea5: '21',
              z100: '476',
              a100: '5.0',
              res100: '474',
              rea100: '41'
            },
            smoker: false,
            sport: {
              type: 'inconnue',
              rate: 'inconnue'
            },
            comments: 'Perte de 13.3 kg en 1 mois avec diminution de la masse grasse (-8.9 kg) et de la masse  non-grasse (-4.4 kg dont 1.2 protéique) Amélioration de la composition corporelle.',
            examinator: 'Karsegard',
            bmi_ref: '38.1'
          },
          {
            date: '2012-05-24',
            height: '181.0',
            weight: '84.7',
            bmi: '25.9',
            left_side: false,
            machine: 'Xitron',
            data: {
              z50: '488',
              a50: '4.3',
              res50: '487',
              rea50: '37',
              z5: '527',
              a5: '1.5',
              res5: '527',
              rea5: '14',
              z100: '468',
              a100: '4.8',
              res100: '466',
              rea100: '39'
            },
            smoker: false,
            sport: {
              type: 'N/A',
              rate: 'modérée'
            },
            comments: 'Perte de 53.5 kg en 1 an avec diminution de la masse grasse (-45 kg) et, dans une faible  proportion de la masse non-grasse (-8.5 kg dont 0.5 kg de masse protéique). Très forte amélioration de la composition corporelle avec une très bonne conservation de la masse musculaire.',
            examinator: 'Karsegard',
            bmi_ref: '',
            status: 'active',
            ideal_weight: 73.71225,
            pct_ideal_weight: 114.90627405892508,
            most_accurate_formula: 'kushner',
            current_age: 59,
            fds: {
              left: {
                main: true,
                data: {
                  '0': '12',
                  '1': '12',
                  '2': '12'
                },
                avg: 12,
                norme: [
                  22.1,
                  41.7
                ]
              },
              right: {
                main: false,
                data: {
                  '0': '12',
                  '1': '21',
                  '2': '12'
                },
                avg: 15,
                norme: [
                  19.7,
                  43.3
                ]
              }
            },
            bia: [
              {
                label: 'water',
                values: {
                  segal: 38.8947324858,
                  kushner: 42.92950714579056
                },
                limits: {},
                logs: {
                  segal: '0.73 * 53.28045546',
                  kushner: '8.3148 + ( (0.3821 * pow( 181,2) ) / 487) + 0.1052 * 84.7'
                },
                display: true
              },
              {
                label: 'pct_water',
                values: {
                  segal: 45.9205814472255,
                  kushner: 50.68418789349535
                },
                limits: {},
                logs: {
                  segal: '38.8947324858/84.7 *100 ',
                  kushner: '42.92950714579056/84.7 *100 '
                },
                display: true
              },
              {
                label: 'ffm',
                values: {
                  gva: 55.118102464065714,
                  segal: 53.28045546,
                  kushner: 61.210315801437375
                },
                limits: {},
                logs: {
                  gva: '-4.104 + ((0.518 * (181^2) / 487) +(0.231 * 84.7) + (0.130 * 37) + (4.229 * 0)',
                  segal: '(0.00091186 * (pow(181,2)))-(0.01486*487) + (0.2999 * 84.7)-(0.07012 * 59) + 9.37938',
                  kushner: '84.7- (84.7*27.7328030679606/100)'
                },
                display: true
              },
              {
                label: 'pct_ffm',
                values: {
                  norme: '59.5-78.6',
                  gva: 65.07450113821217,
                  segal: 62.90490609208973,
                  kushner: 72.2671969320394
                },
                limits: {
                  gva: [
                    59.5,
                    78.6
                  ],
                  segal: [
                    59.5,
                    78.6
                  ],
                  kushner: [
                    59.5,
                    78.6
                  ]
                },
                logs: {
                  gva: '55.118102464065714 *100 / 84.7',
                  segal: '53.28045546/84.7*100',
                  kushner: '61.210315801437375/84.7*100'
                },
                display: true
              },
              {
                label: 'ffmi',
                values: {
                  norme: '14.1-19',
                  gva: 16.82430403957929,
                  segal: 16.263378852904367,
                  kushner: 18.683897256322265
                },
                limits: {
                  gva: [
                    14.1,
                    19
                  ],
                  segal: [
                    14.1,
                    19
                  ],
                  kushner: [
                    14.1,
                    19
                  ]
                },
                logs: {
                  gva: '55.118102464065714 / ((181/100)^2 )',
                  segal: '53.28045546 / ((181/100)^2 )',
                  kushner: '61.210315801437375 / ((181/100)^2 )'
                },
                display: true
              },
              {
                label: 'dffm',
                values: {
                  segal: 14.3857229742,
                  kushner: 18.280808655646815
                },
                limits: {},
                logs: {
                  segal: '53.28045546 - 38.8947324858',
                  kushner: '61.210315801437375-42.92950714579056'
                },
                display: true
              },
              {
                label: 'pct_dffm',
                values: {
                  norme: '16.4-19.8',
                  segal: 16.984324644864227,
                  kushner: 21.583009038544056
                },
                limits: {
                  segal: [
                    16.4,
                    19.8
                  ],
                  kushner: [
                    16.4,
                    19.8
                  ]
                },
                logs: {
                  segal: '14.3857229742/84.7*100',
                  kushner: '18.280808655646815/84.7*100'
                },
                display: true
              },
              {
                label: 'fm',
                values: {
                  gva: 29.58189753593429,
                  segal: 31.419544540000004,
                  kushner: 23.489684198562628
                },
                limits: {},
                logs: {
                  gva: '84.7 - 55.118102464065714',
                  segal: '84.7 - 53.28045546',
                  kushner: '84.7*27.7328030679606 /100 '
                },
                display: true
              },
              {
                label: 'pct_fm',
                values: {
                  norme: '21.4-40.5',
                  gva: 34.92549886178783,
                  segal: 37.095093907910275,
                  kushner: 27.7328030679606
                },
                limits: {
                  gva: [
                    21.4,
                    40.5
                  ],
                  segal: [
                    21.4,
                    40.5
                  ],
                  kushner: [
                    21.4,
                    40.5
                  ]
                },
                logs: {
                  gva: '29.58189753593429 * 100 / 84.7',
                  segal: '31.419544540000004 * 100 / 84.7',
                  kushner: 'ABS(1-(0.3981 * 67.27104722792608 + (0.3066 * 84.7) + 0.0952999 * (181-100) + 0.7414) / 84.7)*100'
                },
                display: true
              },
              {
                label: 'fmi',
                values: {
                  norme: '4.5-13.5',
                  gva: 9.029607623678853,
                  segal: 9.590532810353775,
                  kushner: 7.170014406935877
                },
                limits: {
                  gva: [
                    4.5,
                    13.5
                  ],
                  segal: [
                    4.5,
                    13.5
                  ],
                  kushner: [
                    4.5,
                    13.5
                  ]
                },
                logs: {
                  gva: '29.58189753593429 / ((181/100)^2 )',
                  segal: '31.419544540000004 / ((181/100)^2 )',
                  kushner: '23.489684198562628 / ((181/100)^2 )'
                },
                display: true
              }
            ]
          },
          {
            date: '2021-11-17',
            height: '177',
            weight: '55',
            left_side: false,
            machine: 'NUTRIGUARD',
            data: {
              z50: '445',
              a50: '3.0',
              res50: '444',
              rea50: '23',
              z5: '0',
              a5: '-1.0',
              res5: 0,
              rea5: 0,
              z100: '0',
              a100: '-1.0',
              res100: 0,
              rea100: 0
            },
            examinator: '',
            status: 'active',
            bmi: '17.6',
            ideal_weight: 70.49025,
            pct_ideal_weight: 78.02497508520682,
            comments: '',
            most_accurate_formula: 'kushner',
            bmi_ref: '',
            current_age: 68,
            fds: {
              left: {
                main: false,
                data: {
                  '0': '',
                  '1': '',
                  '2': ''
                },
                avg: '',
                norme: ''
              },
              right: {
                main: false,
                data: {
                  '0': '',
                  '1': '',
                  '2': ''
                },
                avg: '',
                norme: ''
              }
            },
            bia: [
              {
                label: 'water',
                values: {
                  segal: 31.4451456162,
                  kushner: 41.062085810810814
                },
                limits: {},
                logs: {
                  segal: '0.73 * 43.07554194',
                  kushner: '8.3148 + ( (0.3821 * pow( 177,2) ) / 444) + 0.1052 * 55'
                },
                display: true
              },
              {
                label: 'pct_water',
                values: {
                  segal: 57.17299202945455,
                  kushner: 74.65833783783783
                },
                limits: {},
                logs: {
                  segal: '31.4451456162/55 *100 ',
                  kushner: '41.062085810810814/55 *100 '
                },
                display: true
              },
              {
                label: 'ffm',
                values: {
                  gva: 48.1415,
                  segal: 43.07554194,
                  kushner: 53.03275108378378
                },
                limits: {},
                logs: {
                  gva: '-4.104 + ((0.518 * (177^2) / 444) +(0.231 * 55) + (0.130 * 23) + (4.229 * 0)',
                  segal: '(0.00091186 * (pow(177,2)))-(0.01486*444) + (0.2999 * 55)-(0.07012 * 68) + 9.37938',
                  kushner: '55- (55*3.576816211302225/100)'
                },
                display: true
              },
              {
                label: 'pct_ffm',
                values: {
                  norme: '55.6-75.6',
                  gva: 87.52999999999999,
                  segal: 78.31916716363637,
                  kushner: 96.42318378869777
                },
                limits: {
                  gva: [
                    55.6,
                    75.6
                  ],
                  segal: [
                    55.6,
                    75.6
                  ],
                  kushner: [
                    55.6,
                    75.6
                  ]
                },
                logs: {
                  gva: '48.1415 *100 / 55',
                  segal: '43.07554194/55*100',
                  kushner: '53.03275108378378/55*100'
                },
                display: true
              },
              {
                label: 'ffmi',
                values: {
                  norme: '14.1-19',
                  gva: 15.366433655718343,
                  segal: 13.749414899932969,
                  kushner: 16.92768715368629
                },
                limits: {
                  gva: [
                    14.1,
                    19
                  ],
                  segal: [
                    14.1,
                    19
                  ],
                  kushner: [
                    14.1,
                    19
                  ]
                },
                logs: {
                  gva: '48.1415 / ((177/100)^2 )',
                  segal: '43.07554194 / ((177/100)^2 )',
                  kushner: '53.03275108378378 / ((177/100)^2 )'
                },
                display: true
              },
              {
                label: 'dffm',
                values: {
                  segal: 11.6303963238,
                  kushner: 11.970665272972965
                },
                limits: {},
                logs: {
                  segal: '43.07554194 - 31.4451456162',
                  kushner: '53.03275108378378-41.062085810810814'
                },
                display: true
              },
              {
                label: 'pct_dffm',
                values: {
                  norme: '14.9-19.2',
                  segal: 21.146175134181817,
                  kushner: 21.764845950859936
                },
                limits: {
                  segal: [
                    14.9,
                    19.2
                  ],
                  kushner: [
                    14.9,
                    19.2
                  ]
                },
                logs: {
                  segal: '11.6303963238/55*100',
                  kushner: '11.970665272972965/55*100'
                },
                display: true
              },
              {
                label: 'fm',
                values: {
                  gva: 6.858499999999999,
                  segal: 11.92445806,
                  kushner: 1.967248916216224
                },
                limits: {},
                logs: {
                  gva: '55 - 48.1415',
                  segal: '55 - 43.07554194',
                  kushner: '55*3.576816211302225 /100 '
                },
                display: true
              },
              {
                label: 'pct_fm',
                values: {
                  norme: '24.4-44.4',
                  gva: 12.469999999999999,
                  segal: 21.680832836363635,
                  kushner: 3.576816211302225
                },
                limits: {
                  gva: [
                    24.4,
                    44.4
                  ],
                  segal: [
                    24.4,
                    44.4
                  ],
                  kushner: [
                    24.4,
                    44.4
                  ]
                },
                logs: {
                  gva: '6.858499999999999 * 100 / 55',
                  segal: '11.92445806 * 100 / 55',
                  kushner: 'ABS(1-(0.3981 * 70.5608108108108 + (0.3066 * 55) + 0.0952999 * (177-100) + 0.7414) / 55)*100'
                },
                display: true
              },
              {
                label: 'fmi',
                values: {
                  norme: '4.5-13.5',
                  gva: 2.18918573845319,
                  segal: 3.806204494238564,
                  kushner: 0.627932240485245
                },
                limits: {
                  gva: [
                    4.5,
                    13.5
                  ],
                  segal: [
                    4.5,
                    13.5
                  ],
                  kushner: [
                    4.5,
                    13.5
                  ]
                },
                logs: {
                  gva: '6.858499999999999 / ((177/100)^2 )',
                  segal: '11.92445806 / ((177/100)^2 )',
                  kushner: '1.967248916216224 / ((177/100)^2 )'
                },
                display: true
              }
            ]
          }
        ],
        mesures_dates: [
          '2011-05-23',
          '2011-06-27',
          '2012-05-24',
          '2021-11-17'
        ],
        search_terms: 'ABARE Marguerite 1952-11-27 OB-CH Marguerite ABARE',
        id: 2,
        mesure_count: 4
      }