export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
export const INCREMENT_CART_ITEM_QUANTITY = 'INCREMENT_CART_ITEM_QUANTITY';
export const DECREMENT_CART_ITEM_QUANTITY = 'DECREMENT_CART_ITEM_QUANTITY';

export const RESETFILTERS = 'RESETFILTERS';

// Establecer productos en shop (array a partir de categorías)
export const SET_SHOP_PRODUCTS = 'SET_SHOP_PRODUCTS';

export const addProductToCart = product => {
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: product
    }
};

export const setShopProducts = (products) => {
    return {
        type: SET_SHOP_PRODUCTS,
        payload: products || []
    }
};


export const resetFilters = () => {
    return {
        type: RESETFILTERS
       
    }
};


export const removeProductToCart = productId => {
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: productId
    }
};

export const incrementCartQuantity = productId => {
    return{
        type: INCREMENT_CART_ITEM_QUANTITY,
        payload: productId
    }
};

export const decrementCartQuantity = productId => {
  return {
      type: DECREMENT_CART_ITEM_QUANTITY,
      payload: productId
  }
};


export const ADD_BRAND_TO_FILTER = 'ADD_BRAND_TO_FILTER';
export const REMOVE_BRAND_FROM_FILTER = 'REMOVE_BRAND_FROM_FILTER';

export const addBrandToFilter = brand => {
    return {
        type: ADD_BRAND_TO_FILTER,
        brand
    }
};


export const removeBrandFromFilter = brand => {
    return  {
        type: REMOVE_BRAND_FROM_FILTER,
        brand
    }
};

export const ADD_CATEGORY_TO_FILTER = 'ADD_CATEGORY_TO_FILTER';
export const REMOVE_CATEGORY_FROM_FILTER = 'REMOVE_CATEGORY_FROM_FILTER';
export const ADD_GROUP_TO_FILTER = 'ADD_GROUP_TO_FILTER';
export const REMOVE_GROUP_FROM_FILTER = 'REMOVE_GROUP_FROM_FILTER';
export const addGroupFilter = group => {
    return {
        type: ADD_GROUP_TO_FILTER,
        group
    }
};

export const removeGroupFilter = group => {
    return  {
        type: REMOVE_GROUP_FROM_FILTER,
        group
    }
};
export const addCategoryFilter = category => {
    return {
        type: ADD_CATEGORY_TO_FILTER,
        category
    }
};


export const removeCategoryFilter = category => {
    return  {
        type: REMOVE_CATEGORY_FROM_FILTER,
        category
    }
};





export const ORDER_BY_ASC = 'ORDER_BY_ASC';
export const ORDER_BY_DESC = 'ORDER_BY_DESC';
export const CLEAR_ORDER_BY_PRICE = 'CLEAR_ORDER_BY_PRICE';

export const orderByAsc = () => {
    return {
        type: ORDER_BY_ASC
    }
};

export const orderByDesc =  () => {
    return {
        type: ORDER_BY_DESC
    }
};

export const clearOrderBy = () => {
    return {
        type: CLEAR_ORDER_BY_PRICE
    }
};


export const PREV_PAGE = 'PREV_PAGE';
export const NEXT_PAGE = 'NEXT_PAGE';
export const GO_PAGE = 'GO_PAGE';
export const COUNT_ITEM = 'COUNT_ITEM';


export const nextPage = () => {
    return {
        type: NEXT_PAGE
    }
};

export const prevPage = () => {
    return {
        type: PREV_PAGE
    }
};

export const goPage = (n) => {
    return {
        type: GO_PAGE,
        currentPage: n
    }
};

export const countItem = (n) => {
    return {
        type: COUNT_ITEM,
        totalItemsCount: n
    }
}
