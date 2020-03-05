<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-6" >
                    <h5>Сегодня</h5>
                    <simple-data-grid v-bind:dataSource="todayData"/>
                </div>
                <div class="col-6" >
                    <h5>Последние 7 дней</h5>
                    <simple-data-grid v-bind:dataSource="last7DaysData"/>
                </div>
                <div class="col-6" >
                    <h5>Последние 30 дней</h5>
                    <simple-data-grid v-bind:dataSource="last30DaysData"/>
                </div>
                <div class="col-6" >
                    <h5>Последние 365 дней</h5>
                    <simple-data-grid v-bind:dataSource="last365DaysData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../config';
import SimpleDataGrid from '../components/tables/SimpleDataGrid.vue';

function DateRange(from = moment().startOf('day').toDate(), to = moment().endOf('day').toDate()) {
    this.from = from;
    this.to = to;
    const DateTime = 'YYYY-MM-DD HH:mm:ss';
    this.pretty = function () {
        return {
            from: moment(this.from).format(DateTime),
            to: moment(this.to).format(DateTime),
        };
    };
}

const getGroupedOrderDataFromECcrm = async (from, to, shop, groupBy) => {
    const url = `${API_URL}/orders/${groupBy}?date_from=${from}&date_to=${to}&shop=${shop}`;
    console.log(`url: ${url}`);
    return axios.get(url).then(data => data).catch(e => console.log(e));
};

const getOrderByMonthData = async (from, to, shop) => getGroupedOrderDataFromECcrm(from, to, shop, 'month');
const getOrderByDayData = async (from, to, shop) => getGroupedOrderDataFromECcrm(from, to, shop, 'day');
const getOrderByHourData = async (from, to, shop) => getGroupedOrderDataFromECcrm(from, to, shop, 'hour');

export default {
    name: 'Test',
    components: { SimpleDataGrid },
    data() {
        return {
            shop: 1,
            data: null,
            todayRange: new DateRange(),
            last7DaysRange: new DateRange(),
            last30DaysRange: new DateRange(),
            last365DaysRange: new DateRange(),
            todayData: null,
            last7DaysData: null,
            last30DaysData: null,
            last365DaysData: null,
        };
    },
    methods: {
        showTime() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        },
        setRange(range, from, to) {
            const selectedRange = range;
            selectedRange.from = from;
            selectedRange.to = to;
            return selectedRange;
        },
        async setRangeLastNDays(range, n) {
            const from = moment().subtract(n, 'days').startOf('day').toDate();
            const to = moment().endOf('day').toDate();
            this.setRange(range, from, to);
            return range.pretty();
        },
        async setRangeLast24hours(range) {
            const from = moment().subtract(24, 'hours').startOf('hour').toDate();
            const to = moment().endOf('hour').toDate();
            this.setRange(range, from, to);
            return range.pretty();
        },
        setRangeLast7days(range) {
            return this.setRangeLastNDays(range, 7);
        },
        setRangeLast30days(range) {
            return this.setRangeLastNDays(range, 30);
        },
        setRangeLast365days(range) {
            return this.setRangeLastNDays(range, 365);
        },

    },
    mounted() {
        this.setRangeLast24hours(this.todayRange)
            .then(range => getOrderByHourData(range.from, range.to, this.shop))
            // eslint-disable-next-line no-return-assign
            .then(response => this.todayData = response.data);

        this.setRangeLast7days(this.last7DaysRange)
            .then(range => getOrderByDayData(range.from, range.to, this.shop))
            // eslint-disable-next-line no-return-assign
            .then(response => this.last7DaysData = response.data);

        this.setRangeLast30days(this.last30DaysRange)
            .then(range => getOrderByDayData(range.from, range.to, this.shop))
            // eslint-disable-next-line no-return-assign
            .then(response => this.last30DaysData = response.data);

        this.setRangeLast365days(this.last365DaysRange)
            .then(range => getOrderByMonthData(range.from, range.to, this.shop))
            // eslint-disable-next-line no-return-assign
            .then(response => this.last365DaysData = response.data);
    },
};
</script>

<style scoped lang="sass">
  .days-container
    width: 13%
    font-size: 12px
    margin-right: 1px
    margin-bottom: 1px
    :hover
      background-color: #aaa
      cursor: pointer
</style>
