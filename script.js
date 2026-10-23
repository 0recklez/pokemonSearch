const searchForm = document.querySelector(".search-form");

const pokemonInput = document.querySelector(".pokemon-input");

const errorMessage = document.querySelector('.error-message')

const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");

const pokemonWeight = document.querySelector(".pokemon-weight-value");
const pokemonHeight = document.querySelector(".pokemon-height-value");
const pokemonId = document.querySelector(".pokemon-id-value");

const pokemonTypes = document.querySelector(".pokemon-types");


async function fetchPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        const error = new Error();
        error.status = response.status;
        throw error;
    }

    return await response.json();
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchPokemon(pokemonInput.value)
        .then((pokemon) => {
            errorMessage.setAttribute('hidden', '')


            pokemonName.textContent = pokemon.name;
            pokemonImage.setAttribute('src', pokemon.sprites.front_default);
            pokemonWeight.textContent = `${pokemon.weight / 10} кг`;
            pokemonHeight.textContent = `${pokemon.height / 10} м`
            pokemonId.textContent = `#${pokemon.id}`;

            let pokemonTypesArr = []
            pokemon.types.forEach(i => {
                pokemonTypesArr.push(i.type.name)
            });

            pokemonTypes.textContent = pokemonTypesArr.join(', ');
        })
        .catch((error) => {
            errorMessage.removeAttribute('hidden')
            pokemonName.textContent = 'имя';
            pokemonImage.removeAttribute('src');
            pokemonWeight.textContent = '';
            pokemonHeight.textContent = '';
            pokemonId.textContent = '';
            pokemonTypes.textContent = '';

            if (error.status === 404 || 400) {
                errorMessage.textContent = 'Покемон не найден. Проверьте имя или ID и попробуйте ещё раз.';
            } else {
                errorMessage.textContent = 'Что-то пошло не так';

            }
        })

});



