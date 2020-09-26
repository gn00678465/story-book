import Pagination from './../components/Pagination.vue';

export default {
  title: 'Custom/Pagination',
  component: Pagination,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pagination },
  template: `
  <Pagination v-bind="$props" >
  <template #prev>⮜</template>
  <template #next>⮞</template>
  </Pagination>
  `,
});

export const primary = Template.bind({});
primary.args = {
  totalPages: 40,
  page: 5,
  visiblePages: 5,
};
