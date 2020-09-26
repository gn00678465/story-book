<template>
  <div class="Modal-rootOverlay" v-show='show' @click.self='close' :style="modalBGColor">
    <div class="Modal-Card" :class='[mod, position]'>
      <header v-if='title' class="header">{{ title }}</header>
      <div class="body">
        <slot name="body">
          Modal 資料
        </slot>
      </div>
      <footer class="footer">
        <slot name="footer">
          <button class="btn red" @click='close'>close</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: Boolean,
    mod: String,
    title: {
      type: String,
      default: 'Modal 標題',
    },
    position: {
      type: String,
      default: 'Y_center',
    },
    headColor: {
      type: String,
      default: '#fff',
    },
    bodyColor: {
      type: String,
      default: '#fff',
    },
    footerColor: {
      type: String,
      default: '#fff',
    },
  },
  watch: {
    show(isShow) {
      document.body.style.cssText = (isShow) ? 'height:100vh;overflow:hidden;' : '';
    },
  },
  methods: {
    close() {
      this.$emit('update:show', false);
      document.body.style = '';
    },
  },
  computed: {
    modalBGColor() {
      return {
        '--head-color': this.headColor,
        '--body-color': this.bodyColor,
        '--footer-color': this.footerColor,
      };
    },
  },
};
</script>

<style lang="scss" src="./Modal.scss" scoped></style>
