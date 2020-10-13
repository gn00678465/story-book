import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import DatePicker from './../components/Pickers/DatePicker.vue';
Vue.use(VueCompositionApi)

export default {
  title: 'Custom/Picker/DatePicker',
  component: DatePicker,
  argTypes: {
    activeColor: { control: 'color' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { DatePicker },
  template: '<DatePicker v-bind="$props"/>',
});

export const signal = Template.bind({});
signal.args = {
};
