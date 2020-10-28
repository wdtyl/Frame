// import * as ActivityService from "../../core/http/token.js";
import * as actionType from "../actionType.js";
const cc = {
  namespace: true,
    state: {
        ccList:  {
          name: '1',
          age: 10,
          num: 44
      },
    },
    getters: {},
    mutations: {
      [actionType.SWIPER_CC](state, action) {
        state.ccList = Object.assign({},{...state.action,...action});
        },
        setInit(state,action){
          state.init += action;
        }
    },
    actions: {
        //获取活动详细信息
        gg({ commit }, customerID) {
          console.log('tag', customerID)
          commit(actionType.SWIPER_CC, customerID)
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

export default cc;
