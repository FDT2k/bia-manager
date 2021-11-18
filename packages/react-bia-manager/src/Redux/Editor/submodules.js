import { compose } from '@karsegard/composite-js';
import Normes from '@/Redux/Normes';
import FDS from '@/Redux/FDS';
import RecapFDS from '@/Redux/RecapFDS';

export default getModule => {
    const { baseSelector, prefix } = getModule();
    return {
        normes: Normes(compose(state => state.normes, baseSelector), `${prefix}_NORMES`),
        fds: FDS(compose(state => state.fds, baseSelector), `${prefix}_FDS`),
        recap_fds: RecapFDS(compose(state => state.recap_fds, baseSelector), `${prefix}_RECAP_FDS`)
       
    }
}