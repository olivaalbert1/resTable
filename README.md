# ResTable with React + TypeScript + Vite + TanStack

**Description:**
This web application provides a directory of restaurants that offer gluten-free options, specifically designed for people with celiac disease. Users can search and filter restaurants by location, hours, and other relevant features.

**Technologies:**
* React
* TypeScript
* Vite
* Node.js
* Tailwind
* Google Spreadsheet (as a DB)
* Classnames
* TanStack
* Google Places API

**Installation:**
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
**Running the project:**
Start the development server: `npm run dev`

**TODO:**
Add loading, error states and spinner, empty state, accordion in the hours and dark / light mode

**Contributing:**
Contributions are welcome. Please open an issue to discuss new features or improvements.

**License:**
This project is licensed under the MIT License.

**Author:**
Albert Oliva (oliva.albert@gmail.com)