<br />
<a href="https://github.com/jeremysylee/NexDoor"> <img src="https://user-images.githubusercontent.com/74673975/136668234-fb310721-db29-40fc-8d9c-e04ce5b552f9.png" alt="NexDoor" width="180" align="left" /> </a> <br /> <br />
<hr />

Nexdoor is a hyperlocal neighborhood assistance social networking platform. Get connected with neighbors in your area who are requesting help and offer to assist or submit a help request of your own.

![Screen Shot 2021-10-09 at 7 14 44 AM](https://user-images.githubusercontent.com/74673975/136668053-1fe1d007-3a15-47a3-a8f0-fed14b1bb6e8.png)

<br/>

# Features
### Requests
<ul>
 <li> Submit requests for assistance for local neighbors to see. </li>
 <li> Live handshake system so users can confirm bidirectional availability. </li>
 <li> Requests have "Open", "Pending", and "Active" status to show request states.</li>
</ul>
 
### Request Feed
<ul>
 <li> A feed of surrounding neighbors requests, updates live as new requests come in. </li>
 <li> Includes requests you are currently serving and requests you've made.
  <br/>
  <img src="https://user-images.githubusercontent.com/74673975/136668560-1d45ec30-033d-4dba-8b8a-a8fc90101c9e.gif" alt="feed.gif" width="400" border-radius="50px" />
  <br/> <br/>
 </li>
</ul>
 
### Map
<ul>
 <li> Dynamic map view shows neighbor requests in a variable radius around your location. </li>
 <li> Isomorphic google maps api integration, ready for server side rendering.
  <br/>
  <img src="https://user-images.githubusercontent.com/74673975/136669184-e85c35de-9b46-4add-8055-6c16c5d06cea.gif" alt="feed.gif" width="400"/>
  <br/> <br/>
 </li>
</ul>
 
### Dashboard
<ul>
 <li> See your request details on the request dashboard. </li>

 <li> Connect with the requester in with live, persistent, and low-latency chat.
  <br/>
  <img src="https://user-images.githubusercontent.com/74673975/136672766-ac06fc26-d3f2-4829-8b5e-2dbf655ea927.png" alt="feed.gif" height="271"/>
  <img src="https://ik.imagekit.io/g2ceigziuz7/ChatDemo_m3KNViRrG.gif" alt="feed.gif" width="400"/>
  <br/> <br/>
 </li>
</ul>

### Optimized
<ul>
 <li> Score of 95+ across all lighthouse parameters
  <br/>
  <img src="https://user-images.githubusercontent.com/74673975/136673518-b8d0c4e8-a4ed-487a-9bba-b4ef2940f514.png" alt="feed.gif" width="400"/><br>
  <img src="https://user-images.githubusercontent.com/74673975/136673539-7ac50a02-cd27-40dc-8723-3ec6401e25ac.png" alt="feed.gif" width="400" />
  <br/> <br/>
 </li>
</ul>

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


