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
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>Расходы по источникам по дням</h3>
          <expenses-by-day-chart
            v-bind:dataSourceUrl="constructCostLink('vkostume')"
          >
          </expenses-by-day-chart>
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
import expensesByDayChart from '../components/expensesByDayChart.vue';

export default {
    name: 'Expenses',
    components: { DualDatePicker, orderSourcesChartByDay, expensesByDayChart },
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
        constructCostLink(shop) {
            const formatDate = date => moment.unix(date).format('YYYY-MM-DD');
            return `http://185.176.25.157:3000/expenses/cost?date_from=${formatDate(this.from)}&date_to=${formatDate(this.to)}&shop=${shop}`;
        },
    },
};
</script>
