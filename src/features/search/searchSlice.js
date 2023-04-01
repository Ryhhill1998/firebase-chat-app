import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    query: "",
    focused: false,
    results: {
        suggestions: null,
        users: null,
        messages: null,
    }
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        resetSearchQuery: state => {
            state.query = "";
        },
        focusInSearch: state => {
            state.focused = true;
        },
        focusOutSearch: state => {
            state.focused = false;
        },
        setUserSearchResults: (state, action) => {
            state.results.users = action.payload;
        },
        resetUserSearchResults: state => {
            state.results.users = null;
        },
        setMessagesSearchResults: (state, action) => {
            state.results.messages = action.payload;
        }
    }
})

export const {
    setSearchQuery,
    resetSearchQuery,
    focusInSearch,
    focusOutSearch,
    setUserSearchResults,
    resetUserSearchResults,
    setMessagesSearchResults
} = searchSlice.actions
export const selectSearchQuery = state => state.search.query;
export const selectSearchIsFocused = state => state.search.focused;
export const selectUserSearchResults = state => state.search.results.users;
export default searchSlice.reducer