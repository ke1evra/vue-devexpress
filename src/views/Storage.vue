<template>
    <div class="Storage">
        <h2>Storage monitoring page</h2>
        <div class="row">
            <div v-if='!dataSource || loadData'>
                <div class='preloader'>
                    <div class='preloaderChild bounce-1'></div>
                    <div class='preloaderChild bounce-2'></div>
                </div>
            </div>
            <calendar
                @calendarChange='reloadData'
                :disabled='!dataSource || loadData'
                :loading='!dataSource || loadData'
            />
        </div>

        <div class="row">
            <div class="col-12">
                <timelineChart v-if='dataSource'
                    title='Склад'
                    :dataSource='dataSource'
                    argumentField='name'
                    rangeValue1Field='fixed_created_at'
                    rangeValue2Field='finish_time'
                    seriesTemplateNameField='attribute'
                />
            </div>
        </div>
    </div>
</template>

<script>
import calendar from '../components/calendar.vue';
import timelineChart from '../components/charts/timelineChart.vue';
import fetchData from '../components/model/common';
import { API_URL } from '../config';

const moment = require('moment');

const API_URI = `${API_URL}/wh/person`;
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

export default {
    name: 'storage',
    components: {
        calendar,
        timelineChart,
    },
    data() {
        return {
            date: moment(),
            dataSource: null,
            loadData: true,
        };
    },
    methods: {
        async getData(date) {
            const dayStart = moment(date).startOf('day').format(timeFormat);
            const dayEnd = moment(date).endOf('day').format(timeFormat);

            let data = await fetchData(API_URI, dayStart, dayEnd);
            if (data) {
                data = data.map((line) => {
                    /* eslint-disable */
                    const fixed_created_at = moment(line.created_at).add(30, 'minutes');
                    line.fixed_created_at = fixed_created_at.format('HH:mm:ss');
                    line.finish_time = fixed_created_at.add(1, 'seconds').format('HH:mm:ss');
                    return line;
                    /* eslint-enable */
                });
            }

            return data;
        },
        async reloadData(newDate) {
            this.loadData = true;
            this.getData(newDate)
                .then((data) => {
                    this.dataSource = data;
                    this.loadData = false;
                });
        },
    },
    mounted() {
        this.getData(this.date)
            .then((data) => {
                this.dataSource = data;
                this.loadData = false;
            });
    },
};
</script>

<style scoped lang='scss'>
@import '../common/common.scss';
</style>
