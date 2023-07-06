<p align="center">
  <a href="https://github.com/ankitrekha01/RCE">
  </a>

  <h3 align="center">Remote Video Communication Platform</h3>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#screenshots">Screenshots</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
Remote Video Communication Platform, a WebRTC-based application that allows users to communicate remotely. It is similar to google meet application.

Features:
- Video conference with other users.
- Chat with all the users connected to the meeting room.
- Individual messaging to any user connected to the room.
- It allows to share your screen with other users.
- Get a closer look at any user's video by zooming in, ensuring a better view of facial expressions, gestures, or details during the meeting.
- Google STUN server are used to create a direct connection between the users.
- TURN server provided by Twilio is used for direct connection between the users, when direct connection is not possible by STUN server. 
- Atmost 4 users can connect (can be changed according to the system configuration) to the room.
- Simplifying the process, you can quickly jump into a video meeting without the need for any signup or login, saving you time and effort.
- Stay informed with real-time notifications when users join or leave the meeting room, keeping you updated on participant activity.
- Take control of your camera and microphone settings, allowing you to mute or unmute as desired for optimal meeting engagement.

### Built With

<a href="https://expressjs.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="express" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="react" width="60" height="40"/> </a>
<a href="https://nodejs.org" target="_blank"> <img src="https://img.icons8.com/color/48/000000/nodejs.png" height="40"/> </a>
<a href="https://socket.io/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1200px-Socket-io.svg.png" width="40" height="40" /></a>
<a href="https://redux.js.org/" target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/redux.svg" width="40" height="40" /></a>


<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these simple steps.
1.  Clone the repository
    ```sh
    git clone https://github.com/ankitrekha01/Remote-Video-Communication-Platform
    ```
2.  Change the current working directory

    - For FrontEnd
    ```sh
    cd client
    ```
    - For Backend
    ```sh
    cd server
    ```
3.  Install the npm packages 
    ```sh
    npm install
    ```
4.  To run the App and server

    - To run the React App(FrontEnd)
    ```sh
    npm start
    ```
    - To run the server(BackEnd)

      - In dev mode
      ```sh
      npm run dev
      ```
      - In production mode
      ```sh
      npm start
      ```
5.  Note that dev mode uses nodemon so that the server can be changed and restarted easily

## Demo
[demo](https://github.com/ankitrekha01/Remote-Video-Communication-Platform/assets/62371794/3694b8b0-bab7-4542-a6a0-e1e3a3e2016c)

## Screenshots
