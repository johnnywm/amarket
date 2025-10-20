// Reducer para guardar la configuración de la tienda por slug
const initialState = {
  tiendas: {} // { [slug]: { ...configTienda } }
};

export default function tiendaConfigReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TIENDA_CONFIG': {
      const { slug, config } = action.payload;
      return {
        ...state,
        tiendas: {
          ...state.tiendas,
          [slug]: config
        }
      };
    }
    case 'CLEAR_TIENDA_CONFIG': {
      return initialState;
    }
    default:
      return state;
  }
}
