import Button from 'bia-layout/components/Form/Button';
import {LayoutFlex} from '@karsegard/react-core-layout'

import useDatabaseFromContext from 'hooks/useBIAManager';
import React, { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import ReactLoading from 'react-loading';




function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


export default props => {
    const {api}= useDatabaseFromContext();
    let [exporting, setExporting] = useState(false);

    const handleExport = _=> {
        setExporting(true);
        api.export_database().then(res => {
            download(res,'bia_database.json','text/plain');
            setExporting(false)
        });
    }
    return (
        <LayoutFlex column>
            {!exporting  && <>
                <Button onClick={handleExport}>exporter la base</Button>
            </>    
            }
            {exporting && <ReactLoading type="spin" color="#000000"/>}
        </LayoutFlex>

    )
}
