import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import Button from './Button.vue';
import Drawer from './../components/Modal/Drawer.vue';
Vue.use(VueCompositionApi)

export default {
  title: 'custom/Modal/Drawer',
  component: Drawer,
  argTypes: {
    direction: { control: { type: 'select', options: ['left', 'right'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Drawer, Button },
  data() {
    return {
      show: false,
    }
  },
  template: `
  <div>
  <Button @onClick="show = true" label="show" :primary="true"/>
  <Drawer v-bind="$props" :visible.sync="show">
  </Drawer>
  </div>
  `,
});

export const normal = Template.bind({});
normal.args = {
};

export const right = Template.bind({});
right.args = {
  direction: 'right'
};