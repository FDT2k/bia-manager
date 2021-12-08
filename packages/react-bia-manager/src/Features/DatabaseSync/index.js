import Button from '@/Components/Form/Button';
import Field from '@/Components/Form/Fields';
import Modal from '@/Components/Modal';
import { LayoutFlex, LayoutFlexColumn, Container, Grid, Fullscreen } from '@karsegard/react-core-layout';
import React, { Fragment, useRef, forwardRef } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useDropFile } from '@karsegard/react-hooks';
import { compose, withForwardedRef } from '@karsegard/react-compose'
import './style.scss'
import { as_safe_path, safe_path } from '@karsegard/composite-js';

//import parse from './parser';
export const Component = ({ handleDrop, children, files }) => {
    const ref = useRef();


    const { dragging } = useDropFile(ref, { handleDrop })



    const style = {
        width: '100%',
        maxHeight: '500px',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto auto',
        gridAutoRows: '20px'
    };
    console.log(dragging)

    let totals = {
        subjects: {
            new: 0,
            altered: 0
        },
        mesures: {
            new: 0,
            altered: 0
        }
    }
    return (
        <Fullscreen>

            <Modal type="dialog">
                <LayoutFlex column>
                    <LayoutFlexColumn className="sync-parent">

                        <Field label="Glissez une ou plusieures base de données">
                        </Field>
                        <div className="sync" ref={ref} style={style}>
                            {(files.length == 0) && <div className="drop-overlay">Glisser les fichiers ici</div>}

                            <>
                                <div className="header"></div>
                                <div className="header" style={{ gridColumn: '2 / span 2', 'justifySelf': 'center' }}>patients</div>
                                <div className="header" style={{ gridColumn: '4 / span 2', 'justifySelf': 'center' }}>mesures</div>
                                <div className="header"></div>
                                <div className="header"></div>
                            </>
                            <>
                                <div className="header">base </div>
                                <div className="header">nouveaux</div>
                                <div className="header">modifiés</div>
                                <div className="header">nouveaux</div>
                                <div className="header">modifiés</div>
                                <div className="header"></div>
                                <div className="header"></div>
                            </>
                            {files.map((file, key) => {
                                totals = as_safe_path('subjects.new',totals,  safe_path(0, 'subjects.new', file) + safe_path(0, 'subjects.new', totals))
                                totals = as_safe_path('subjects.altered',totals,  safe_path(0, 'subjects.altered', file) + safe_path(0, 'subjects.altered', totals))
                                totals = as_safe_path('mesures.new',totals,  safe_path(0, 'mesures.new', file) + safe_path(0, 'mesures.new', totals))
                                totals = as_safe_path('mesures.altered',totals,  safe_path(0, 'mesures.altered', file) + safe_path(0, 'mesures.altered', totals))
                                return (
                                    <Fragment key={key}>
                                        <div>{file.name}  </div>
                                        <div>{safe_path('-', 'subjects.new', file)}   </div>
                                        <div>{safe_path('-', 'subjects.altered', file)}   </div>
                                        <div>{safe_path('-', 'mesures.new', file)}  </div>
                                        <div>{safe_path('-', 'mesures.altered', file)}  </div>
                                        <div>{safe_path('analyse', 'message', file)}  </div>
                                        <div>{safe_path('', 'progress', file)}  </div>
                                    </Fragment>
                                )
                            })}
                            <>
                                <div className="header"> Totaux </div>
                                <div className="header">{safe_path('-', 'subjects.new', totals)}</div>
                                <div className="header">{safe_path('-', 'subjects.altered', totals)} </div>
                                <div className="header">{safe_path('-', 'mesures.new', totals)}</div>
                                <div className="header">{safe_path('-', 'mesures.altered', totals)} </div>
                                <div className="header"></div>
                                <div className="header"></div>
                            </>
                        </div>
                        {children}
                    </LayoutFlexColumn>
                </LayoutFlex>
            </Modal>
        </Fullscreen>
    )
}


Component.defaultProps = {
    files: [
        /* { 'name': 'hello.sqlite', 'new_subjects': 123, 'new_mesures': 555, 'message': '', 'progress': 99 },
         { 'name': 'hello.sqlite', 'new_subjects': 123, 'new_mesures': 555, 'message': '', 'progress': 99 },
         { 'name': 'hello.sqlite', 'new_subjects': 123, 'new_mesures': 555, 'message': '', 'progress': 99 },
         { 'name': 'hello.sqlite', 'new_subjects': 123, 'new_mesures': 555, 'message': '', 'progress': 99 },
         { 'name': 'hello.sqlite', 'new_subjects': 123, 'new_mesures': 555, 'message': '', 'progress': 99 },
 
 */
    ],
}

export default Component;