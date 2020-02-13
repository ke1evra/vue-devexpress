<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Звонки</h1>
        <dual-date-picker @change="getData"
                          @range="getDataSourceUrl"
                          v-bind:loading="loading"
                          v-bind:urltype="urltype"
                          v-bind:from="from"
                          v-bind:to="to"
        ></dual-date-picker>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <calls-table v-bind:dataSource="dataSource"></calls-table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <calls-by-day-chart v-bind:dataSourceUrl="dataSourceUrl"/>
        {{dataSourceUrl}}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';
import callsTable from '../components/callsTable.vue';
import CallsByDayChart from '../components/callsByDayChart.vue';


export default {
  components: { CallsByDayChart, DualDatePicker, callsTable },
  name: 'calls',
  data() {
    return {
      dataSource: null,
      loading: null,
      urltype: 'calls',
      from: null,
      to: null,
      dataSourceUrl: null,
    };
  },
  methods: {
    getData(url) {
      this.loading = true;
      axios
        .get(url)
        // eslint-disable-next-line no-return-assign
        .then((response) => {
          this.loading = false;
          this.dataSource = response.data;
        });
    },
    getDataSourceUrl(range) {
      this.dataSourceUrl = `http://185.176.25.157:3000/calls/range/byday?date_from=${moment(`${range.from.slice(2, 4)}-${range.from.slice(0, 2)}-${range.from.slice(4, 8)}`).format('YYYY-MM-DD')}&date_to=${moment(`${range.to.slice(2, 4)}-${range.to.slice(0, 2)}-${range.to.slice(4, 8)}`).format('YYYY-MM-DD')}`;
    },
  },
};
</script>

<style scoped>

</style>
