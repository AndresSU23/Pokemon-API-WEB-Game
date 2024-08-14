import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Icon } from '@iconify-icon/react';
import styles from "./Pokedex.module.css";
import { useMenu } from "@/context/menuContext";

const ITEMS = 10;

const Pokedex = () => {

    const [ pokemonList, setPokemonList ] = useState([]);

    const [ search, setSearch ] = useState("");
    const [ type, setType ] = useState(null);

    const [ page, setPage ] = useState(1);
    const [ total, setTotal ] = useState(0);

    const { setPokemonId } = useMenu();
    

    useEffect(() => {

        const fetchData = async () => {
            
            try {

                const response = await fetch(`http://localhost:3001/api/pokedex?name=${search}`);
                const data = await response.json();
                setPokemonList(data);

            } 
            
            catch (err) { console.log(err); }

        };

        fetchData();

    }, [ search ]);

    const handlePageClick = (pageNumber) => setPage(pageNumber);

    useEffect(() => { setTotal(Math.ceil(pokemonList.length / ITEMS)) }, [ pokemonList ])

    return (
        <div className={styles.pokedex_spacer + " flex col"}>

            { pokemonList &&
                <>
                    <div className={styles.pokedex_options_spacer + " flex row between"}>

                        <div className={styles.pokedex_search + " flex row"}>
                            <span className={"flex center"}><Icon icon="gg:search" /></span>
                            <input type="search" placeholder="Search Pokémon" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        <div className={styles.pokedex_sort + " flex row"}>
                            <span className={"flex center"}><Icon icon="ion:funnel-sharp" /></span>
                            <div className={styles.select}></div>
                        </div>
                    </div>

                    <div className={styles.pokedex_list_spacer + " flex row"}>
                        <div className={styles.pokedex_list + " flex col"}>
                            {   pokemonList.slice((page - 1) * ITEMS, page * ITEMS).map((data, index) =>
                                    <div key={index} className={styles.pokedex_item + " flex"} onClick={() => { setPokemonId(data.pid); }}>
                                        <span>{String(data.pid).padStart(3, "0")} - </span>
                                        {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                                        <img src={data.sprite.default} />
                                    </div>
                                )
                            }
                        </div>

                        { pokemonList.length > 10 && 

                            <div className={styles.pokedex_scroller}>
                                <span onClick={() => handlePageClick(page > 1 ? page - 1 : page)}><Icon icon="teenyicons:up-solid" /></span>
                                <span onClick={() => handlePageClick(page < total ? page + 1 : page)}><Icon icon="teenyicons:down-solid" /></span>
                            </div>

                        }

                    </div>
                </>
            }

        </div>
    )

}

export default Pokedex;