import React, { useEffect, useState } from 'react';
import { bem, cEx, getClasseNames } from '@karsegard/react-compose';

import { useTranslation } from '@';

const FormulaResultRow = (props) => {
    const { columns, values, logs, limits, available_columns,label } = props;
    const {t,oneDecimal} = useTranslation();
    let colByName = available_columns.reduce(function (carry, item) {
        carry[item['name']] = item;
        return carry;
    }, {})
    const [__base_class, element, modifier] = bem('result-row');
    const { className, ...rest } = getClasseNames(__base_class, props)
    const _classes = cEx([
        className,
        "row",
        "result"
    ])
    return (<>
        <div className="row lineheader"><span>{t(`${label}_comparison_line_header`)}</span></div>
        {columns.map((col) => {
            debugger;
            if (!colByName[col]) {
                return (<div  key={`${col}`}>{t('Error')}</div>)
            }
            let type = colByName[col].type || 'number';
            let val = values[col]
            if (type !== 'norme') {
                let limit = limits[col];
                val = oneDecimal(val);
                
                let classes = _classes;
                if (limit) {
                    const [min, max] = limit;
                    const _limit = x => {
                        if (x < min)
                            return -1
                        if (x > max)
                            return -1
                        return 1
                    };
                    classes = cEx([
                        _classes,
                        _ => _limit(val) === -1 ? modifier('lesser') : '',
                        _ => _limit(val) === 1 ? modifier('upper') : '',

                    ])
                }
                const is_pct = label.startsWith('pct_')
                const display_value = !isNaN(val) ? val : '';
                return (<div key={`${col}`} className={classes}>
                    <span>{display_value} {(display_value !== "" && is_pct) ? '%' : ''}</span></div>)
            } else {
                return (<div className="row norme" key={`${col}`} ><span>{val}</span></div>)

            }
        })}
    </>);
}

FormulaResultRow.defaultProps = {
    limits: [],
}

export default FormulaResultRow;