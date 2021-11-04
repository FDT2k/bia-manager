import FDS from '@/Redux/FDS';

export const createSubModules = getModule => {
    const {modplugin:{register} } = getModule();

    const module = {

        ...register('fds',FDS)
    }


    return module
}


export default createSubModules;