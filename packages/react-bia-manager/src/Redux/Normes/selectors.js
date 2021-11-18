import { is_nil, safe_path } from '@karsegard/composite-js';
import { createSelector } from '@karsegard/react-redux';



export default getModule => {
   const { baseSelector } = getModule();
   const safe_array = safe_path([]);
   const safe_object = safe_path({});

   const module = {};



   module.select_normes = createSelector([baseSelector, (state, args) => args || {}], ( state, args) => {
      
      const { age,sex } = args;
  
      let normes = safe_array(`byKey.${sex}`, state);
      return normes.filter(item => {
        if (!is_nil(item.age_range)) {
          let [min, max] = item.age_range;
  
          return (age >= min && age <= max);
        } else if (!is_nil(item.age_min)) {
  
          return (age >= item.age_min)
        }
      }).reduce((carry, item) => {
        carry[item.type] = item.values;
        return carry;
      }, {});
    });
  

   return module;

}
