<template>
  <div class="increment" :class="[classis]" :style="incrementSize">
    <button
      class="increment__btn minus"
      type="button"
      :disabled="isAnimating || isZero"
      @click.prevent="subtract"
    >
      <slot name="minus">-</slot>
    </button>
    <p
      class="count"
      v-if="!isTypeing"
      :class="{ before: isBefore, after: isAfter }"
      :data-before="addZero(countBefore)"
      :data-after="addZero(countAfter)"
      @click.prevent="onChange"
    >
      {{ addZero(countCurrent) }}
    </p>
    <input
      class="increment__input"
      v-else
      type="number"
      :value="count"
      @keypress="keypress"
      @keyup.enter="enterHandler"
      @keyup.esc="escHandler"
    />
    <button
      calss="increment__btn plus"
      type="button"
      :disabled="isAnimating"
      @click.prevent="add"
    >
      <slot name="plus">+</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "Increment",
  props: {
    value: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 1,
    },
    styled: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      count: this.value,
      isBefore: false,
      isAfter: false,
      isTypeing: false,
      classis: [`increment-${this.styled}`],
    };
  },
  methods: {
    subtract() {
      this.isBefore = true;
      setTimeout(() => {
        this.count -= 1;
        this.isBefore = false;
      }, 200);
    },
    add() {
      this.isAfter = true;
      setTimeout(() => {
        this.count += 1;
        this.isAfter = false;
      }, 200);
    },
    onChange() {
      this.isTypeing = true;
    },
    keypress(e) {
      if (e.key === "+" || e.key === "e" || e.key === "-") {
        e.preventDefault();
      }
    },
    enterHandler(e) {
      if (e.target.value <= 0) {
        this.count = 1;
      } else {
        this.count = e.target.value.trim() * 1;
      }
      this.isTypeing = false;
    },
    escHandler() {
      this.isTypeing = false;
    },
    emitHandler() {
      this.$emit("update:count", this.count);
    },
    addZero(val) {
      return val < 10 ? `0${val}` : val;
    },
  },
  computed: {
    isAnimating() {
      return this.isBefore || this.isAfter;
    },
    isZero() {
      return this.countBefore === 0;
    },
    countBefore() {
      return this.count - 1;
    },
    countAfter() {
      return this.count + 1;
    },
    countCurrent() {
      return this.count;
    },
    incrementSize() {
      return {
        "--size": `${this.size * 16}px`,
      };
    },
  },
  watch: {
    count: {
      immediate: false,
      handler() {
        this.emitHandler();
      },
    },
  },
};
</script>

<style lang="scss" scoped src="./Increment.scss"></style>
