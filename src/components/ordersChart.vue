<template>
  <div>
    <div class="row">
      <div class="col">
        <DxChart
          id="chart"
          :data-source="calcData()"
          v-if="calcData()"
        >
          <DxSeries
            argument-field="day"
            value-field="count"
            name="My oranges"
            type="bar"
            color="#ffaa66"
          />
        </DxChart>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="bg-info text-white px-3 py-1 my-1 rounded" v-if="dataSource">
          <h3>Компонент ordersChart</h3>
          <p>{{calcData()}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DxChart, DxSeries } from 'devextreme-vue/chart';

export default {
  name: 'ordersChart',
  components: {
    DxChart,
    DxSeries,
  },
  data() {
    return {
      dataArray: [],
    };
  },
  props: [
    'dataSource',
  ],
  methods: {
    calc() {
      this.dataSource.map(
        currentValue => currentValue,
      );
      return this.dataArray;
    },
    calcData() {
      const calculatedData = this.dataSource.reduce(
        (acum, item) => {
          if (!acum[item.created_day]) {
            // eslint-disable-next-line no-param-reassign
            acum[item.created_day] = {
              day: item.created_day,
              count: 0,
              sum: 0,
              avg: 0,
            };
          }
          // eslint-disable-next-line no-param-reassign
          acum[item.created_day].count += 1;
          // eslint-disable-next-line no-param-reassign
          acum[item.created_day].sum += item.order_sum;
          // eslint-disable-next-line no-param-reassign,max-len
          acum[item.created_day].avg = Math.round(acum[item.created_day].sum / acum[item.created_day].count);
          return acum;
        }, {},
      );
      return Object.keys(calculatedData)
        .map(key => calculatedData[key]);
    },
  },
};
</script>

<style scoped>

</style>
