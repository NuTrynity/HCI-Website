const container = document.querySelector(".game-cards");

fetch("sample_data.json")
.then((Response) => Response.json())
.then(data => {
    
    let content = data.map(function(item) {
        return `        <div class="game-card">
                            <img class="image" src="${item.img}" alt="Action">
                            <h1 class="name">${item.name}</h1>
                            <p class="desc">${item.desc}</p>
                            <small class="category">${item.category}</small>
                        </div>`;
    })

    content = content.join("");
    container.innerHTML = content
});