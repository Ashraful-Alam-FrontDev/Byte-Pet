
import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    name: '',
    stats: {
      happiness: 100,
      health: 100
    }
  },
  reducers: {
    createPet: (state, action) => {
      state.name = action.payload;
    },
    feed: (state) => {
      state.stats.health = Math.min(100, state.stats.health + 10);
    },
    play: (state) => {
      state.stats.happiness = Math.min(100, state.stats.happiness + 10);
    }
  }
});

export const { createPet, feed, play } = petSlice.actions;
export default petSlice.reducer;
