import App from './components/app/app';

// @ts-expect-error: CSS imports have no TS type definitions
import './global.css';

const app = new App();
app.start();
