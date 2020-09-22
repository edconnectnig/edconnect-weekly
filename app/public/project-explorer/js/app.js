// IMPLEMENTING THE SET AND GET COOKIE FUNCTION

function createCookie(name, value, exdays) {
	if (exdays) {
		var date = new Date();
		date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000) );
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


// UPDATING THE NAVBAR IN ALL PAGES TO SHOW THAT THE USER HAS LOGGED IN

// Check for cookie on page load

window.addEventListener("load", function() {
    
    if (readCookie("uid")) {
        //alert(cookieValue);
        fetch("/api/users/" + readCookie("uid"), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            cache: 'default'
        })
            .then(function(res) {
                return res.json()
            })
            .then( (output) => {
                var navSignup = document.getElementById("hidesignup");

                navSignup.style.display = 'none';

                var navLogin = document.getElementById("hidelogin");

                navLogin.style.display = 'none';

                var navLogout = document.getElementById("logout");

                navLogout.style.display = 'inline';

                var navUsername = document.getElementById("username");

                navUsername.style.display = 'inline';

                var usernameText = document.getElementById("usernametext");

                usernameText.style.color = 'white';

                usernameText.textContent = "Hi, " + output.firstname;

                return output;
            })
            .then( (checkOutput) => {
                var logoutFunc = document.getElementById("logout");

                var onLogoutClick = function() {
                    document.cookie = `uid=; expires=Thu, 01 Jan 1970T00:00:00Z`;

                    window.location.href = "index.html";
                }

                logoutFunc.addEventListener("click", onLogoutClick);

                return checkOutput;
            })
            .catch( (error) => {
                console.log('ERROR:', error.message);
            })
    }
})


var registerHtmlFile = document.getElementById("registerhtml");

