# Introduction

Profile Authority app with Cloudflare Workers backend and ReactJS frontend.

# Getting Started

## Setup and Init process

- In each project folder (root, common, client, server, etc...): initialize dependencies with `npm install`

## Setting up a feature or issue branch

- Create a new feature branch: `git checkout -b feature/<your-branch>`.
- Create a new issue branch: `git checkout -b issue/<your-branch>`.
- After commiting changes locally with `git commit`, the first time you push your changes to your branch use `git push --set-upstream origin <your-branch>`. After this has been set once, subsequent pushes can be done with only `git push`.

## Creating a Pull Request

- Create a feature/issue branch in the Feature or Issue folder respectively.
- Commit and push your changes to your branch.
- In Azure DevOps, under Repos, navigate to "Pull Request" and select your branch.

Give your Pull Request an appropriate description and make sure to include a few people as Approvers.

# Build and Test

### `wrangler dev`

Runs the server in the development mode utilizing Cloudflare edge. All API calls will propagate to the backend running on http://localhost:8787
