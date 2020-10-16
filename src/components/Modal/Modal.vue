<template>
  <transition name="fade">
    <div class="modal-wrap" v-if="visible" :style="rootStyle" v-show-modal="onClose">
      <div class="modal-content" :class="[position, size, {'scrollable': scrollable}]" ref="modal">
        <header class="modal-header">
          <h2 class="title">{{ title }}</h2>
          <button type="button" class="closeBtn" @click.prevent="onClose" v-if="closeable">
            <slot name="closeIcon">
            x
            </slot>
          </button>
        </header>
        <main class="modal-body">
          <slot name="modalBody"></slot>
        </main>
        <footer class="modal-footer" v-if="footer">
          <slot name="modalFooter">
            <button class="footerBtnOk" type="button" @click.prevent="onOk"> OK </button>
            <button class="footerBtnCancel" type="button" @click.prevent="onClose"> Cancle </button>
          </slot>
        </footer>
      </div>
      <div class="modal-overlay" @click.self='onClose(maskClosable)'></div>
    </div>
  </transition>
</template>

<script>
import './Modal.scss';
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  computed,
  watch,
} from '@vue/composition-api'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Modal Title',
    },
    footer: {
      type: Boolean,
      default: true,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'top_center',
    },
    size: {
      type: String,
      default: '',
    },
    roundSpace: {
      type: Number,
      default: 15,
    },
    transition: {
      type: Number,
      default: 200,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
  },
  directives: {
    'show-modal': {
      bind(el, binding) {
        const useEffect = function(event) {
          if(event.keyCode === 27) {
            binding.value(event);
          }
        }
        el.__vueKeydownEventHandler__ = useEffect;
        document.addEventListener("keydown", useEffect);
      },
      unbind(el) {
        document.removeEventListener("keydown", el.__vueKeydownEventHandler__);
      },
    },
  },
  setup(props, context) {
    const modal = ref(null);
    const data = reactive({
      scrollable: false,
      onClose(val = true) {
        if(val) {
          context.emit('update:visible', false)
        }
      },
      onOk() {
        context.emit('emitOk');
        context.emit('update:visible', false)
      },
      rootStyle: computed(() => {
        return {
          '--transition': `${props.transition / 1000}s`, 
          '--round-space': `${props.roundSpace * 2}px`,
          '--mask': props.mask ? 'rgba(0,0,0, .5)' : 'rgba(0,0,0,0)'
        };
      }),
      disableDirective: computed(() => {
        return (props.position === 'top_center');
      }),
    });
    watch(() => props.visible, (val) => {
      document.body.style.overflow = val ? 'hidden' : 'auto';
      let scrollable = null;
      if(modal.value) {
        scrollable = modal.value.offsetHeight > window.innerHeight
        if(val && scrollable && props.position === 'center' ) {
          data.scrollable = true;
        }
      }
      if(!modal.value) {
        data.scrollable = false;
      }
    });
    return {
      ...toRefs(data),
      modal
    }
  }
});
</script>