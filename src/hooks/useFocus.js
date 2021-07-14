import React,{useEffect,useState} from 'react';


export default  args => {
    const {ref} = args;
    const [focused,setFocused] = useState(args.focused || false);

    const handleFocus = _=>{
        setFocused(true);
    }
    const handleBlur = _=>{
        setFocused(false);
    }
    useEffect(() => {
        if(ref && ref.current){
            ref.current.addEventListener('focus', handleFocus);
            ref.current.addEventListener('blur', handleBlur);
            return () => {
                if(ref.current){
                    ref.current.removeEventListener('focus', handleFocus)
                    ref.current.removeEventListener('blur', handleBlur)
                }
            }
        }

    }, [ref])

    useEffect(() => {
        if(ref && ref.current){
            focused && ref.current.focus();
        }

    }, [focused])


    return {hasFocus:focused,handleFocus,handleBlur};
}
