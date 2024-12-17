//Only used for Genre_Page.html for now

const container = document.querySelector(".game-cards");
const links = document.querySelectorAll('.fmi-1 a');
const search_btn = document.querySelector('.search-bar')

let gamesData;

window.addEventListener("DOMContentLoaded", () => {
    fetch("sample_data.json")
        .then((response) => response.json())
        .then((data) => {
            gamesData = data;

            links.forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const category = e.target.dataset.cat;

                    const filteredGames = category ?
                        gamesData.filter((game) => game.category.includes(category)) :
                        gamesData;

                    display_games(filteredGames);
                });
            });

            // Initial display of all games
            display_games(gamesData);
        });
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

search_btn.onsearch = function() {
    console.log(search_btn.value);
}