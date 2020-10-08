<script>
import { defineComponent, reactive } from '@vue/composition-api';
import moment from 'moment';
import 'moment/locale/zh-tw'
import './DatePicker.scss';


const DatePicker = defineComponent({
  name: 'DatePicker',
  setup() {
    const data = reactive({
      today: moment().format('YYYY-MM-DD'),
    });
    return {
      data,
    }
  },
  render() {
    return(
      <div class="picker">
        <header class="picker-header">
          <button type="button" class="btn">n</button>
          <span class="title">{ this.data.today }</span>
          <button type="button" class="btn">p</button>
        </header>
        <main class="picker-body">
          <ul class="weekDays"></ul>
        </main>
      </div>
    )
  },
});

export default DatePicker;
</script>
