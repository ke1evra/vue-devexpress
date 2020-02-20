<template>
  <div class="pt-3">
    <fa :icon="faFlag"/>
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
          show-for-zero-values="false"
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
        v-bind:key="series.name"
        v-for="series in seriesArray"
        argument-field="start_day"
        :value-field="series.valueField"
        type="stackedBar"
        :name="series.name"
        formar="number"
        :color="series.color"
      >
      </DxSeries>
      <DxArgumentAxis
        tick-interval="day">
      </DxArgumentAxis>
      <DxValueAxis
        name="sum"
        position="left"
        value-type="numeric"
      >
        <DxTitle text="Кол-во звонков"/>
      </DxValueAxis>
      <DxLegend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
      >
      </DxLegend>
      <DxLegend
        verticalAlignment="bottom"
        horizontalAlignment="center"
        itemTextPosition="right"
      >
      </DxLegend>
      <DxTooltip
        :enabled="true"
        :shared="true"
        :customize-tooltip="customizeTooltip"
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
  DxValueAxis,
  // DxPane,
  DxTooltip,
  DxTitle,
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

const numberWithCommas = (x, text) => {
  const value = x.value ? x.value : x;
  const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;');
  return text ? `${text} ${formatted}` : formatted;
};

export default {
  name: 'callsByDayChart',
  components: {
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxLegend,
    DxCommonSeriesSettings,
    DxLabel,
    DxValueAxis,
    // DxPane,
    DxTooltip,
    DxTitle,
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
      seriesArray: [
        {
          valueField: 'incoming',
          name: 'Входящий',
          color: '#97c95c',
        },
        {
          valueField: 'outcoming',
          name: 'Исходящий',
          color: '#1db2f5',
        },
        // { valueField: 'Не определен', name: 'Не определен', color: '#bbb' },
        {
          valueField: 'failed',
          name: 'Недозвон',
          color: '#f57f21',
        },
        {
          valueField: 'missed',
          name: 'Пропущенный',
          color: '#f5564a',
        },
      ],
      tooltipColors: {
        Входящий: '#97c95c',
        Исходящий: '#1db2f5',
        Недозвон: '#f57f21',
        Пропущенный: '#f5564a',
      },
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
  methods: {
    customizeTooltip(pointInfo) {
      console.log(pointInfo);
      const drawSingleElement = (name, val, percent) => `
          <div class='series-name'>
            <span ${this.tooltipColors[name] ? `style="color:${this.tooltipColors[name]}"` : ''}>&#9632;</span>&nbsp;${name}:
          </div>
          <div class='value-text'>
            <span ${this.tooltipColors[name] ? `style="color:${this.tooltipColors[name]}"` : ''}>${numberWithCommas(val)}${percent ? `&nbsp<i >(${percent})</i>` : ''}</span>
          </div>
        `;
      // eslint-disable-next-line no-unused-vars,no-return-assign
      const html = pointInfo.points.reduce((ac, el) =>
      // eslint-disable-next-line no-return-assign,no-param-reassign,implicit-arrow-linebreak
        ac += drawSingleElement(el.seriesName, el.valueText, el.percentText),
      '');
      return {
        html: `
            <div>
              <div class='tooltip-header'>
                ${moment(pointInfo.argumentText, 'DD-MM-YYYY').locale('ru').format('LL')}
              </div>
              <div class='tooltip-body'>
                ${html}
              </div>
            </div>
          </div>`,
      };
    },
    custimizeTitleThousands({ valueText }) {
      return `${numberWithCommas(Math.round(valueText / 1000))} к`;
    },
  },
};
</script>

<style lang="css">
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
