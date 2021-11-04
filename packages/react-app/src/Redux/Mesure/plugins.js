import FDS from '@/Redux/FDS';
import ElectricalData from '@/Redux/ElectricalData';
import BMIData from '@/Redux/BMIData';

export const createSubModules = getModule => {
    const {modplugin:{register} } = getModule();

    const module = {

        ...register('bia_data',ElectricalData),
        ...register('bmi_data',BMIData),
        ...register('fds',FDS)
    }


    return module
}


export default createSubModules;