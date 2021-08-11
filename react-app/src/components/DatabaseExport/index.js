import React, { useState,useRef,useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useLocation } from "wouter";

import LayoutFlex from 'bia-layout/layouts/Flex'
import { useFieldValues,useWorker } from '@karsegard/react-hooks'
import useDatabaseFromContext from 'hooks/useBIAManager';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from 'bia-layout/components/Form/Button';


import { identity } from '@karsegard/composite-js';

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
