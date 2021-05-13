<template>
    <div class="">
        <div class="row">
            <div class="col">
                <h1>Байер</h1>
                <dual-date-picker @range="getData" v-bind:loading="loading"></dual-date-picker>
                <buyers-table v-bind:dataSource="dataSource" ></buyers-table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import BuyersTable from '../components/buyersTable.vue';
import DualDatePicker from '../components/dualDatePicker.vue';
import { API_URL } from '../config';


export default {
    components: { DualDatePicker, BuyersTable },
    data() {
        return {
            dataSource: null,
            url: null,
            loading: null,
        };
    },
    methods: {
        getData(range) {
            const url = `${API_URL}/reports/buyer?date_from=${range.from}&date_to=${range.to}`;
            console.log(url);
            console.log(axios.get(url).then(data => data).catch(e => console.log(e)));
            // this.dataSource = axios.get(url).then(data => data).catch(e => console.log(e));
        },
    },
};
</script>
