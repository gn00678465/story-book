import Modal from './../components/Modal.vue';

export default {
  title: 'Custom/Modal',
  component: Modal,
  argTypes: {
    mod: { control: { type: 'select', options: ['toCenter', 'SM', 'SM toCenter', 'XL'] } },
    position: { control: { type: 'select', options: ['rModal', 'lModal'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: `
  <Modal v-bind="$props" title="Base Modal">這是測試文字</Modal>
  `,
});

export const Modal_1 = Template.bind({});
Modal_1.args = {
  show: false,
};
