<template>
  <div id="calendar-demo">
    <div class="row pb-1">
      <div class="col-1 firstLine">
        <the-mask
          :mask="'##.##.####'"
          class="form-control mr-1 text-center"
          placeholder="DD.MM.YYYY"
          v-model="currentDay"
          style="width: 120px;"
          v-b-popover.hover.bottom="'Choose day'"
        />
      </div>
    </div>
    <div class="row pb-3">
      <div class="col">
        <b-button
          class='submitButton'
          variant="primary"
          v-on:click="submitClick"
          v-b-popover.hover.bottom="'Apply this date'"
        >
          <b-spinner
            v-if="loading"
            variant="white"
            small label="Small Spinner my-auto"
          >&nbsp;</b-spinner>
          Apply
        </b-button>
        <div class="widget-container">
          <b-dropdown
          variant-primary
          >
            <DxCalendar
              id="calendar-container"
              v-model="currentValue"
              :min="minDateValue"
              :max="maxDateValue"
              :disabled-dates="disabledDates"
              :first-day-of-week="firstDay"
              :disabled="disabled"
              :zoom-level="zoomLevel"
              :cell-template="cellTemplate"
              :showTodayButton='true'
              :min-zoom-level='minZoomLevel'
              @value-changed="calendarChange"
            >
              <template #custom="{ data: cell }">
                <span :class="getCellCssClass(cell.date)">
                  {{ cell.text }}
                </span>
              </template>
            </DxCalendar>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    DxCalendar,
} from 'devextreme-vue';
import { TheMask } from 'vue-the-mask';

const moment = require('moment');

export default {
    components: {
        DxCalendar,
        TheMask,
    },
    data() {
        return {
            minDateValue: null,
            maxDateValue: new Date((new Date()).getTime()),
            disabledDates: null,
            firstDay: 0,
            currentValue: new Date(),
            zoomLevels: ['month', 'year', 'decade', 'century'],
            cellTemplate: 'cell',
            zoomLevel: 'month',
            now: moment(),
            currentDay: moment().format('DD.MM.YYYY'),
            minZoomLevel: 'month',
        };
    },
    props: ['disabled', 'loading'],
    methods: {
        calendarChange(e) {
            this.currentDay = moment(e.value).format('DD.MM.YYYY');
            this.$emit('calendarChange', e.value);
        },
        submitClick() {
            const currentDateLine = this.currentDay.replace(/\./g, '');

            const day = currentDateLine.substring(0, 2);
            const month = currentDateLine.substring(2, 4);
            const year = currentDateLine.substring(4);

            const resultDateLine = `${year}.${month}.${day}`;
            this.$emit('calendarChange', new Date(resultDateLine));
        },
    },
};
</script>
<style scoped>
.widget-container {
  display: inline-block;
  position: relative;
  left: 15px;
}

#calendar-container {
    margin: auto;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .weekend,
.dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    text-shadow: none;
    font-weight: bold;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
    color: #3030FF;
}

.dx-state-disabled.dx-calendar .dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
    color: #8080FF;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    color: #FF3030;
}

.dx-state-disabled.dx-calendar .dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    color: #FF8080;
}

.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 260px;
}

.caption {
    font-weight: 500;
    font-size: 18px;
}

.option {
    margin-top: 10px;
}

.dropDownButton {
    height: 30px;
    margin-left: 20px;
}

.submitButton {
  position: relative;
  left: 10px;
}

.firstLine {
  position: relative;
  left: 10px;
}
</style>
