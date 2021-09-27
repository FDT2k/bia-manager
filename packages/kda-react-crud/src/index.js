import React from 'react';

import { Container, LayoutFlex, LayoutFlexColumn, Fullscreen, Grid } from '@karsegard/react-core-layout';
import '@karsegard/react-core-layout/dist/index.css'
import { is_type_function, run_or_yield } from '@karsegard/composite-js'


export const ListColumn = props => {

    const { col, handleAction, actions, row, ...rest } = props;
    const { className, type, accessor, render } = col;

    const value = is_type_function(accessor) ? accessor(props) : row[accessor];


    const renderAction = (row)  => (key,label)=> (<div key={key} onClick={_ => handleAction(key, row)}>{label}</div>)

    const renderActions = _=> (<LayoutFlex justBetween className="item-actions" >{actions.map((action, act_idx) => {
        return renderAction(row)(action.key,action.label)
    })}</LayoutFlex>)

    return (
        <React.Fragment>
            {type === 'actions' && !render && <LayoutFlex justBetween className="item-actions" >
                {actions.map((action, act_idx) => {
                    return (<div key={act_idx} onClick={_ => handleAction(action.key, row)}>{action.label}</div>)
                })}


            </LayoutFlex>}
            {type !== "actions" && !render && <div className={className}>{value}</div>}

            {render && render(props,{renderActions,renderAction:renderAction(row)})}
        </React.Fragment>
    )
}

export const ListOperation = props => {
    const { list, columns, actions, handleAction, defaultColTemplate, HeaderComponent, FooterComponent, renderHeader, renderFooter, headerHeight, footerHeight } = props
    const gridStyle = columns.map(item => item.colTemplate || defaultColTemplate).join(' ');
    return (
        <Grid templateColumns="auto" templateRows={`${headerHeight} auto ${footerHeight}`} contained cover>
            <div>
                {HeaderComponent && <HeaderComponent />}
                {renderHeader && renderHeader()}
            </div>
            <Container contained scrollable>
                <Grid templateColumns={gridStyle} columnGap="10px"  autoRows="30px">
                    {
                        list.map((row, row_idx) => {
                            return (<React.Fragment key={row_idx}>
                                {columns.map((col, col_idx) => {
                                    return (<ListColumn col={col} key={col_idx} handleAction={handleAction} actions={actions} row={row} />)
                                })}
                            </React.Fragment>)
                        })
                    }
                </Grid>
            </Container>
            <div>
                {FooterComponent && <FooterComponent />}
                {renderFooter && renderFooter()}
            </div>

        </Grid>
    )
}

ListOperation.defaultProps = {
    columns: [],
    defaultColTemplate: 'fit-content(30px)',
    actions: [],
    handleAction: (item, action) => console.warn('handleItem not set'),
    headerHeight: '30px',
    footerHeight: '120px',
    list: [],
}