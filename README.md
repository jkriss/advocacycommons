# Affinity

Affinity.works is supporting the surge of resistance against Trump. It's coming at it in two ways. First, working with the new activist groups that have sprung up, building MVP's to solve the problems they've encountered in their organizing. Second, Affinity is enabling rapid collaboration between the grassroots and the big national networks like Indivisible & Daily Kos, to defend the institutions of democracy.

Concretely, the tool is a SaaS and has components for managing a network of groups, a crm, task management for volunteers, outreach, and a reputation marketplace between campaigns, activists, and groups.

# Status:
This project is a work in progress and nothing which is useable by end users is available. We welcome developer / designer / activist collaboration.

# Developers

## Getting Started
* Install Postgresql with dev libraries
* Install node.js
* Install & run yarn
* Install & run bundler
* Install Ruby 2.3.3
* Ubuntu: `sudo -u postgres createuser $USER -s`
* `bin/setup`

## Getting Started with Docker

    docker-compose run web bin/setup
    docker-compose up

## Run Tests
`rake`

## Run Server
`npm run rails-server`
Open http://localhost:3000/
