import { combineReducers } from "redux";
import {Auth} from "./auth.reducers";
import Nft from "./nft.reducers";
import User from "./user.reducers";

const reducers = combineReducers({
    auth: Auth,
    nft: Nft,
    user: User,
})

export default reducers;