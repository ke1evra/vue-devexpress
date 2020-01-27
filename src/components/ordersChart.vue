<template>
  <div class="pt-3">
    {{width}}
    <DxChart
      class="w-100"
      :data-source="calcData()"
    >
      <DxCommonSeriesSettings>
        <DxLabel
          visible="true"
          alignment="center"
          position="inside"
        >
        </DxLabel>
      </DxCommonSeriesSettings>
      <DxArgumentAxis
        tick-interval="day">
      </DxArgumentAxis>
      <DxSeries
        argument-field="day"
        value-field="count"
        type="stackedBar"
        color="#ffaa66"
        name="Заказы"
      >
      </DxSeries>
      <DxLegend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
      >
      </DxLegend>
    </DxChart>

<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <div class="bg-info text-white px-3 py-1 my-1 rounded" v-if="dataSource">-->
<!--          <h3>Компонент ordersChart</h3>-->
<!--          <p>{{calcData()}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxLegend,
  DxCommonSeriesSettings,
  DxLabel,

} from 'devextreme-vue/chart';
import moment from 'moment';

export default {
  name: 'ordersChart',
  components: {
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxLegend,
    DxCommonSeriesSettings,
    DxLabel,
  },
  data() {
    return {
      dataArray: [],
      width: 1,
    };
  },
  props: [
    'dataSource',
  ],
  mounted() {
    this.width = this.$refs.app.clientWidth;
  },
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
              day: moment(item.created_day).toDate(),
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
