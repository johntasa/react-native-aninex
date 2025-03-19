import { createSlice } from "@reduxjs/toolkit";

const emptyState = {
  favorites: [],
  selectedAnime: null,
  filters: {
    searchTerm: "",
    genre: "",
    year: "",
    status: "",
    season: ""
  },
  filteredAnimes: [],
  loading: false,
  error: null,
  hasResults: false,
  pageInfo: {
    total: 0,
    perPage: 24,
    currentPage: 1,
    lastPage: 0,
    hasNextPage: false,
    __typename: "PageInfo"
  },
  currentPage: 1,
};

// const loadState = () => {
//   if (typeof window !== "undefined") {
//     try {
//       const serializedState = localStorage.getItem("animeState");
//       if (serializedState === null) {
//         return emptyState;
//       }
//       return JSON.parse(serializedState);
//     } catch (err) {
//       console.error("Error loading state from localStorage:", err);
//       return emptyState;
//     }
//   }
//   return emptyState;
// };

// const saveState = (state) => {
//   if (typeof window !== "undefined") {
//     try {
//       const serializedState = JSON.stringify(state);
//       localStorage.setItem("animeState", serializedState);
//     } catch (err) {
//       console.error("Error saving state to localStorage:", err);
//     }
//   }
// };

// const initialState = loadState();
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
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setAnimeList: (state, action) => {
      if (JSON.stringify(state.filteredAnimes) !== JSON.stringify(action.payload)) {
        state.filteredAnimes = action.payload;
        state.hasResults = action.payload.length !== 0;
        state.loading = false;
      }
    },
    setPageInfo: (state, action) => {
      state.pageInfo = action.payload;
      state.hasResults = action.payload.total !== 0;
    },
    setHasResults: (state, action) => {
      state.hasResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { 
  addToFavorites, 
  removeFromFavorites, 
  setSelectedAnime, 
  setFilters,
  setAnimeList,
  setPageInfo,
  setHasResults,
  setLoading,
  setError,
  setCurrentPage,
} = animeSlice.actions;
export default animeSlice.reducer;