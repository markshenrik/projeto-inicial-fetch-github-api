const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML =`
                                  <div class="info">
                                    <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                      <div class="data">
                                        <h1>${user.name ?? "Não possui nome cadastrado 😥"}</h1>
                                        <p>${user.bio ?? "Não possui bio cadastrada 😥"}</p>
                                        <p>&#x1F465; Seguidores: ${user.followers}</p>
                                        <p>&#x1F464; Seguindo: ${user.following}</p>
                                    </div>
                                  </div>
                                `;
    this.renderRepositories(user.repositories);
    this.renderEvents(user.events);
  },

  renderRepositories(repositories) {
    let repositoriesItens = "";
    repositories.forEach(
      (repo) =>
        (repositoriesItens += `
                                <li>
                                  <a href="${repo.html_url}" target="_blank">${repo.name}
                                    <p>
                                      <span class="features">🍴 ${repo.forks_count}</span>
                                      <span class="features">⭐ ${repo.stargazers_count}</span>
                                      <span class="features">👀 ${repo.watchers_count}</span>
                                      <span class="features">🧑‍💻 ${repo.language ?? "Não possui linguagem"}</span>
                                    </p>
                                  </a>
                                </li>
                              `)
    );

    if (repositories.length > 0) {
      this.userProfile.innerHTML += `
                                      <div class="repositories section">
                                        <h3>Repositórios</h3>
                                        <ul>${repositoriesItens}</ul>
                                      </div>
                                    `;
    }else{
      this.userProfile.innerHTML += '<h2>Não possui repositórios</h2>'
    }
  },

  renderEvents(events) {
    let eventsList = events.filter(
      (event) => event.type === "PushEvent" || event.type === "CreateEvent"
    );

    let displayEvents = "";

    eventsList.forEach((event) => {
      displayEvents += `
                        <li>
                          <a href="https://github.com/${event.repo.name}" class="eventLink" target="_blank">${event.repo.name}</a>  -  ${event.payload.commits?.[0].message ?? "Não possui commits"}
                        </li>
                      `;
    });

    if (eventsList.length > 0) {
      this.userProfile.innerHTML += `
                                      <div class="events">
                                        <h2>Eventos</h2>
                                        <ul>${displayEvents}</ul>
                                      </div>
                                    `;
    } else {
      this.userProfile.innerHTML += `<h2>Não possui eventos</h2>`;
    }
  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
