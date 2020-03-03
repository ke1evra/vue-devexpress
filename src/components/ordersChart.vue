<template>
  <div class="pt-3">
    <DxChart
      id="orderChart"
      :data-source="calcData()"
      v-if="dataSource"
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
      <DxArgumentAxis
        tick-interval="day">
      </DxArgumentAxis>
      <DxSeries
        v-for="series in calcSeries(dataSource)"
        v-bind:key="series"
        argument-field="day"
        :value-field="series.valueField"
        type="FullStackedBar"
        :name="series.name"
        :color="series.color"
        pane="midPane"
        formar="percent"
      >
        <DxLabel
          :visible="true"
        />
      </DxSeries>
      <DxSeries
        argument-field="day"
        value-field="count"
        type="bar"
        color="#03beca"
        name="Кол-во звявок"
        axis="count"
        pane="bottomPane"
      >
        <DxLabel
          :visible="true"
        />
      </DxSeries>
      <DxSeries
        argument-field="day"
        value-field="avg"
        type="spline"
        name="Средний чек"
        axis="avg"
        pane="topPane"
        color="#015d00"
      >
        <DxLabel
          :visible="false"
        />
      </DxSeries>
      <DxSeries
        argument-field="day"
        value-field="sum"
        type="spline"
        name="Сумма заявок"
        axis="sum"
        pane="topPane"
        color="#c42034"
      >
        <DxLabel
          :visible="false"
          :customize-text="custimizeTitleThousands"
        />
      </DxSeries>
      <DxValueAxis
        name="count"
        position="left"
      >
        <DxTitle text="Кол-во Заявок"/>
      </DxValueAxis>
      <DxValueAxis
        name="avg"
        position="right"
      >
        <DxTitle text="Средний чек, ₽"/>
      </DxValueAxis>
      <DxValueAxis
        name="sum"
        position="left"
      >
        <DxTitle text="Сумма заявок, ₽"/>
      </DxValueAxis>
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
      <DxPane
        name="topPane"
      />
      <DxPane name="midPane"/>
      <DxPane name="bottomPane"/>

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

<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <div class="bg-info text-white px-3 py-1 my-1 rounded" v-if="dataSource">-->
<!--          <h3>JSON.stringify(dataSource[0], null, 4</h3>-->
<!--          <p>{{JSON.stringify(dataSource[0], null, 4)}}</p>-->
<!--          <h3>calcSeries(dataSource)</h3>-->
<!--          <p>{{calcSeries(dataSource)}}</p>-->
<!--          <h3>calcData()</h3>-->
<!--          <p>{{calcData()}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
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
    DxPane,
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
    name: 'ordersChart',
    components: {
        DxChart,
        DxSeries,
        DxArgumentAxis,
        DxLegend,
        DxCommonSeriesSettings,
        DxLabel,
        DxValueAxis,
        DxPane,
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
        };
    },
    props: [
        'dataSource',
    ],
    created() {
        loadMessages(ruMessages);
        locale('ru');
        moment.locale('ru');
    },
    methods: {
        calcSeries(ordersData) {
            const ordersColors = {
                'Не обработан': '#bbb',
                'Передан на склад': '#73C3D9',
                Отказ: '#f5564a',
                Забронирован: '#6491e8',
                'Заказ отгружен': '#97c95c',
                'Заказ собран и готов к выдаче': '#3dabd9',
                Продажа: '#fbce25',
            };
            const series = [];
            return ordersData.reduce((ac, el) => {
                if (!series[el.order_status_title]) {
                    series[el.order_status_title] = true;
                    ac.push({
                        valueField: el.order_status_title,
                        name: el.order_status_title,
                    });
                    if (ordersColors[el.order_status_title]) {
                        // eslint-disable-next-line no-param-reassign
                        ac[ac.length - 1].color = ordersColors[el.order_status_title];
                    }
                }
                return ac;
            }, []);
        },
        calcData() {
            console.log(this.dataSource.length);
            const calculatedData = this.dataSource.reduce(
                (acum, item) => {
                    if (item.otkaz_cause_id !== 8 && item.otkaz_cause_id !== 3 && item.shop_title === 'Вкостюме.ру') {
                        if (!acum[item.created_day]) {
                            // eslint-disable-next-line no-param-reassign
                            acum[item.created_day] = {
                                day: moment(item.created_day).toDate(),
                                count: 0,
                                sum: 0,
                                avg: 0,
                            };
                        }
                        if (!acum[item.created_day][item.order_status_title]) {
                            // eslint-disable-next-line no-param-reassign
                            acum[item.created_day][item.order_status_title] = 0;
                        }
                        // eslint-disable-next-line no-param-reassign,no-plusplus
                        acum[item.created_day][item.order_status_title]++;
                        // eslint-disable-next-line no-param-reassign
                        acum[item.created_day].count += 1;
                        // eslint-disable-next-line no-param-reassign
                        acum[item.created_day].sum += item.order_sum;
                        // eslint-disable-next-line no-param-reassign,max-len
                        acum[item.created_day].avg = Math.round(acum[item.created_day].sum / acum[item.created_day].count);
                    }
                    return acum;
                }, {},
            );
            return Object.keys(calculatedData)
                .map(key => calculatedData[key]);
        },
        customizeTooltip(pointInfo) {
            const drawSingleElement = (name, val) => `
          <div class='series-name'>
            ${name}:
          </div>
          <div class='value-text'>
            ${numberWithCommas(val)}
          </div>
        `;
            // eslint-disable-next-line no-unused-vars,no-return-assign
            const html = pointInfo.points.reduce((ac, el) =>
            // eslint-disable-next-line no-return-assign,no-param-reassign,implicit-arrow-linebreak
                ac += drawSingleElement(el.seriesName, el.valueText),
            '');
            return {
                html: `
            <div>
              <div class='tooltip-header'>
                ${moment(pointInfo.argumentText).locale('ru').format('LL')}
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
        customizeTooltipLabel({ valueText }) {
            return valueText * 1 > 1 ? `${numberWithCommas(valueText)}` : `${Math.round(valueText * 1 / 100)}`;
        },
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
