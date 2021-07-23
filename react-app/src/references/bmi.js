

export default (weight_kg,height_cm)=>{
    
    let height = height_cm / 100
    return (new Number(weight_kg / (height*height))).toFixed(1);
}