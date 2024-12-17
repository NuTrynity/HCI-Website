const searchInput = document.querySelector(".search-bar");
const container = document.querySelector(".game-cards");
const links = document.querySelectorAll('.fmi-1 a');

let game_data;

window.addEventListener("DOMContentLoaded", () => {
    let images = [
        "assets/img/until-then-2.jpg",
        "assets/img/tail-quest.jpg",
        "assets/img/usagi-shima-5.jpg"
    ]

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

    rand_masthead_img(images);
});

searchInput.addEventListener("input", (e) => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredGames = game_data.filter((game) =>
        game.name.toLowerCase().includes(searchValue)
    );
    display_games(filteredGames);
});

// Displays/Updates the contents of the Games
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

// Choose a random image from the array of images
// PLEASE PUT AN ARRAY IN THE PARAMETER PLEASE
function rand_masthead_img(images) {
    const masthead_bg = document.querySelector('.masthead');
    const rand_index = Math.floor(Math.random() * images.length);
    const newImageUrl = images[rand_index];

    masthead_bg.style.backgroundImage = `linear-gradient(to bottom, rgba(84, 59, 58, 0.8) 0%, rgba(90, 90, 130, 0.8) 100%), url('${newImageUrl}')`;
}