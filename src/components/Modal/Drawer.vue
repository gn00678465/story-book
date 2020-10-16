<template>
  <transition name="fade">
    <div class="drawer-wrap" :style="rootStyle" v-if="visible" v-show-drawer="onClose">
      <div class="drawer-overlay" @click.self="onClose(maskClosable)"></div>
      <transition :name="`slide-${direction}`" appear >
        <div class="drawer-content" :class="direction" ref="drawer">
          <header class="drawer-header">
            <slot name="title"><h2 class="title">{{ title }}</h2></slot>
            <button type="button" class="closeBtn" @click.prevent="onClose" v-if="closeable">
              <slot name="closeIcon">
                x
              </slot>
            </button>
          </header>
          <main class="drawer-main">
            <slot name="drawerBody">
              This is body
            </slot>
          </main>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import './Drawer.scss';
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
    closeable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Drawer Title'
    },
    width: {
      type: String,
      default: '400px'
    },
    direction: {
      type: String,
      default: 'left',
      validator:function (value) {
        return ['right', 'left'].indexOf(value) !== -1;
      },
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
    'show-drawer': {
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
    const drawer = ref(null);
    const data = reactive({
      onClose(val = true) {
          if(val) {
            context.emit('update:visible', false);
          }
        },
      rootStyle: computed(() => {
        return {
          '--transition': `${props.transition / 1000}s`, 
          '--width': props.width,
          '--mask': props.mask ? 'rgba(0,0,0, .5)' : 'rgba(0,0,0,0)'
        }
      })
    });

    watch(() => props.visible, (val) => {
      document.body.style.overflow = val ? 'hidden' : 'auto';
      let scrollable = null;
      if(drawer.value) {
        scrollable = drawer.value.offsetHeight > window.innerHeight
        if(val && scrollable && props.position === 'center' ) {
          data.scrollable = true;
        }
      }
      if(!drawer.value) {
        data.scrollable = false;
      }
    });

    return {
      ...toRefs(data),
    }
  }
})
</script>
