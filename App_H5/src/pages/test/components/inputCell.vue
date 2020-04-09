<template>
    <div>
        <div class="input_box" v-for="item in object" :key="item.key">
            <van-cell
                v-if="item.type=='cell'"
                class="boxCell"
                title-class="title_class"
                value-class="value_class"
                @click="getCellValue(item)"
                :title="item.title"
                :value="item.value+item.unit"
            />
            <van-cell
                v-if="item.type==='linkcell'"
                class="cellFont"
                title-class="title_class"
                value-class="link_value_class"
                @click.stop="getCellValue(item)"
                :title="item.title"
                is-link
                :value="item.value+item.unit"
            />
            <van-field
                v-if="item.type==='text'"
                class="boxCell inputFontCell"
                label-class="title_class"
                label-width="150"
                @blur="getCellValue(item)"
                v-model="item.value"
                :label="item.title"
                input-align="right"
                placeholder="请输入金额"
            />
        </div>
    </div>
</template>
<script>
export default {
  name: "InputCell",
  props: {
    object: {
      type: Array,
      default: []
    }
  },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getCellValue(item) {
        this.$emit('getCellValue',item)
    }
  }
};
</script>

<style scoped>
.input_box {
  width: 620px;
  height: 108px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(241, 241, 241, 1);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.boxCell {
  box-sizing: border-box;
  padding-left: 30px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  padding-right: 63px;
}
.van-cell__title {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(96, 96, 96, 1);
}
.title_class,
.inputFontCell {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(96, 96, 96, 1) !important;
}
.value_class {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.link_value_class {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.cellFont {
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 26px;
}
</style>
