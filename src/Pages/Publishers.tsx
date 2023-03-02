import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_BASEPATH, SERVER_URL } from "..";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_Publishers.scss";
import { Genre } from "../Types/Types";


function Publishers() {

    const [publishers,setPublishers]=useState<Genre[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);

    const FetchPublishers=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"publishers/all");
            setPublishers(response.data);
            setLoading(false);
        }
        catch(error:any){
            console.log(error);
            setError(error.response.status)
        }
    }

    useEffect(()=>{
        FetchPublishers();
    },[]);
    if(error){
        return <div id="publishers_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
    if(loading) {
        return <div id="publishers_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="publishers_page">
    <Grid container paddingX={'10%'} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Link to={PAGE_BASEPATH+"publishers/add"}>
                    <button className="button">Add Publisher</button>
                </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} className='publishers_list'>
            {publishers.map(({name,id})=>
                (
                    <Grid item xs={12} key={id} className='publishers_list_item'>
                        <Link to={PAGE_BASEPATH+"publishers/"+id} className='publishers_list_item_link'>
                            <Grid container  className='publishers_list_item_container'>
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

export default Publishers;
