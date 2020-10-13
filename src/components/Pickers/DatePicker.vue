<script>
import {
  defineComponent,
  reactive,
  toRefs,
  toRef,
  onMounted,
  computed,
  watch,
} from '@vue/composition-api';
import moment from 'moment';
import 'moment/locale/zh-tw';
import './DatePicker.scss';

const DatePicker = defineComponent({
  name: 'DatePicker',
  props: {
    activeColor: {
      type: String,
      default: '#0074D8',
    },
  },
  directives: {
    'click-outside': {
      bind: function(el, binding) {
        const ourClickEventHandler = (event) => {
          if (!el.contains(event.target) && el !== event.target) {
            binding.value(event);
          }
        };
        el.__vueClickEventHandler__ = ourClickEventHandler;
        document.addEventListener("click", ourClickEventHandler);
      },
      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickEventHandler__);
      },
    },
  },
  setup(props, context) {
    const row = 6; const column = 7;
    let prevClick = false; let nextClick = false;

    function calcMonthArr(date) {
      const firstDay = moment(date).weekday();
      const firstDate = moment(date).date(1).subtract(1, 'd');
      const lastDate = moment(date).add(1, 'M').subtract(1, 'd');
      return [...Array(row * column).keys()].reduce((acc, val) => {
        const d = moment(date).subtract(firstDay, 'd').add(val, 'd').toObject();
        const format = moment(date).subtract(firstDay, 'd').add(val, 'd').format('YYYY-MM-DD');
        d.format = format;
        d.isCurrentMonth = moment(format).isBetween(firstDate, lastDate);
        acc.push(d);
        return acc;
      }, []);
    }

    const data = reactive({
      focus: null,
      current: 0,
      isShow: false,
      fadeXType: 'fadeX_Prev',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      prev() {
        if (prevClick) return;
        prevClick = true;
        window.setTimeout(() => { prevClick = false; }, 500);
        data.fadeXType = 'fadeX_Prev';
        data.current = moment(data.current).subtract(1, 'M').toDate();
      },
      next() {
        if (nextClick) return;
        nextClick = true;
        window.setTimeout(() => { nextClick = false; }, 500);
        data.fadeXType = 'fadeX_Next';
        data.current = moment(data.current).add(1, 'M').toDate();
      },
      currentMonthArr: computed(() => calcMonthArr(data.current)),
      pickerShow() {
        data.isShow = true;
      },
      pickerClose() {
        data.isShow = false;
      },
    });

    onMounted(() => {
      data.current = moment().date(1).toDate();
    });

    const datePickerStyle = computed(() => ({
      '--active-color': props.activeColor,
    }));

    function selectFocus(day) {
      const { format, isCurrentMonth } = day;
      if (!isCurrentMonth) return;
      if (isCurrentMonth && data.isShow) {
        data.focus = format;
        data.isShow = false;
      }
    }

    watch(toRef(data, 'focus'), () => {
      if (!data.focus) return;
      context.emit('input', data.focus);
    });

    function classHandler(day) {
      const today = moment().format('YYYY-MM-DD');
      if ((!data.focus && today === day.format) || (data.focus === day.format && day.isCurrentMonth)) {
        return 'active days';
      } if (today === day.format) {
        return 'today days';
      }
      return 'days';
    }

    return {
      ...toRefs(data),
      selectFocus,
      classHandler,
      datePickerStyle,
    };
  },
  render() {
    const directives = [{ name: 'click-outside', value: this.pickerClose }]
    return (
      <div class="picker" style={this.datePickerStyle} {...{ directives }}>
        <div class="picker-input-group">
          <input class="picker-input" type="text" name="date" value={this.focus} readonly onFocus={this.pickerShow}/>
          <svg viewBox="0 0 20 20" class="picker-input-icon icon-calendar">
            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"></path>
          </svg>
        </div>
        <div class="picker-panel" v-show={this.isShow}>
          <header class="picker-header">
            <button type="button" class="btn" onClick={this.prev}>
              <svg viewBox="0 0 24 24" class="arrow-svg-icon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
            </button>
            <transition name={this.fadeXType} mode="out-in">
              <span class="title" key={moment(this.current).format('YYYY MMM')}>
                {moment(this.current).format('YYYY MMM')}
              </span>
            </transition>
            <button type="button" class="btn" onClick={this.next}>
              <svg viewBox="0 0 24 24" class="arrow-svg-icon"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </button>
          </header>
          <main class="picker-body">
            <ul class="weekDays">{
              this.weekdays.map((weekday) => <li class="weekDay">{weekday}</li>)
            }</ul>
            <div class="weeks-warp">
            <transition name={this.fadeXType} mode="out-in">
              <div class="weeks" key={moment(this.current).format('YYYY MMM')}>
              {
                this.currentMonthArr.map((day) => <div class={this.classHandler(day)}
                  onClick={() => this.selectFocus(day)}>
                  <div class="day-layer"></div>
                  <div class="day-box" v-show={day.isCurrentMonth}>{day.date}</div>
                </div>)
              }
              </div>
            </transition>
            </div>
          </main>
        </div>
      </div>
    );
  },
});

export default DatePicker;
</script>
