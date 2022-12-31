# New Project (+ POCKETBASE) Steps After init install
- pnpm install pocketbase --save ("pocketbase": "^0.9.0",)
- TESTING:
- "@faker-js/faker": "^7.6.0",
- pnpm install --save-dev @faker-js/faker

- STYLING
- "tailwindcss"
- npx svelte-add@latest tailwindcss
- "daisyui"
- pnpm i --save-dev daisyui
- "svelte-icons"
- pnpm install --save svelte-icons
- "svelte-french-toast"
- pnpm install svelte-french-toast

- VALIDATION
- "@felte/validator-zod": "^1.0.12",
- "zod": "^3.20.2"
- pnpm install --save @felte/validator-zod zod

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
