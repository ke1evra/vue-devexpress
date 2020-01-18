<template>
  <div>
    <div class="row">
      <div class="col-md-1 px-1" v-for="(month, i) of daysByMonth" v-bind:key="month">
        <h5>Месяц {{i}}</h5>
        <div class="row mx-0">
          <div class="days-container" v-for="day of month" v-bind:key="day" >
            <span v-bind:class=
                    "'w-100 rounded d-inline-block text-center ' +
                    (day.weekDay >5 ? 'text-danger' : 'text-white')"
            >
              {{day.day}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Test',
  data() {
    return {
      daysArray: this.buildCalendar('01-01-2020', '12-31-2020'),
      daysByMonth: this.buildDaysByMonth(this.daysArray),
      today: moment().format('DD-MM-YYYY'),
      startOfYear: moment().startOf('year').format('DD-MM-YYYY'),
    };
  },
  methods: {
    buildCalendar(start, end) {
      const returnArray = [];
      const endDate = moment(end).toDate();
      let startDate = moment(start).startOf('year').toDate();
      console.log(endDate, startDate);
      while (startDate < endDate) {
        returnArray.push({
          day: moment(startDate).format('D'),
          month: moment(startDate).format('M'),
          year: moment(startDate).format('YYYY'),
          weekDay: moment(startDate).format('E'),
        });
        startDate = moment(startDate).add(1, 'day').toDate();
        console.log(endDate, startDate);
      }
      // eslint-disable-next-line no-return-assign
      return this.daysArray = returnArray;
    },
    buildDaysByMonth(daysArray) {
      return daysArray.reduce((accum, current) => {
        // console.log(current);
        if (!accum[current.month]) {
          // eslint-disable-next-line no-param-reassign
          accum[current.month] = [];
        }
        // eslint-disable-next-line eqeqeq
        if (current.day < 2 && current.weekDay > 1) {
          console.log(current.day, current.weekDay);
          let offset = current.weekDay;
          while (offset > 1) {
            accum[current.month].push({ type: 'empty' });
            // eslint-disable-next-line no-plusplus
            offset--;
          }
        }
        accum[current.month].push(current);
        return accum;
      }, {});
    },
  },
};
</script>

<style scoped>
  .days-container{
    width: 13%;
    font-size: 12px;
    margin-right: 1px;
    margin-bottom: 1px;
  }
</style>
