import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import DatePicker from './../components/Pickers/DatePicker.vue';
Vue.use(VueCompositionApi)

export default {
  title: 'test/DatePicker',
  component: DatePicker,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePicker },
  template: '<DatePicker />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};
