# Support Ticket Desk

A support ticket management dashboard built with **React 19**, **TypeScript**, **Redux Toolkit**, and **Vite**.

The app runs entirely in the browser. Data comes from an in-memory mock API ([`src/api/mockApi.ts`](./src/api/mockApi.ts)) that simulates network latency (~600 ms) and random failures (~20%) to demonstrate optimistic updates and rollback. No backend, database, or environment variables are required.

## Prerequisites

- **Node.js** 20.19+ or 22.12+ (required by Vite 8) — check with `node -v`
- **npm** (bundled with Node.js) — check with `npm -v`

## Getting Started

1. **Open the project folder**

   ```bash
   cd support-ticketdesk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app** at the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

   The page reloads automatically as you edit files. Press `Ctrl + C` in the terminal to stop the server.

## Available Scripts

| Command           | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite development server with hot module replacement      |
| `npm run build`   | Type-check with TypeScript and build for production into `dist/`   |
| `npm run preview` | Serve the production build locally (run `npm run build` first)     |
| `npm run lint`    | Run ESLint on the project                                          |
| `npx vitest run`  | Run the unit tests once (use `npx vitest` for watch mode)          |

## Production Build

```bash
npm run build
npm run preview
```

Then open the URL shown in the terminal (usually [http://localhost:4173](http://localhost:4173)).

## Project Structure

```text
src/
├── api/          # Mock API (simulated latency and failures)
├── app/          # Redux store and typed hooks
├── components/   # UI components (header, filters, ticket list, modal, ...)
├── context/      # Theme context
├── features/     # Redux slices and async thunks
├── hooks/        # Custom hooks (e.g. useDebouncedValue)
├── types.ts      # Shared TypeScript types
└── main.tsx      # App entry point
```

## Troubleshooting

- **`npm run dev` fails with a Node version error** — upgrade Node.js to 20.19+ or 22.12+.
- **Port 5173 is already in use** — Vite will pick the next free port automatically; use the URL printed in the terminal.
- **Some updates fail and revert** — this is expected; the mock API randomly fails ~20% of requests to demonstrate rollback.
