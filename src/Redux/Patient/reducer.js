
import createReducer from 'Redux/utils/create-reducer'
import {combineReducers} from 'redux'
import {ADD_SEARCH_TAG,DEL_SEARCH_TAG,UPDATE_SEARCH_TAGS} from './actions';
import {SEARCH_PATIENT,FETCHED_PATIENTS,FILTER_PATIENTS,REMOVE_FILTER} from './actions';

import {delFromList,addToListUniq,delObjectProp,updateProp} from 'Redux/utils/handlers';

export const tags = createReducer([],{
    [ADD_SEARCH_TAG]: addToListUniq,
    [UPDATE_SEARCH_TAGS]: (state,action)=> [...action.payload],
    [DEL_SEARCH_TAG]: delFromList
});


export const patients = createReducer({byIds:{},allIds:[],filtered:[]},{
    [FETCHED_PATIENTS]: (state,action)=> {
        const patients = action.payload.map(item=>item.PatientUuid);
        return {
            byIds: action.payload.reduce((carry,item)=>{
                                                carry[item.PatientUuid]=item;
                                                return carry;
                                            },{}),
            allIds: patients,
            filtered:[{tag:'',ids:patients}]
        }
    },
    [FILTER_PATIENTS]: (state,action)=> {
        let tag = action.payload;


        let patients = state.byIds

        let items = state.filtered.length > 0 ? state.filtered[state.filtered.length-1].ids :  [];

        let result = items.reduce( (carry,id)=> {
            let patient = patients[id];
            let hasField = tag.indexOf(':') !==-1;
            if(hasField){
                let fieldpos = tag.indexOf(':');
                let key = tag.substr(0,fieldpos).trim();
                let value = tag.substr(fieldpos+1).trim();

                let re = new RegExp(`${value}`,"gmi");
                if (re.test(patient[key])){
                    carry.ids.push(id)
                }
            }else{
                if ((new RegExp(`${tag}`,"gmi")).test(patient['search_terms'])){
                    carry.ids.push(id)
                }
            }
            return carry;
        }, {tag,ids:[]});

        return {
            ...state,
            filtered:[...state.filtered,result]
        };
    },
    [REMOVE_FILTER]: (state,action)=>{
        return {
            ...state,
            filtered:[state.filtered[0]]
        }
    }
    /*[FILTER_PATIENTS]: (state,action)=> {
        let tags = action.payload;
        let filtered = [...state.allIds];
        let result = [];
        for(let tag of tags){
            console.log(tag);
            result = filtered.reduce( (carry,id)=> {
                let patient = state.byIds[id];
                let hasField = tag.indexOf(':') !==-1;
                if(hasField){
                    let fieldpos = tag.indexOf(':');
                    let key = tag.substr(0,fieldpos).trim();
                    let value = tag.substr(fieldpos+1).trim();
                    //collection = buildFieldQuery(collection)(key,value);

                    let re = new RegExp(`${value}`,"gmi");
                //    console.log(`${value}`);
                //    console.log(key,value,patient[key],re.test(patient[key]));
                    if (re.test(patient[key])){
                        carry.push(id)
                    }
                }else{
                    if ((new RegExp(`${tag}`,"gmi")).test(patient['search_terms'])){
                        carry.push(id)
                    }
                }
                return carry;
            },result );
        }
        if(tags.length==0){
            result = filtered
        }
        return {
            ...state,
            filteredIds:result
        };
    },*/
    /*[CREATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [UPDATE_PATIENT]: (state,action)=> updateProp(action.id,state,action.payload),
    [DELETE_PATIENT]: (state,action)=> delObjectProp(state,action.id)*/
});






export const reducer = combineReducers({
    tags,
    patients
});


export default reducer;
