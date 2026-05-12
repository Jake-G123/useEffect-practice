import { useState, useEffect } from 'react'

export default function Main() {
    const [searchInput, setSearchInput] = useState("")
    const [pokemon, setPokemon] = useState({})
    const [allPokemon, setAllPokemon] = useState([])

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
        .then(res => res.json())
        .then(data => setAllPokemon(data.results))
    }, [])

    function searchPokemon() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
        .then(res => res.json())
        .then(data => setPokemon({
            pokemonName: data.name,
            pokemonSprite: data.sprites.front_default,
            pokemonTypes: data.types.map(t => t.type.name),
            pokemonHeight: data.height,
            pokemonWeight: data.weight,
            pokemonAbilities: data.abilities.map(a => a.ability.name),
            pokemonStats: data.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            }))
        }))
    }

    function getPokemon() {
        const randomNumber = Math.floor(Math.random() * allPokemon.length)
        const newPokemonName = allPokemon[randomNumber].name
        fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemonName}`)
        .then(res => res.json())
        .then(data => setPokemon({
            pokemonName: data.name,
            pokemonSprite: data.sprites.front_default,
            pokemonTypes: data.types.map(t => t.type.name),
            pokemonHeight: data.height,
            pokemonWeight: data.weight,
            pokemonAbilities: data.abilities.map(a => a.ability.name),
            pokemonStats: data.stats.map(s => ({
                name: s.stat.name,
                value: s.base_stat
            }))
        }))
    }

    function handleChange(event) {
        setSearchInput(event.currentTarget.value)
    }

    return (
        <main>
            <div className="inputs">
                <label>Name
                    <input
                        type="text"
                        placeholder="enter pokemon"
                        onChange={handleChange}
                        value={searchInput}
                    />
                </label>
                <button onClick={searchPokemon}>Search</button>
                <button onClick={getPokemon}>Random</button>
            </div>
            <div className="pokemon">
                {pokemon.pokemonName && <h2>{pokemon.pokemonName}</h2>}
                {pokemon.pokemonSprite && <img src={pokemon.pokemonSprite} alt={pokemon.pokemonName} />}
                {pokemon.pokemonTypes && <p>Types: {pokemon.pokemonTypes.join(", ")}</p>}
                {pokemon.pokemonHeight && <p>Height: {pokemon.pokemonHeight / 10}m</p>}
                {pokemon.pokemonWeight && <p>Weight: {pokemon.pokemonWeight / 10}kg</p>}
                {pokemon.pokemonAbilities && <p>Abilities: {pokemon.pokemonAbilities.join(", ")}</p>}
                {pokemon.pokemonStats && pokemon.pokemonStats.map(stat => (
                    <p key={stat.name}>{stat.name}: {stat.value}</p>
                ))}
            </div>
        </main>
    )
}