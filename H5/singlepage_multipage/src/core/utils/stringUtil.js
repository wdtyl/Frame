import numeral from 'numeral';
import lodash from 'lodash';

export function getModuleName(text) {
  if (!text.startsWith('./')) {
    return false;
  }
  const start = text.indexOf('/');
  const end = text.lastIndexOf('.');
  return text.slice(start + 1, end);
}

//根据search返回query对象
export function parseQuery(query) {
  console.log('待查询的query ==>', query);
  const obj = {};
  let queryString = '';
  const urlArr = query.split('?');
  if (urlArr.length !== 2) {
    return obj;
  } else {
    queryString = urlArr[1];
  }
  const reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
  while (reg.exec(queryString)) {
    obj[RegExp.$1] = RegExp.$2;
  }
  return obj;
}

// 字符串首字母大写
export function firstUpperCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

export function formatAmount(amount) {
  if (!lodash.isNumber(amount)) {
    return '¥0.00';
  }
  return '¥' + numeral(amount).format('0,00.00');
}
