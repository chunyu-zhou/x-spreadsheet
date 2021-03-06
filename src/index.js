/* global window */
import helper from './helper';
import { h } from './component/element';
import DataProxy from './data_proxy';
import Sheet from './component/sheet';
import { cssPrefix } from './config';
// import Bottombar from './component/bottombar';
import './index.less';

const defaultOptions = {
  view: {
    height: () => 800,
  },
  formats: [],
  fonts: [],
  formula: [],
  row: {
    len: 100,
    height: 25,
  },
  col: {
    len: 26,
    width: 100,
    indexWidth: 60,
    minWidth: 60,
  },
  style: {
    bgcolor: '#ffffff',
    align: 'left',
    valign: 'middle',
    textwrap: false,
    textDecoration: 'normal',
    strikethrough: false,
    color: '#0a0a0a',
    font: {
      name: 'Helvetica',
      size: 10,
      bold: false,
      italic: false,
    },
  },
};

/*
Row: {
  height: number
}
Col: {
  width: number
}
Cell: {
  text: string
  merge: [rowLen, colLen]
  format: string,
  si: style-index
}
*/

/*
  el: element in document
  options: like #defaultOptions
  data: {
    freeze: [0, 0],
    rowm: {}, // Map<int, Row>
    colm: {}, // Map<int, Col>
    cellmm: {}, // Map<int, Map<int, Cell>>
  }
*/

class Spreadsheet {
  constructor(tel, options = {}) {
    this.options = helper.merge(defaultOptions, options);
    this.data = new DataProxy(this.options);
    const rootEl = h('div', `${cssPrefix}`)
      .on('contextmenu', evt => evt.preventDefault());
    this.sheet = new Sheet(rootEl, this.data);
    // create canvas element
    tel.appendChild(rootEl.el);
  }

  loadData(data) {
    this.sheet.loadData(data);
    return this;
  }

  change(cb) {
    this.data.change(cb);
    return this;
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

if (window) {
  window.x = window.x || {};
  window.x.spreadsheet = spreadsheet;
}

export default Spreadsheet;
export {
  spreadsheet,
};
