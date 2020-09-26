import Increment from './../components/Increment.vue';

export default {
  title: 'Custom/Increment',
  component: Increment,
  argTypes: {
    styled: { control: { type: 'select', options: ['light', 'dark', 'simple'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Increment },
  template: '<Increment v-bind="$props"> </Increment>',
});

export const dark = Template.bind({});
dark.args = {
  styled: 'dark',
  size: 3,
};

export const light = Template.bind({});
light.args = {
  styled: 'light',
  size: 3,
};
