<template>
    <DxChart
    id="chart"
    :data-source="dataSource"
    :rotated="true"
    :bar-group-padding="0.2"
    @legend-click="legendClickHandler($event)"
    >
        <DxExport
          :enabled='true'
          :printing-enables='true'
        />
        <DxArgumentAxis
        :position='`right`'
        :grid='{
            visible: true,
        }'
        />
        <DxValueAxis
            value-type='datetime'
            :visual-range='visualRange'
            :whole-range='visualRange'
            :endOnTick='true'
            :minor-grid='{ visible: true }'
            :label="{ format: 'hour' }"
        >
            <DxTick
                :visible='true'
            />
            <DxTickInterval
                :hours='1'
            />
            <DxMinorTick
                :visible='true'
            />
            <DxMinorTickInterval
                :visible='true'
                :minutes='5'
            />
        </DxValueAxis>
        <DxTitle
          :text="title"
        />
        <DxCommonSeriesSettings
          :argument-field="argumentField"
          type="rangebar"
          :range-value1-field="rangeValue1Field"
          :range-value2-field="rangeValue2Field"
          bar-overlap-group="from_numbers"
        >
            <DxLabel :format='{
                visible: false,
            }'/>
        </DxCommonSeriesSettings>
        <DxSeriesTemplate :name-field="seriesTemplateNameField"
        :customizeSeries='this.customizeSeries'
        />
        <DxAnimation :enabled="false"/>
        <DxLegend
          vertical-alignment="bottom"
          horizontal-alignment="center"
          itemTextPosition="right"
        >
        </DxLegend>
        <DxZoomAndPan
            :drag-to-zoom="true"
            :allow-mouse-wheel="true"
            value-axis="both"
            pan-key="shift"
        />
    <DxTooltip
        :enabled="true"
        :customize-tooltip='customizeTooltip'
    />
  </DxChart>
</template>

<script>
import {
    DxChart,
    DxCommonSeriesSettings,
    DxArgumentAxis,
    DxAnimation,
    DxSeriesTemplate,
    DxLegend,
    DxTitle,
    DxZoomAndPan,
    DxTooltip,
    DxExport,
    DxValueAxis,
    DxTickInterval,
    DxTick,
    DxMinorTickInterval,
    DxMinorTick,
    DxLabel,
} from 'devextreme-vue/chart';


export default {
    name: 'timelineChart',
    components: {
        DxChart,
        DxCommonSeriesSettings,
        DxArgumentAxis,
        DxAnimation,
        DxSeriesTemplate,
        DxLegend,
        DxTitle,
        DxZoomAndPan,
        DxTooltip,
        DxExport,
        DxValueAxis,
        DxTickInterval,
        DxTick,
        DxMinorTickInterval,
        DxMinorTick,
        DxLabel,
    },
    props: [
        'dataSource',
        'title',
        'argumentField',
        'rangeValue1Field',
        'rangeValue2Field',
        'seriesTemplateNameField',
    ],
    data() {
        return {
            visualRange: ['01:00:00', '24:00:00'],
        };
    },
    methods: {
        legendClickHandler(e) {
            const series = e.target;
            if (series.isVisible()) {
                series.hide();
            } else {
                series.show();
            }
        },
        customizeTooltip(e) {
            let tooltip = '';

            // eslint-disable-next-line
            for (const [key, value] of Object.entries(e.point.data)) {
                tooltip += `${key} : ${value}\n`;
            }
            return {
                text: tooltip,
            };
        },
        customizeSeries(nameField) {
            const colorScheme = {
                name: '',
                color: '',
            };

            if (nameField === 'inComing') {
                colorScheme.name = 'Входящие';
                colorScheme.color = '#97c95c';
            }
            if (nameField === 'outComing') {
                colorScheme.name = 'Исходящие';
                colorScheme.color = '#1db2f5';
            }
            if (nameField === 'inComingFail') {
                colorScheme.name = 'Пропущенные';
                colorScheme.color = '#c90515';
            }
            if (nameField === 'outComingFail') {
                colorScheme.name = 'Недозвон';
                colorScheme.color = '#f57f21';
            }

            return colorScheme;
        },
    },
};
</script>

<style scoped>
#chart {
    height: 600px;
}
</style>
