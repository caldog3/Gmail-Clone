import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
    return { 
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
    };
}

export default new Vuex.Store({
    state: {
        token: '',
    },
    getters: {
        user: state => state.user,
        getToken: state => state.token,
        loggedIn: state => {
            if (state.token === ''){
                return false;
            }    
            return true;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            if (token === ''){
                localStorage.removeItem("token");
            }
            else{
                localStorage.setItem("token", token);
            } 
        },
    },
    actions: {
        setToken(context, token) {
            context.commit('setToken', token);
        },
        signOut(context) {
            context.commit('setToken', '');
        }        
    }
});