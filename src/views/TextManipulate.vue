<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <h1>Манипуляции с текстом</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form inline>
            <b-form-select
              size="sm"
              v-model="type"
              :options="options"
              class="mr-3"
            ></b-form-select>
          </b-form>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <DxDataGrid
            :show-borders="true"
            :allow-column-reordering="true"
            :data-source="constructDataSourse()"
            :hover-state-enabled="true"
          >
            <DxColumn
              data-field="art_num"
              caption="Артикул"
              width="100"
            ></DxColumn>
            <DxColumn
              data-field="name"
              caption="Наименование"
            ></DxColumn>
            <DxColumn
              data-field="text"
              caption="Текст"
              height="1000"
            ></DxColumn>
            <DxExport
              :enabled="true"
            />
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    DxDataGrid,
    DxColumn,
    // DxGrouping,
    // DxGroupPanel,
    // DxSearchPanel,
    // DxPaging,
    // DxFormat,
    // DxPager,
    // DxSummary,
    // DxGroupItem,
    // DxSortByGroupSummaryInfo,
    // DxTotalItem,
    // DxFilterRow,
    // DxHeaderFilter,
    DxExport,

} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';

const data = require('../assets/textManipulate/leroi_86_delinia.json');
// const data = require('../assets/textManipulate/text.json');
const patterns = require('../assets/textManipulate/patterns');

export default {
    name: 'TextManipulate',
    data() {
        return {
            data,
            options: [
                'leroi_625_delinia',
                'leroi_86_delinia',
            ],
            type: 'leroi_86_delinia',
        };
    },
    components: {
        DxColumn,
        DxDataGrid,
        DxExport,

    },
    created() {
        loadMessages(ruMessages);
        locale('ru');
    },
    methods: {
        textFromObject(item) {
            return patterns[this.type](item);
        },
        constructDataSourse() {
            return this.data.map(item => ({
                art_num: item['artikul-lm'],
                // name: item['polnoe-naimenovanie-tovara-dlya-klienta'],
                name: item.title,
                text: this.textFromObject(item),
            }));
        },
    },
};


</script>
<style scoped lang="sass">
</style>
