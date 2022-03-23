import { SET_SERVICE_FEE,  SET_EVO_NFT_LIST} from "../actions/action.types";

const init = {
    serviceFee: 1.5,   //percentage value 1.5 means 1.5%,
    tradingResult: null,
    evoList: null
}

export default function Nft(state = init, action) {
    switch(action.type) {
        case SET_EVO_NFT_LIST:
            console.log("[SET_EVO_NFT_LIST] action.payload = ", action.payload)
            return {
                ...state, evoList: action.payload
            }
        case SET_SERVICE_FEE:
            return {
                ...state, serviceFee: action.payload
            }
        default:
            return {...state};
    }
}
