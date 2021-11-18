import React from 'react';



const MonComposant = ({children,...attributes}) => {

    return (
        <div {...attributes}>{children}</div>
    )
}


export default props => {

    return (
        <VuePrincipale>
            <Editeur>
                <Patient/>
                <Liste/>
                <Mesure/>
                <Comments/>
            </Editeur>
            <MonComposant className="test">test</MonComposant>
            <MonComposant/>
        </VuePrincipale>
    )
}
