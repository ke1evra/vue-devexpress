<template>
  <div class="pt-3">
    <div class="row">
      <div class="col-2">
        <label>Тип отображения данных</label>
        <b-form-select
          size="sm"
          v-model="type"
          :options="options"
        ></b-form-select>
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
          >
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
      type: 'stackedarea',
      options: [
        {
          value: 'stackedarea',
          text: 'Кол-во',
          selected: true,
        },
        {
          value: 'fullstackedarea',
          text: 'Проценты',
        },
      ],
      dataArray: [],
      seriesArray: [
        {
          valueField: 'seo_google',
          name: 'SEO Google',
        },
        {
          valueField: 'seo_yandex',
          name: 'SEO Яндекс',
        },
        {
          valueField: 'googleads',
          name: 'Google Ads',
        },
        {
          valueField: 'yandexdirect',
          name: 'Яндекс Директ',
        },
        {
          valueField: 'yandexmarket',
          name: 'Яндекс Маркет',
        },
        {
          valueField: 'email',
          name: 'E-mail рассылка',
        },
        {
          valueField: 'seo_mailru',
          name: 'SEO mail.ru',
        },
        {
          valueField: 'seo_bing',
          name: 'SEO Bing',
        },
        {
          valueField: 'seo_yahoo',
          name: 'SEO Yahoo',
        },
        {
          valueField: 'seo_rambler',
          name: 'SEO Рамблер',
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
                ${moment(pointInfo.argumentText, 'YYYY-MM-DD').locale('ru').format('LL')}
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
