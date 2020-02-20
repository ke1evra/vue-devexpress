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
          ></b-form-select>
        </b-form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DxChart
          id="orderSourcesChartByDay"
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
              visible="true"
              alignment="center"
              position="inside"
              overlapping-behavior="none"
              background-color="none"
              :show-for-zero-values="false"
            >
            </DxLabel>
            <DxPoint :visible="false">
              <DxPointHoverStyle
                visible="false"
                size="10"
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
            :color="series.color"
          >
          </DxSeries>
          <DxArgumentAxis
            tick-interval="day"
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

const numberWithCommas = (x, text) => {
  const value = x.value ? x.value : x;
  const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;');
  return text ? `${text} ${formatted}` : formatted;
};

export default {
  name: 'orderSourcesChartByDay',
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
      ],
      dataArray: [],
      seriesArray: [
        {
          valueField: 'seo_google',
          name: 'SEO Google',
          color: '#5899da',
        },
        {
          valueField: 'seo_yandex',
          name: 'SEO Яндекс',
          color: '#e8743b',
        },
        {
          valueField: 'googleads',
          name: 'Google Ads',
          color: '#19a979',
        },
        {
          valueField: 'yandexdirect',
          name: 'Яндекс Директ',
          color: '#ed4a7b',
        },
        {
          valueField: 'yandexmarket',
          name: 'Яндекс Маркет',
          color: '#945ecf',
        },
        {
          valueField: 'email',
          name: 'E-mail рассылка',
          color: '#13a4b4',
        },
        {
          valueField: 'seo_mailru',
          color: '#525df4',
          name: 'SEO mail.ru',
        },
        {
          valueField: 'seo_bing',
          color: '#bf399e',
          name: 'SEO Bing',
        },
        {
          valueField: 'seo_yahoo',
          name: 'SEO Yahoo',
          color: '#ee6868',
        },
        {
          valueField: 'seo_rambler',
          name: 'SEO Рамблер',
          color: '#2f6497',
        },
      ],
      tooltipColors: null,
    };
  },
  props: [
    'dataSourceUrl',
  ],
  created() {
    loadMessages(ruMessages);
    locale('ru');
    moment.locale('ru');
    this.getTooltipColors();
  },
  methods: {
    getTooltipColors() {
      const colors = {};
      // eslint-disable-next-line array-callback-return
      this.seriesArray.map((item) => {
        colors[item.name] = item.color;
      });
      console.log(colors);
      this.tooltipColors = colors;
    },
    customizeTooltip(pointInfo) {
      console.log(pointInfo);
      // eslint-disable-next-line consistent-return
      const drawSingleElement = (name, val, percent) => {
        if (val > 0) {
          return `
          <div class='series-name'>
            <span ${this.tooltipColors[name] ? `style="color:${this.tooltipColors[name]}"` : ''}>&#9632;</span>&nbsp;${name}:
          </div>
          <div class='value-text'>
            <span ${this.tooltipColors[name] ? `style="color:${this.tooltipColors[name]}"` : ''}>${numberWithCommas(val)}${percent ? `&nbsp<i >(${percent})</i>` : ''}</span>
          </div>
        `;
        }
        return '';
      };
        // eslint-disable-next-line no-unused-vars,no-return-assign
      const html = pointInfo.points.reduce((ac, el) =>
      // eslint-disable-next-line no-return-assign,no-param-reassign,implicit-arrow-linebreak
        ac += drawSingleElement(el.seriesName, el.valueText, el.percentText),
      '');
      return {
        html: `
            <div>
              <div class='tooltip-header'>
                ${moment(pointInfo.argument).locale('ru').format('LL')}
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
  #orderSourcesChartByDay{
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
