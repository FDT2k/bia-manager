import React from 'react';
import 'react-circular-progressbar/dist/styles.css';



export default Component=> props => {

 

    const callback = data=>{
        if(data.progress){
            setPercentage(data.progress);
        }
        if(data.total){
            setLineCount(data.total);
        }

       // console.log('progress',data)
        if(data.result){
            dataRef.current = data.result;
            setParsing(false);
            //setImportedData(data.result)
            //console.log(data.result.list[5])
        }

        if(data.type && data.type =='import_subject'){
            console.log(data)
        }
        if(data.type && data.type =='import_mesure'){
            console.log(data)
        }
    }


  

    return (
       <Component callback={callback} />
    )
}
