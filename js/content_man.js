const searchInput = document.querySelector(".search-bar");
const container = document.querySelector(".game-cards");
const links = document.querySelectorAll('.fmi-1 a');

let game_data;

window.addEventListener("DOMContentLoaded", () => {
    fetch("sample_data.json")
        .then((response) => response.json())
        .then((data) => {
            game_data = data;

            links.forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const category = e.target.dataset.cat;
                    const filteredGames = game_data.filter((game) => game.category.includes(category));
                    display_games(filteredGames);
                });
            });

            display_games(game_data);
        });
});

searchInput.addEventListener("input", (e) => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredGames = game_data.filter((game) =>
        game.name.toLowerCase().includes(searchValue)
    );
    display_games(filteredGames);
});

function display_games(games) {
    let content = games.map((item) => {
        return `
      <div class="game-card">
        <a href="${item.link}" class="text-decoration-none">
          <img class="image" src="${item.img}" alt="Action">
          <h1 class="name">${item.name}</h1>
          <p class="desc">${item.desc}</p>
          <small class="category">${item.category.join(", ")}<br>Price: ${item.price}</small>
        </a>
      </div>
    `;
    }).join("");

    container.innerHTML = content;
}