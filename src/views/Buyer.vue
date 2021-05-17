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
import moment from 'moment';
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
            this.loading = true;
            const url = `${API_URL}/reports/buyer?date_from=${range.from}&date_to=${range.to}`;
            // console.log(url);
            // eslint-disable-next-line no-return-assign
            axios.get(url).then((response) => {
                this.loading = false;
                this.dataSource = response.data;
                const dates = [];
                while (range.from <= range.to) {
                    dates.push(range.from);
                    // eslint-disable-next-line no-param-reassign
                    range.from = moment(range.from).subtract(-1, 'day').format('YYYY-MM-DD');
                }
                console.log(this.parseData(response.data, dates));
            }).catch(e => console.log(e));
        },
        parseData(data, dates) {
            const preTableObj = {};
            // Составление таблицы по товарам
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < data.length; i++) {
                // eslint-disable-next-line no-prototype-builtins
                if (!preTableObj.hasOwnProperty(data[i].id)) {
                    preTableObj[data[i].id] = data[i];
                    preTableObj[data[i].id].dates = {};
                    // eslint-disable-next-line no-plusplus
                    for (let j = 0; j < dates.length; j++) preTableObj[data[i].id].dates[dates[j]] = {};
                    preTableObj[data[i].id].total_sum = 0;
                    preTableObj[data[i].id].total_cnt = 0;
                    preTableObj[data[i].id].total_discount = 0;
                }
                // Подсчёт статистики
                preTableObj[data[i].id].total_sum += preTableObj[data[i].id].sum_price;
                preTableObj[data[i].id].total_cnt += preTableObj[data[i].id].cnt_sold;
                preTableObj[data[i].id].total_discount += preTableObj[data[i].id].sum_discount;
                preTableObj[data[i].id].dates[moment(data[i].ordered_at).format('YYYY-MM-DD')] = {
                    cnt_sold: data[i].cnt_sold,
                    sum_price: data[i].sum_price,
                    sum_discount: data[i].sum_discount,
                    avg_discount: data[i].avg_discount,
                };
            }
            // eslint-disable-next-line
            for (let item in preTableObj) preTableObj[item].avg_sum = preTableObj[item].total_sum / preTableObj[item].total_cnt;
            return Object.values(preTableObj);
        },
    },
};
</script>
