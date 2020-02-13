<template>
  <div class="pt-3">
    <DxChart
      id="callsChart"
      :data-source="dataSourceUrl"
      v-if="dataSourceUrl"
      >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
      />
      <DxCommonSeriesSettings
        max-label-count="50"
      >
        <DxLabel
          visible="true"
          alignment="center"
          position="inside"
          overlapping-behavior="none"
          background-color="none"
        >
        </DxLabel>
        <DxPoint :visible="false">
          <DxPointHoverStyle
            visible="true"
            size="10"
          />
        </DxPoint>
      </DxCommonSeriesSettings>
      <DxSeries
        argument-field="start_day"
        value-field="outcoming"
        type="bar"
        name="Сумма заявок"


        color="#c42034"
      >
      </DxSeries>
      <DxSeries
        argument-field="start_day"
        value-field="count"
        type="bar"
        name="Сумма заявок"


        color="#c42034"
      >
      </DxSeries>
      <DxArgumentAxis
        tick-interval="day">
      </DxArgumentAxis>
      <DxLegend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
      >
      </DxLegend>
      <DxLegend
        verticalAlignment="top"
        horizontalAlignment="center"
        itemTextPosition="right"
      >
      </DxLegend>
      <DxTooltip
        :enabled="true"
        :shared="true"
      />
      <DxCrosshair
        :enabled="true"
        :width="3"
        color="#949494"
        dash-style="dot"
      >
        <DxLabel
          :visible="true"
          background-color="#949494"
        >
          <DxFont
            :size="12"
            color="#fff"
          />
        </DxLabel>
      </DxCrosshair>
    </DxChart>
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
  // DxValueAxis,
  // DxPane,
  DxTooltip,
  // DxTitle,
  DxCrosshair,
  DxFont,
  DxPoint,
  DxPointHoverStyle,
  DxExport,
  // DxPointBorder,

} from 'devextreme-vue/chart';


import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';
import moment from 'moment';


export default {
  name: 'callsByDayChart',
  components: {
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxLegend,
    DxCommonSeriesSettings,
    DxLabel,
    // DxValueAxis,
    // DxPane,
    DxTooltip,
    // DxTitle,
    DxCrosshair,
    DxFont,
    DxPoint,
    DxPointHoverStyle,
    DxExport,
    // DxPointBorder,
  },
  data() {
    return {
      dataArray: [],
    };
  },
  props: [
    'dataSourceUrl',
  ],
  created() {
    loadMessages(ruMessages);
    locale('ru');
    moment.locale('ru');
  },
};
</script>

<style>
  #orderChart{
    width: 100%;
    height: 900px;
  }

  .tooltip-header {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 5px;
    border-bottom: 1px solid #c5c5c5;
  }

  .tooltip-body {
    width: 200px;
  }

  .tooltip-body .series-name {
    font-weight: normal;
    opacity: 0.6;
    display: inline-block;
    line-height: 1.5;
    padding-right: 10px;
    width: 126px;
  }

  .tooltip-body .value-text {
    display: inline-block;
    line-height: 1.5;
    width: 30px;
  }
</style>
