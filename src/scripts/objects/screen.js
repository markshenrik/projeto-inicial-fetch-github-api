const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
             <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                   <div class="data">
                   <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                   <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
                   <p>&#x1F465; Seguidores: ${user.followers}</p>
                   <p>&#x1F464; Seguindo: ${user.following}</p>
               </div>
                   </div>
                `;

    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
        <p><span class="features">🍴 ${repo.forks_count}</span>
        <span class="features">⭐ ${repo.stargazers_count}</span>
        <span class="features">👀 ${repo.watchers_count}</span>
        <span class="features">🧑‍💻 ${repo.language ?? "Não possui linguagem"}</span></p>
        </a></li>`)
    );
    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
        <h3>Repositórios</h3>
        <ul>${repositoriesItens}</ul></div>`;
    }

    let eventsList = user.events.filter(
      (event) => event.type === "PushEvent" || event.type === "CreateEvent"
    );
      
    let lastTenEvents = eventsList.splice(0, 10);
    let displayEvents = "";

    lastTenEvents.forEach((event) => {
      let eventName = "";
      let messageEvent = "";
      if (event.type === "PushEvent") {
        eventName = event.repo.name;
        messageEvent = event.payload.commits[0].message;
      } else if (event.type === "CreateEvent") {
        eventName = event.repo.name;
        messageEvent = "Não possui commits";
      } else {
        return;
      }

      displayEvents += `<li><a href="https://github.com/${eventName}" class="eventLink" target="_blank">${eventName}</a>  -  ${messageEvent}</li>`;
    });

    this.userProfile.innerHTML += `<div class="events">
    <h2>Eventos</h2>
    <ul>${displayEvents}</ul>
    </div>`;
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
