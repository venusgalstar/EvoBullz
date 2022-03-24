import { SET_EVO_NFT_LIST, SET_NFT_TRADING_RESULT } from "./action.types";
// import config from '../../config';
// import axios from 'axios';

export const setEvoNFTList = (items) => dispatch =>
{
    dispatch({
        type: SET_EVO_NFT_LIST,
        payload: items
    })
} 

export const setNFTTradingResult  = (functionName, success, message) => dispatch =>
{    
    console.log("[SET_NFT_TRADING_RESULT action ] : ", functionName, success, message)
    dispatch({
        type: SET_NFT_TRADING_RESULT,
        payload: {
            function : functionName,
            success : success,
            message : message
        }
    });
}

export const emptyNFTTradingResult  = () => dispatch =>
{    
    console.log("[SET_NFT_TRADING_RESULT action ] : null" )
    dispatch({
        type: SET_NFT_TRADING_RESULT,
        payload: null
    });
}