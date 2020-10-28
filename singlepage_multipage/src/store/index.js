import Vue from 'vue';
import Vuex from 'vuex';
import { getModuleName } from '../core/utils/stringUtil';

Vue.use(Vuex);

const context = require.context('./modules', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
const modules = Object.create({});

for (let i = 0; i < keys.length; i += 1) {
  modules[getModuleName(keys[i])] = context(keys[i]).default;
}

const store = new Vuex.Store({
  state:{
    userID:1,
    loging:true
  },
  strict: process.env.NODE_ENV !== 'production',
  modules
});

export default store;
