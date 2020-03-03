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


module.exports = {
    leroi_625_delinia(item) {
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
    leroi_86_delinia(item) {
        const props = concatProps([
            insertPropWithText(item.seriya, 'Серия'),

            insertPropWithText(item['krepezh-v-komplekte'], 'Крепеж в комплекте'),
            insertPropWithText(item['Цвет'], 'Цвет'),
            insertPropWithText(item.material, 'Материал'),
            insertPropWithText(item.country, 'Страна производства'),
            insertPropWithText(item.waterproof, 'Влагостойкость'),
            insertPropWithText(item.dimentions, 'Габаритные размеры'),
        ]);
        return `
### [ВЫБЕРИТЕ И СПРОЕКТИРУЙТЕ КУХНЮ](https://leroymerlin.ru/proekt-kuhni/)
**${item.title}** ${item.desc} ${insertProp(item.vkomplekte)} ${insertProp(item.wall_mount)}

Delinia ID — это новая коллекция кухонь Леруа Мерлен. Все товары проходят строгую проверку качества на соответствие стандартам. Это гарантирует прочность и долговечность вашего кухонного гарнитура.

### Параметры:

${props}
Советы по уходу: Протирать влажной неабразивной тканью или микрофиброй.

${insertProp(item.type)} Delinia ID — одна из составных деталей кухонного гарнитура. Не является самостоятельным продуктом. Петли и ручки в комплект не входят. Для составления полного проекта кухни рекомендуем проконсультироваться с экспертом в гипермаркете «Леруа Мерлен». В торговом зале вы увидите реальный цвет, сможете оценить качество, сравнить разные модели, спроектировать кухню, а также подобрать дополнительные элементы к ней. На любые вопросы вам ответят опытные консультанты. Также перед визитом в магазин вы можете воспользоваться нашим онлайн-конструктором и составить предварительный проект своей кухни. Создайте кухню мечты вместе с «Леруа Мерлен»!
`.replace(/\v\v+/g, ' ').trim();
    },
};
