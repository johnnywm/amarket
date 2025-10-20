// Acciones para guardar la configuración de la tienda
export const setTiendaConfig = (slug, config) => ({
  type: 'SET_TIENDA_CONFIG',
  payload: { slug, config }
});

// Acción para limpiar toda la configuración de tiendas
export const CLEAR_TIENDA_CONFIG = 'CLEAR_TIENDA_CONFIG';
export const clearTiendaConfig = () => ({ type: CLEAR_TIENDA_CONFIG });
