let users = [];
function showLogin() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => displayUsers(data))
    .catch((err) => console.log(err));
}

function displayUsers(data) {
  let str = "<select>";
  data.map((value) => {
    str += `<option value=${value.id}>${value.name}</option>`;
  });
  str += "</select>"
  root.innerHTML = str
}