if ( registerHtmlFile ) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')


    // Sending a GET request using the fetch API to populate my program select list.

    const programs = new Request('/api/programs', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    });


    //const ul = document.getElementById('program');  Get the list where we will place our programs

    //const url = '/api/programs';

    fetch(programs)
    .then( function(res) {
        if (res.status == 200) {
            return res.json();
        }
        else {
            throw new Error('cannot GET/api/programs');
        }
    })
    .then( (data) => {
        return data;
    })
    .then( (output) => {
        //console.log(output);
        /*
        var prog1 = document.createElement("option");
        var ul = document.getElementById('program').appendChild(prog1);
        console.log(ul);
        prog1.textContent = output[0];
        console.log(prog1.textContent);
        console.log(prog1);
        */

        let allProg = [];
        for (var i = 0; i < output.length; i++) {
            var prog = document.createElement("option");
            var ul = document.getElementById('program').appendChild(prog);
            //console.log(ul);
            prog.textContent = output[i];
            console.log(prog.textContent);
            console.log(prog);
            allProg.push(ul);
        }
        console.log(allProg);

        return allProg;
    })
    .catch( (error) => {
        console.log('ERROR:', error.message);
    })


    // Sending a GET request using the fetch API to populate my graduation select list.

    const graduationYears = new Request('/api/graduationYears', {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    });

    fetch(graduationYears)
    .then( function(res) {
        if (res.status == 200) {
            return res.json();
        }
        else {
            throw new Error('cannot GET/api/graduationYears');
        }
    })
    .then( (data) => {
        console.log(data);
        return data;
    })
    .then( (output) => {
        console.log(output);
        
        let allGradYears = [];

        for (var i = 0; i < output.length; i++) {
            let gradYears = document.createElement('option');
            let ul = document.getElementById('graduationYear').appendChild(gradYears);
            
            gradYears.textContent = output[i];
            console.log(ul);

            allGradYears.push(ul);
        }
        console.log(allGradYears);
        
        return allGradYears;
    })
    .catch( (error) => {
        console.log('ERROR:', error.message);
    })


    // Sending a POST request containing the user's inputs using the fetch API to /api/request.

    // First find and store the element/form we want to listen to.

    var signupForm = document.getElementById('signupForm');

    // Defining the function that will be called.

    var onFormSubmit = function(event) {

    event.preventDefault(); //Without preventing the default, the browser would attempt to navigate to the URL of the form action attribute when the form is submitted.

    // Now, get the data to work with

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var matricNumber = document.getElementById("matricNumber").value;
    var program = document.getElementById("program").value;
    var graduationYear = document.getElementById("graduationYear").value;


    // fetch POST request

    fetch("/api/register", {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            matricNumber: matricNumber,
            program: program,
            graduationYear: graduationYear
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(async function (res) {
            if (res.status == 200) {
                var response = await res.json()
                console.log(response);

                createCookie("uid", response.data.id, "30");

                window.location.href = "index.html";

                return res;

                /* Okay, so basically my challenge has been that I've been calling the response.json() which will return the body of the response in json format together with the unique id attributed to data (response.data.id) after calling for the id in it. Now, this is a script, it runs line by line. So, calling the id from the response.json will be like "I can't find no id in any json." So, all I had to do was call for response.json before calling for id. So, I stored it in a variable, then used the variable to call it. Now, what the hell is 'await'? Now, res.json() returns a promise too which will be pending so I can't take anything from it. So, it needs to fulfill its promise before I can do anything which is why I said I will 'await' it. And you can't use await without 'async' */
            }
            res.json().then(function(data) {
                console.log(data);
                
                var error = document.getElementById("alert");

                error.style.display = "block";

                error.innerHTML = data.errors;
            })
        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
        })
    }

    // Then add the event listener for the form and function.

    signupForm.addEventListener("submit", onFormSubmit);
}


// Implementing the user login such that when the login button is pressed, the user will be able to login.

var loginHtmlFile = document.getElementById("loginhtml");

if (loginHtmlFile) {
    // Store the element we'll be working on in a variable going forward.

    var loginForm = document.getElementById("loginForm");

    // The function when submitted

    var onLoginSubmit = function(e) {
        e.preventDefault();

        // Refer to the value of the fields.

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // POST request using the fetch api.

        fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then( async function(res) {
                if (res.status == 200) {
                    var response = await res.json();

                    createCookie("uid", response.data.id, "30");

                    window.location.href = "index.html";

                    return res;
                }
                else {
                    var error = document.getElementById("alert");

                    error.style.display = "block";

                    error.innerHTML = "<p>Invalid email/password</p>"; 
                }
            })
            .then( (data) => {
                console.log(data);
            })
            .catch( (error) => {
                console.log('ERROR:', error.message);
            })
    }

    // Add the event listener to the form/element.

    loginForm.addEventListener("submit", onLoginSubmit);
}


var createHtmlFile = document.getElementById("createhtml");

if (createHtmlFile) {

    window.addEventListener("load", function() {

        readCookie("uid");
        
        if (!readCookie("uid")) {
            alert("Log in");
            window.location.href = "login.html"
        }
    })
    
    // Sending a POST request containing the create project inputs using the fetch API to /api/projects.

    // First find and store the element/form we want to listen to.

    var createProjectForm = document.getElementById('createProjectForm');

    // Defining the function that will be called.

    var onFormContinue = function(event) {

        event.preventDefault(); //Without preventing the default, the browser would attempt to navigate to the URL of the form action attribute when the form is submitted.

        // Now, get the data to work with

        var name = document.getElementById("name").value;
        var abstract = document.getElementById("abstract").value;
        var authors = document.getElementById("authors").value.split(",");
        var tags = document.getElementById("tags").value.split(",");
        

        // fetch POST request

        fetch("/api/projects", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                abstract: abstract,
                authors: authors,
                tags: tags,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(function(res) {
                if (res.status == 200) {
                    window.location.href = "index.html";
                }
                else {
                    var projAlert = document.getElementById("projAlert");

                    projAlert.style.display = 'block';

                    projAlert.innerHTML = res.statusText;
                }
                return res;
            })
            .catch((err) => {
                console.log('ERROR:', err.message);
            })
    }

    // Then add the event listener for the form and function.

    createProjectForm.addEventListener("submit", onFormContinue);
}


// Update the project list on the home page.

var indexHtmlFile = document.getElementById("indexhtml");

if (indexHtmlFile) {

    // Send a GET request to /api/projects

    fetch("/api/projects", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        cache: 'default'
    })
        .then(function(res) {
            return res.json();
        })
        .then( (output) => {

            for (var i = 0; i < 4; i++) {

                // Store the element to work with in a variable
                var showProjects = document.getElementById("showcaseprojects");

                var cardColumn = document.createElement("div");
                cardColumn.className = "col";
                

                var cardContainer = document.createElement("div");
                cardContainer.className = "card";
                cardContainer.style.padding = "20px";
                
                
                var cardBlock = document.createElement("div");
                cardBlock.className = "card-block";
                cardContainer.append(cardBlock);

                var cardTitle = document.createElement("h6");
                cardTitle.className = "card-title";
                cardTitle.style.fontSize = "20px";
                cardTitle.style.marginBottom = "0";
                cardTitle.style.color = "dodgerBlue";
                cardBlock.append(cardTitle);

                var projectLink = document.createElement("a");
                projectLink.setAttribute("href", "viewProject.html?id=" + output[i].id);
                projectLink.style.textDecoration = "none";
                projectLink.innerHTML = output[i].name;
                cardTitle.append(projectLink);

                var cardAuthor = document.createElement("small");
                cardAuthor.className = "text-muted";
                cardAuthor.textContent = output[i].authors;
                cardBlock.append(cardAuthor);

                var cardText = document.createElement("p");
                cardText.className = "card-text";
                cardText.classList.add("mb-0");
                cardText.textContent = output[i].abstract;
                cardBlock.append(cardText);

                var cardTag = document.createElement("span");
                cardTag.style.color = "dodgerblue";
                cardTag.textContent = output[i].tags;
                cardBlock.append(cardTag);

                cardColumn.append(cardContainer);
                showProjects.append(cardColumn);

            }
        })
        .catch( (error) => {
            console.log('ERROR:', error.message);
        })
}


// Updating the viewProject page.

var viewHtmlFile = document.getElementById("viewhtml");

if (viewHtmlFile) {
    
    // Send a GET request to /api/projects/{id}

    // First I need to get the querystring from the url and then use the URLSearchParams API to get the value so that I can pass it into the GET API.
    
    var paramsString = location.search;

    var searchParams = new URLSearchParams(paramsString);

    var projectId = searchParams.get("id");

    fetch("/api/projects/" + projectId, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
        cache: 'default'
    })
        .then(function(res) {
            return res.json();
        })
        .then( (output) => {

            var projName = document.getElementById("project_name");
            var projAuthor = document.getElementById("project_authors");
            var projAbstract = document.getElementById("project_abstract");
            var projTag = document.getElementById("project_tags");

            projName.textContent = output.name;

            for (var i = 0; i < output.authors.length; i++) {
                var author = document.createElement("p");
                author.textContent = output.authors[i];
                projAuthor.append(author);
            }

            projAbstract.textContent = output.abstract;
            projTag.textContent = output.tags;

            // I need to update the createdBy. So, I'm sending a GET request to /api/users/{id}. Since the id of the user is equal to the createdBy value of the project, I will use output.createdBy to represent it.

            fetch("/api/users/" + output.createdBy, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            cache: 'default'
            })
                .then(function(res) {
                    return res.json();
                })
                .then( (output) => {
                    
                    var proj_author = document.getElementById("project_author");

                    proj_author.textContent = output.firstname + " " + output.lastname;

                    return output;
                })
                .catch( (err) => {
                console.log('ERROR:', err.message);
                })

        })
        .catch( (err) => {
            console.log('ERROR:', err.message);
        })
}