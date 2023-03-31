import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    query: "",
    focused: false,
    userSearchResults: null,
    messagesSearchResults: null
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
            state.userSearchResults = action.payload;
        },
        setMessagesSearchResults: (state, action) => {
            state.messagesSearchResults = action.payload;
        }
    }
})

export const {
    setSearchQuery,
    resetSearchQuery,
    focusInSearch,
    focusOutSearch,
    setUserSearchResults,
    setMessagesSearchResults
} = searchSlice.actions
export const selectSearchQuery = state => state.search.query;
export const selectSearchIsFocused = state => state.search.focused;
export const selectUserSearchResults = state => state.search.userSearchResults;
export default searchSlice.reducer