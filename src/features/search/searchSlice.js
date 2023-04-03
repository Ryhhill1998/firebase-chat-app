import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    query: "",
    focused: false,
    messageResults: null,
    selectedMessageId: null
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
        setMessageResults: (state, action) => {
            state.messageResults = action.payload;
        },
        resetMessageResults: state => {
            state.messageResults = null;
        },
        setSelectedMessageId: (state, action) => {
            state.selectedMessageId = action.payload;
        },
        resetSelectedMessageId: state => {
            state.selectedMessageId = null;
        },
    }
})

export const {
    setSearchQuery,
    resetSearchQuery,
    focusInSearch,
    focusOutSearch,
    setMessageResults,
    resetMessageResults,
    setSelectedMessageId,
    resetSelectedMessageId
} = searchSlice.actions
export const selectSearchQuery = state => state.search.query;
export const selectSearchIsFocused = state => state.search.focused;
export const selectMessageResults = state => state.search.messageResults;
export const selectSelectedMessageId = state => state.search.selectedMessageId;
export default searchSlice.reducer