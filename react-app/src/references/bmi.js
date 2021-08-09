// femme  ≥ 30 BMI ; hommes >26 BMI

export const mostAccurateFormula= (gender,bmi) => {
    console.log(gender,bmi)
    if(gender == 'F' && parseFloat(bmi) >= 30  || gender=='M' && parseFloat(bmi) >=26) {
        return 'segal'
    }

    return 'kushner';
}

export default (weight_kg,height_cm)=>{
    
    let height = height_cm / 100
    return (new Number(weight_kg / (height*height))).toFixed(1);
}

