# FilmFinder

Een webapp voor analoge fotografen om de goedkoopste film te vinden.

## Features

- Zoek en vergelijk prijzen van analoge film
- Filter op formaat (35mm, 120, sheet film), merk, ISO en land
- Prijsgeschiedenis en prijsalerts
- Favoriete producten opslaan
- Admin interface voor productbeheer

## Tech Stack

- Astro.js met React
- Supabase (auth, database, storage)
- Tailwind CSS
- Radix UI

## Setup

1. Clone de repository
2. Installeer dependencies:

   ```bash
   npm install
   ```

3. Maak een Supabase project aan en voeg de volgende environment variables toe aan een `.env` bestand:

   ```
   PUBLIC_SUPABASE_URL=your-project-url
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Voer de database migraties uit in Supabase:

   - Kopieer de inhoud van `supabase/migrations/20240503_initial_schema.sql`
   - Voer dit uit in de Supabase SQL editor

5. Start de development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run preview` - Preview productie build

## Database Schema

Het database schema bevat de volgende tabellen:

- `brands` - Film merken
- `products` - Film producten
- `stores` - Webshops
- `product_urls` - Product URLs per webshop
- `prices` - Prijsgeschiedenis
- `user_preferences` - Gebruikersvoorkeuren
- `favorite_products` - Favoriete producten
- `price_alerts` - Prijsalerts
- `scraping_logs` - Scraping logs

## Contributing

1. Fork de repository
2. Maak een feature branch
3. Commit je changes
4. Push naar de branch
5. Maak een Pull Request

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
