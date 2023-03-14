<h2 align="center">IOTA Wasp Dashboard</h2>

<p align="center">
  <a href="https://discord.iota.org/" style="text-decoration:none;"><img src="https://img.shields.io/badge/Discord-9cf.svg?logo=discord" alt="Discord"></a>
    <a href="https://iota.stackexchange.com/" style="text-decoration:none;"><img src="https://img.shields.io/badge/StackExchange-9cf.svg?logo=stackexchange" alt="StackExchange"></a>
    <a href="https://github.com/iotaledger/wasp-dashboard/blob/develop/LICENSE" style="text-decoration:none;"><img src="https://img.shields.io/github/license/iotaledger/wasp-dashboard.svg" alt="Apache-2.0 license"></a>
</p>
      
<p align="center">
  <a href="#about">About</a> ◈
  <a href="#prerequisites">Prerequisites</a> ◈
  <a href="#getting-started">Getting started</a> ◈
  <a href="#supporting-the-project">Supporting the project</a> ◈
  <a href="#joining-the-discussion">Joining the discussion</a> 
</p>

# About

Dashboard for the 0.4.x-alpha+ Wasp node.

## Prerequisites

To deploy your own version of the Node Dashboard, you need to have at least [version 18 of Node.js](https://nodejs.org/en/download/) installed on your device.

To check if you have Node.js installed, run the following command:

```bash
node -v
```

If Node.js is installed, you should see the version that's installed.

# Getting Started

The dashboard is integrated into the common [local-docker-setup](https://github.com/iotaledger/wasp/tree/develop/tools/local-setup) by default.

If you need to run a local dev version of the dashboard, you need to run a Wasp node from the main branch using the local setup [local-docker-setup](https://github.com/iotaledger/wasp/tree/develop/tools/local-setup)

Then follow these steps:

1. Install all needed npm modules via `npm install`.
2. Create a `.env.development` file inside the repo root directory and configure the Wasp API url:

-   local-docker-setup node:
    -   `VITE_REACT_APP_WASP_API_URL=http://localhost/wasp/api`
-   locally built node:
    -   `VITE_REACT_APP_WASP_API_URL=http://localhost:9090`

3. Run a dev-server instance by running `npm start` within the repo root directory.
4. Using default port config, you should now be able to access the dashboard under http://127.0.0.1:5173/wasp/dashboard

The dashboard is hot-reload enabled.

# Docker

If you want to run an official prebuilt version of the dashboard using docker, run the following command:

`docker run -p 127.0.0.1:8080:80 -e WASP_API_URL="http://localhost:9090" iotaledger/wasp-dashboard`

The `WASP_API_URL` might need to be changed depending on your setup.

-   local-docker-setup node:
    -   `WASP_API_URL=http://localhost/wasp/api`
-   locally built node:
    -   `WASP_API_URL=http://localhost:9090`

## Supporting the project

If the Wasp Dashboard has been useful to you and you feel like contributing, consider submitting a [bug report](https://github.com/iotaledger/wasp-dashboard/issues/new), [feature request](https://github.com/iotaledger/wasp-dashboard/issues/new) or a [pull request](https://github.com/iotaledger/wasp-dashboard/pulls/).

See our [contributing guidelines](.github/CONTRIBUTING.md) for more information.

## Joining the discussion

If you want to get involved in the community, need help with getting set up, have any issues or just want to discuss IOTA, feel free to join our [Discord](https://discord.iota.org/).
