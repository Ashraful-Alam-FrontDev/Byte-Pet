# Byte-Pet - Virtual Pet Companion

This is a virtual pet web app inspired by Tamagotchi. It's a fun little side project I built to familirize myself with React, Redux, NodeJs and Socket.io. I have had help from AI for this project, Claude 3.7 Sonnet.

## What's This About?

Basically, you can create and take care of a virtual pet. The pet has different needs (hunger, happiness, energy, hygiene) that change over time. You can interact with it by feeding, playing, cleaning, or putting it to sleep.

## Tech Stack

Here's what's under the hood:

- **Frontend**: React with Redux for state management
- **Backend**: Express.js server
- **Real-time**: Socket.io for live updates (stats decay over time)
- **Build**: Webpack with Babel for JSX/ES6+ support

## Key Features

- **Pet Creation**: Choose a name, species, and appearance for your pet
- **Stat System**: Hunger, happiness, energy, and hygiene stats that change over time
- **Mood System**: Pet's mood changes based on its stats (happy, hungry, sleepy, etc.)
- **Leveling**: Pets gain XP and level up when you play with them
- **Real-time Updates**: Stats decay over time even when you're not actively interacting

## How It Works

1. **Backend** (`index.js`):
   - Simple Express server with in-memory storage (for demo purposes)
   - Handles pet creation and interactions (feed, play, clean, sleep)
   - Socket.io server that decays pet stats over time

2. **Frontend**:
   - React components for pet display and controls
   - Redux store manages all pet state
   - Socket.io client listens for real-time updates

3. **State Management**:
   - Redux Toolkit slices handle async actions (API calls)
   - Pet stats are updated both via API responses and socket events

## How to Run This Thing Locally 🏠  

1. Clone the repo:  
   ```bash
   git clone https://github.com/your-username/Byte-Pet.git
   cd Byte-Pet
   ```  

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Start the dev server:  
   ```bash
   npm run dev
   ```  

4. Open your browser and go to `http://localhost:3000`.
 



Feel free to fork it and play around! If you have any cool ideas or improvements, I'd love to see what you come up with.
---
*Note: This is just a personal project, not a polished product. The code might be a bit messy in places - I was mostly focused on making it work!*
