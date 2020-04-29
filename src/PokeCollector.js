import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './PokeCollector.css';

function PokeCollector () {
    const [pokedex, setPokedex] = useState([])
    const [wildPokemon, setWildPokemon] = useState([]);
    
    //Only run once when the component "mounts" - however, can set 2nd arguement to run everytime that is updated
    useEffect ( () => {
        encounterWildPokemon()
    },[])
    
    //Generate Random Pokemon ID 
    const pokeId = () => {
    return Math.floor(Math.random() * 151) + 1;
    }

    //Retireve Pokemon Information
    const encounterWildPokemon = () => {
    //Make http request with the help of Axios
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeId())
        .then(res => {
        setWildPokemon(res.data)
        })
    }
    
    //Catch Pokemon Function
    const catchPoke = (pokemon) => {
    //Using State - Do not want to lose current state
    setPokedex(state => {
        //Check if pokemon exists in the pokedex by checking the id -- Create a new array with the pokemon that pass the test
        const pokemonExist = (state.filter(p => pokemon.id === p.id).length > 0);

        //If pokemon does not exist -- add pokemon to the current state -- then sort from smallest -> biggest
        if (!pokemonExist) {
        state = [...state, pokemon]
        //Then sort based on IDs
        state.sort(function (a, b) {
            return a.id - b.id
        })
        }
        //Return state back to setPokedex
        return state;
    })
    //Generate a New Pokemon
    encounterWildPokemon();
    }
    
    //Remove Pokemon
    const removePokemon = (id) => {
    //Filter will return a new array with anything that is not equal to the ID we are passing 
    //Ex: State has [12, 15, 19] -> remove 19; we pass in 19 & filter will create new array of [12, 15] because they do not have an id of 19
    setPokedex(state => state.filter(p => p.id !== id))
    }

    return (
    <div className="app__wrapper">
        <section className="wild-pokemon">
        <h2 className="wild-pokemon__heading">You have encountered</h2>
        <img className="wild-pokemon__sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} alt="poke sprite"/>
        <h3 className="wild-pokemon__name">{wildPokemon.name}</h3>
        <div className="wild-pokemon__buttons">
            <button className="wild-pokemon__catch-button" onClick={() => catchPoke(wildPokemon)}>
            Catch!
            </button>
            <button className="wild-pokemon__run-button" onClick={() => encounterWildPokemon()}>
            Run!
            </button>
        </div>
            
        </section>
    
        {/* Pokedex */}
        <section className="pokedex">
        <h2 className="pokedex__title">Pokedex</h2>
        <div className="pokedex__pokedex-list">
            {pokedex.map(pokemon => (
            <div className="pokedex__pokedex-list--pokemon" key={pokemon.id}>
                <img className="pokedex__pokedex-list--sprite" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt="pokemon"/>
                <h3 className="pokedex__pokedex-list--name">{pokemon.name}</h3>
                <button className="pokedex__pokedex-list--remove" onClick={() => removePokemon(pokemon.id)}>&times;</button>
            </div>
            ))}
        </div>
        </section>
    </div>
    );
}


export default PokeCollector;