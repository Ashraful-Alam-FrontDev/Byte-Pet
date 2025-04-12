import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const createPet = createAsyncThunk(
  'pet/create',
  async (petData) => {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petData)
    });
    return response.json();
  }
);

export const feedPet = createAsyncThunk(
  'pet/feed',
  async ({ id, foodType }) => {
    const response = await fetch(`/api/pets/${id}/feed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ foodType })
    });
    return response.json();
  }
);

export const playWithPet = createAsyncThunk(
  'pet/play',
  async ({ id, game }) => {
    const response = await fetch(`/api/pets/${id}/play`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ game })
    });
    return response.json();
  }
);

export const cleanPet = createAsyncThunk(
  'pet/clean',
  async (id) => {
    const response = await fetch(`/api/pets/${id}/clean`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
);
export const sleepPet = createAsyncThunk(
  'pet/sleep',
  async (id) => {
    const response = await fetch(`/api/pets/${id}/sleep`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
);

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    currentPet: null,
    isLoading: false,
    error: null,
    hasPet: false
  },
  reducers: {
    updatePetStats: (state, action) => {
      if (state.currentPet && state.currentPet.id === action.payload.id) {
        state.currentPet = action.payload;
      }
    },
   resetPet: (state) => {
      state.currentPet = null;
      state.hasPet = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create pet
      .addCase(createPet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPet = action.payload;
        state.hasPet = true;
      })
      .addCase(createPet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Feed pet
      .addCase(feedPet.fulfilled, (state, action) => {
        state.currentPet = action.payload;
      })

      // Play with pet
      .addCase(playWithPet.fulfilled, (state, action) => {
        state.currentPet = action.payload;
      })
      
      // Sleep pet
      .addCase(sleepPet.fulfilled, (state, action) => {
        state.currentPet = action.payload;
      })

      // Clean pet
      .addCase(cleanPet.fulfilled, (state, action) => {
        state.currentPet = action.payload;
      });
  }
});

export const { updatePetStats, resetPet } = petSlice.actions;
export default petSlice.reducer;
