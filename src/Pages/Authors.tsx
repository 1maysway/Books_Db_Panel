import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { PAGE_BASEPATH, SERVER_URL } from "..";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_Authors.scss";
import { Author, Book } from "../Types/Types";


function Authors() {

    const [authors,setAuthors]=useState<Author[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);

    const FetchAuthors=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"authors/all");
            console.log(response);
            
            setAuthors(response.data);
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
        return <div id="authors_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
    if(loading) {
        return <div id="authors_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="authors_page">
    <Grid container paddingX={'10%'} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Link to={PAGE_BASEPATH+"authors/add"}>
                    <button className="button">Add Author</button>
                </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} className='authors_list'>
            {authors.map(({fullName,id})=>
                (
                    <Grid item xs={12} key={id} className='authors_list_item'>
                        <Link to={PAGE_BASEPATH+"authors/"+id} className='authors_list_item_link'>
                            <Grid container  className='authors_list_item_container'>
                                <Grid item xs='auto'>
                                    <h3>{fullName}</h3>
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

export default Authors;
