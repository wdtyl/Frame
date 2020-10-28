<template>
<div>
    <div @click="goNew">
        去新闻页面
    </div>
    <div @click="cccs">akldjhaslj</div>
    <div>{{ccList.name}}</div>
    <div>{{ccList.age}}</div>
    <div>{{ccList.num}}</div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    computed: mapState({
        ccList: state => state['cc']['ccList'],
    }),
    methods: {
        ...mapActions(["gg"]),
        cccs() {
            this.gg({
                name: '123232',
                age: 102323,
                num: 442323
            })
        },
        goNew() {
            this.$router.push("/tt");
        }
    }
};
</script>

<style lang="scss" scoped></style>
