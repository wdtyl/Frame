<template>
<div>
    <div @click="goPerson">
        这是TT测试页面
    </div>
    <div @click="setInit(12)">23112312</div>
    <div @click="gg(obj)">132123123123123</div>
    <div>{{init}}</div>
    <div>{{persons.name}}</div>
</div>
</template>

<script>
import {
    mapState,
    mapMutations,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            obj: {
                name: 'xxxxxxxx',
                age: 7658678
            }
        }
    },
    computed: mapState({
        persons: state => state['person']['persons'],
        init: state => state['person'].init
    }),
    mounted() {},
    methods: {
        ...mapMutations(['setInit']),
        ...mapActions(['gg']),
        setInitdd() {
            this.setInit(12)
        },
        goPerson() {
            this.gg({
                name: 'xxx',
                age: 121
            })
            // this.$store.dispatch('gg', {
            //     name: 'xxxx',
            //     age: 999
            // })
            // this.$store.commit("setInit", 12)

        }
    }
}
</script>

<style lang="scss" scoped></style>
