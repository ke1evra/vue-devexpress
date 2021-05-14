<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col">
          <h1>Расход</h1>
            <label>Магазин</label>
            <b-form inline>
                <b-form-select
                    size="sm"
                    v-model="shop"
                    class="mb-1"
                    :options="options"
                ></b-form-select>
            </b-form>
          <dual-date-picker @range="getData"
                            v-bind:loading="loading"
          ></dual-date-picker>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>Стоимость</h3>
          <expenses-by-day-chart
            v-bind:dataSourceUrl="cost"
          >
          </expenses-by-day-chart>
          <h3>Источники</h3>
          <order-sources-chart-by-day
            v-bind:dataSourceUrl="source">
          </order-sources-chart-by-day>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';
import orderSourcesChartByDay from '../components/orderSourcesChartByDay.vue';
import expensesByDayChart from '../components/expensesByDayChart.vue';
import { API_URL } from '../config';

export default {
    name: 'Expenses',
    components: { DualDatePicker, orderSourcesChartByDay, expensesByDayChart },
    data() {
        return {
            dataSource: null,
            dataUrl: null,
            loading: null,
            cost: null,
            source: null,
            shop: 'vkostume',
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
        async getData(range) {
            this.constructCostLink(range);
            this.constructLink(range);
        },
        constructCostLink(range) {
            this.loading = true;
            // eslint-disable-next-line max-len
            const constructCostUrl = `${API_URL}/expenses/cost?date_from=${range.from}&date_to=${range.to}&shop=${this.shop}`;
            console.log(constructCostUrl);
            axios
                .get(constructCostUrl)
                // eslint-disable-next-line no-return-assign
                .then((response) => {
                    this.cost = response.data;
                    this.loading = false;
                });
        },
        constructLink(range) {
            this.loading = true;
            // eslint-disable-next-line max-len
            const constructUrl = `${API_URL}/expenses/order_source?date_from=${range.from}&date_to=${range.to}&shop=${this.shop}`;
            console.log(constructUrl);
            axios
                .get(constructUrl)
                // eslint-disable-next-line no-return-assign
                .then((response) => {
                    this.source = response.data;
                    this.loading = false;
                });
        },
    },
};
</script>
