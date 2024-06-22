const tmdbApiKey = '89f59fc49d3ed44921b1d175e0db208c';
const frmPesquisa = document.getElementById('pesquisaForm');
const paginacao = document.querySelector('.paginacao');
const anteriorpaginaBtn = document.getElementById('anteriorpagina');
const proximapaginaBtn = document.getElementById('proximapagina'); 
let currentPage = 1;
let currentQuery = '';

frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();

    currentQuery = ev.target.pesquisa.value.trim();
    if (currentQuery === "") {
        alert("Preencha o campo!");
        return;
    }
        currentPage = 1;
        buscarFilmes(currentQuery, currentPage);

}

    const buscarFilmes = async (query, page) => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            carregaLista(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao consultar ação!', error);
            alert('Erro na API');
        }
    }

    const carregaLista = (json) => {
        const lista = document.querySelector("div.lista");
        lista.innerHTML = "";

        if (json.total_results === 0) {
            alert('Nenhum filme encontrado')
            paginacao.style.display = 'none';
            return;
        }

        json.results.forEach(element => {
           let item =  document.createElement("div");
           item.classList.add("item");

           const posterPath = element.poster_path ? `https://image.tmdb.org/t/p/w500${element.poster_path}` : tEiIH5QesdheJmDAqQwvtN60727.png ;
           item.innerHTML = `
           <img src="${posterPath}" alt="${element.title}" />
           <h2>${element.title}</h2>
           <button class="detalhesBotao" data-id="${element.id}">Mais detalhes</button>`;

           lista.appendChild(item);
        });
        
        document.querySelectorAll('.detalhesBotao').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                window.location.href = `detalhes.html?id=${id}`;
            });
        });

        paginacao.style.display = 'flex';
        anteriorpaginaBtn.disabled = currentPage === 1;
        proximapaginaBtn.disabled = (json.totalResults <= currentPage * 10);
    }

    anteriorpaginaBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            buscarFilmes(currentQuery, currentPage);
        }
    });

    proximapaginaBtn.addEventListener('click', () => {
        currentPage++;
        buscarFilmes(currentQuery, currentPage);
    });


    