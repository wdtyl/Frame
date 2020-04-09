<template>
    <div class="loanapplication">
       测试
    </div>
</template>

<script>
// <CompLoading v-if="showLoading" :show="false" />
import errorHandler from "@/core/js/errorHandler.js";
// import Https from "../../core/http/applyhttp.js";
import { Cell, CellGroup, Icon, Field, Toast } from "vant";
import Title from "@/components/Title";
import Utils from "../../core/js/util.js";
import Vue from "vue";
Vue.use(Cell)
    .use(CellGroup)
    .use(Field)
    .use(Toast);
export default {
    data() {
        return {
          
        };
    },
    computed: {
    
    },
    created() {
        // this.userInfo = this.$localList.setItem("appInfo",{name:23232,age:2376});
    },
    mounted() {
        let _localData = this.$localList.getItem("repayPlans");
        let _args = Utils.getQueryStringArgs();
        this.maxBorrow = _args["applyAmt"];
        if (_localData && _localData["applyAmt"]) {
            this.applyAmt = _localData["applyAmt"];
            this.productId = _localData["productId"];
            this.applyPhase = _localData["period"];
        } else {
            this.productId = _args["productId"];
            this.applyAmt = _args["applyAmt"];
        }
        //获取初始借款详情
    },
    methods: {
       
    },
    components: {
        Title
    }
};
</script>

<style lang="scss" scoped>

</style>
