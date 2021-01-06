let url_programs = "/api/programs";
fetch(url_programs).then( async (response) => {
   var data = await response.json();
    var programs = document.getElementById("programs");
    data.forEach((prog) => {
        var opt = document.createElement("option");
        opt.value = prog;
        opt.text = prog;
        if(programs){
        programs.appendChild(opt);}
    });
});

let url_years = "/api/graduationYears";
fetch(url_years).then(async (response) => {
    var data = await response.json();
    var years = document.getElementById("graduation_year");
    data.forEach((year) => {
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        if(years){
        years.appendChild(option);}
    });
});

var form = document.getElementById("signupForm");
if(form){
form.addEventListener("submit", function(e){
    e.preventDefault();
});}

var button = document.getElementById("sign_up_button");
var onClick = function(event){
    const data = {
        "firstname": document.getElementById("fname").value,
        "lastname": document.getElementById("lname").value,
        "email":document.getElementById("email").value,
        "password": document.getElementById("password").value,
        "matricNumber": document.getElementById("mnumber").value,
        "program": document.getElementById("programs").value,
        "graduationYear": document.getElementById("graduation_year").value,
    };

    var register = "/api/register";
    fetch(register,{
        method: 'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        }
    })
    .then(async (response) =>{
        var data = await response.json();
        if(data.status === "ok"){
            document.cookie = `uid=${data.data.id};path=/`;
            window.location = "index.html";
        }else if(data.status !== "ok"){
            var error_message = new Array();
            error_message = data.errors;
            var error = document.createElement("div");
            error.className = "alert alert-danger";
            error.innerHTML = error_message.join("<br>");
            var parent = document.getElementById("signupForm");
            parent.prepend(error);
        }
    })
}
if(button){
button.addEventListener("click", onClick);}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

window.onload = (event) => {
    var user_cookie = getCookie("uid");

    if(user_cookie != ""){
        fetch(`/api/users/${user_cookie}`,{
            method:'GET',
        }).then(async (response) => {
            var data = await response.json();
            
            const signup = document.querySelector('a[href = "register.html"]');
            const login = document.querySelector('a[href = "login.html"]');
            signup.style.display = "none";
            login.style.display = "none";
            var ul = document.querySelector('ul[class~="ml-auto"]');

            var list1 = document.createElement("li");
            list1.setAttribute("class","nav-item text-white");
            list1.setAttribute("id","logout");
            list1.innerHTML = '<a href="#" class = "nav-link active">Logout</a>';
            list1.addEventListener("click", Logout);
            ul.append(list1);

            var list2 = document.createElement("li");
            list2.setAttribute("class","nav-item text-white");
            list2.setAttribute("id","username");
            list2.innerHTML = `<p style="padding-top:8px">Hi, ${data.firstname}</p>`;
            
            ul.append(list2);
        })
    }
   
};
function Logout() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie = `uid=;path=/;expires=${date.toUTCString()}`;

    window.location = "index.html";
}
var login_form = document.getElementById("loginForm");
if(login_form){
login_form.addEventListener("submit",function(e){
    e.preventDefault();
});}

var login_button = document.getElementById("login_button");
function Login(){
    const data = {
        "email":document.getElementById("email").value,
        "password":document.getElementById("password").value,
    };
    var url_login = "/api/login";
    console.log(data);
    fetch(url_login,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(async(response) => {
        var data = await response.json();
        console.log(data);
        if(data.status === 'ok'){
            document.cookie = `uid=${data.data.id};path=/`;
            window.location.replace("index.html");
        }else if(data.status !== 'ok'){
            var error = document.createElement("div");
            error.innerHTML = '<div style="margin:10px 370px 10px 0px" class="alert alert-danger">Invalid email/password</div>';
            document.getElementById("email_append").prepend(error);
        }
    })
}
if(login_button){
login_button.addEventListener("click",Login);}

var createProjectform = document.getElementById("createProjectForm");
if(createProjectform){
    createProjectform.addEventListener("submit",function(e){
        e.preventDefault();
    })
}

var continue_button = document.getElementById("continue");
function createProject(){
    const data = {
        "name" : document.getElementById("projectName").value,
        "abstract" : document.getElementById("projectAbstract").value,
        "authors" : document.getElementById("projectAuthors").value.split(","),
        "tags" : document.getElementById("projectTags").value.split(","),
    };
    console.log(data);
    fetch("/api/projects",{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
        },
    }).then(async(response)=>{
        var data =  await response.json();

        if(data.status === 'ok'){
            window.location = "index.html";
        }else if(data.status !== 'ok'){
            console.log(data.errors);
            var error_message = data.errors.join("<br>");
            var error = document.createElement("div");
            error.innerHTML = `<div style="margin:10px 450px 10px 0px" class = "alert alert-danger">${error_message}</div`;
            createProjectform.prepend(error);
        }
    })
}

if(window.location.href.match("createProject.html")){
    var cookie = getCookie("uid");
    if(cookie === ""){
        window.location = "login.html";
    }else if(cookie !== ""){
        if(continue_button){
        continue_button.addEventListener("click",createProject);}
    }
}
if(window.location.href.match("index.html")){
fetch("/api/projects").then(async(response)=>{
    var data = await response.json();
    var div = document.querySelector("div[class ~= showcase]")
    
    for(var i=0;i < 4;i++){
        var project = document.createElement("div");
        project.setAttribute("class","col columns");
        project.innerHTML = `<a href = "viewProject.html?id${data[i].id}" class = "text-primary">${data[i].name}</a> <br> ${data[i].authors} <br><br> ${data[i].abstract} <br><br> <h6 class="text-primary">${data[i].tags}</h6>`;
        div.append(project);
    }
});}
if(window.location.href.match("viewProject.html")){
    var id = location.search.substring(3);
    console.log(id);

    fetch(`/api/projects/${id}`).then(async (response)=>{
        var data = await response.json();
        console.log(data);

        document.getElementById("project_name").textContent = `${data.name}`;
        document.getElementById("project_abstract").textContent = `${data.abstract}`;
        var ul = document.querySelector("ul[class ~= list-group-flush]");
        var div = document.getElementById("project_authors");
        var authors = data.authors;
        console.log(data.createdBy);
        authors.forEach((author) => {
            var list = document.createElement("li");
            list.setAttribute("class","list-group-item");
            list.innerHTML = `${author}`;
            ul.append(list);
        })
        div.append(ul);

        var tags = data.tags;
        var div_tag = document.createElement("div");
        div_tag.setAttribute("class","card-footer text-primary");
        div_tag.innerHTML = data.tags;
        div.append(div_tag);

        fetch(`/api/users/${data.createdBy}`).then(async(response)=>{
            var data = await response.json();
            
            var createdBy = document.getElementById("project_author");
            createdBy.innerHTML = `Created By: <br> ${data.firstname + " " + data.lastname}`;
        })
    })
    
}