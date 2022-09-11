import {
    GET_DOGS,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    POST_DOG,
    CLEAR_DETAIL,
    ORDER,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_BY_CREATED
} from '../actions/const.js'

const initialState = {
    dogs: [],
    paginado: {},
    detailsDog:[],
    temperaments: [],
    allDogs: []
}


function rootReducer(state = initialState, action) {
    
    switch (action.type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case CLEAR_DETAIL:
            return {
                ...state,
                detailsDog: []
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }

        case GET_DOG_NAME:
            return {
                ...state,
                dogs: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                detailsDog : action.payload
            }

        case POST_DOG:
            return {
                ...state
            }

        case ORDER:
            if (action.payload === 'default') {
                return {
                    ...state,
                    dogs: state.dogs
                }
            }
            if (action.payload === 'Asc') {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0
                    })
                }
            }
            if (action.payload === 'Des') {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    })
                }
            }
            if (action.payload === 'min_weight') {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (a.weight[0] > b.weight[0]) {
                            return 1;
                        }
                        if (b.weight[0] > a.weight[0]) {
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            if (action.payload === 'max_weight') {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (a.weight[1] > b.weight[1]) {
                            return -1;
                        }
                        if (b.weight[1] > a.weight[1]) {
                            return 1;
                        }
                        return 0;
                    })
                }
            }
            break;

        case FILTER_DOGS_BY_TEMPERAMENT:
            const dogs = state.allDogs;
            const dogsFilter = state.allDogs
            dogs.map((dog) => {
                return(
                typeof dog.temperament === 'object'
                    ? dog.temperament = dog.temperament.map(t => { return t.name })
                        .join(', ')
                    : dog.temperament
            )})
            const temperamentFilter =
      
                action.payload === 'All' ? state.allDogs
                    : dogsFilter.filter((e)=>
                        e.temperament?.includes(action.payload))   
            return {
                ...state,
                dogs: temperamentFilter,
            }

        case FILTER_BY_CREATED:
            const Dogs = state.allDogs;
            const createdFilter = (
                action.payload === 'All' ? state.allDogs :
                Dogs.filter((e) => {
                        if (action.payload==='Db') {
                            if (e.createdInDb) {
                                return e;
                            }
                        } else if(action.payload==='Api'){
                            if (!e.createdInDb) {
                                return e;
                            }
                        }
                    return false;
                })
            );
            return {
                ...state,
                dogs:createdFilter
            }
        
        case 'RESET_PAGINATION':
            return {
                ...state,
                paginado: action.payload
            }

        default: return state;
    }
};

export default rootReducer;