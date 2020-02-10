<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div class="col">
          <h1>Манипуляции с текстом</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-4 py-5" v-html="textFromObject(data[0])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[63])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[180])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[120])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[499])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[315])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[410])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[315])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[225])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[35])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[45])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[145])">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const data = require('../assets/text.json');

const insertProp = property => (property || '');
const insertPropWithText = (property, text) => (property ? `${text}: ${property}` : '');
const concatProps = propsArray => propsArray.reduce((acc, item, i) => {
  const lineEnding = propsArray.length - 1 === i ? '.' : ';';
  if (item) {
    return `${acc} - ${item}${lineEnding}<br/>`;
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
  methods: {
    textFromObject(item) {
      const props = concatProps([
        insertPropWithText(item.seriya, 'Серия'),
        insertPropWithText(item['pokrytie-fasada'], 'Покрытие фасада'),
        insertPropWithText(item['napravlenie-otkryvaniya-fasada'], 'Направление открытия фасада'),
        insertPropWithText(item['tip-produkta'], 'Тип продукта'),
        insertPropWithText(item['czvetovaya-palitra'], 'Цвет'),
        insertPropWithText(item.pokrytie, 'Покрытие'),
        insertPropWithText(item.effekt, 'Эффект'),
        insertPropWithText(item['tip-drevesiny'], 'Тип древесины'),
        insertPropWithText(item['krepezh-v-komplekte'], 'Крепеж в комплекте'),
      ]);
      const props2 = concatProps([
        insertPropWithText(item['strana-proizvodstva'], 'Страна производства'),
        insertPropWithText(`${item['shirina-(sm)'] * 10}х${item['vysota-(sm)'] * 10}х${item['tolshhina-(mm)']} мм`, 'Габаритные размеры'),
      ]);

      return `
      ### [ВЫБЕРИТЕ И СПРОЕКТИРУЙТЕ КУХНЮ](https://leroymerlin.ru/proekt-kuhni/)
      **${item['polnoe-naimenovanie-tovara-dlya-klienta']}**
      ${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('фальшпанель') ? ' — декоративная панель для отделки кухонного гарнитура.' : ''}
      ${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('дверь') ? ' защищает содержимое шкафов от пыли, задает внешний вид кухонного гарнитура.' : ''}
      ${item['polnoe-naimenovanie-tovara-dlya-klienta'].toString().toLowerCase().includes('угол') ? ' — важная составная часть кухонного гарнитура.' : ''}
      ${insertProp(item['samostoyatelnaya-sborka'])}
      Основной материал - ${insertProp(item['osnovnoj-material'])}.
      ${insertProp(item['pokrytie-vnutrennej-poverxnosti'])}
      ${insertProp(item['sootvetstvie-vnutrennej-storone'])}
      ${insertProp(item['predvaritelnoe-sverlenie-fasada'])}
      Delinia — это новая коллекция кухонь Леруа Мерлен. Все товары проходят строгую проверку качества на соответствие стандартам. Это гарантирует прочность и долговечность вашего кухонного гарнитура.
      <br/>
      <br/>
      Советы по обслуживанию: ${insertProp(item['sovety-po-obsluzhivaniyu'])}
      <br/>
      <br/>
      ### Особенности:
      <br/>
      <br/>
      ${props}
      <br/>
      ### Основные параметры:
      <br/>
      <br/>
      ${props2}
      <br/>
      ${insertProp(item['tip-produkta'])} Delinia ID — одна из составных деталей кухонного гарнитура. Не является самостоятельным продуктом. Петли и ручки в комплект не входят. Для составления полного проекта кухни рекомендуем проконсультироваться с экспертом в гипермаркете «Леруа Мерлен». В торговом зале вы увидите реальный цвет, сможете оценить качество, сравнить разные модели, спроектировать кухню, а также подобрать дополнительные элементы к ней. На любые вопросы вам ответят опытные консультанты. Также перед визитом в магазин вы можете воспользоваться нашим онлайн-конструктором и составить предварительный проект своей кухни. Создайте кухню мечты вместе с «Леруа Мерлен»!
      `;
    },
  },
};


</script>

<style scoped lang="sass">
</style>
