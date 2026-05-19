import React from 'react';
import Link from 'next/link';

/**
 * SlateFooter
 * Footer con identidad SlatePad, usando valores dinámicos de tienda.config
 * Props:
 *  - config: objeto tienda.config (nombreTienda, descripcion, colorPrimario, WaNumber, logoTiendaPreview)
 *  - empresa: slug de la empresa para armar links
 */
export default function SlateFooter({ config = {}, empresa = '' }) {
  const {
    nombreTienda = 'Mi Tienda',
    descripcion = '',
    colorPrimario = '#1d4ed8',
    WaNumber = '',
    logoTiendaPreview = '',
  } = config;

  const currentYear = new Date().getFullYear();
  const whatsappLink = WaNumber
    ? `https://api.whatsapp.com/send?phone=${WaNumber.startsWith('0') ? '593' + WaNumber.slice(1) : WaNumber}`
    : '#';

  return (
    <>
      <footer className="slate-footer">
        <div className="slate-footer-grid">
          {/* Columna 1: Marca */}
          <div className="slate-footer-col slate-footer-brand">
            {logoTiendaPreview && (
              <img
                src={logoTiendaPreview}
                alt={nombreTienda}
                className="slate-footer-logo"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <h3 className="slate-footer-name">{nombreTienda}</h3>
            {descripcion && (
              <p className="slate-footer-desc">{descripcion}</p>
            )}
          </div>

          {/* Columna 2: Navegación */}
          <div className="slate-footer-col slate-footer-nav">
            <h4 className="slate-footer-heading">Navegación</h4>
            <ul className="slate-footer-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href={`/empresa/${empresa}/tienda`}>Tienda</Link></li>
              <li><Link href="/contactanos">Contacto</Link></li>
              <li><Link href="/politicas-de-privacidad">Privacidad</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="slate-footer-col slate-footer-contact">
            <h4 className="slate-footer-heading">Contacto</h4>
            {WaNumber && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="slate-footer-whatsapp"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                  alt="WhatsApp"
                  className="slate-footer-wa-icon"
                />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* Barra inferior */}
        <div className="slate-footer-bottom">
          <p>© {currentYear} {nombreTienda}. Todos los derechos reservados.</p>
        </div>
      </footer>

      <style jsx>{`
        /* ===== SlateFooter — Identidad SlatePad ===== */
        .slate-footer {
          width: 100%;
          background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
          border-top: 2px solid #dbeafe;
          padding: 2.5rem 1.5rem 1rem 1.5rem;
          font-family: Inter, system-ui, sans-serif;
          color: #334155;
          box-shadow: 0 -2px 12px rgba(15, 23, 42, 0.08);
          margin-top: 2rem;
        }

        .slate-footer-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .slate-footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .slate-footer-brand {
          align-items: flex-start;
        }

        .slate-footer-logo {
          max-width: 140px;
          max-height: 60px;
          object-fit: contain;
          margin-bottom: 0.3rem;
        }

        .slate-footer-name {
          font-size: 1.25rem;
          font-weight: 900;
          color: ${colorPrimario};
          margin: 0;
          letter-spacing: 0.3px;
        }

        .slate-footer-desc {
          font-size: 0.92rem;
          color: #334155;
          opacity: 0.85;
          line-height: 1.5;
          margin: 0;
          max-width: 320px;
        }

        .slate-footer-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #1d4ed8;
          margin: 0 0 0.3rem 0;
          text-transform: capitalize;
          letter-spacing: 0.3px;
        }

        .slate-footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .slate-footer-links li a {
          color: #334155;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          transition: color 0.18s ease, transform 0.18s ease;
          display: inline-block;
        }

        .slate-footer-links li a:hover {
          color: ${colorPrimario};
          transform: translateX(3px);
        }

        .slate-footer-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: RGB(37, 211, 102);
          color: #fff;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 2px 12px rgba(15, 23, 42, 0.10);
          transition: box-shadow 0.18s, transform 0.18s, background 0.18s;
          width: fit-content;
        }

        .slate-footer-whatsapp:hover {
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.14);
          transform: translateY(-2px);
          background: #1da04d;
        }

        .slate-footer-wa-icon {
          width: 22px;
          height: 22px;
        }

        .slate-footer-bottom {
          max-width: 1100px;
          margin: 1.5rem auto 0 auto;
          padding-top: 1rem;
          border-top: 1px solid #e0e7ef;
          text-align: center;
        }

        .slate-footer-bottom p {
          font-size: 0.82rem;
          color: #334155;
          opacity: 0.7;
          margin: 0;
          font-weight: 400;
        }

        /* ===== Responsive ===== */
        @media (min-width: 600px) {
          .slate-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 900px) {
          .slate-footer-grid {
            grid-template-columns: 1.2fr 1fr 1fr;
          }
        }
      `}</style>
    </>
  );
}