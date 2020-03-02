<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <h1>Манипуляции с текстом</h1>
        </div>
      </div>
      <div class="row">
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

const data = require('../assets/text.json');

const insertProp = property => (property || '');
const insertPropWithText = (property, text) => (property ? `${text}: ${property}` : '');
const concatProps = propsArray => propsArray
  .reduce((acc, item, i) => {
    const lineEnding = propsArray.length - 1 === i ? '.' : ';';
    if (item) {
      return `${acc} - ${item}${lineEnding}
`;
    }
    return acc;
  }, '');


export default {
  name: 'TextManipulate',
  data() {
    return {
      data,
    };
  },
  components: {
    DxColumn,
    // DxGroupPanel,
    // DxGrouping,
    // DxPaging,
    // DxSearchPanel,
    DxDataGrid,
    // DxFormat,
    // DxPager,
    // DxSummary,
    // DxGroupItem,
    // DxSortByGroupSummaryInfo,
    // DxTotalItem,
    // DxFilterRow,
    // DxHeaderFilter,
    DxExport,

  },
  created() {
    loadMessages(ruMessages);
    locale('ru');
  },
  methods: {
    textFromObject(item) {
      const props = concatProps([
        insertPropWithText(item.seriya, 'Серия'),
        // insertPropWithText(item['pokrytie-fasada'], 'Покрытие фасада'),
        // insertPropWithText(item['tip-produkta'], 'Тип продукта'),
        // insertPropWithText(item.pokrytie, 'Покрытие'),
        // insertPropWithText(item.effekt, 'Эффект'),
        // insertPropWithText(item['tip-drevesiny'], 'Тип древесины'),
        insertPropWithText(item['krepezh-v-komplekte'], 'Крепеж в комплекте'),
        insertPropWithText(item['czvetovaya-palitra'], 'Цвет'),
        insertPropWithText(item['osnovnoj-material'], 'Материал'),
        insertPropWithText(item['strana-proizvodstva'], 'Страна производства'),
        insertPropWithText(`${item['shirina-(sm)'] * 10}х${item['vysota-(sm)'] * 10}х${item['tolshhina-(mm)']} мм`, 'Габаритные размеры'),
      ]);

      // ${insertProp(item['pokrytie-vnutrennej-poverxnosti'])}
      return `
### [ВЫБЕРИТЕ И СПРОЕКТИРУЙТЕ КУХНЮ](https://leroymerlin.ru/proekt-kuhni/)
**${item['polnoe-naimenovanie-tovara-dlya-klienta']}**${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('фальшпанель') ? ' — декоративная панель для отделки кухонного гарнитура.' : ''}${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('дверь') ? ' задает внешний вид кухонного гарнитура, защищает содержимое шкафов от пыли.' : ''}${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('угол') ? ' — важная составная часть кухонного гарнитура.' : ''}${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('витрина') ? ' — разновидность фасада с декоративной стеклянной вставкой.' : ''} ${insertProp(item['sootvetstvie-vnutrennej-storone'])} ${insertProp(item['predvaritelnoe-sverlenie-fasada'])}.
Delinia ID — это новая коллекция кухонь Леруа Мерлен. Все товары проходят строгую проверку качества на соответствие стандартам. Это гарантирует прочность и долговечность вашего кухонного гарнитура.

### Параметры:

${props}
Советы по уходу: Протирать влажной неабразивной тканью или микрофиброй.

${insertProp(item['tip-produkta'])} Delinia ID — одна из составных деталей кухонного гарнитура. Не является самостоятельным продуктом. Петли и ручки в комплект не входят. Для составления полного проекта кухни рекомендуем проконсультироваться с экспертом в гипермаркете «Леруа Мерлен». В торговом зале вы увидите реальный цвет, сможете оценить качество, сравнить разные модели, спроектировать кухню, а также подобрать дополнительные элементы к ней. На любые вопросы вам ответят опытные консультанты. Также перед визитом в магазин вы можете воспользоваться нашим онлайн-конструктором и составить предварительный проект своей кухни. Создайте кухню мечты вместе с «Леруа Мерлен»!
`.replace(/\v\v+/g, ' ').trim();
    },
    constructDataSourse() {
      return this.data.map(item => ({
        art_num: item['artikul-lm'],
        name: item['polnoe-naimenovanie-tovara-dlya-klienta'],
        text: this.textFromObject(item),
      }));
    },
  },
};


</script>

<style scoped lang="sass">
</style>
