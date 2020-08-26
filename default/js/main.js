const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const create = (tag, props) => {
    return Object.assign(document.createElement(tag), props);
};
const randStr = (length = 20, charTypes = null) => {
    const allChars = {
        l: "abcdefghijklmnopqrstuvwxyz",
        u: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        n: "0123456789",
    };
    const chars = Object.values({
        ...allChars,
        ...charTypes,
    }).map((x) => x || "").join("");
    const res = [];
    while (length--)
        res.push(chars[~~(Math.random() * chars.length)]);
    return res.join("");
};
