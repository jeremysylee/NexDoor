

# Nexdoor 
<a href="https://github.com/jeremysylee/NexDoor"> <img src="https://user-images.githubusercontent.com/74673975/131412411-a4a65e3e-4ec9-4549-b994-0ab56e157f0d.png" width="200" /> </a> <div />

Nexdoor is a hyperlocal neighborhood assistance social networking platform. See local neighbors on the app who are requesting help and offer to assist or submit a help request of your own. 

## Features
* See requests for assistance in a variable radius around your neighborhood.
* Claim requests and connect to the requesting neighbor via chat. 
* Submit requests for assistance for local neighbors to see.

# Getting Started

### Prerequisites
To install and use Nexdoor, you'll need these prerequisites
1. PostgreSQL
2. Redis

### Setup & Installation

1. Fork repository and clone to machine
2. From the api directory, run `npm install` to install dependencies for the api
3. From the root directory, run `npm install` to install dependencies
4. Rename `.env example` file to `.env`
5. Populate `.env` with corresponding credentials
6. Boot Redis database
7. Run script `npm run server` to start the api server
8. Run script `npm start` to build the webpack bundle and serve the client on localhost:8080
9. Congratulations! Your app should be running on localhost:8080!

# Technologies
Front End: 
  * React
  * Redux
  * Styled-components
  * Express
  * Postgres
  * Redis

# Contributors
* @raphaelspies
* @ajmunoz411
* @jimmyG37
* @migbuen44
* @dchang1010
* @raelyncs


