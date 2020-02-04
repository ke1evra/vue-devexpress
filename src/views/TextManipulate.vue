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
        <div class="col-4 py-5" v-html="textFromObject(data[1])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[2])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[3])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[4])">
        </div>
        <div class="col-4 py-5" v-html="textFromObject(data[5])">
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
        insertPropWithText(`${item['shirina-(sm)'] * 10}х${item['vysota-(sm)'] * 10}х${item['tolshhina-(mm)']} мм`, 'Габаритные размеры'),
      ]);
      return `
      Delinia ID **${item['polnoe-naimenovanie-tovara-dlya-klienta']}**
      ${insertProp(item['samostoyatelnaya-sborka'])}
      Основной материал - ${insertProp(item['osnovnoj-material'])}.
      ${insertProp(item['pokrytie-vnutrennej-poverxnosti'])}
      ${insertProp(item['sootvetstvie-vnutrennej-storone'])}
      ${insertProp(item['predvaritelnoe-sverlenie-fasada'])}
      ${insertPropWithText(item['strana-proizvodstva'], 'Страна производства')}.
      <br/>
      <br/>
      Советы по обслуживанию: ${insertProp(item['sovety-po-obsluzhivaniyu'])}
      <br/>
      <br/>
      ### Особенности:
      <br/>
      <br/>
      ${props}
      `;
    },
  },
};


</script>

<style scoped lang="sass">
</style>
