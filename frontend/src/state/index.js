import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTheme: (state) => {
            state.mode = state.mode === 'light' ? 'light' : 'dark';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            console.log(state.user);
        },
        setPosts: (state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost: (state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id){
                    return post;       
                }
            });
            state.posts = updatedPosts;
        }
    }
})
export const {setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;