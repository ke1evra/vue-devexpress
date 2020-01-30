<template>
  <div class="dualDatePicker">
    <div class="row pb-1">
      <div class="col-md-2">
        <b-form-select v-model="selected" :options="options" @change="setDateRange(selected)">
        </b-form-select>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col">
        <div class="form-inline">
          <the-mask
            :mask="'##.##.####'"
            class="form-control mr-1 text-center"
            placeholder="DD.MM.YYYY"
            v-model="fromDate"
            style="width: 120px;"
            v-b-popover.hover.bottom="'Выберите начало периода'"
          />
          <the-mask
            :mask="'##.##.####'"
            class="form-control mr-1 text-center"
            placeholder="DD.MM.YYYY"
            v-model="toDate"
            style="width: 120px;"
            v-b-popover.hover.bottom="'Выберите конец периода'"
          />
          <b-button
            variant="primary"
            v-on:click="returnDateRange"
            v-b-popover.hover.bottom="'Применить выбранный диапазон'"
          >
            <b-spinner
              v-if="loading"
              variant="white"
              small label="Small Spinner my-auto"
            >&nbsp;</b-spinner>
            Применить
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import moment from 'moment';

export default {
  name: 'dualDatePicker',
  props: ['callback', 'loading'],
  components: {
    TheMask,
  },
  data() {
    return {
      dataUrl: null,
      dataUrlTemp: 'http://185.176.25.157:3000/orders?date_from=2020-01-03 00:00:00&date_to=2020-01-03 23:59:59',
      autoExpandAll: true,
      fromDate: moment().format('DDMMYYYY'),
      toDate: moment().format('DDMMYYYY'),
      moment,
      selected: null,
      options: [
        { value: null, text: '-- Выберите диапазон дат --', disabled: true },
        {
          value: {
            from: moment(new Date()).startOf('day').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').endOf('day').format('DDMMYYYY'),
          },
          text: 'Сегодня',
        },
        {
          value: {
            from: moment(new Date()).startOf('day').subtract(1, 'days').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').subtract(1, 'days').endOf('day')
              .format('DDMMYYYY'),
          },
          text: 'Вчера',
        },
        {
          value: {
            from: moment(new Date()).startOf('day').subtract(1, 'days').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').endOf('day').format('DDMMYYYY'),
          },
          text: 'Вчера + сегодня',
        },
        {
          value: {
            from: moment(new Date()).startOf('day').subtract(2, 'days').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').subtract(2, 'days').format('DDMMYYYY'),
          },
          text: 'Позавчера',
        },
        {
          value: {
            from: moment(new Date()).startOf('isoWeek').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').endOf('day').format('DDMMYYYY'),
          },
          text: 'Текущая неделя',
        },
        {
          value: {
            from: moment(new Date()).startOf('isoWeek').subtract(1, 'week').format('DDMMYYYY'),
            to: moment(new Date()).startOf('isoWeek').endOf('isoWeek').subtract(1, 'week')
              .format('DDMMYYYY'),
          },
          text: 'Прошлая неделя',
        },
        {
          value: {
            from: moment(new Date()).startOf('month').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').endOf('day').format('DDMMYYYY'),
          },
          text: 'Текущий месяц',
        },
        {
          value: {
            from: moment(new Date()).startOf('month').subtract(1, 'month').format('DDMMYYYY'),
            to: moment(new Date()).startOf('month').subtract(1, 'month').endOf('month')
              .format('DDMMYYYY'),
          },
          text: 'Прошлый месяц',
        },
        {
          value: {
            from: moment(new Date()).startOf('month').subtract(2, 'month').format('DDMMYYYY'),
            to: moment(new Date()).startOf('month').subtract(2, 'month').endOf('month')
              .format('DDMMYYYY'),
          },
          text: 'Позапрошлый месяц',
        },
        {
          value: {
            from: moment(new Date()).startOf('year').format('DDMMYYYY'),
            to: moment(new Date()).startOf('day').endOf('day').format('DDMMYYYY'),
          },
          text: 'Текущий год',
        },
        {
          value: {
            from: moment(new Date()).startOf('year').subtract(1, 'year').format('DDMMYYYY'),
            to: moment(new Date()).startOf('year').subtract(1, 'year').endOf('year')
              .format('DDMMYYYY'),
          },
          text: 'Прошлый год',
        },
        {
          value: {
            from: moment(new Date()).startOf('year').subtract(2, 'year').format('DDMMYYYY'),
            to: moment(new Date()).startOf('year').subtract(2, 'year').endOf('year')
              .format('DDMMYYYY'),
          },
          text: 'Позапрошлый год',
        },
      ],
    };
  },
  methods: {
    setUrl() {
      // eslint-disable-next-line no-return-assign
      return this.dataUrl = `http://185.176.25.157:3000/orders?date_from=${moment(`${this.fromDate.slice(2, 4)}-${this.fromDate.slice(0, 2)}-${this.fromDate.slice(4, 8)}`).format('YYYY-MM-DD')} 00:00:00&date_to=${moment(`${this.toDate.slice(2, 4)}-${this.toDate.slice(0, 2)}-${this.toDate.slice(4, 8)}`).format('YYYY-MM-DD')} 23:59:59`;
    },
    setDateRange(value) {
      // eslint-disable-next-line no-return-assign
      this.fromDate = value.from;
      this.toDate = value.to;
    },
    returnDateRange() {
      const url = `http://185.176.25.157:3000/orders?date_from=${moment(`${this.fromDate.slice(2, 4)}-${this.fromDate.slice(0, 2)}-${this.fromDate.slice(4, 8)}`).format('YYYY-MM-DD')} 00:00:00&date_to=${moment(`${this.toDate.slice(2, 4)}-${this.toDate.slice(0, 2)}-${this.toDate.slice(4, 8)}`).format('YYYY-MM-DD')} 23:59:59`;
      this.$emit('change', url);
    },
  },
};
</script>

<style scoped>

</style>
