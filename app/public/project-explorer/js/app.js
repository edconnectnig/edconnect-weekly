// wrap calls to API.
const Api = {
  async _api(url, data) {
    return await fetch(`/api/${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...data,
    }).then((resp) => resp.json());
  },

  async getUser(id) {
    return this._api(`users/${id}`);
  },

  async getPrograms() {
    return this._api("programs");
  },

  async getGradYear() {
    return this._api("graduationYears");
  },

  async register(data) {
    return this._api("register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async login(data) {
    return this._api("login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async createProject(data) {
    return this._api("projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async getProjects() {
    return this._api("projects");
  },
  async getProject(id) {
    return this._api(`projects/${id}`);
  },
};

// helper methods for cookies.
const Helper = {
  setCookie(name, value) {
    const exp = new Date();
    exp.setDate(exp.getDate() + 7);
    document.cookie = `${name}=${value}; expires=${exp.toUTCString()}; path=/`;
  },
  delCookie(name) {
    const exp = new Date();
    exp.setDate(exp.getDate() - 1);
    document.cookie = `${name}=; expires=${exp.toUTCString()}; path=/`;
  },
  getCookie(name) {
    const cookie = document.cookie || "";
    for (const ck of cookie.split(";")) {
      const vals = ck.split("=");
      if (vals[0].trim() === name) {
        return vals[1];
      }
    }
  },
};

// Page logic.
const Login = {
  async submit(evt) {
    evt.preventDefault();
    const data = {};
    document.querySelectorAll("#loginForm input").forEach((item) => {
      data[item.name] = item.value;
    });

    const resp = await Api.login(data);

    if (resp.status === "ok") {
      Helper.setCookie("uid", resp.data.id);
      window.location = "index.html";
    } else {
      const alert = document.getElementsByClassName("alert")[0];
      alert.innerHTML = "Invalid username/password";
      alert.classList.remove("invisible");
    }
    return false;
  },

  init() {
    document
      .getElementById("loginForm")
      .addEventListener("submit", this.submit);
  },
};

const CreateProject = {
  async submit(evt) {
    evt.preventDefault();
    const data = {};
    document
      .querySelectorAll("#createProjectForm input, #createProjectForm textarea")
      .forEach((item) => {
        if (["authors", "tags"].includes(item.name)) {
          data[item.name] = item.value.split(",");
        } else {
          data[item.name] = item.value;
        }
      });
    const resp = await Api.createProject(data);
    if (resp.status === "ok") {
      window.location = "index.html";
    } else {
      const alert = document.getElementsByClassName("alert")[0];
      alert.innerHTML = resp.errors.join("<br/>");
      alert.classList.remove("invisible");
    }
    return false;
  },

  init() {
    console.log('init')
    document.getElementById('createProjectForm').addEventListener('submit', this.submit)
  }
};

const Register = {
  async updateProgramList() {
    const programs = await Api.getPrograms();
    const programSelect = document.querySelector("select[name=program]");
    programs.forEach((prog) => {
      const opt = document.createElement("option");
      opt.value = prog;
      opt.text = prog;
      programSelect.appendChild(opt);
    });
  },
  async updateGradYear() {
    const years = await Api.getGradYear();
    const yearSelect = document.querySelector("select[name=graduationYear]");
    years.forEach((year) => {
      const opt = document.createElement("option");
      opt.value = year;
      opt.text = year;
      yearSelect.appendChild(opt);
    });
  },

  init() {
    document
      .getElementById("signupForm")
      .addEventListener("submit", this.submit);
    this.updateGradYear();
    this.updateProgramList();
  },

  async submit(evt) {
    evt.preventDefault();
    const data = {};
    document
      .querySelectorAll("#signupForm input, #signupForm select")
      .forEach((item) => {
        data[item.name] = item.value;
      });

    const resp = await Api.register(data);
    if (resp.status === "ok") {
      Helper.setCookie("uid", resp.data.id);
      window.location = "index.html";
    } else {
      const alert = document.getElementsByClassName(" alert")[0];
      alert.innerHTML = resp.errors.join("<br/>");
      alert.classList.remove("invisible");
    }
    return false;
  },
};

const ViewProject = {
  async init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const project = await Api.getProject(id);
    if (project) {
      const author = await Api.getUser(project.createdBy);
      document.getElementById(
        "project_author"
      ).innerText = `${author.firstname} ${author.lastname}`;
      document.getElementById("project_name").innerText = project.name;
      document.getElementById("project_abstract").innerText = project.abstract;
      project.authors.forEach((name) => {
        const list = document.getElementById("project_authors");
        const div = document.createElement("div");
        div.classList.add("list-group-item");
        const span = document.createElement("span");
        span.innerText = name;
        div.appendChild(span);
        list.appendChild(div);
      });
      project.tags.forEach((tag) => {
        const tags = document.getElementById("project_tags");
        const span = document.createElement("span");
        span.classList.add("mr-2");
        const link = document.createElement("a");
        link.href = `/search.html?search=${tag}&amp;type=Tags`;
        link.innerText = tag;
        span.appendChild(link);
        tags.appendChild(span);
      });
    }
  },
};

const Home = {
  async init() {
    const projects = await Api.getProjects();
    const showcase = document.getElementsByClassName("showcase")[0];
    projects.slice(0, 4).forEach((proj) => {
      const col = document.createElement("div");
      col.classList.add("col-3");

      const parent = document.createElement("div");
      parent.classList.add("border", "p-3");

      const title = document.createElement("a");
      title.href = `viewProject.html?id=${proj.id}`;
      title.innerText = proj.name;
      parent.appendChild(title);

      const authors = document.createElement("p");
      authors.innerText = proj.authors.join(", ");
      parent.appendChild(authors);

      const abstract = document.createElement("p");
      abstract.innerText = proj.abstract;
      parent.appendChild(abstract);

      const tags = document.createElement("p");
      proj.tags.forEach((text) => {
        const tag = document.createElement("a");
        tag.href = "#";
        tag.innerText = `${text}`;
        tags.appendChild(tag);
      });
      parent.appendChild(tags);

      col.appendChild(parent);
      showcase.appendChild(col);
    });
  },
};


// App/shared logic.
const App = {
  updateNav(user) {
    document.getElementsByClassName("logged-in")[0].setAttribute("style", "");
    document
      .getElementsByClassName("logged-out")[0]
      .setAttribute("style", "display:none");
    document.getElementById("username").textContent = `Hi, ${user.firstname}`;

    document.getElementById("logout").addEventListener("click", () => {
      Helper.delCookie("uid");
      window.location = "index.html";
    });
  },

  async init() {
    const path = window.location.href;
    this.uid = Helper.getCookie("uid");
    if (this.uid) {
      const user = await Api.getUser(this.uid);
      if (user) {
      this.updateNav(user);
      }

     
    }
    if (path.includes("register.html")) {
      Register.init();
    }
    if (path.includes("login.html")) {
      Login.init();
    }

    if (path.includes("createProject.html")) {
      if (this.uid) {
        CreateProject.init();
      } else {
        window.location = "index.html";
      }
    }
    if (path.includes("index.html")) {
      Home.init();
    }
    if (path.includes("viewProject.html")) {
      ViewProject.init();
    }
  },
};

// call App.init() when the page has fully rendered.
window.addEventListener("DOMContentLoaded", App.init.bind(App));
