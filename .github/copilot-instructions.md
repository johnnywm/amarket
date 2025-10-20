# DTC E-commerce Platform - Copilot Instructions

This is a Next.js e-commerce platform for mobile phone and laptop parts distribution, built with Redux and class-based React components.

## Architecture Overview

**Core Stack**: Next.js 12.3.4, React 18, Redux with Thunk, Material-UI, Bootstrap, Sass
**State Management**: Redux store with localStorage persistence (`_app.js` handles state hydration)
**Styling**: Mixed CSS/SCSS approach - global styles in `_app.js`, component-specific styles in `/styles/`
**Database**: MongoDB with Mongoose models in `/models/` directory
**PWA**: Service Worker implementation using `next-with-workbox` (configured in `next.config.js`)

## Development Workflow

```bash
npm run dev    # Development server on port 5000 (not 3000!)
npm run dev2   # Legacy OpenSSL support version
npm run build  # Production build
npm run start  # Production server
```

**Important**: Dev server runs on port 5000, not the Next.js default 3000.

## Key Architectural Patterns

### Component Architecture
- **Mixed React Patterns**: Legacy class components (`navbar.js`, `carrito.js`) coexist with modern functional components (`slidecont1-3.js`)
- **Event Communication**: Uses `postal` library for component-to-component messaging (see `navbar.js` channel subscriptions)
- **Lazy Loading**: Intersection Observer API for image lazy loading implemented in main page components

### Redux Store Structure
```javascript
// State shape defined in reduxstore/reducers/index.js
{
  shop,              // Main e-commerce state
  orderReducer,      // Order management
  productReducer,    // Product catalog
  userReducerEmarket, // User authentication
  categoryReducer,   // Product categories
  brandFilter,       // Product filtering
  pagination,        // UI pagination
  // ... other reducers
}
```

### Data Models (MongoDB/Mongoose)
- `models/articulo.js` - Main product model with Eqid, Grupo, Categoria structure
- `models/ordencompra.js` - Order management
- `models/users.js` - User authentication
- Spanish field naming convention throughout

### Environment Configuration
Required environment variables (see `next.config.js`):
```javascript
EMARKET_DATA_BASE          // Database connection
CLIENT_PRINCIPAL_MAIL      // Business email
CLIENT_PRINCIPAL_BANKNAME  // Payment processing
URL_BACKEND_SERVER        // API backend URL
```

## Component Conventions

### File Organization
- `/components/` - Reusable components (mixed naming: some PascalCase, some lowercase)
- `/components/data/` - Static data exports (iPhone models, Galaxy models, etc.)
- `/components/filtros/` - Product filtering components
- `/components/modelos/` - Device-specific components
- `/pages/` - Next.js pages (Spanish URLs: `carro-de-compras.js`, `contactanos.js`)

### Styling Approach
- Global styles loaded in `_app.js` (multiple CSS/SCSS imports)
- Component-specific styles in `/styles/` with naming pattern: `ComponentName.scss`
- SCSS variables pattern: `$darkBack`, `$mywhite`, `$myred`
- Bootstrap + custom styles combination

### State Management Patterns
- Redux actions follow async pattern with Begin/Success/Failure suffixes
- localStorage persistence with `saveToLocalStorage`/`loadFromLocalStorage` functions
- API calls use fetch with environment-based URLs
- Error handling with `handleErrors` function pattern

## Critical Integration Points

### API Communication
- Backend URL: `process.env.URL_BACKEND_SERVER`
- POST requests with JSON body structure: `{User:{DBname:process.env.EMARKET_DATA_BASE}}`
- Data filtering: Remove "IGLASS" prefixed products from API responses

### Image Handling
- Static images in `/public/static/` directory structure
- Product images organized by device type (`/static/iphones/`, `/static/galaxys/`)
- Lazy loading implementation with `data-src` attributes

### PWA Features
- Service worker configured in `worker.js`
- Workbox integration for 50MB cache limit
- Facebook Pixel integration for analytics

## Development Guidelines

### Adding New Products
1. Add product data to appropriate file in `/components/data/`
2. Update product images in `/public/static/[device-type]/`
3. Ensure Mongoose model compatibility with `models/articulo.js` schema

### Adding New Pages
- Use Spanish URL patterns (kebab-case)
- Import global styles and Redux store connection
- Follow existing page transition patterns with `next-page-transitions`

### Component Development
- Check existing pattern (class vs functional) in similar components
- Use `postal` channels for cross-component communication
- Implement responsive design with existing breakpoint patterns
- Add loading states and error boundaries for API-dependent components

### State Updates
- Follow Redux action patterns in `reduxstore/actions/myact.js`
- Update corresponding reducer in `reduxstore/reducers/`
- Test localStorage persistence behavior

## Testing & Debugging
- Redux DevTools enabled in development
- Console logging patterns for state debugging
- NProgress loader for route transitions
- Browser intersection observer for performance monitoring