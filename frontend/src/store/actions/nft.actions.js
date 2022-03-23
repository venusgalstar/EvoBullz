import { SET_EVO_NFT_LIST } from "./action.types";
// import config from '../../config';
// import axios from 'axios';

export const setEvoNFTList = (items) => dispatch =>
{
    dispatch({
        type: SET_EVO_NFT_LIST,
        payload: items
    })
} 
