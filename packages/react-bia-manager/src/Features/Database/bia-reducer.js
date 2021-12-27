

export const bia_reducer = (field,oldField,gva=false)=> (carry=[],value,values)=> {

    let formula = get_most_accurate_formula(values.gender,values.bmi_ref)
    if(gva === true) {
        formula = 'gva';
    }
    
    let idx = carry.findIndex(item=> item.label === field);
    if(idx === -1 ){
        carry.push({label:field,values:{[formula]:value[oldField]},limits:{},display:true})
    }else{
        carry = carry.map((item,_idx)=>{
            if(_idx === idx){
                return {
                        ...item,
                        values:{
                            ...item.values,
                            [formula]:value[oldField]
                        }
                }
            }else {
                return item;
            }
        })
    }
    
    return carry;
}
