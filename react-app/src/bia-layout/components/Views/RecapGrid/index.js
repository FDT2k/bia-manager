import Grid from 'bia-layout/layouts/Grid'
import './recap-grid.scss'
export const Component = props => {
    const {t,data,headers} = props;

    return ( <Grid
        className="recap-grid"
        templateColumns="2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
        autoRows="20px"
    >


        <div>Dates</div>
        <div>Norme</div>
        {
            headers && headers.map(item => (<div>{item}</div>))
        }


        {data.map(line => {
            return (<>
                <div>{t(line.label)}</div>
                <div>{line.values['norme']}</div>
                {headers && headers.map(key => {
                    let val = line.values[key];
                    val = (new Number(val)).toFixed(1);
                    return (<div>{!isNaN(val) ? val : ''}</div>)
                })}

            </>)

        })}



    </Grid>)
}


Component.defaultProps = {
    t: x=>x
}

export default Component