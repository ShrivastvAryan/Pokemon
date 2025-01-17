import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./pokemoncard";

export const Pokemon=()=>{

    const[pokemon,setPokemon]= useState([]) // used [] because of the array
    const[loading,setLoading]=useState(true)// jab tak data mil ni jata loading show hoga
    const[error,setError]=useState(null)
    const[search,setSearch]=useState("")

    const API= "https://pokeapi.co/api/v2/pokemon?limit=124"; //fetching API

    const  fetchPokemon=async()=>{
        try{
            const res= await fetch(API);
            const data= await res.json()// making it in readable form for sys using json
            console.log(data);

            const detailedPokemonData=data.results.map(async(currPokemon)=>{
                const res=await fetch(currPokemon.url); // Calling the all the data at once using this line
                const data=await res.json()  
                return data;
            });

            const detailedResponses= await Promise.all(detailedPokemonData) //data will be visible only when all 24 are correctly loaded and rendered
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);
            setError(error)

        } catch(error){
            console.log(error)
        }
        
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    //search function
    const searchData=pokemon.filter((currPokemon)=>
        currPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if(loading){
        return (<div>
            <h1>Loading....</h1>
            </div>)
    }

    if(error){
        return (<div>
            <h1>{error.message}</h1>
            </div>)
    }

    return(
        <>
        <section className="container">
        <header>
        <h1>Let's Catch Pokemon</h1>
        </header>

        <div className="pokemon-search">
            <input type="text" placeholder="search Pokemon" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>

        <div>
            <ul className="cards">
                {searchData.map((currPokemon)=>{
                    return(<PokemonCards key={currPokemon.id} pokemonData={currPokemon}/>);//fetching the data from pokemoncard.jsx
                   })}
            </ul>
        </div>
        </section>
        </>
    )
}