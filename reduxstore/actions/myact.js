export function fetchProducts() {
    return dispatch => {
    
      dispatch(fetchProductsBegin());
      let deployUrl = `${process.env.URL_BACKEND_SERVER}/public/engine/artreview `
      return fetch(deployUrl,
      {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({User:{DBname:process.env.EMARKET_DATA_BASE}}), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }
      
      )
      
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          let newData =json.articulosHabiles.filter(x=>!x.Eqid.includes("IGLASS"))
          
            dispatch(fetchProductsSuccess(newData));
          return "";
        })
        .catch(error => dispatch(fetchProductsFailure(error)) );
    };
  }

  export function fetchOrders() {
    return dispatch => {
      dispatch(fetchOrderBegin());
      return fetch("https://iglass.herokuapp.com/admin/orderdata/ordenes-de-compra")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
           
             dispatch(fetchOrderSuccess(json.compras));
          return json.compras;
        })
        .catch(error => dispatch(fetchOrderFailure(error)) );
    };
  }

  export function fetchRep() {
    return dispatch => {
      dispatch(fetchRepBegin());
      return fetch("https://iglass.herokuapp.com/admin/orderdata/solicitud-repuestos")
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json)
             dispatch(fetchRepSuccess(json.compras));
          
          return json.compras;
        })
        .catch(error => dispatch(fetchRepFailure(error)) );
    };
  }
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  export const FETCH_ORDER_BEGIN   = 'FETCH_ORDER_BEGIN';
  export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
  export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';

  export const FETCH_REP_BEGIN   = 'FETCH_REP_BEGIN';
  export const FETCH_REP_SUCCESS = 'FETCH_REP_SUCCESS';
  export const FETCH_REP_FAILURE = 'FETCH_REP_FAILURE';

  export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';


export const UPLOAD_FILTER_SEARCHER = 'FUPLOAD_FILTER_SEARCHER';
export const REMOVE_FILTER_SEARCHER = 'REMOVE_FILTER_SEARCHER';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

export const UPLOAD_USER = 'UPLOAD_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOG_OUT = 'LOG_OUT';

export const UPDATE_REP = 'UPDATE_REP';

export const RESET_CARD = 'RESET_CARD';
export const ITEM_SELECTED= "ITEM_SELECTED";
export const  GET_CLIENT_ORDERS= " GET_CLIENT_ORDERS";
export const  GET_CLIENT_VENTAS= "GET_CLIENT_VENTAS";
export const getCLientVentas= (ventas) => ({
  type:GET_CLIENT_VENTAS,
  payload: {ventas }
});
export const getCLientOrders= (ordenes) => ({
  type: GET_CLIENT_ORDERS,
  payload: {ordenes }
});
export const updateUser = (update) => ({
  type: UPLOAD_USER,
  payload: { update}
});

export const deleteUser = () => ({
  type: DELETE_USER,
  payload: { }
});

export const logOut = () => ({
  type: LOG_OUT,
  payload: { }
});


export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});


export const fetchOrderBegin = () => ({
  type: FETCH_ORDER_BEGIN
});

export const fetchOrderSuccess = orders => ({
  type: FETCH_ORDER_SUCCESS,
  payload: { orders }
});

export const fetchOrderFailure = error => ({
  type: FETCH_ORDER_FAILURE,
  payload: { error }
});


export const fetchRepBegin = () => ({
  type: FETCH_REP_BEGIN
});

export const ItemSelected = (item) => ({
  type: ITEM_SELECTED,
  payload: { item }
});

export const fetchRepSuccess = solicitudes => ({
  type: FETCH_REP_SUCCESS,
  payload: { solicitudes }
});

export const fetchRepFailure = error => ({
  type: FETCH_REP_FAILURE,
  payload: { error }
});

export const uploadeFilterSeacher = (filter) => ({
  type: UPLOAD_FILTER_SEARCHER,
  payload: filter
});
export const removeFilterSearcher = () => ({
  type: REMOVE_FILTER_SEARCHER,
 });

 export const resetCard = () => ({
  type: RESET_CARD,
 });

 export const updateOrders = (orders) => ({
 
  type: UPDATE_ORDERS,
  payload:{orders}
});

export const updateRep = (solicitudes) => ({
 
  type: UPDATE_REP,
  payload:{solicitudes}
});