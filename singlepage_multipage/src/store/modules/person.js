// import * as ActivityService from "../../core/http/token.js";
import * as actionType from "../actionType.js";
const person = {
  namespace: true,
    state: {
        persons: {
          name:'cccc',
          age:121
        },
        init:1
    },
    getters: {},
    mutations: {
      [actionType.SWIPER_NUMBERS](state, action) {
            state.persons = Object.assign({},{...state.action,...action});
        },
        setInit(state,action){
          state.init += action;
        }
    },
    actions: {
        //获取活动详细信息
        gg({ commit }, customerID) {
          commit(actionType.SWIPER_NUMBERS, customerID)
            // ActivityService.getToken(customerID)
            //     .then(res => {
            //         commit(SWIPER_NUMBERS, res.data); //同步state数据
            //     })
            //     .catch(err => {
            //         throw new Error(err);
            //     });
        }
    }
};

export default person;
