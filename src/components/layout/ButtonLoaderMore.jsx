import { useState, useEffect } from "react";
import Pokemons from "../pokemons/Pokemons";

function ButtonLoaderMore() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Carrega os primeiros 10 pokémons ao montar o componente
    useEffect(() => {
        carregarPokemons(0);
    }, []);

    function carregarPokemons(offsetValue) {
        setIsLoading(true);
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offsetValue}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                // Adiciona os novos pokémons à lista existente
                setPokemonList(currentList => [...currentList, ...data.results]);

                // Atualiza o offset para o próximo carregamento
                setOffset(offsetValue + 10);
                setIsLoading(false);
                console.log("Pokémons carregados:", data.results);
                console.log("Próximo offset:", offsetValue + 10);
            })
            .catch((error) => {
                console.log("Erro ao carregar pokémons:", error);
                setIsLoading(false);
            });
    }

    function carregarMaisPokemons() {
        // Usa o valor atual de offset para carregar os próximos 10 pokémons
        carregarPokemons(offset);
    }

    return (
        <>

            <div className="pokemon-container">
                {/* Renderiza a lista de pokémons */}
                {pokemonList.length > 0 ? (
                    <div className="pokemon-list">


                    </div>
                ) : isLoading ? (
                    <p>Carregando pokémons iniciais...</p>
                ) : (
                    <p>Nenhum pokémon encontrado.</p>
                )}

            </div>

            <div className="text-center mt-4">
                <button
                    onClick={carregarMaisPokemons}
                    className="btn btn-primary"
                    type="button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            {" "}Carregando...
                        </>
                    ) : (
                        "Carregar mais pokémons"
                    )}
                </button>
            </div>
        </>


    );
}

export default ButtonLoaderMore;