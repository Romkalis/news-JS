# News Portal

Vanilla TypeScript application built with Webpack. Choose a news source to display up to ten articles. API responses are validated before rendering.

## Local development

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and enter your NewsAPI key.
3. Run `npm start`.

## Checks

-   `npm run lint` — ESLint checks.
-   `npm run format:check` — formatting checks.
-   `npm run build` — type checking and production bundle in `dist/`.

## Architecture

`index.ts` starts `App`, which connects the controller and views. `AppController` selects endpoints; `AppLoader` supplies environment configuration; `Loader` performs HTTP requests. Runtime guards validate unknown JSON before `AppView` forwards articles and sources to the DOM renderers.

## Publishing

Build with `API_URL` and `API_KEY` configured, then upload the contents of `dist/` to a static host. The API key is embedded in the client bundle; `.env` only prevents committing it to Git. Check that your API plan allows requests from the deployment origin before publishing.

Development branch: `migration-js-ts`. Open the cross-check pull request against `main`; include the actual task link, working deployment URL, screenshot and an honest criteria checklist. The full scoring criteria must be checked against the current course assignment.

## Manual verification

Check sources and articles, keyboard selection, active source indication, missing images and browser console errors. Check viewport widths of 320, 640, 1024 and 1920 pixels, long headlines and source names, and network failure handling.
