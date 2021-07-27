

export default {

    gva: [
        { 
            name:'gender_idx', 
            fn: mesure=> mesure.gender ==='M' ? 1 : 0 
        },
        {   
            name:'mng', 
            eval:"-4.104 + ((0.518 * root({height})) / {res}) +(0.231 * {weight}) + (4.229 * {gender_idx})"
        },
        {   
            name:'mg', 
            eval:"{weight} - {mng}"
        },
        {   
            name:'pct_mng ',
            eval: "{mng} *100 / {weight}"
        },
        {   
            name:'pct_mg',
            eval:"{mg} * 100 / {weight}"
        }
    ],

    segal:[
        {   
            name:'mng',
            eval:"(0.00091186 * (pow(({height}/100),2))) 	- (0.01486 * {res50}) + (0.2999 * {weight})  - (0.07012 x {age}) + 9.37938",
            cond: mesure => mesure.gender === 'F'
        },
        {   
            name:'mng',
            eval:"(0.0008858 * (pow(({height}/100),2))) - (0.02999 * {res50}) + (0.42688 * {weight})  - (0.07002 x {age})+ 14.52435",
            cond: mesure => mesure.gender === 'M'
        },
        {
            name: 'water',
            eval: '0.73 * {mng}'
        },
        {
            name: 'mngs',
            eval: '{mng} - {water}'
        },
        {
            name: 'mg',
            eval: '{weight} / {mng}'
        }
    ]

    
    kushner:[
        {
            name: 'height_meter',
            eval: "{height}/100"
        },
        {
            name: 'water', 
            eval:"8.3148 + ( (0.3821 * pow( {height_meter},2) )   / 	res50) + 0.1052 * {weight}" ,
            cond: mesure => mesure.gender ==='F'
        },
        {
            name: 'water', 
            eval:"(0.3963 *  pow( {height_meter},2)   / 	{res50}) + (0.143 * {weight}) + 	8.3999999" ,
            cond: mesure => mesure.gender ==='M'
        },
        {
            name: 'density', 
            eval:"1.1554 - ( 0.0841 * ((weight * res50 ) /  pow( {height_meter},2)  )))" ,
            cond: mesure => mesure.gender ==='M'
        },
        {
            name: 'pct_mg',
            eval:"(4.95 / {density} - 4.5) * 100",
            cond: mesure => mesure.gender ==='M'
        }
        {
            name: 'pct_mg',
            eval:"ABS (1-(0.3981 * pow( {height_meter},2) / res50 + (0.3066 * {weight}) + 0.0952999 * ({height_meter}-100) + 0.7414) / {weight}) x 100",
            cond: mesure => mesure.gender ==='F'
        }
        
    ]
}