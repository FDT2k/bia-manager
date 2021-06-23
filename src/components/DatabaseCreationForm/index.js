import React from 'react';

import LayoutFlex from 'bia-layout/layouts/Flex'

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