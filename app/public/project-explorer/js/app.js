let currentPage = window.location.href

if (document.cookie && !currentPage.includes("login.html")) {
  window.onload = async () => {
    let cookieCheck = document.cookie.split("=")
    let logOut = document.getElementById("signUp")
    if (cookieCheck[0] === "uid" && cookieCheck[1]) {
      const cookieResponse = await fetch(`/api/users/${cookieCheck[1]}`)
      const cookieResult = await cookieResponse.json()

      logOut.innerHTML = `<a class="nav-link mr-2" href="login.html">Log Out</a>`

      let user = document.getElementById("login")
      user.innerHTML = `<span id="username" class="navbar-text">Hi ${cookieResult.firstname}
      </span>`
    }
    logOut.onclick = () => {
      document.cookie = `uid=${cookieCheck[1]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      window.location.href = "/project-explorer/index.html"
    }
  }
}

if (currentPage.includes("/project-explorer/index.html")) {
  const showcase = document.getElementById("showcase")
  const displayShowcase = async () => {
    project = await fetch("/api/projects")
    projectResponse = await project.json()
    let returnedProjects = projectResponse.slice(0, 4)

    projectShowcase = returnedProjects
      .map((project) => {
        return `<div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-primary"><a href="viewproject.html?id=${
                      project.id
                    }">${project.name}</a></h5>
                    <h6 class="card-subtitle text-muted mb-2">${project.authors
                      .map((author) => author)
                      .join(", ")}</h6>
                    <p class="card-text">
                      ${project.abstract}
                    </p>
                    <a href="#" class="card-link">${project.tags
                      .map((tag) => tag)
                      .join(" ")}</a>
                  </div>
                </div>
              </div>`
      })
      .join("")
    showcase.innerHTML = projectShowcase
  }
  displayShowcase()
}

if (currentPage.includes("register.html")) {
  window.onload = async () => {
    try {
      const program = await fetch("/api/programs")
      const programResponse = await program.json()

      let programOptions = "<option>Choose...</option>"
      programResponse.forEach((course) => {
        programOptions += `<option>${course}</option>`
      })
      document.getElementById("program").innerHTML = programOptions

      const graduation = await fetch("/api/graduationYears")
      const graduationResponse = await graduation.json()

      let graduationYears = "<option>Choose...</option>"
      graduationResponse.forEach((year) => {
        graduationYears += `
            <option>${year}</option>`
      })
      document.getElementById("graduationYear").innerHTML = graduationYears
    } catch (e) {
      console.log(e)
    }
  }

  const signupForm = document.getElementById("signupForm")
  signupForm.onsubmit = async (e) => {
    e.preventDefault()
    let firstname = document.getElementById("firstName").value
    let lastname = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let program = document.getElementById("program").value
    let matricNumber = document.getElementById("matricNumber").value
    let graduationYear = document.getElementById("graduationYear").value

    const signupData = {
      firstname,
      lastname,
      email,
      password,
      program,
      matricNumber,
      graduationYear,
    }

    const signupFormSubmit = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
    const signupFormResponse = await signupFormSubmit.json()

    if (signupFormResponse.status === "ok") {
      document.cookie = `uid=${signupFormResponse.data.id}; path=/;`
      window.location.replace("/project-explorer/index.html")
    } else {
      let errorDiv = document.createElement("div")
      errorDiv.classList.add("alert", "alert-danger")
      let errors = signupFormResponse.errors.map((error) => {
        return `<p class="mb-0">${error}</p>`
      })
      errorDiv.innerHTML = errors.join("")
      signupForm.prepend(errorDiv)
    }
  }
}

if (currentPage.includes("login.html")) {
  const loginForm = document.getElementById("loginForm")
  loginForm.onsubmit = async (e) => {
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    const loginData = {
      email,
      password,
    }

    const loginFormSubmit = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
    const loginFormResponse = await loginFormSubmit.json()

    if (loginFormResponse.status === "ok") {
      document.cookie = `uid=${loginFormResponse.data.id}; path=/;`
      window.location.replace("/project-explorer/index.html")
    } else {
      let errorDiv = document.createElement("div")
      errorDiv.classList.add("alert", "alert-danger")
      errorDiv.textContent = "Invalid email/password"

      loginForm.prepend(errorDiv)
    }
  }
}

if (currentPage.includes("createproject.html")) {
  let cookieCheck = document.cookie
    .split("=")
    .find((item) => item.startsWith("uid"))
  if (!cookieCheck) {
    window.location.replace("/project-explorer/login.html")
    console.log("No Cookies today")
  } else {
    const createProjectForm = document.getElementById("createProjectForm")
    createProjectForm.onsubmit = async (e) => {
      e.preventDefault()
      let name = document.getElementById("name").value
      let abstract = document.getElementById("abstract").value
      let authors = document.getElementById("authors").value.split(", ")
      let tags = document.getElementById("tags").value.split("  ")

      const createProjectData = {
        name,
        abstract,
        authors,
        tags,
      }

      const createProjectFormSubmit = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createProjectData),
      })
      const createProjectFormResponse = await createProjectFormSubmit.json()

      if (createProjectFormResponse.status === "ok") {
        window.location.replace("/project-explorer/index.html")
      } else {
        let errorDiv = document.createElement("div")
        errorDiv.classList.add("alert", "alert-danger")
        let errors = createProjectFormResponse.errors.map((error) => {
          return `<p class="mb-0">${error}</p>`
        })
        errorDiv.innerHTML = errors.join("")
        createProjectForm.prepend(errorDiv)
      }
    }
  }
}

if (currentPage.includes("viewproject.html")) {
  let queryString = location.search
  const viewProject = async () => {
    const projectName = document.getElementById("project_name")
    const projectAbstract = document.getElementById("project_abstract")
    const projectAuthor = document.getElementById("project_author")
    const projectAuthors = document.getElementById("project_authors")
    const projectTags = document.getElementById("project_tags")

    let id
    let queryStringArray = queryString.split("=")
    if (queryStringArray[0] === "?id") {
      id = queryStringArray[1]
    }

    const idProject = await fetch(`/api/projects/${id}`)
    const idProjectResponse = await idProject.json()

    if (idProjectResponse) {
      const idUser = await fetch(`/api/users/${idProjectResponse.createdBy}`)
      const idUserResponse = await idUser.json()

      projectName.innerText = idProjectResponse.name
      projectAbstract.innerText = idProjectResponse.abstract
      projectAuthor.innerText = `${idUserResponse.firstname} ${idUserResponse.lastname}`
      projectAuthors.innerText = idProjectResponse.authors.join(" ")
      projectTags.innerText = idProjectResponse.tags.join(" ")
    }
  }
  viewProject()
}
