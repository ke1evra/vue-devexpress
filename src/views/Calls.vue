<template>
  <div class="">
    <div class="row">
      <div class="col">
        <h1>Звонки</h1>
        <dual-date-picker @range="getData"
                          v-bind:loading="loading"
                          v-bind:urltype="urltype"
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';
import callsTable from '../components/callsTable.vue';
import CallsByDayChart from '../components/callsByDayChart.vue';
import { API_URL } from '../config';


export default {
    components: { CallsByDayChart, DualDatePicker, callsTable },
    name: 'calls',
    data() {
        return {
            dataSource: null,
            loading: null,
            urltype: 'calls',
            dataSourceUrl: null,
        };
    },
    methods: {
        getData(range) {
            this.loading = true;
            this.dataSourceUrl = `${API_URL}/calls/range/byday?date_from=${range.from}&date_to=${range.to}`;
            const url = `${API_URL}/calls/range?date_from=${range.from} 00:00:00&date_to=${range.to} 23:59:59`;
            axios
                .get(url)
            // eslint-disable-next-line no-return-assign
                .then((response) => {
                    this.loading = false;
                    this.dataSource = response.data;
                });
        },
    },
};
</script>

<style scoped>

</style>
