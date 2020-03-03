import moment from 'moment';
import { fromS } from 'hh-mm-ss';

const numberWithCommas = (x, text) => {
    const value = x.value ? x.value : x;
    const formatted = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '&nbsp;');
    return text ? `${text} ${formatted}` : formatted;
};

const formatSecondsAsHHMMSS = (e, text) => {
    if (!text) {
    // eslint-disable-next-line no-param-reassign
        text = '';
    } else {
    // eslint-disable-next-line no-param-reassign
        text = `${text}: `;
    }
    let format = 'hh:mm:ss';
    if (e > 3600) {
        format = 'hh:mm:ss';
    } else {
        format = 'mm:ss';
    }
    let returnString = '';
    if (e > 0) {
        returnString = `${text}${fromS(Math.round(e), format)}`;
    }
    return returnString;
};

function customizeTooltip(pointInfo) {
    const drawSingleElement = (name, val, percent) => {
        if (val > 0) {
            return `
          <div class='series-name'>
            <span ${this.tooltipColors[name] ? `style="color:${this.tooltipColors[name]}"` : ''}>&#9632;</span>&nbsp;
            <span ${pointInfo.seriesName === name ? `style="color:${this.tooltipColors[name]};font-weight:700!important;text-decoration:underline;"` : ''}>${name}:</span>
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
}

function custimizeTitleThousands({ valueText }) {
    return `${numberWithCommas(Math.round(valueText / 1000))} к`;
}

function setTooltipColors(seriesArray) {
    const colors = {};
    // eslint-disable-next-line array-callback-return
    seriesArray.map((item) => {
        colors[item.name] = item.color;
    });
    console.log(colors);
    return colors;
}

// eslint-disable-next-line import/prefer-default-export
export {
    customizeTooltip,
    numberWithCommas,
    custimizeTitleThousands,
    setTooltipColors,
    formatSecondsAsHHMMSS,
};
