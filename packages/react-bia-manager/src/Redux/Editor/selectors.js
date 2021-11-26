import { defaultTo, safe_path, is_nil, reduceListByKeys } from '@karsegard/composite-js';
import { createSelector } from 'reselect';

import { dateSysToHuman } from '@/references/format'
import { value } from '@karsegard/composite-js/ObjectUtils';



export default getModule => {
  const { baseSelector,submodules } = getModule();
  const safe_array = safe_path([]);
  const safe_object = safe_path({});
  const defaultToObject = defaultTo({});
  const defaultToArray = defaultTo([]);
  const module = {};


  module.select_recap_fds = submodules.recap_fds.selectors.select_recap;
  module.select_headers_fds= submodules.recap_fds.selectors.select_headers;

  module.select_current_patient_id = createSelector(baseSelector, state => {
    return state.current_patient_id
  });
  module.select_current_mesure_id = createSelector(baseSelector, state => parseInt(state.current_mesure_id));

  module.select_edited_patient = createSelector(baseSelector, ( state) => state.patient);


  module.select_all_mesures = createSelector(module.select_edited_patient, state => safe_path([],'mesures',state));
  module.select_mesures = createSelector(module.select_all_mesures, state => {
   return  state.filter(item=>{
     let status = safe_path('active','status',item);
     return status !='deleted'
   })

  });

  module.select_edited_mesure = createSelector([module.select_current_patient_id, baseSelector], (current_patient, state) => {
    if (state.mesure && state.mesure && state.mesure.mesure) {

      let result = state.mesure.mesure

      // result.date = dateSysToHuman(result.date);
      return result;
    }

  });

  module.select_edited_age = createSelector(module.select_edited_mesure, state => state.current_age);


  module.select_examinator = createSelector(baseSelector, state => state.examinator)


  module.select_mesures_dates = createSelector([module.select_current_mesure_id, module.select_mesures], (mesure_id, state) => {

    let arr = (new Array(6)).fill(' ');
    let start = 0;
    let end = 0;
    if (mesure_id <= 6) {
      start = 0;
      end = mesure_id + 1;
    } else {
      start = mesure_id - 5
      end = mesure_id + 1;
    }




    let dates = state.map(item => item.date).slice(start, end);

    for (let i = 0; i < dates.length; i++) {
      arr[i] = dates[i];
    }
    return arr;
  });



  module.select_recap = createSelector([module.select_current_patient_id, baseSelector], (current, state) => {
    if (state.recap && state.recap[current]) {
      return state.recap[current];
    }
  });

  module.select_recap_list = createSelector([module.select_recap], (recap) => {
    if (recap)
      return recap.list


    return []
  });
  module.select_recap_headers = createSelector([module.select_recap], (recap) => {
    if (recap)
      return recap.headers


    return []
  });
  module.select_mass_chart = createSelector([module.select_recap], (recap) => {
    if (recap)
      return recap.mass_chart

    return []
  });

  module.settings = createSelector(baseSelector, state => {
    return state.report_settings
  });

  module.select_result_columns = createSelector([module.settings], (settings) => {
    return settings.bia_result_columns;
  })

  module.select_report_columns = createSelector([module.settings], (settings) => {
    return settings.bia_report_columns;
  })


  module.select_charts_columns = createSelector([module.settings], (settings) => {
    return settings.bia_report_chart_columns;
  })



  module.select_bia = createSelector(module.select_edited_mesure, mesure => safe_array('bia', mesure))

  module.select_bia_by_key = createSelector(module.select_bia, bia => bia.reduce((carry, item) => {
    carry[item['label']] = item;
    return carry;
  }, {}))

  module.select_current_bia_values = state => keys => createSelector([module.select_edited_mesure, module.select_bia_by_key], (mesure, bia) => {

    return keys.reduce((carry, item) => {

      if (bia[item]) {
        carry[item] = bia[item].values[mesure.most_accurate_formula];
      }
      return carry;
    }, {})


  })(state);





  module.select_empty_mesure = createSelector(baseSelector, state => state.empty_mesure.current);

  module.has_error = createSelector(baseSelector, state => state.error.has_error)
  module.error_message = createSelector(baseSelector, state => state.error.message)



  /** 
   * 
   * NORMS Selectors
   *  */

  module.normes = createSelector(baseSelector, state => state.normes);

  /* 
     must be called like selector(state,args) where args is {
        age: 
        sex:
     }

     returns {
        norm_key: [min,max]
     }
  */
  module.select_normes = submodules.normes.selectors.select_normes

  /**
   *    
   * returns chartSample: {
           M: [
             {
               age: 15,
               age_range: [
                 15,
                 24
               ],
               pct_ffm_min: 75.6,
               pct_ffm_max: 90.7,
               pct_ffm: [
                 75.6,
                 90.7
               ],
               pct_fm_min: 9.3,
               pct_fm_max: 24.4,
               pct_fm: [
                 9.3,
                 24.4
               ]
             },
             {
               age: 18,
               age_range: [
                 18,
                 34
               ],
               ffmi_min: 16.8,
               ffmi_max: 21.1,
               ffmi: [
                 16.8,
                 21.1
               ],
               fmi_min: 2.2,
               fmi_max: 7,
               fmi: [
                 2.2,
                 7
               ]
             },
             {
               age: 20,
               age_range: [
                 20,
                 34
               ],
               alpha_min: 6.5,
               alpha_max: 8.5,
               alpha: [
                 6.5,
                 8.5
               ]
             },
             {
               age: 25,
               age_range: [
                 25,
                 34
               ],
               pct_ffm_min: 73.2,
               pct_ffm_max: 89,
               pct_ffm: [
                 73.2,
                 89
               ],
               pct_fm_min: 11,
               pct_fm_max: 26.8,
               pct_fm: [
                 11,
                 26.8
               ]
             },
             {
               age: 35,
               age_range: [
                 35,
                 54
               ],
               ffmi_min: 17.2,
               ffmi_max: 21.7,
               ffmi: [
                 17.2,
                 21.7
               ],
               fmi_min: 2.5,
               fmi_max: 7.9,
               fmi: [
                 2.5,
                 7.9
               ],
               pct_ffm_min: 71.9,
               pct_ffm_max: 89,
               pct_ffm: [
                 71.9,
                 89
               ],
               pct_fm_min: 11,
               pct_fm_max: 28.1,
               pct_fm: [
                 11,
                 28.1
               ],
               alpha_min: 6.3,
               alpha_max: 8.2,
               alpha: [
                 6.3,
                 8.2
               ]
             },
             {
               age: 45,
               age_range: [
                 45,
                 54
               ],
               pct_ffm_min: 71.3,
               pct_ffm_max: 88.2,
               pct_ffm: [
                 71.3,
                 88.2
               ],
               pct_fm_min: 11.8,
               pct_fm_max: 28.7,
               pct_fm: [
                 11.8,
                 28.7
               ]
             },
             {
               age: 55,
               age_range: [
                 55,
                 74
               ],
               ffmi_min: 16.6,
               ffmi_max: 21.2,
               ffmi: [
                 16.6,
                 21.2
               ],
               fmi_min: 2.8,
               fmi_max: 9.3,
               fmi: [
                 2.8,
                 9.3
               ],
               pct_ffm_min: 69.4,
               pct_ffm_max: 88,
               pct_ffm: [
                 69.4,
                 88
               ],
               pct_fm_min: 12,
               pct_fm_max: 30.6,
               pct_fm: [
                 12,
                 30.6
               ],
               alpha_min: 5.4,
               alpha_max: 7.3,
               alpha: [
                 5.4,
                 7.3
               ]
             },
             {
               age: 65,
               age_range: [
                 65,
                 74
               ],
               pct_ffm_min: 67.4,
               pct_ffm_max: 85.4,
               pct_ffm: [
                 67.4,
                 85.4
               ],
               pct_fm_min: 14.6,
               pct_fm_max: 32.6,
               pct_fm: [
                 14.6,
                 32.6
               ]
             },
             {
               age: 75,
               ffmi_min: 16.6,
               ffmi_max: 21.2,
               ffmi: [
                 16.6,
                 21.2
               ],
               fmi_min: 3.7,
               fmi_max: 10.1,
               fmi: [
                 3.7,
                 10.1
               ],
               pct_ffm_min: 68.8,
               pct_ffm_max: 84.5,
               pct_ffm: [
                 68.8,
                 84.5
               ],
               pct_fm_min: 15.5,
               pct_fm_max: 31.2,
               pct_fm: [
                 15.5,
                 31.2
               ]
             },
             {
               age: 85,
               pct_ffm_min: 66.6,
               pct_ffm_max: 82.9,
               pct_ffm: [
                 66.6,
                 82.9
               ],
               pct_fm_min: 17.1,
               pct_fm_max: 33.4,
               pct_fm: [
                 17.1,
                 33.4
               ]
             }
           ],
           F: [
             {
               age: 15,
               age_range: [
                 15,
                 24
               ],
               pct_ffm_min: 65.1,
               pct_ffm_max: 81,
               pct_ffm: [
                 65.1,
                 81
               ],
               pct_fm_min: 19,
               pct_fm_max: 34.9,
               pct_fm: [
                 19,
                 34.9
               ]
             },
             {
               age: 18,
               age_range: [
                 18,
                 34
               ],
               ffmi_min: 13.8,
               ffmi_max: 17.6,
               ffmi: [
                 13.8,
                 17.6
               ],
               fmi_min: 3.5,
               fmi_max: 8.7,
               fmi: [
                 3.5,
                 8.7
               ]
             },
             {
               age: 20,
               age_range: [
                 20,
                 34
               ],
               alpha_min: 5.6,
               alpha_max: 7.5,
               alpha: [
                 5.6,
                 7.5
               ]
             },
             {
               age: 25,
               age_range: [
                 25,
                 34
               ],
               pct_ffm_min: 64.6,
               pct_ffm_max: 82.3,
               pct_ffm: [
                 64.6,
                 82.3
               ],
               pct_fm_min: 17.7,
               pct_fm_max: 35.4,
               pct_fm: [
                 17.7,
                 35.4
               ]
             },
             {
               age: 35,
               age_range: [
                 35,
                 54
               ],
               ffmi_min: 14.4,
               ffmi_max: 18,
               ffmi: [
                 14.4,
                 18
               ],
               fmi_min: 3.4,
               fmi_max: 9.9,
               fmi: [
                 3.4,
                 9.9
               ],
               pct_ffm_min: 64.1,
               pct_ffm_max: 82.2,
               pct_ffm: [
                 64.1,
                 82.2
               ],
               pct_fm_min: 17.8,
               pct_fm_max: 35.9,
               pct_fm: [
                 17.8,
                 35.9
               ],
               alpha_min: 5.6,
               alpha_max: 7.3,
               alpha: [
                 5.6,
                 7.3
               ]
             },
             {
               age: 45,
               age_range: [
                 45,
                 54
               ],
               pct_ffm_min: 63.5,
               pct_ffm_max: 82,
               pct_ffm: [
                 63.5,
                 82
               ],
               pct_fm_min: 18,
               pct_fm_max: 36.5,
               pct_fm: [
                 18,
                 36.5
               ]
             },
             {
               age: 55,
               age_range: [
                 55,
                 74
               ],
               ffmi_min: 14.1,
               ffmi_max: 19,
               ffmi: [
                 14.1,
                 19
               ],
               fmi_min: 4.5,
               fmi_max: 13.5,
               fmi: [
                 4.5,
                 13.5
               ],
               pct_ffm_min: 59.5,
               pct_ffm_max: 78.6,
               pct_ffm: [
                 59.5,
                 78.6
               ],
               pct_fm_min: 21.4,
               pct_fm_max: 40.5,
               pct_fm: [
                 21.4,
                 40.5
               ],
               alpha_min: 5,
               alpha_max: 6.6,
               alpha: [
                 5,
                 6.6
               ]
             },
             {
               age: 65,
               age_range: [
                 65,
                 74
               ],
               pct_ffm_min: 55.6,
               pct_ffm_max: 75.6,
               pct_ffm: [
                 55.6,
                 75.6
               ],
               pct_fm_min: 24.4,
               pct_fm_max: 44.4,
               pct_fm: [
                 24.4,
                 44.4
               ]
             },
             {
               age: 75,
               ffmi_min: 12.9,
               ffmi_max: 18.7,
               ffmi: [
                 12.9,
                 18.7
               ],
               fmi_min: 4.9,
               fmi_max: 14.3,
               fmi: [
                 4.9,
                 14.3
               ],
               pct_ffm_min: 54.8,
               pct_ffm_max: 74.1,
               pct_ffm: [
                 54.8,
                 74.1
               ],
               pct_fm_min: 25.9,
               pct_fm_max: 45.2,
               pct_fm: [
                 25.9,
                 45.2
               ]
             },
             {
               age: 85,
               pct_ffm_min: 53.1,
               pct_ffm_max: 77.4,
               pct_ffm: [
                 53.1,
                 77.4
               ],
               pct_fm_min: 22.6,
               pct_fm_max: 46.9,
               pct_fm: [
                 22.6,
                 46.9
               ]
             }
           ]
         }
       }
     },
   */

  module.select_normes_sampling = createSelector([module.select_edited_patient, baseSelector], (patient, state) => {
    const safe_gender=  safe_path('M','gender',patient);
    return safe_array(`normes.chartSample.${safe_gender}`, state);
  });

  module.makeSelectIndiceChartYTicks = () => createSelector([module.select_normes_sampling, (state, props) => props,state=>state], (norme, {data_key},state) => {

    let value = module.makeSelectBIAResultByKey()(state,{data_key})
    let data = norme.filter(item => {
      return !is_nil(item[data_key])
    }).map(item => {

      return [item[`${data_key}_min`], item[`${data_key}_max`]];
    })

    let min = data.reduce((carry, item) => {
      if (item[0] < carry) {
        return Math.floor(item[0])
      }
      return carry;
    }, 1000)

    let max = data.reduce((carry, item) => {
      if (item[1] > carry) {
        return Math.ceil(item[1])
      }
      return carry;
    }, min)


    if(Math.ceil(value )> max) {
      max = Math.ceil(value);
    }else if(Math.floor(value ) < min){
      min = Math.floor(value);

    }

    let res = []
    for (let y = min - 1; y < max + 1; y++) {
      res.push(y)
    }


    return res;
  })


  module.is_clean = createSelector(baseSelector, state=> state.clean);

  module.makeSelectBIAResultByKey = () => createSelector([module.select_edited_mesure, module.select_bia_by_key, (state, props) => props.data_key], (mesure, bia, data_key) => {

    let result = bia[data_key];

    if (result) {
      return result.values[mesure.most_accurate_formula];
    }
    return 0;
  });



  module.makeSelectYLabelByKey = () => createSelector([(state, props) => props.data_key], (data_key) => {

    switch (data_key) {

      case 'fmi':
        return 'FAT_MASS_Y_LABEL';
      case 'ffmi':
        return 'FAT_FREE_MASS_Y_LABEL';
    }
  });


  module.current_fds = createSelector(module.select_edited_mesure,mesure => {
    return mesure.fds
  })

  return module;

}
