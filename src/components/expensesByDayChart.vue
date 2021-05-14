<template>
  <div class="pt-3">
    <div class="row">
      <div class="col-2">
        <label>Тип отображения данных</label>
        <b-form inline>
          <b-form-select
            size="sm"
            v-model="type"
            :options="options"
            class="mr-3"
          ></b-form-select>
<!--          <b-form-select-->
<!--            size="sm"-->
<!--            v-model="type"-->
<!--            :options="options"-->
<!--          ></b-form-select>-->
        </b-form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DxChart
          id="expensesByDayChart"
          :data-source="dataSourceUrl"
          v-if="dataSourceUrl"
        >
          <DxExport
            :enabled="true"
            :allow-export-selected-data="true"
          />
          <DxCommonSeriesSettings
            :type="type"
            :max-label-count="50"
          >
            <DxLabel
              :visible="true"
              alignment="center"
              position="inside"
              overlapping-behavior="none"
              background-color="none"
              :show-for-zero-values="false"
            >
            </DxLabel>
            <DxPoint :visible="false">
              <DxPointHoverStyle
                :visible="false"
                :size="10"
              />
            </DxPoint>
          </DxCommonSeriesSettings>
          <DxSeries
            v-bind:key="series.name"
            v-for="series in seriesArray"
            argument-field="date"
            :value-field="series.valueField"
            :name="series.name"
            formar="number"
            value-type="numeric"
            :color="series.color"
          >
          </DxSeries>
          <DxArgumentAxis
            tick-interval="day"
            value-type="numeric"
            argument-type="datetime"
          >
          </DxArgumentAxis>
          <DxValueAxis
            name="sum"
            position="left"
            value-type="numeric"
          >
            <DxTitle text="Заказы по источникам"/>
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
    </div>
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
import { customizeTooltip, custimizeTitleThousands, setTooltipColors } from '../methods/chartHelpers';

export default {
    name: 'expensesByDayChart',
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
            type: 'stackedbar',
            seriesType: null,
            options: [
                {
                    value: 'stackedbar',
                    text: 'Кол-во',
                    selected: true,
                },
                {
                    value: 'fullstackedbar',
                    text: 'Проценты',
                },
                {
                    value: 'splinearea',
                    text: 'splinearea',
                },
                {
                    value: 'stackedsplinearea',
                    text: 'stackedsplinearea',
                },
                {
                    value: 'fullstackedsplinearea',
                    text: 'fullstackedsplinearea',
                },
            ],
            dataArray: [],
            seriesArray: [
                {
                    valueField: 'yandexmarket',
                    name: 'Яндекс Маркет',
                    color: '#97c95c',
                },
                {
                    valueField: 'yandexdirect',
                    name: 'Яндекс Директ',
                    color: '#1db2f5',
                },
                {
                    valueField: 'googleads',
                    name: 'Google Ads',
                    color: '#f57f21',
                },
            ],
            totalSeriesArray: [
                {
                    valueField: 'total',
                    name: 'Расход',
                    color: '#97c95c',
                },
            ],
            tooltipColors: null,
        };
    },
    props: [
        'dataSourceUrl',
    ],
    mounted() {
        loadMessages(ruMessages);
        locale('ru');
        moment.locale('ru');
        this.tooltipColors = setTooltipColors(this.seriesArray);
    },
    methods: {
        customizeTooltip,
        custimizeTitleThousands,
    },
};
</script>

<style lang="css">
  #expensesByDayChart{
    width: 100%;
    height: 400px;
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
