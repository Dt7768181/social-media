let users = [];
function showLogin() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => displayUsers(data))
    .catch((err) => console.log(err));
}

function displayUsers(data) {
  let str = `<div>
  <div class="d-flex justify-content-center p-5 bg-dark">
  <div class='p-5 text-white'>
  <h2>My Social media</h2>
  <p>This is the Caption</p>
  </div>
  <div class="p-5">
  <select class="form-control" id='seluser'><option value='0'>Select user</option>`;
  data.map((value) => {
    str += `<option value=${value.id}>${value.name}</option>`;

  });
  str += `</select><p><button onclick="showHome()" class="btn btn-outline-primary mt-3 w-100">Log In</button></p>`
  str+=`</div>
  </div>`
  root.innerHTML = str
}
function showHome(){
  let userid=seluser.value;
  let str=`
  <div class="container-fluid">
    <div class="row bg-info">
      <div class="d-flex justify-content-between">
        <h2>My Social Media</h2>
        <div id='user'></div>
      </div>
    </div>
    <div class="row">
      <div class="d-flex">
        <div class="p-2">
          <p class="text-info  p-2" onclick='Posts(${userid})'>Home</p>
          <p class="text-info  p-2" onclick='Album(${userid})'>Album</p>
          <p class="text-info  p-2" onclick='utodo(${userid})'>My TODO</p>
          <p class="text-info  p-2" onclick='Users(${userid})'>Profile</p>
          <p class="text-danger  p-2" onclick='showLogin()'>Logout</p>
        </div>
        <div id='conten' class='p-2'></div>
      </div>
    </div>
    <div class="row">
      <div class="bg-dark text-light">
      <p>©2025 All Rights Reserved</p>
      </div>
    </div>
  </div>
  `;
  root.innerHTML=str;
  Posts(userid);
}
function Posts(id){
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  .then((res)=>res.json())
  .then((data)=>displayPosts(data))
}
function displayPosts(data){
  let str="<h2>My posts</h2>";
  data.map((value)=>
  str+=`<div class='m-2'>
          <div class='p-2'><b><h4>Title:${value.title}</h4></b></div>
          <div>${value.body}</div>
        </div>
        `
)
conten.innerHTML=str;
}
function Album(id) {
  fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
    .then((res) => res.json())
    .then((data) => displayAlbum(data))
    .catch((err) => console.error("Error fetching albums:", err));
}

function displayAlbum(data) {
  let str = "<h2>My album</h2>";
  data.forEach((value) => {
    str += `<div class='p-2'><b><h4>Title: ${value.title}</h4></b></div>`;
  });
  conten.innerHTML = str;
}
function Users(id) {
  let str = "<h2>My profile<h2>";
  fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((value) => {
          str += `<h4>${value.username}</h4><p>Name:${value.name}</p>
                  <p>Email: ${value.email}</p>
                  <p>Address: ${value.address.suite} , ${value.address.street}, ${value.address.city}, ${value.address.zipcode}</p>`;
        });
      conten.innerHTML = str;
    })
    .catch((err) => console.error("Error fetching user:", err));
}
function utodo(id) {
  let str = "<h2>TODOS</h2>";
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((value) => {
          str += `
                  <h4>Title:${value.title}</h4>
                  <input type="checkbox" ${value.completed && "checked"}>`;
        });
      conten.innerHTML = str; 
    })
    .catch((err) => console.error("Error fetching user:", err));
}