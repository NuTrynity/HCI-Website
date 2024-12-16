const container = document.querySelector(".game-cards");
const links = document.querySelectorAll('.fmi-1 a'); // Select all links within the 'fmi-1' class

let gamesData;

window.addEventListener("DOMContentLoaded", () => {
    fetch("sample_data.json")
      .then((response) => response.json())
      .then((data) => {
        gamesData = data;
  
        links.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default link behavior
            const category = e.target.dataset.cat;
            const filteredGames = gamesData.filter((game) => game.category === category);
  
            display_games(filteredGames);
          });
        });
  
        display_games(gamesData); // Display all games initially
      });
  });

function display_games(games) {
    let content = games.map(function (item) {
        return `
      <div class="game-card">
        <a href="${item.link}" class="text-decoration-none">
          <img class="image" src="${item.img}" alt="Action">
          <h1 class="name">${item.name}</h1>
          <p class="desc">${item.desc}</p>
          <small class="category">${item.category}<br>Price: ${item.price}</small>
        </a>
      </div>
    `;
    }).join("");

    container.innerHTML = content;
}