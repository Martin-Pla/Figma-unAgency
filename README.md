# The unAgency Website

A React.js implementation of The unAgency website design from Figma.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.jsx             # Main React component
│   ├── App.css             # Styles for the application
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Features

- Responsive design
- Modern React components
- Custom CSS styling (converted from Figma design)
- Contact form
- Project showcase grid
- About section with services
- Trusted by section

## Notes

- All image assets are stored locally in the `/public/assets/` folder and referenced using relative paths.
- The design uses custom fonts: Inter, Space Mono, and Playfair Display, which are loaded from Google Fonts.
- All project data is stored locally in the component files (no external database or API calls).

## Technologies Used

- React 18.2.0
- CSS3
- HTML5
