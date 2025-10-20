
import { combineReducers } from 'redux';
import shop from './shop.reducer';
import { brandFilterReducer } from "./brand.filter.reducer";
import { groupReducer } from "./groupfilter.reducer.js";
import { categoryReducer } from "./categoryfilter.reducer";
import { orderByPriceReducer } from "./orderByPrice.filter.reducer";
import { paginationReducer } from "./pagination.reducer";
import productReducer from "./newreducer";
import searcherReducer from "./searcher";
import userReducerEmarket from "./userReducerEmarket";
import orderReducer from "./orderReducer";
import requestReducer from "./requestReducer";
import itemSelectReducer from "./itemSelectReducer";
import tiendaConfigReducer from './tiendaConfig.reducer';

export default combineReducers({
    shop,
    orderReducer,
    categoryReducer,
    requestReducer,
    productReducer,
    searcherReducer,
    userReducerEmarket,
    itemSelectReducer,
    groupFilter: groupReducer,
    brandFilter: brandFilterReducer,
    orderBy: orderByPriceReducer,
    pagination: paginationReducer,
    tiendaConfig: tiendaConfigReducer
});
