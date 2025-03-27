import { useState, useEffect } from "react";
import '../../components/styles/globals.css';
import '../../components/styles/styles.css';
import ButtonLoaderMore from "../layout/ButtonLoaderMore";

function Pokemons() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
            const data = await response.json();

            const pokemonDetails = await Promise.all(data.results.map(async (pokemons) => {
                const response = await fetch(pokemons.url);
                return response.json();
            }));
            setPokemons(pokemonDetails);
        }

        fetchData();
    }, []);

    if (pokemons.length === 0) {
        return <div>Loading pokemons...</div>
    }

    return (
        <div className="container">
            <h1>Lista de Pokémons</h1>
            <ul className="pokemons-list" >
                {pokemons.map(pokemon => (
                    <li key={pokemon.id} className={`pokemon-card ${pokemon.types[0].type.name}`}>
                        <span className="number">#{pokemon.id}</span>
                        <span className="name">{pokemon.name}</span>
                        
                        <div className="details">
                            <ol className="types">
                                {pokemon.types.map( (type,index) => (
                                    <li key={index} className={`type ${type.type.name}`}>{type.type.name}</li>
                                ))}
                            </ol>

                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        </div>
                        {/* <p>Habilidades:{pokemon.abilities.map(ability => ability.ability.name).join(',')}</p>
                        <p>Movimentos: {pokemon.moves.slice(0, 5).map(move => move.move.name).join(',')}</p> */}
                    </li>
                )
                )}
                

            </ul>
            <ButtonLoaderMore />
        </div>
    )
}

export default Pokemons;