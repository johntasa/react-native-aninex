import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  favorites: [],
  selectedAnime: null,
};

const initialState = emptyState;

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const anime = action.payload;
      if (!state.favorites.some((fav) => fav.id === anime.id)) {
        state.favorites.push(anime);
        // saveState(state);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload);
      // saveState(state);
    },
    setSelectedAnime: (state, action) => {
      state.selectedAnime = action.payload;
    },
  },
});

export const { 
  addToFavorites,
  removeFromFavorites,
  setSelectedAnime,
  selectedAnime,
} = animeSlice.actions;
export default animeSlice.reducer;