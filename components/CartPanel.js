import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Animate } from "react-animate-mount";
import Link from 'next/link';
import { withRouter } from 'next/router';
import { removeProductToCart, incrementCartQuantity, decrementCartQuantity } from "../reduxstore/actions";


import dynamic from 'next/dynamic';
const Compra = dynamic(() => import('../components/landingContactPayment'), { ssr: false });

class CartPanel extends React.Component {
  // Convierte HEX a RGBA con alpha
  hexToRgba = (hex, alpha = 1) => {
    if (!hex) return `rgba(255,0,76,${alpha})`;
    if (typeof hex === 'string' && hex.startsWith('rgb')) return hex;
    let h = (hex || '').replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(ch => ch + ch).join('');
    if (h.length !== 6) return `rgba(255,0,76,${alpha})`;
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  handleQtyChangeMobile = (prod, type) => {
    const { dispatch } = this.props;
    if (type === 'inc') {
      if (prod.CantidadCompra >= prod.Existencia) return;
      dispatch(incrementCartQuantity(prod._id));
    } else if (type === 'desc') {
      if (prod.CantidadCompra <= 1) return;
      dispatch(decrementCartQuantity(prod._id));
    }
  };
  state = {
    selectedTab: 0,
    isMobile: false,
    closing: false,
    collapsed: false,
    collapsing: false,
    entering: true,
    compra: false
  };



  componentDidMount() {
    this.setState({ isMobile: window.innerWidth <= 768 });
    window.addEventListener('resize', this.handleResize);
    this._closedNotified = false;

    if (!this.props.cart || this.props.cart.length === 0) {
      this.scheduleClosePanel();
      return;
    }

    requestAnimationFrame(() => {
      this.setState({
        entering: true,
        closing: false,
        collapsed: false,
        collapsing: false,
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this._collapseTimer);
    clearTimeout(this._closeFallback);
  }

  componentDidUpdate(prevProps) {
    const prevLen = Array.isArray(prevProps.cart) ? prevProps.cart.length : 0;
    const len = Array.isArray(this.props.cart) ? this.props.cart.length : 0;
    if (prevLen > 0 && len === 0 && !this.state.closing) {
      this.scheduleClosePanel();
    }
  }

  finishClosePanel = () => {
    if (this._closedNotified) return;
    this._closedNotified = true;
    clearTimeout(this._closeFallback);
    try {
      this.props.getoff && this.props.getoff();
    } catch (_) {}
  };

  scheduleClosePanel = () => {
    if (this.state.closing) return;
    this._closedNotified = false;
    clearTimeout(this._closeFallback);
    this.setState({
      closing: true,
      collapsing: false,
      entering: false,
    }, () => {
      this._closeFallback = setTimeout(this.finishClosePanel, 480);
    });
  };

  handleRemoveProduct = (productId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const { dispatch, cart } = this.props;
    const len = Array.isArray(cart) ? cart.length : 0;
    if (len <= 1) {
      this._closedNotified = false;
      clearTimeout(this._closeFallback);
      this.setState({
        closing: true,
        collapsing: false,
        entering: false,
      }, () => {
        dispatch(removeProductToCart(productId));
        this._closeFallback = setTimeout(this.finishClosePanel, 480);
      });
      return;
    }
    dispatch(removeProductToCart(productId));
  };

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleExpandFromBar = (e) => {
    if (this.state.closing || !this.state.collapsed) return;
    if (e && e.target && e.target.closest && e.target.closest('.cart-panel-collapse-toggle')) return;
    clearTimeout(this._collapseTimer);
    this.setState({ collapsed: false, collapsing: false });
  };

  handleToggleCollapse = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (this.state.closing) return;
    this.setState(prev => ({
      collapsed: !prev.collapsed,
      collapsing: !prev.collapsed,
    }));
    if (!this.state.collapsed) {
      this._collapseTimer = setTimeout(() => {
        this.setState({ collapsing: false });
      }, 420);
    } else {
      clearTimeout(this._collapseTimer);
      this.setState({ collapsing: false });
    }
  };

  handleClosePanel = () => {
    this.scheduleClosePanel();
  };

  handleAnimationEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    const animName = e.animationName || '';
    if (this.state.entering && (animName.includes('slideIn') || animName.includes('slideUp'))) {
      this.setState({ entering: false });
      return;
    }
    if (this.state.closing && (animName.includes('slideOut') || animName.includes('slideDown'))) {
      this.finishClosePanel();
    }
  };

  render() {
    const { cart, dispatch, primaryColor, secondaryColor } = this.props;
    const { selectedTab, isMobile, collapsed, collapsing } = this.state;
    const primary = primaryColor || '#ff004c';
    const secondary = secondaryColor || '#38bdf8';
    const primaryTint = this.hexToRgba(primary, 0.12);
    const primaryBorder = this.hexToRgba(primary, 0.20);
    const barClickable = collapsed && !this.state.closing;
 
    const totalProductos = cart.reduce((acc, item) => acc + (item.CantidadCompra || 1), 0);
    const totalValor = cart.reduce((acc, item) => acc + (item.Precio_Venta * (item.CantidadCompra || 1)), 0);
    return (
      <div
        className={`cart-panel ${isMobile ? 'cart-panel-mobile' : 'cart-panel-desktop'}${this.state.closing ? ' cart-panel-closing' : ''}${collapsed ? ' collapsed' : ''}${collapsing ? ' cart-panel-collapsing' : ''}${this.state.entering ? ' cart-panel-enter' : ''}`}
        onAnimationEnd={this.handleAnimationEnd}
        onClick={barClickable ? this.handleExpandFromBar : undefined}
        role={barClickable ? 'button' : undefined}
        aria-label={barClickable ? 'Abrir carrito' : undefined}
        style={!isMobile ? {
          '--cart-primary': primary,
          '--cart-secondary': secondary,
          '--cart-primary-tint': primaryTint,
          '--cart-primary-border': primaryBorder,
          cursor: barClickable ? 'pointer' : undefined,
        } : {
          cursor: barClickable ? 'pointer' : undefined,
          '--cart-secondary': secondary,
        }}
      >
        <div className="cart-panel-header">
          <button
            className="cart-panel-collapse-toggle"
            aria-label={collapsed ? 'Expandir carrito' : 'Colapsar carrito'}
            onClick={this.handleToggleCollapse}
            title={collapsed ? 'Abrir' : 'Cerrar'}
          >
            {isMobile ? (
              collapsed ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />
            ) : (
              collapsed ? <KeyboardArrowLeftIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />
            )}
          </button>
        </div>
        <div className="cart-panel-inner">
          <div className="cart-panel-header-block">
            <div className="cart-panel-header-flex">
              <div className="cart-panel-header-total">
                <span className="cart-panel-total">Total: ${totalValor.toFixed(2)}</span>
              </div>
            <div className="cart-panel-header-actions">
                           <span className="cart-panel-title">{totalProductos} producto{totalProductos !== 1 ? 's' : ''} </span>

             
                <div className="cart-panel-btn" onClick={()=>{this.setState({compra:true})}}>
                  Comprar <ShoppingCartIcon style={{ marginLeft: 6 }} />
                </div>

            </div>
          </div>
          </div>
        {isMobile ? (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="productos en carrito"
              className="cart-panel-tabs"
              TabIndicatorProps={{ style: { display: 'none' } }}
            >
              {cart.map((prod, idx) => (
                <Tab
                  key={prod._id || idx}
                  disableRipple
                  className="cart-panel-tab"
                  icon={
                    <div className="cart-panel-product">
                      <div className="cart-panel-img-wrap">
                        <img
                          src={prod.Imagen && prod.Imagen[0] ? prod.Imagen[0] : '/static/fblogo.png'}
                          alt={prod.Titulo}
                          className="cart-panel-img"
                          onError={e => { e.target.src = '/static/fblogo.png'; }}
                        />
                      </div>
                      <div className="cart-panel-prod-title">{prod.Titulo}</div>
                      <div className="cart-panel-prod-row cart-panel-prod-row-mobile">
                        <span className="cart-panel-prod-precio">${prod.Precio_Venta}</span>
                        <span className="cart-panel-prod-cant">x{prod.CantidadCompra || 1}</span>
                        <button className="cart-panel-qty-btn" onClick={() => this.handleQtyChangeMobile(prod, 'desc')} disabled={prod.CantidadCompra <= 1}>-</button>
                        <span className="cart-panel-qty-value">{prod.CantidadCompra || 1}</span>
                        <button className="cart-panel-qty-btn" onClick={() => this.handleQtyChangeMobile(prod, 'inc')} disabled={prod.CantidadCompra >= prod.Existencia}>+</button>
                      </div>
                      <button
                        className="cart-panel-remove-btn"
                        title="Eliminar"
                        onClick={(e) => this.handleRemoveProduct(prod._id, e)}
                      >
                        <span style={{fontSize:'1.05rem',fontWeight:700,display:'block',lineHeight:1}}>×</span>
                      </button>
                    </div>
                  }
                />
              ))}
            </Tabs>
          </Box>
        ) : (
          <div className="cart-panel-list-vertical">
            {cart.map((prod, idx) => (
              <div className="cart-panel-product cart-panel-product-desktop" key={prod._id || idx}>
                <div className="cart-panel-imgqty-row">
                  <div className="cart-panel-img-wrap">
                    <img
                      src={prod.Imagen && prod.Imagen[0] ? prod.Imagen[0] : '/static/fblogo.png'}
                      alt={prod.Titulo}
                      className="cart-panel-img"
                      onError={e => { e.target.src = '/static/fblogo.png'; }}
                    />
                  </div>
                  <div className="cart-panel-qty-col">
                    <button className="cart-panel-qty-btn-vertical" onClick={() => dispatch(incrementCartQuantity(prod._id))} disabled={prod.CantidadCompra >= prod.Existencia}>▲</button>
                    <span className="cart-panel-qty-value">{prod.CantidadCompra || 1}</span>
                    <button className="cart-panel-qty-btn-vertical" onClick={() => dispatch(decrementCartQuantity(prod._id))} disabled={prod.CantidadCompra <= 1}>▼</button>
                  </div>
                </div>
                <div className="cart-panel-prod-info">
                  <div className="cart-panel-prod-title">
                    {prod.Titulo.length > 20 ? prod.Titulo.slice(0, 20) + '…' : prod.Titulo}
                  </div>
                  <div className="cart-panel-prod-precio">${prod.Precio_Venta}</div>
                  <div className="cart-panel-prod-cant">Cantidad: <b>{prod.CantidadCompra || 1}</b></div>
                </div>
                <button
                  className="cart-panel-remove-btn"
                  title="Eliminar"
                  onClick={(e) => this.handleRemoveProduct(prod._id, e)}
                >
                  <span style={{fontSize:'1.05rem',fontWeight:700,display:'block',lineHeight:1}}>×</span>
                </button>
              </div>
            ))}
          </div>
        )}
        </div>
        <Animate show={this.state.compra}>
            <Compra flechafun ={ ()=>{this.setState({compra:false}); this.props.getoff(); }}/>
        </Animate>
        <style jsx>{`
          .cart-panel {
            --handle-w: 28px;
            --handle-h: 28px;
            --cart-bar: var(--cart-secondary, #38bdf8);
          }
          .cart-panel-inner {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.32s ease;
          }
          .cart-panel-header-block {
            padding: 0 12px 8px 40px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          .cart-panel.cart-panel-mobile.collapsed {
            transform: translateY(calc(98% - var(--handle-h)));
          }
          .cart-panel {
            position: fixed;
            z-index: 1200;
            background: #fff;
            box-shadow: 0 2px 24px 0 rgba(15, 23, 42, 0.14);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            overflow: hidden;
          }
          .cart-panel-mobile {
            left: 0;
            bottom: 0;
            width: 100vw;
            height: 200px;
            border-radius: 18px 18px 0 0;
            box-shadow: 0 -2px 24px 0 rgba(0,0,0,0.18);
          }
          .cart-panel-desktop {
            top: 0;
            right: 0;
            width: 200px;
            height: 100vh;
            border-radius: 16px 0 0 16px;
            box-shadow: -2px 0 24px rgba(15, 23, 42, 0.12);
            transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                        background 0.35s ease,
                        box-shadow 0.35s ease;
          }
          .cart-panel-desktop.collapsed:not(.cart-panel-closing) {
            width: var(--handle-w);
            background: var(--cart-bar);
            animation: none !important;
            transform: none !important;
            border-radius: 14px 0 0 14px;
            box-shadow: -2px 0 16px rgba(15, 23, 42, 0.18);
            cursor: pointer;
          }
          .cart-panel-mobile.collapsed:not(.cart-panel-closing) {
            cursor: pointer;
          }
          .cart-panel-desktop.collapsed .cart-panel-inner,
          .cart-panel-desktop.cart-panel-collapsing .cart-panel-inner {
            transform: translateX(50px);
            opacity: 0;
            pointer-events: none;
          }
          .cart-panel-enter.cart-panel-mobile:not(.collapsed) {
            animation: slideUpCart 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .cart-panel-enter.cart-panel-desktop:not(.collapsed) {
            animation: slideInCart 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .cart-panel-enter:not(.collapsed) .cart-panel-inner {
            animation: cartInnerEnter 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both;
          }
          .cart-panel-closing {
            pointer-events: none;
          }
          .cart-panel-closing .cart-panel-inner {
            opacity: 0 !important;
            pointer-events: none;
          }
          .cart-panel-closing.cart-panel-mobile {
            animation: slideDownCart 0.42s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
          }
          .cart-panel-closing.cart-panel-desktop {
            animation: slideOutCart 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
          }
          .cart-panel-closing.cart-panel-desktop .cart-panel-inner,
          .cart-panel-closing.cart-panel-mobile .cart-panel-inner {
            animation: none !important;
          }
          .cart-panel-closing.cart-panel-desktop.collapsed {
            width: var(--handle-w) !important;
            background: var(--cart-bar) !important;
          }
          .cart-panel-header { position: relative; z-index: 4; }
          .cart-panel-desktop .cart-panel-header {
            position: absolute;
            inset: 0;
            padding: 0;
            background: transparent;
            border: none;
            pointer-events: none;
          }
          .cart-panel-desktop.collapsed .cart-panel-header,
          .cart-panel-desktop.cart-panel-collapsing .cart-panel-header {
            pointer-events: none;
          }
          .cart-panel-desktop .cart-panel-collapse-toggle {
            pointer-events: auto;
          }
          .cart-panel-collapse-toggle {
            position: absolute;
            top: 6px;
            left: 6px;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f2f2f2;
            border: none;
            border-radius: 50%;
            color: #333;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            transition: transform 0.15s ease, background 0.15s ease;
            z-index: 2;
          }
          .cart-panel.collapsed .cart-panel-collapse-toggle { background: ${primaryTint}; color: ${primary}; }
          .cart-panel-collapse-toggle:hover { background: #eaeaea; transform: scale(1.05); }
          .cart-panel-desktop.collapsed .cart-panel-collapse-toggle,
          .cart-panel-desktop.cart-panel-collapsing .cart-panel-collapse-toggle {
            top: 50%;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.22);
            color: #fff;
            box-shadow: none;
          }
          .cart-panel-desktop.collapsed .cart-panel-collapse-toggle:hover,
          .cart-panel-desktop.cart-panel-collapsing .cart-panel-collapse-toggle:hover {
            background: rgba(255, 255, 255, 0.35);
            transform: translate(-50%, -50%) scale(1.06);
          }
          .cart-panel.collapsed .cart-panel-inner {
            pointer-events: none;
          }
          @keyframes slideUpCart {
            from { transform: translateY(220px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideInCart {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes cartInnerEnter {
            from { transform: translateX(36px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideDownCart {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(220px); opacity: 0; }
          }
          @keyframes slideOutCart {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
          }
          .cart-panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 18px 8px 18px;
            background: #f8f8f8;
            border-bottom: 1px solid #eee;
          }
          .cart-panel-header-flex {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .cart-panel-header-total {
            display: flex;
            align-items: center;
            margin-left: 20px
          }
          .cart-panel-header-actions {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            gap: 2px;
          }
          .cart-panel-title {
            font-size: 0.92rem;
            font-weight: 500;
            color: #222;
          }
          .cart-panel-btn {
            background: #ff004c;
            color: #fff;
            border-radius: 18px;
            padding: 6px 16px;
            font-weight: 600;
            font-size: 0.98rem;
            text-decoration: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            transition: background 0.18s, box-shadow 0.18s;
            box-shadow: 0 2px 8px 0 rgba(255,0,76,0.10);
          }
          .cart-panel-btn:hover {
            background: #d6003a;
            box-shadow: 0 4px 16px 0 rgba(255,0,76,0.18);
          }
          .cart-panel-tabs {
            width: 100%;
            height: 100%;
            min-height: 0;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            background: #fff;
          }
          .cart-panel-tab {
            min-width: 0;
            padding: 0;
            margin: 0;
            background: transparent;
            border: none;
            box-shadow: none;
            outline: none;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .cart-panel-product {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            padding: 8px 0 0 0;
            position: relative;
            margin-bottom: 10px;
            min-height: 120px;
          }
          .cart-panel-list-vertical {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
            padding: 0 0 8px 0;
            overflow-y: auto;
            max-height: calc(100vh - 80px);
          }
          .cart-panel-img-wrap {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            background: #fafafa;
            box-shadow: 0 1px 6px 0 rgba(0,0,0,0.04);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 6px;
          }
          .cart-panel-img {
            width: 90%;
            height: 90%;
            object-fit: contain;
            border-radius: 10px;
            background: #fff;
          }
          .cart-panel-prod-title {
            font-size: 0.92rem;
            font-weight: 500;
            color: #222;
            text-align: center;
            margin-bottom: 2px;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .cart-panel-prod-precio {
            font-size: 0.98rem;
            font-weight: 700;
            color: #ff004c;
            margin-bottom: 2px;
            text-align: center;
          }
          .cart-panel-prod-cant {
            font-size: 0.85rem;
            color: #888;
            font-weight: 500;
            text-align: center;
          }
          .cart-panel-prod-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            flex: 1;
            min-width: 0;
          }
          @media (min-width: 769px) {
            /* En desktop, reserva espacio a la izquierda para la flecha */
            .cart-panel-header { padding-left: 40px; }
            .cart-panel-desktop.collapsed .cart-panel-header-block,
            .cart-panel-desktop.cart-panel-collapsing .cart-panel-header-block {
              display: none;
            }
            .cart-panel-header-flex {
              flex-direction: column;
              align-items: flex-start;
              gap: 2px;
            }
            .cart-panel-header-actions {
              align-items: flex-start;
                  flex-direction: column;
            }
            .cart-panel-list-vertical .cart-panel-product-desktop {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              padding: 6px 4px 6px 4px;
              border-bottom: 1px solid #f0f0f0;
              min-height: 54px;
              position: relative;
              background: #fff;
              gap: 0.45rem;
              margin-top: 8px;
            }
            .cart-panel-list-vertical .cart-panel-imgqty-row {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              min-width: 44px;
              margin-right: 6px;
              gap: 4px;
            }
            .cart-panel-list-vertical .cart-panel-img-wrap {
              margin-bottom: 2px;
              margin-right: 0;
              flex-shrink: 0;
              position: relative;
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 64px;
              height: 64px;
              max-width: 80px;
              max-height: 80px;
            }
            .cart-panel-list-vertical .cart-panel-prod-info {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
              min-width: 0;
              flex: 1;
              padding: 0 2px;
              gap: 1px;
            }
            .cart-panel-list-vertical .cart-panel-prod-title {
              font-size: 0.97rem;
              font-weight: 600;
              color: #222;
              margin-bottom: 0px;
              text-align: left;
              width: 100%;
              white-space: normal;
              line-height: 1.1;
            }
            .cart-panel-list-vertical .cart-panel-prod-precio {
              font-size: 0.93rem;
              color: #ff004c;
              font-weight: 700;
              margin-bottom: 0px;
              text-align: left;
              width: 100%;
            }
            .cart-panel-list-vertical .cart-panel-prod-cant {
              font-size: 0.91rem;
              color: #444;
              font-weight: 500;
              text-align: left;
              width: 100%;
            }
          }
          @media (max-width: 768px) {
            /* Mobile: flecha a la izquierda y barra limpia al colapsar */
            .cart-panel-collapse-toggle { left: 6px; right: auto; }
            .cart-panel-mobile.collapsed .cart-panel-header {
              height: var(--handle-h);
              min-height: var(--handle-h);
              padding: 2px 8px 2px 36px;
              background: var(--cart-bar);
              border-bottom: none;
            }
            .cart-panel-mobile.collapsed .cart-panel-header-flex { display: none; }
            .cart-panel-mobile.collapsed .cart-panel-tabs,
            .cart-panel-mobile.collapsed .cart-panel-list-vertical { display: none; }
          }
          .cart-panel-prod-row-mobile {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 6px;
          }
         
            .cart-panel-remove-btn {
              position: absolute;
              top: -6px;
              right: 2px;
              width: 22px;
              height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(145deg,#ff004c 70%,#b71c1c 100%);
              box-shadow: 0 1px 4px 0 rgba(255,0,76,0.13);
              border: none;
              border-radius: 50%;
              color: #fff;
              font-weight: 600;
              font-size: 1rem;
              cursor: pointer;
              transition: transform 0.15s, box-shadow 0.15s;
              opacity: 0.85;
            }
          .cart-panel-remove-btn:hover {
            transform: scale(1.10);
            box-shadow: 0 2px 8px 0 rgba(255,0,76,0.22);
            background: linear-gradient(145deg,#b71c1c 80%,#ff004c 100%);
            opacity: 1;
          }
          .cart-panel-qty-row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin: 4px 0 2px 0;
          }
          .cart-panel-qty-btn {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            border: none;
            background: #f2f2f2;
            color: #ff004c;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.06);
            display: flex;
            align-items: center;
            justify-content: center;
            visibility: visible;
            opacity: 1;
          }
          .cart-panel-qty-btn:disabled {
            color: #ccc;
            background: #f8f8f8;
            cursor: not-allowed;
          }
          .cart-panel-qty-btn:hover:not(:disabled) {
            background: #ffe6ef;
            color: #b71c1c;
          }
          .cart-panel-qty-value {
            min-width: 18px;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            color: #222;
          }
          /* Desktop: controles de cantidad verticales al lado de la imagen */
          @media (min-width: 769px) {
            .cart-panel-list-vertical .cart-panel-product-desktop {
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
            }
                  .cart-panel-prod-row-mobile {
              flex-direction: column;
              align-items: flex-start;
              gap: 2px;
            }
            .cart-panel-list-vertical .cart-panel-img-wrap {
              margin-bottom: 0;
              margin-right: 10px;
              flex-shrink: 0;
              position: relative;
              display: flex;
              flex-direction: row;
              align-items: center;
            }
            .cart-panel-list-vertical .cart-panel-qty-col {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-left: 6px;
              gap: 2px;
            }
            .cart-panel-list-vertical .cart-panel-qty-btn-vertical {
              width: 22px;
              height: 22px;
              border-radius: 6px;
              border: none;
              background: #f2f2f2;
              color: #ff004c;
              font-size: 1.1rem;
              font-weight: 700;
              cursor: pointer;
              transition: background 0.15s, color 0.15s;
              box-shadow: 0 1px 2px 0 rgba(0,0,0,0.06);
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .cart-panel-list-vertical .cart-panel-qty-btn-vertical:disabled {
              color: #ccc;
              background: #f8f8f8;
              cursor: not-allowed;
            }
            .cart-panel-list-vertical .cart-panel-qty-btn-vertical:hover:not(:disabled) {
              background: #ffe6ef;
              color: #b71c1c;
            }
            .cart-panel-list-vertical .cart-panel-qty-value {
              min-width: 18px;
              text-align: center;
              font-size: 1rem;
              font-weight: 600;
              color: #222;
              margin: 2px 0;
            }
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cart = state.shop && state.shop.cart ? state.shop.cart : [];
  let primaryColor = '#ff004c';
  let secondaryColor = '#38bdf8';
  try {
    const tiendas = state.tiendaConfig && state.tiendaConfig.tiendas ? state.tiendaConfig.tiendas : {};
    const slug = ownProps && ownProps.router && ownProps.router.query ? ownProps.router.query.slug : undefined;
    const config = (slug && tiendas[slug]) ? tiendas[slug] : Object.values(tiendas)[0];
    if (config) {
      if (config.colorPrimario) primaryColor = config.colorPrimario;
      if (config.colorSecundario) secondaryColor = config.colorSecundario;
    }
  } catch (e) {}
  return { cart, primaryColor, secondaryColor, state };
};

export default withRouter(connect(mapStateToProps)(CartPanel));
