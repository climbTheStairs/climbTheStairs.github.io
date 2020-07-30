const D = document;
const $ = D.querySelector.bind(D);
const $$ = D.querySelectorAll.bind(D);
const fileReader = new FileReader();
const files = {};
const readFile = function() {
  const id = this.id;
  const file = this.files.item(0);
  $(`#${id}Name > span`).textContent = file ? file.name : "No file selected";
  if (!file) {
    files[id] = null;
    return;
  }
  fileReader.onload = function(e) {
    files[id] = JSON.parse(this.result);
  };
  fileReader.readAsText(file);
};
$$("input").forEach(x => x.addEventListener("change", readFile));
const ig = {};
$("#compare").onclick = () => {
  // Don't run if either file don't exist
  if (!files.old || !files.new) return alert("Connections file(s) missing!");
  // Get changes
  const oldFollowers = Object.keys(files.old.followers);
  const newFollowers = Object.keys(files.new.followers);
  const oldFollowing = Object.keys(files.old.following);
  const newFollowing = Object.keys(files.new.following);
  ig.unfollowers = oldFollowers.filter(u => !newFollowers.includes(u));
  ig.followers   = newFollowers.filter(u => !oldFollowers.includes(u));
  ig.unfollowing = oldFollowing.filter(u => !newFollowing.includes(u));
  ig.following   = newFollowing.filter(u => !oldFollowing.includes(u));
  // Write data
  Object.keys(ig).forEach(key => {
    const users = ig[key].map(u => `<li><a href="http://instagram.com/${u}">${u}</a></li>`);
    $("#" + key).innerHTML = users.join("");
  });
};
