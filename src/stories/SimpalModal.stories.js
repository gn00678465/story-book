import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import Button from './Button.vue';
import Modal from './../components/Modal/Modal.vue';
Vue.use(VueCompositionApi)

export default {
  title: 'custom/Modal/SimpalModal',
  component: Modal,
  argTypes: {
    position: { control: { type: 'select', options: ['center', 'top_center'] } },
    size: { control: { type: 'select', options: ['', 'sm', 'xl'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, Button },
  data() {
    return {
      show: false,
    }
  },
  template: `
  <div>
  <Button @onClick="show = true" label="show" :primary="true"/>
  <Modal v-bind="$props" :visible.sync="show">
  <template #modalBody>
  <div class="">This is body</div>
  </template>
  </Modal>
  </div>
  `,
});

export const normal = Template.bind({});
normal.args = {
};

export const sm = Template.bind({});
sm.args = {
  size: 'sm'
};

export const xl = Template.bind({});
xl.args = {
  size: 'xl'
};

export const center = Template.bind({});
center.args = {
  position: 'center'
};
