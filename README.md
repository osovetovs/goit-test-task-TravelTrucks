# TravelTrucks

TravelTrucks is a desktop-focused camper rental web application built with React and Vite. Users can browse available campers, filter the catalog, open detailed vehicle information, read customer reviews, and submit a booking request.

The interface follows the provided TravelTrucks Figma design and uses a public MockAPI backend for camper data.

## Links

- **Live demo:** https://musical-daifuku-537e1e.netlify.app/
- **GitHub repository:** https://github.com/osovetovs/goit-test-task-TravelTrucks
- **Figma design:** https://www.figma.com/design/6vTbzaB3EPgOreQz2jOJJe/Campers?node-id=48730-474

## Features

### Home page

- Hero section based on the provided design
- **View Now** button that navigates to the catalog

### Camper catalog

- Camper cards with image, name, price, rating, location, description, engine, transmission, and body type
- Rental prices formatted with two decimal places and a comma, for example `€8000,00`
- Filtering by:
  - location
  - camper form
  - engine
  - transmission
- Clear filters action
- Filtered results replace the previous search results
- **Load more** pagination with four campers per request
- Loading, request error, and empty-results states
- **Show more** link that opens the selected camper page in a new browser tab

### Camper details

- Main camper image and selectable gallery thumbnails
- Camper name, rating, location, price, and description
- Available vehicle features
- Vehicle details such as form, length, width, height, tank, and consumption
- Customer reviews displayed with a five-star rating scale
- Booking form with name and email validation
- Successful booking notification

### Navigation and deployment

- Client-side routing with a custom not-found page
- Lazy-loaded page components
- Netlify SPA redirect configuration for correct routing after a page refresh

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/catalog` | Camper catalog |
| `/catalog/:id` | Selected camper details |
| `*` | Not-found page |

## Technologies

- React
- Vite
- Redux Toolkit
- React Redux
- React Router
- Axios
- CSS Modules
- React Icons
- ESLint
- Netlify

## API

Camper data is loaded from the following MockAPI resource:

```text
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers
```

Main endpoints:

```text
GET /campers
GET /campers/:id
```

Catalog requests use the `page` and `limit` query parameters. Selected filters are also sent as query parameters.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/osovetovs/goit-test-task-TravelTrucks.git
cd goit-test-task-TravelTrucks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local address displayed by Vite in the terminal. The default address is usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build in the `dist` directory.

```bash
npm run preview
```

Runs the production build locally for preview.

```bash
npm run lint
```

Checks the project with ESLint.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── BookingForm/
│   ├── CamperCard/
│   ├── Features/
│   ├── Header/
│   ├── Loader/
│   ├── Reviews/
│   └── Sidebar/
├── pages/
│   ├── Camper/
│   ├── Catalog/
│   ├── Home/
│   └── NotFound/
├── store/
│   ├── campersSlice.js
│   ├── filterSlice.js
│   └── store.js
├── App.jsx
├── index.css
└── main.jsx
```

## Deployment

The project is deployed on Netlify. The `public/_redirects` file redirects all requests to `index.html`, allowing React Router routes such as `/catalog/:id` to work correctly when opened directly or refreshed.

## Author

**Oleg Sovetovs**
