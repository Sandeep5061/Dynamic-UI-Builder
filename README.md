# Dynamic UI Builder

Dynamic UI Builder is a metadata-driven no-code product for creating reusable form templates and data collection workflows. It helps teams turn repeated intake processes into configurable UI screens without rebuilding the same forms by hand.

## Why it is useful

- **Build quickly:** compose form sections with drag-and-drop controls such as text fields, text areas, dropdowns, dates, checkboxes, radio buttons, and buttons.
- **Keep templates portable:** save each UI as JSON metadata that can be stored, audited, versioned, and rendered again.
- **Collect operational data:** publish templates, capture submissions, and review template data from the app navigation.
- **Sellable positioning:** the homepage now communicates a clear value proposition for internal operations, HR, field, and support workflows.

## Product flows

1. Open the landing page and choose **Start building**.
2. Create one or more reusable sections from the component palette.
3. Save the template metadata.
4. View saved sections, compose templates, and inspect submitted data.

## Tech stack

- React 18 and Create React App
- React Router for app navigation
- React DnD for drag-and-drop composition
- Material UI components and icons
- Spring Boot demo backend under `demobackend/demo`

## Frontend setup

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Backend setup

```bash
cd demobackend/demo
./mvnw spring-boot:run
```

The demo API runs at [http://localhost:8080](http://localhost:8080).

## Production build

```bash
npm run build
```

This creates an optimized static build in `build/`.
