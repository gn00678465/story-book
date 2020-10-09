<script>
import { defineComponent, reactive, toRefs, onMounted, computed } from '@vue/composition-api';
import moment from 'moment';
import 'moment/locale/zh-tw'
import './DatePicker.scss';


const DatePicker = defineComponent({
  name: 'DatePicker',
  setup() {
    onMounted(() => {
      data.focus = data.current = moment().set({h: 0, m:0, s: 0}).toDate()
    });
    const data = reactive({
      focus: 0,
      current: 0,
      weekdays: ['日','一','二','三','四','五','六'],
      prev() {
        data.current = moment(data.current).date(1).subtract(1, 'months').toDate()
      },
      next() {
        data.current = moment(data.current).date(1).add(1, 'months').toDate()
      },
    });
    const row = 6; const column = 7;
    const currentMonthArr = computed(() => {
      const firstDay = moment(data.current).date(1).day();
      const firstMdate = moment(data.current).date(1).subtract(firstDay, 'days');
      const arr = [];
      for (let i = 0; i < row; i += 1) {
        arr.push([]);
        for (let j = 0; j < column; j += 1) {
          const d = firstMdate.add(column * i + j, 'days')
          arr[i].push(d.toObject());
        }
      }
      return arr
    });
    return {
      ...toRefs(data),
      currentMonthArr
    }
  },
  render() {
    return(
      <div class="picker">
        <header class="picker-header">
          <button type="button" class="btn" onClick={this.prev}>p</button>
          <span class="title">{moment(this.current).format('YYYY MMM')}</span>
          <button type="button" class="btn" onClick={this.next}>n</button>
        </header>
        <main class="picker-body">
          <ul class="weekDays">{
            this.weekdays.map((weekday) => <li class="weekDay">{weekday}</li>)
          }</ul>
          {
            console.log(moment(this.current).date(1))
            // this.currentMonthArr.map((week) => <ul class="weeks">{
            //   week.map((day) => <li class="days">
            //     <span class="day-layer"></span>
            //     <span class="day-box">{day.date}</span>
            //   </li>)
            // }</ul>)
          }
        </main>
      </div>
    )
  },
});

export default DatePicker;
</script>
