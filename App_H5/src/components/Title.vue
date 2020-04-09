<!--
用例一
<Title title="首页" show-back back-text="返回" bg-color="#ffd703" right-text="更多" @clickLeft="clickLeft" @clickRight="clickRight"/>
用例二
<Title
      title="莫愁花"
      bg-color="#ffd703"
      back-text="返回"
      right-text="222"
      border-color="#fff"
      @clickLeft="clickLeft"
      show-back
    >
  <div class="title-left" slot="left">111</div>
  <div class="title-right" slot="right">222</div>
</Title>

// 属性
title: 标题
show-back: Boolen 是否显示左侧剪头
back-text 左侧文字
right-text  右侧文字
bg-color 标题栏背景
back-color 返回箭头的颜色

// 方法
clickLeft: 点击左侧执行的方法
clickRight: 点击右侧执行的方法

// slot
left: 自定义标题栏左侧内容
right: 自定义标题栏右侧内容
-->
<template>
    <div class="comp-title" :style="styleObject">
        <div class="left">
            <div class="left-corner clear" @click="clickLeft">
                <div class="corner-box fl" v-if="showBack">
                    <i class="back-icon fl white-back" v-if="whiteColor" />
                    <i class="back-icon fl black-back" v-else />
                </div>
                <span   v-if="backText && !$slots.left">{{ backText }}</span>
                <slot v-else-if="$slots.left" name="left" />
            </div>
            <!-- <div v-else @click="clickLeft">
                <i class="back-icon fl" v-if="showBack"/>
      </div>-->
        </div>
        <div class="middle">{{ title }}</div>
        <div class="right" @click="clickRight">
            <div  v-if="!$slots.right">{{ rightText }}</div>
            <div v-else>
                <slot name="right" />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
export default {
    props: {
        title: String,
        showBack: {
            type: Boolean,
            default: false
        },
        backText: String,
        backUrl: String,
        rightText: String,
        rightUrl: String,
        color: String,
        bgColor: {
            type: String,
            default: "#fff"
        },
        borderColor: String,
        backColor: {
            type: String,
            default: "black"
        },
        whiteColor: {//左箭头为白色
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            styleObject: {
                background: this.bgColor,
                color: this.color,
                borderBottom: ""
            }
        };
    },
    methods: {
        clickLeft() {
            this.$emit("clickLeft");
        },
        clickRight() {
            this.$emit("clickRight");
        }
    },
    mounted() {
        if (this.borderColor) {
            this.styleObject.borderBottom = `1px solid ${this.borderColor}`;
        }
    }
};
</script>

<style lang="scss" scoped>
.comp-title {
    font-size: 32px;
    line-height: 88px;
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    left: 0;
    height: 88px;
    .left {
        line-height: 88px;

        position: absolute;
        left: 44px;

        .left-corner {
            line-height: 88px;

            .corner {
                font-size: 32px;

                position: relative;
                top: 3px;

                // vertical-align: middle;
                &::after {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    bottom: -20px;
                    left: -20px;

                    content: "";
                }
            }
        }

        .back-icon {
            position: relative;

            display: inline-block;

            width: 20px;
            height: 88px;
            margin-right: 10px;

            vertical-align: text-top;

            &.black-back {
                background: url("images/goback.png") no-repeat center center;
                background-size: contain;
            }
            &.white-back {
                background: url("images/whiteback.png") no-repeat center center;
                background-size: contain;
                width: 20px;
            }
            &::after {
                position: absolute;
                top: -20px;
                right: -20px;
                bottom: -20px;
                left: -20px;

                content: "";
            }
        }
    }

    .middle {
        font-size: $largeSize;
        font-weight: 700;

        box-sizing: border-box;
        max-width: 60%;
        margin: 0 auto;

        text-align: center;
    }

    .right {
        position: absolute;
        top: 0;
        right: 20px;
    }
}

</style>
