
    const tmdbApiKey = '89f59fc49d3ed44921b1d175e0db208c';
    const filmesDetalhes = document.getElementById('filmesDetalhes');
    
    const filmesId = new URL(window.location.href).searchParams.get('id');
    
    if (!filmesId) {
        alert('ID do filme não encontrado');
    } else {
        buscarEExibirDetalhes(filmesId);
    }
    
    async function buscarFilmesDetalhes(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=pt-BR`;
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição da API TMDb', error);
            return null;
        }
    }
    
    function exibirDetalhesDoFilme(filmes) {
        if (filmes) {
            const generosArray = filmes.genres.map(genre => genre.name); 
            const generos = generosArray.join(', '); 
            const detalhes = {
                title: filmes.title,
                overview: filmes.overview,
                release_date: filmes.release_date,
                vote_average: filmes.vote_average,
                poster_path: filmes.poster_path,
                generos: generos
            }; 
            
            filmesDetalhes.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${detalhes.poster_path}" />
                <h2>${detalhes.title}</h2>
                <p>${detalhes.overview}</p>
                <p><strong>Data de lançamento:</strong> ${detalhes.release_date}</p>
                <p><strong>Nota:</strong> ${detalhes.vote_average}</p>
                <p><strong>Gêneros:</strong> ${detalhes.generos}</p>
            `;
        } else {
            filmesDetalhes.innerHTML = '<p>Detalhes do filme não encontrados.</p>';
        }
    }
    
    async function buscarEExibirDetalhes(id) {
        const movie = await buscarFilmesDetalhes(id);
        exibirDetalhesDoFilme(movie);
    }
    


