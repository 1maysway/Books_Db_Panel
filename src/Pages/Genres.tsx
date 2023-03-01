import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "..";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_Genres.scss";
import { Genre } from "../Types/Types";


function Genres() {

    const [genres,setGenres]=useState<Genre[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);

    const FetchAuthors=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"genres/all");
            setGenres(response.data);
            setLoading(false);
        }
        catch(error:any){
            console.log(error);
            setError(error.response.status)
        }
    }

    useEffect(()=>{
        FetchAuthors();
    },[]);
    if(error){
        return <div id="genres_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
    if(loading) {
        return <div id="genres_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="genres_page">
    <Grid container paddingX={'10%'} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Link to={"/Books_Db_Panel/genres/add"}>
                    <button className="button">Add Genre</button>
                </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} className='genres_list'>
            {genres.map(({name,id})=>
                (
                    <Grid item xs={12} key={id} className='genres_list_item'>
                        <Link to={"/Books_Db_Panel/genres/"+id} className='genres_list_item_link'>
                            <Grid container  className='genres_list_item_container'>
                                <Grid item xs='auto'>
                                    <h3>{name}</h3>
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                )
            )}
        </Grid>
      </Grid>
    </Grid>
  </div>;
}

export default Genres;
