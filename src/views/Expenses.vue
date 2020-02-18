<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col">
          <h1>Расход</h1>
          <dual-date-picker @range="setRange"
                            v-bind:from="from"
                            v-bind:to="to"
          ></dual-date-picker>
<!--          <b-form-select v-model="selected" :options="options"></b-form-select>-->
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="col">-->
<!--          <p class="bg-light rounded p-3">-->
<!--            from: {{from}}-->
<!--            <br>-->
<!--            to: {{to}}-->
<!--            <br>-->
<!--            {{constructLink('vkostume')}}-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
      <div class="row">
        <div class="col">
          <h3>Распределение заказов по источникам</h3>
          <order-sources-chart-by-day
            v-bind:dataSourceUrl="constructLink('vkostume')">
          </order-sources-chart-by-day>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
// import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';
import orderSourcesChartByDay from '../components/orderSourcesChartByDay.vue';

export default {
  name: 'Expenses',
  components: { DualDatePicker, orderSourcesChartByDay },
  data() {
    return {
      dataSource: null,
      dataUrl: null,
      from: null,
      to: null,
      vksLink: null,
      options: [
        {
          value: 'vkostume',
          text: 'Костюмы',
        },
        {
          value: 'vipbikini',
          text: 'Бикини',
        },
        {
          value: 'military',
          text: 'Милитари',
        },
        {
          value: 'tutkresla',
          text: 'Кресла',
        },
      ],
      // projects: ['vkostume', 'vipbikini', 'military', 'tutkresla'],
    };
  },
  created() {
  },
  methods: {
    setRange(range) {
      this.from = moment(range.from, 'DDMMYYYY').unix();
      this.to = moment(range.to, 'DDMMYYYY').endOf('day').unix();
      // this.getOrdersSumData();
      this.vksLink = this.constructLink('vkostume');
    },
    constructLink(shop) {
      const formatDate = date => moment.unix(date).format('YYYY-MM-DD');
      return `http://185.176.25.157:3000/expenses/order_source?date_from=${formatDate(this.from)}&date_to=${formatDate(this.to)}&shop=${shop}`;
    },
  },
};
</script>
