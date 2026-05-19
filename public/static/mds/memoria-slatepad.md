# Identidad Visual SlatePad

## Paleta de Colores
- Primario: #1d4ed8 (azul intenso)
- Secundario: #38bdf8 (celeste)
- Fondo claro: #f8fafc, #e0e7ef, #eff6ff, #dbeafe
- Fondo blanco: #fff
- Gris oscuro: #334155
- Gris claro: #e2e8f0
- Rojo acción: #991b1b
- Verde acción: #22c55e

## Tipografía
- Familia: Inter, system-ui, sans-serif
- Peso: 700 (botones), 900 (títulos), 400-500 (texto)
- Tamaños: 1rem a 1.35rem en botones y títulos

## Bordes y Sombra
- Bordes redondeados: 8px, 10px, 12px, 16px, 20px según jerarquía
- Sombra suave: 0 2px 12px rgba(15,23,42,0.10), 0 8px 32px rgba(15,23,42,0.12)

## Botones
- Fondo: gradiente azul/celeste o gris claro
- Color texto: blanco (primario), azul/gris (secundario)
- Padding: 8px 18px (acción), 0 14px (switch)
- Iconos: Material Icons, tamaño 16-20px
- Hover: sombra más intensa, inversión de gradiente
- Transición: background, box-shadow, border-color 0.15-0.18s

## Layout
- Flexbox para alineación y distribución
- Espaciado: gap 6-18px, padding 12-24px
- Responsive: grid/flex adaptable a 500px, 700px, 900px

## Componentes Clave
- Botón acción: .actionBtn, .slatepad-btn-add
- Botón switch: .docSwitchBtn
- Tabla/lista: fondo blanco, grid, títulos en azul/gris
- Header: gradiente claro, sombra, borde inferior

## Ejemplo de botón SlatePad
```jsx
<button className="actionBtn print">
  <span className="material-icons">print</span>
  <span className="lbl">Imprimir</span>
</button>
```

## Ejemplo de switch SlatePad
```jsx
<button className="docSwitchBtn switchBlue">
  <span className="material-icons">cached</span>
  <p>Venta</p>
</button>
```

## Principios
- Moderno, limpio, mobile-first
- Jerarquía visual clara
- Accesibilidad: contraste alto, foco visible
- Consistencia en bordes, sombras y colores
