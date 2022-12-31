# Auth-O-Matic: SvelteKit + PocketBase + OAuth2

This project is based on [ShowCase](https://github.com/huntabyte/showcase) by
[Hunter (huntabyte) Johnston](https://github.com/huntabyte). For more information,
I recommend checking out his series on [YouTube Channel](https://youtube.com/@huntabyte). A
big thanks goes out to Hunter! PocketBase offers great OAuth2 account creation and login, but
it can be tricky to set up.

This project makes it easy to set up OAuth2 by generating links for each supported provider and adding them to your PocketBase backend. The links are styled with TailwindCSS and DaisyUI, and 'enabled' providers are generated as functional sign-in buttons with their name and logo SVG.

## Adding OAuth providers

After you have installed the SvelteKit app and PocketBase backend, adding OAuth providers is simple:

0. Setup your Dev account with each provider, taking note of your 'client_id' & 'client_secret'
1. Go to Settings > Auth providers
2. Add your 'client_id' & 'client_secret' information
3. The providers will be automatically added to your OAuth sign-in options with a button and icon at the '/signin' end point.


## More features

We have also included some tools for authorization (e.g. route protection). Please feel free to improve the code as needed.

## Creating a project

1. Clone this repository
2. Install dependencies: npm install
3. Download [PocketBase](https://pocketbase.io/)
4. Link them up and you're ready to go!
