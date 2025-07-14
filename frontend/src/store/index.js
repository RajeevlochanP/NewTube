import { createSlice,configureStore } from "@reduxjs/toolkit";

const themeSlice=createSlice({
    name:'theme',
    initialState:{theme:'light'},
    reducers:{
        toggleTheme(state) {
            if(state.theme=='light') {
                state.theme='dark'
                return ;
            }
            if(state.theme=='dark') {
                state.theme='light'
                return ;
            }
        }
    }
});

const store=configureStore({
    reducer:{
        theme:themeSlice.actions
    }
});

export const themeActions=themeSlice.actions;
export default store;