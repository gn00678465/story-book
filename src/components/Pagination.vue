<template>
  <ul class="pagination" :style="rootStyle">
    <li class="pagination__item" v-for="(page, i) in paginations" :key="i">
      <button
        type="button"
        :disabled="page.disabled"
        :data-key="page.page"
        :class="calssHandler(page)"
        class="pagination__link"
        @click.prevent="pageChange(page.page)"
      >
        <slot name="prev" v-if="page.html === 'prev'">{{ page.html }}</slot>
        <template v-if="page.html !== 'prev' && page.html !== 'next'">
          {{ page.html }}
        </template>
        <slot name="next" v-if="page.html === 'next'">{{ page.html }}</slot>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: {
      type: Number,
      default: 0,
      validator: (page) => page >= 0,
    },
    visiblePages: {
      type: Number,
      default: 5,
      validator: (visiblePages) => visiblePages > 0,
    },
    totalPages: {
      type: Number,
      required: true,
      validator: (totalPage) => totalPage >= 0,
    },
    // color
    primaryColor: {
      type: String,
      default: "#000",
    },
    secondaryColor: {
      type: String,
      default: "#fff",
    },
    hoverColor: {
      type: String,
      default: "#eee",
    },
    activeColor: {
      type: String,
      default: "#000",
    },
  },
  computed: {
    filteredPages() {
      const diff = this.visiblePages / 2;
      const toFilterPages = [...Array(this.totalPages).keys()].slice(2, -2);
      if (toFilterPages.length > this.visiblePages) {
        const diffFirst = this.page - toFilterPages[0];
        const diffLast = this.page - toFilterPages[toFilterPages.length - 1];
        if (diffFirst < diff) {
          return toFilterPages.slice(0, this.visiblePages);
        } else if (diffLast >= -diff) {
          return toFilterPages.slice(-this.visiblePages);
        } else {
          return toFilterPages.filter((page) => {
            const diffPage = this.page - page;
            return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
          });
        }
      }
      return null;
    },
    pages() {
      const filteredPages = this.filteredPages;
      const pages = filteredPages
        ? [
            filteredPages[0] - 1 === 1 ? 1 : "...",
            ...filteredPages,
            filteredPages[filteredPages.length - 1] + 1 === this.totalPages - 2
              ? this.totalPages - 2
              : "...",
          ]
        : [...Array(this.totalPages - 2).keys()];
      return [
        this.page - 1 < 0 ? 0 : this.page - 1,
        0,
        ...pages,
        this.totalPages - 1,
        this.page + 1 >= this.totalPages - 1
          ? this.totalPages - 1
          : this.page + 1,
      ];
    },
    paginations() {
      return this.pages.map((page, index) => {
        return {
          page,
          active: page === this.page,
          disabled: this.disabled(page, index),
          html: this.render(page, index),
        };
      });
    },
    rootStyle() {
      return {
        "--primary-color": this.primaryColor,
        "--secondary-color": this.secondaryColor,
        "--hover-color": this.hoverColor,
        "--active-color": this.activeColor,
      };
    },
  },
  methods: {
    disabled(page, index) {
      return (
        (index === 0 && this.page === 0) ||
        (this.page === this.totalPages - 1 &&
          this.pages.length - 1 === index) ||
        page === "..."
      );
    },
    render(page, index) {
      if (index === 0) {
        return "prev";
      }
      if (index === this.pages.length - 1) {
        return "next";
      }
      if (page === "...") {
        return page;
      }
      return `${page + 1}`;
    },
    pageChange(page) {
      if (page === "..." || page === this.page) return;
      this.$emit("update:page", page);
    },
    calssHandler(obj) {
      return {
        active: obj.active,
        "no-border": obj.disabled && obj.html === "...",
      };
    },
  },
};
</script>

<style lang="scss" scoped src="./Pagination.scss"></style>