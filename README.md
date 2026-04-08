# Real Life Missions — Frontend

> 🇺🇸 [English](#english) | 🇪🇸 [Español](#español)

---

<a name="english"></a>
# 🇺🇸 English

Gamified mobile/web app where users complete daily missions to earn XP, maintain streaks, and level up. Built with Angular 17 + Ionic 8 + Capacitor 6.

## Tech Stack

- **Angular 17** — Standalone components, lazy-loaded routes, Signals for reactive state
- **Ionic 8** — Mobile-first UI components and navigation
- **Capacitor 6** — Native API access (persistent storage via `@capacitor/preferences`)
- **RxJS 7.8** — HTTP stream handling
- **TypeScript + SCSS**

## Features

- JWT authentication (login / register)
- Daily mission selection and completion
- Categories: Physical, Mental, Habits, Finance
- XP, level, and streak system
- User profile with progress stats
- Account settings, notifications, and preferences
- Bilingual support **English / Spanish** (custom i18n with Signals)

## Project Structure

```
src/
├── app/
│   ├── app.config.ts        # Global providers (router, http, ionic)
│   ├── app.routes.ts        # Lazy-loaded routes
│   └── auth.interceptor.ts  # JWT interceptor
├── pages/
│   ├── login/
│   ├── register/
│   ├── mission-select/      # Initial mission selection
│   ├── missions/            # Active daily missions
│   ├── profile/
│   ├── edit-profile/
│   └── settings/
├── services/
│   ├── auth.service.ts      # Login, register, token management
│   ├── mission.service.ts   # Mission CRUD
│   ├── progress.service.ts  # User profile and progress
│   └── i18n.service.ts      # EN/ES translations
├── store/
│   └── app.store.ts         # Global state with Angular Signals
├── components/
│   └── bottom-nav/          # Bottom navigation bar
├── pipes/
│   └── translate.pipe.ts    # i18n pipe for templates
└── types.ts                 # Shared types
```

## Prerequisites

- Node.js >= 18
- Angular CLI >= 17
- Backend running at `http://localhost:3000`

## Setup & Development

```bash
# Install dependencies
npm install

# Start dev server (proxy → localhost:3000)
npm run dev
```

App available at `http://localhost:4200`. The proxy forwards `/api/*` → `http://localhost:3000`.

## Production Build

```bash
npm run build
```

Output is generated in `dist/`.

## API Endpoints

The frontend connects to a REST backend at `http://localhost:3000`. Main endpoints:

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | Login, returns JWT |
| GET | `/missions` | Available missions |
| GET | `/missions/daily` | User's daily missions |
| POST | `/missions/:id/complete` | Complete a mission |
| POST | `/missions/select` | Select missions |
| GET | `/users/profile` | User profile |
| GET | `/users/progress` | Progress and stats |

All protected routes require the `Authorization: Bearer <token>` header.

## Global State

`AppStore` centralizes state using **Angular Signals**:

```ts
store.user()              // user profile
store.missions()          // all missions
store.pendingMissions()   // computed: pending only
store.completedMissions() // computed: completed only
store.loading()           // loading state
```

## Internationalization

`I18nService` manages translations. To switch language:

```ts
i18n.setLang('en') // or 'es'
```

In templates, use the `translate` pipe:

```html
{{ 'missions.title' | translate }}
```

Language preference is persisted in `localStorage`.

---

<a name="español"></a>
# 🇪🇸 Español

Aplicación móvil/web gamificada donde los usuarios completan misiones diarias para ganar XP, mantener rachas y subir de nivel. Construida con Angular 17 + Ionic 8 + Capacitor 6.

## Stack tecnológico

- **Angular 17** — Standalone components, lazy-loaded routes, Signals para estado reactivo
- **Ionic 8** — UI components y navegación mobile-first
- **Capacitor 6** — Acceso a APIs nativas (almacenamiento persistente con `@capacitor/preferences`)
- **RxJS 7.8** — Manejo de streams HTTP
- **TypeScript + SCSS**

## Características principales

- Autenticación con JWT (login / registro)
- Selección y completado de misiones diarias
- Categorías: Físico, Mental, Hábitos, Finanzas
- Sistema de XP, niveles y rachas
- Perfil de usuario con estadísticas de progreso
- Configuración de cuenta, notificaciones y preferencias
- Soporte bilingüe **Español / English** (i18n propio con Signals)

## Estructura del proyecto

```
src/
├── app/
│   ├── app.config.ts        # Providers globales (router, http, ionic)
│   ├── app.routes.ts        # Rutas lazy-loaded
│   └── auth.interceptor.ts  # Interceptor JWT
├── pages/
│   ├── login/
│   ├── register/
│   ├── mission-select/      # Selección inicial de misiones
│   ├── missions/            # Misiones diarias activas
│   ├── profile/
│   ├── edit-profile/
│   └── settings/
├── services/
│   ├── auth.service.ts      # Login, registro, token
│   ├── mission.service.ts   # CRUD de misiones
│   ├── progress.service.ts  # Perfil y progreso del usuario
│   └── i18n.service.ts      # Traducciones EN/ES
├── store/
│   └── app.store.ts         # Estado global con Angular Signals
├── components/
│   └── bottom-nav/          # Navegación inferior
├── pipes/
│   └── translate.pipe.ts    # Pipe para i18n en templates
└── types.ts                 # Tipos compartidos
```

## Requisitos previos

- Node.js >= 18
- Angular CLI >= 17
- Backend corriendo en `http://localhost:3000`

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (proxy → localhost:3000)
npm run dev
```

La app estará disponible en `http://localhost:4200`. El proxy redirige `/api/*` → `http://localhost:3000`.

## Build de producción

```bash
npm run build
```

El output se genera en `dist/`.

## API

El frontend se conecta al backend REST en `http://localhost:3000`. Endpoints principales:

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Login, devuelve JWT |
| GET | `/missions` | Misiones disponibles |
| GET | `/missions/daily` | Misiones del día del usuario |
| POST | `/missions/:id/complete` | Completar una misión |
| POST | `/missions/select` | Seleccionar misiones |
| GET | `/users/profile` | Perfil del usuario |
| GET | `/users/progress` | Progreso y estadísticas |

Todas las rutas protegidas requieren el header `Authorization: Bearer <token>`.

## Estado global

`AppStore` centraliza el estado usando **Angular Signals**:

```ts
store.user()              // perfil del usuario
store.missions()          // todas las misiones
store.pendingMissions()   // computed: solo pendientes
store.completedMissions() // computed: solo completadas
store.loading()           // estado de carga
```

## Internacionalización

`I18nService` gestiona las traducciones. Para cambiar el idioma:

```ts
i18n.setLang('es') // o 'en'
```

En templates se usa el pipe `translate`:

```html
{{ 'missions.title' | translate }}
```

El idioma se persiste en `localStorage`.
