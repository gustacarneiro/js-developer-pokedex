
const pokeApi = {}
const params = new URLSearchParams(document.location.search)
const pokeId = params.get('id')

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new PokemonSingle()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.height = pokeDetail.height / 10
    pokemon.weight = pokeDetail.weight / 10

    const types = pokeDetail.types.map((types) => types.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities.join(', ')
    pokemon.ability = ability

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.experience = pokeDetail.base_experience
    pokemon.species = pokeDetail.species.name

    return pokemon
}

pokeApi.getSinglePokemon = (id = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)

}

const pokemonNumber = document.querySelector(".number-single")
const pokemonName = document.querySelector(".title-single")
const pokemonTypes = document.querySelector(".types-single")
const pokemonSpecies = document.querySelector("#species")
const pokemonHeight = document.querySelector("#height")
const pokemonWeight = document.querySelector("#weight")
const pokemonAbilities = document.querySelector("#abilities")
const pokemonPhoto = document.querySelector(".img-single")
const pokemonExperience = document.querySelector("#experience")


pokeApi.getSinglePokemon(pokeId).then((pokemon) => {
    pokemonNumber.innerHTML = `#${pokemon.number}`
    pokemonName.innerHTML = pokemon.name
    pokemonTypes.innerHTML = pokemon.types.map((type) => `<li class="type-single ${type}">${type}</li>`).join('')
    pokemonSpecies.innerHTML = pokemon.species
    pokemonHeight.innerHTML = pokemon.height + " m"
    pokemonWeight.innerHTML = pokemon.weight + " kg"
    pokemonAbilities.innerHTML = pokemon.abilities
    pokemonAbilities.innerHTML = pokemon.abilities
    pokemonPhoto.innerHTML = `<img
    src="${pokemon.photo}"
    alt="${pokemon.name}">`
    pokemonExperience.innerHTML = pokemon.experience
})
