import React, { useState } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/**
 * ProductTabCard
 * Renders a product card inside a MUI Tab's icon area, with link and add-to-cart button.
 * Props:
 *  - art: producto (Titulo, Imagen[], Precio_Venta, Existencia)
 *  - empresa: slug de la empresa para construir el href
 *  - primaryColor: color para acentos (precio y carrito)
 *  - priceTextColor: color del texto dentro del círculo de precio
 *  - onAddToCart: function(art) -> void, se llama al presionar el botón de carrito
 */
export default function ProductTabCard({
  art,
  empresa,
  primaryColor = '#ff004c',
  priceTextColor = '#fff',
  onAddToCart,
}) {
  const [animating, setAnimating] = useState(false);

  if (!art) return null;
  const href = `/empresa/${empresa}/tienda/${(art.Titulo).replace(/ /g, '_').replace(/\//g, '~')}`;
  const inStock = (art.Existencia || 0) > 0;
  const title = art.Titulo || '';
  const displayTitle = title.length > 28 ? title.slice(0, 28) + '…' : title;
  const imgSrc = (art.Imagen && art.Imagen[0]) ? art.Imagen[0] : '/static/fblogo.png';
  const priceLabel = art.Precio_Venta ? `$${art.Precio_Venta}` : '--';

  const handleCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Animación simple: agrandar y reducir con cambio de color
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    onAddToCart && onAddToCart(art);
  };

  return (
    <Link href={href}>
      <a>
        <div
          style={{
            width: '100%',
            height: '100%',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
            padding: '0',
            background: inStock ? '#fff' : 'rgba(255, 0, 76, 0.13)',
            borderRadius: 18,
            boxShadow: inStock ? '0 2px 12px 0 rgba(0,0,0,0.10)' : '0 2px 12px 0 rgba(255,0,76,0.18)'
          }}
        >
          {inStock ? (
            <button
              style={{
                position: 'absolute',
                top: -11,
                left: -10,
                zIndex: 2,
                background: 'linear-gradient(145deg, #fff 60%, #f2f2f2 100%)',
                boxShadow: '0 2px 10px 0 rgba(0,0,0,0.18)',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.18s cubic-bezier(.36,1.6,.3,1), box-shadow 0.18s',
                outline: 'none',
                filter: 'drop-shadow(0 2px 8px #76d8a262)'
              }}
              className="add-cart-btn custom-cart-anim"
              title="Agregar al carrito"
              onClick={handleCartClick}
            >
              <ShoppingCartIcon
                className={animating ? 'cart-bounce-anim' : ''}
                style={{
                  fontSize: animating ? 32 : 24,
                  color: animating ? '#fff' : primaryColor,
                  filter: animating
                    ? 'drop-shadow(0 0 12px #ff004c)'
                    : 'drop-shadow(0 1px 2px #fff)',
                  background: animating ? '#ff004c' : 'transparent',
                  borderRadius: '10%',
                  padding: animating ? 3 : 0,
                  transition: 'all 0.2s cubic-bezier(.36,1.6,.3,1)',
                }}
              />
            </button>
          ) : (
            <span
              style={{
                position: 'absolute',
                top: -11,
                left: -10,
                zIndex: 2,
                background: 'rgba(255,0,76,0.85)',
                color: '#fff',
                borderRadius: '20px',
                padding: '6px 18px',
                fontWeight: 700,
                fontSize: '0.98rem',
                boxShadow: '0 2px 10px 0 rgba(255,0,76,0.18)',
                letterSpacing: '0.5px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Agotado
            </span>
          )}

          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={imgSrc}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                minWidth: '120px',
                minHeight: '120px',
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: 18,
                background: 'transparent',
                display: 'block',
              }}
              onError={e => { e.currentTarget.src = '/static/fblogo.png'; }}
            />
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 600, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 10, marginTop: 6, color: '#222' }}>
            {displayTitle}
          </div>

          <span
            style={{
              position: 'absolute',
              bottom: 23,
              right: -14,
              background: primaryColor,
              color: priceTextColor,
              borderRadius: '50%',
              minWidth: 48,
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.08rem',
              boxShadow: '0 2px 10px 0 rgba(0,0,0,0.13)',
              border: '2.5px solid #fff',
              letterSpacing: '-1px'
            }}
          >
            {priceLabel}
          </span>
        </div>

        <style jsx>{`
          .cart-bounce-anim {
            animation: cartBounce 0.4s cubic-bezier(.36,1.6,.3,1);
          }
          @keyframes cartBounce {
            0% { transform: scale(1); }
            35% { transform: scale(1.35); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
        `}</style>
      </a>
    </Link>
  );
}
