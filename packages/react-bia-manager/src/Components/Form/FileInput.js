import React,{useRef} from 'react';




export default props => {
    const ref = useRef();

    const {handleChange, ...rest} = props ;

    const _handleChange = event => {
        event.preventDefault();

        handleChange&&handleChange( ref.current.files);
      }

    return (<input type="file"  {...rest} onChange={_handleChange} ref={ref}/>)
}