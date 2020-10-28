<template>
<div>
    <div @click="location">32232423423423</div>
    <van-loading type="spinner" />
    <van-slider v-model="value" @change="onChange" />
    <div @click="goTonew">去 新闻页面</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: 50,
        };
    },
    methods: {
        onChange() {
            // Toast('当前值：' + value);
        },
        goTonew() {
            window.location.href = "new.html"
        },
        location() {
            window.location = 'main.html#/personalinfo'
        }
    }
}
</script>

<style scoped>

</style>
