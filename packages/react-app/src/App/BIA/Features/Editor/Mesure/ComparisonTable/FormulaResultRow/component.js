import React, { useEffect, useState } from 'react';
import { bem, cEx, getClasseNames } from '@karsegard/react-compose';

const FormulaResultRow = (props) => {
    const { columns, values, logs, limits, available_columns, t, label } = props;
    let colByName = available_columns.reduce(function (carry, item) {
        carry[item['name']] = item;
        return carry;
    }, {})
    const [__base_class, element, modifier] = bem('result-row');
    const { className, ...rest } = getClasseNames(__base_class, props)
    return (<><div className="row header">{t(label)}</div>
        {columns.map((col) => {
            if (!colByName[col]) {
                return (<div>{t('Error')}</div>)
            }
            let type = colByName[col].type || 'number';
            let val = values[col]
            if (type !== 'string') {
                let limit = limits[col];
                val = (new Number(val)).toFixed(2);
                let classes = className;
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
                        className,
                        _ => _limit(val) === -1 ? modifier('lesser') : '',
                        _ => _limit(val) === 1 ? modifier('upper') : '',

                    ])
                }
                const is_pct = label.startsWith('pct_')
                const display_value = !isNaN(val) ? val : '';
                return (<div key={`${col}`} className={classes}>
                    <span>{display_value} {(display_value !=="" &&is_pct)?'%':''}</span></div>)
            } else {
                return (<div key={`${col}`} >{val}</div>)

            }
        })}
    </>);
}

FormulaResultRow.defaultProps = {
    limits: [],
}

export default FormulaResultRow;