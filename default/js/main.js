const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const create = (tag, props) => {
  return Object.assign(document.createElement(tag), props);
};
