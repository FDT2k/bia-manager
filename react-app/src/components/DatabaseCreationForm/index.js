import LayoutFlex from 'bia-layout/layouts/Flex';
import React from 'react';


export default props => {


    return (
        <LayoutFlex column>
            <LayoutFlex>
                <label>Nom</label>
                <input type="text" />

            </LayoutFlex>
            <LayoutFlex>
                <button>Créer</button>
            </LayoutFlex>

        </LayoutFlex>

    )
}