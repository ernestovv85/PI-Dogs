import axios from 'axios';
import {
    GET_DOGS,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    POST_DOG,
    ORDER,
    CLEAR_DETAIL,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_BY_CREATED,
} from './const.js'


export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/dogs');
            return dispatch({
                type: GET_DOGS,
                payload: json.data,
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function clearDetail () {
    return {
        type: CLEAR_DETAIL,
        payload: [],
    }
};

export function getDetail(id) {
    return async function (dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    } catch (error) {
        console.log(error)
    }}
};

export function getDogName(name) {
    return async function (dispatch) {
        try {
            var resp = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_NAME,
                payload: resp.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getDogTemperament() {
    return async function (dispatch) {
        try { 
            var json = await axios.get('http://localhost:3001/temperaments');
         dispatch({          
                type: GET_TEMPERAMENTS,
                payload: json.data
            })    
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog (payload) {
    return async function(dispatch){
        try{
            const {data} = await axios.post('http://localhost:3001/dogs', payload)
             dispatch({type: POST_DOG, payload: data})
        } 
        catch(error){
            console.log(error)
        }
    } 
} 

export function order(payload) {
    return {
        type: ORDER,
        payload
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_DOGS_BY_TEMPERAMENT,
        payload
    }
};

export function filterDogsByCreated (payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
};

export function resetPagination (payload) {
    return {
        type: 'RESET_PAGINATION',
        payload
    }
};
