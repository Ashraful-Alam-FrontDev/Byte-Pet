const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for development
const pets = [];

// API endpoints
app.post('/api/pets', (req, res) => {
  const { name, species, appearance } = req.body;
  const newPet = {
    id: Date.now().toString(),
    name,
    species,
    appearance,
    stats: {
      hunger: 50,
      happiness: 50,
      energy: 50,
      hygiene: 50
    },
    mood: {
      primary: 'neutral',
      intensity: 5
    },
    level: 1,
    xp: 0,
    unlockedItems: [],
    lastInteracted: new Date()
  };

  pets.push(newPet);
  res.status(201).json(newPet);
});

app.get('/api/pets/:id', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  res.json(pet);
});

app.put('/api/pets/:id/feed', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  const { foodType } = req.body;
  // Update hunger based on food type
  const hungerIncrease = foodType === 'treat' ? 10 : 25;
  pet.stats.hunger = Math.min(100, pet.stats.hunger + hungerIncrease);

  // Update happiness
  pet.stats.happiness = Math.min(100, pet.stats.happiness + 5);

  // Update mood
  updatePetMood(pet);

  pet.lastInteracted = new Date();
  res.json(pet);
});

app.put('/api/pets/:id/play', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  // Update stats based on play activity
  pet.stats.happiness = Math.min(100, pet.stats.happiness + 20);
  pet.stats.energy = Math.max(0, pet.stats.energy - 15);
  pet.stats.hunger = Math.max(0, pet.stats.hunger - 5);
  pet.stats.hygiene = Math.max(0, pet.stats.hygiene - 15); // Decrease hygiene more when playing

  // Update mood
  updatePetMood(pet);

  pet.lastInteracted = new Date();
  pet.xp += 10;

  // Check for level up
  if (pet.xp >= pet.level * 100) {
    pet.level += 1;
  }

  res.json(pet);
});

app.put('/api/pets/:id/clean', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  pet.stats.hygiene = 100;

  // Update mood
  updatePetMood(pet);

  pet.lastInteracted = new Date();
  res.json(pet);
});
app.put('/api/pets/:id/sleep', (req, res) => {
  const pet = pets.find(p => p.id === req.params.id);
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  // Significantly increase energy
  pet.stats.energy = Math.min(100, pet.stats.energy + 50);

  // Slightly decrease hunger while sleeping
  pet.stats.hunger = Math.max(0, pet.stats.hunger - 5);

  // Update mood to reflect the refreshed state
  updatePetMood(pet);

  pet.lastInteracted = new Date();
  res.json(pet);
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit stats decay every minute
  const interval = setInterval(() => {
    pets.forEach(pet => {
      const timeSinceLastInteraction = (new Date() - new Date(pet.lastInteracted)) / 1000 / 60; // minutes

      // Decay stats based on time
      if (timeSinceLastInteraction > 1) {
        pet.stats.hunger = Math.max(0, pet.stats.hunger - 1);
        // Happiness decreases when hunger is low
        if (pet.stats.hunger < 40) {
          pet.stats.happiness = Math.max(0, pet.stats.happiness - 2);
        }
        pet.stats.hygiene = Math.max(0, pet.stats.hygiene - 1);
      }

      // Natural energy regeneration during "night" time
      const hour = new Date().getHours();
      if (hour >= 22 || hour <= 6) {
        pet.stats.energy = Math.min(100, pet.stats.energy + 2);
      } else {
        pet.stats.energy = Math.max(0, pet.stats.energy - 0.5);
      }

      // Update mood based on new stats
      updatePetMood(pet);

      socket.emit('petUpdate', pet);
    });
  }, 60000); // every minute

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

// Helper function to update pet mood based on stats
function updatePetMood(pet) {
  const { hunger, happiness, energy, hygiene } = pet.stats;

  if (hunger < 20) {
    pet.mood.primary = 'hungry';
    pet.mood.intensity = 10 - Math.floor(hunger / 2);
  } else if (energy < 20) {
    pet.mood.primary = 'sleepy';
    pet.mood.intensity = 10 - Math.floor(energy / 2);
  } else if (hygiene < 30) {
    pet.mood.primary = 'dirty';
    pet.mood.intensity = 10 - Math.floor(hygiene / 3);
  } else if (happiness > 80) {
    pet.mood.primary = 'happy';
    pet.mood.intensity = Math.floor((happiness - 80) / 2) + 5;
  } else if (happiness < 30) {
    pet.mood.primary = 'sad';
    pet.mood.intensity = 10 - Math.floor(happiness / 3);
  } else {
    pet.mood.primary = 'neutral';
    pet.mood.intensity = 5;
  }

  // Secondary mood calculation (simplified)
  if (hunger < 40 && happiness > 60) {
    pet.mood.secondary = 'playful but hungry';
  } else if (energy < 40 && happiness > 60) {
    pet.mood.secondary = 'happy but tired';
  } else {
    pet.mood.secondary = undefined;
  }
}

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});