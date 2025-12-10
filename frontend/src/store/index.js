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

const userSlice=createSlice({
    initialState:{
        userId:'',
        username:'',
        email:'',
        joinDate:'',
        avatar:'',
        profileFetched:false
    },
    name:'user',
    reducers:{
        setUser(state,action) {
            state.userId=action.payload.userId
        },
        setProfile(state,action) {
            state.username=action.payload.username || '';
            state.email=action.payload.email || '';
            state.joinDate=action.payload.joinDate || '';
            state.avatar=action.payload.avatar || '';
            state.profileFetched=true;
        },
        updateUsername(state,action) {
            state.username=action.payload.username;
        },
        clearProfile(state) {
            state.username='';
            state.email='';
            state.joinDate='';
            state.avatar='';
            state.profileFetched=false;
        }
    }
})

const authSlice=createSlice({
    initialState:{isAuthenticated:false},
    name:'auth',
    reducers:{
        login(state) {
            state.isAuthenticated=true;
        },
        logout(state) {
            state.isAuthenticated=false;
        }
    }
})

const store=configureStore({
    reducer:{
        theme:themeSlice.reducer,
        auth:authSlice.reducer,
        user:userSlice.reducer
    }
});

export const authActions=authSlice.actions;
export const themeActions=themeSlice.actions;
export const userActions=userSlice.actions;
export default store;