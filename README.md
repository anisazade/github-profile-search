# GitHub Profile Search App

<p align="center">
  <img width="800" height="450" alt="GitHub Profile Search App Preview" src="https://github.com/user-attachments/assets/a67a9c57-2323-47e0-aa1c-37bb2f4c2678" />
</p>

A responsive web application to search for GitHub profiles and explore their details and repositories using the GitHub REST API.

- **Live Demo:** [https://github-profile-search-dfl.pages.dev/](https://github-profile-search-dfl.pages.dev/)
- **Challenge Prompt:** [DevChallenges.io](https://devchallenges.io/challenge/github-profile)

## Features

- **Profile Search:** Look up any GitHub user by username.
- **Dynamic Repository Loading:** Fetches and displays user repositories dynamically with direct links to view them on GitHub.
- **State Handling:** Dedicated loading indicators and error messages for invalid usernames, rate limits, or network failures.
- **Accessibility:** Uses semantic HTML, keyboard-navigable controls, `aria-labels` for SVG icons, and `aria-live` regions for status updates.
- **Layout Stability:** Fallback font metrics and skeleton loaders are sized to prevent layout shifts while data and fonts load.
- **Responsive:** Adapts cleanly across mobile, tablet, and desktop screens.

## Technologies Used

- **React** — UI components and state management.
- **Vite** — Build tool and local development server.
- **Vanilla CSS** — Structured using CUBE CSS principles and BEM naming conventions.
- **GitHub REST API** — Data source for profiles and repositories.
