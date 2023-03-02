import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { PAGE_BASEPATH, SERVER_URL } from "..";
import Form from "../Components/Form";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_OneGenre.scss";
import { Genre } from "../Types/Types";

function OneGenre() {

    const [genre,setGenre]=useState<Genre|null>(null);
    const [loading,setLoading]=useState(true);
    const [genresId,setGenresId]=useState(()=>{
        return parseInt(window.location.pathname.split("/").reverse()[0]);
    });
    const [error,setError]=useState<string|null>(null);

    function isNumber(value: any): boolean {
        return typeof value === 'number' && isFinite(value);
      }
    const FetchGenre=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"genres/"+genresId);
            delete response.data.id;
            setGenre(response.data);
            setLoading(false);
        }
        catch(error:any){
            console.log(error);
            setError(error.response.status);
        }
    }

    const areObjectsEqual=(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (let key of keys1) {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      
        return true;
      }

    const onSubmit=async (formData:Record<string, any>)=>{
        if(areObjectsEqual(formData,genre || {})){
            alert("Objects are the same");
            return;
        }
        try{
            const dataJson= JSON.stringify({...formData,id:genresId});
            const response=await axios.post(SERVER_URL+"genres/update/"+genresId,dataJson,{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign(PAGE_BASEPATH+'genres')
        }
        catch(error:any){
            console.log(error);
            alert(error.message);
        }
    }

    const deleteGenre=async()=>{
        try{
            const response=await axios.post(SERVER_URL+"genres/delete/"+genresId,{},{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign(PAGE_BASEPATH+'genres')
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!isNumber(genresId)){
            window.location.assign(PAGE_BASEPATH+'genres');
            return;
        }
        FetchGenre();
    },[]);

    if(error){
        return <div id="oneGenre_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
      
      if(loading) {
        return <div id="oneGenre_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="oneGenre_page">
    <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent="end">
            <Button size='large' onClick={deleteGenre}>Delete</Button>
        </Grid>
        <Grid item xs={12}>
            {genre && <Form onSubmit={onSubmit} initialData={genre} />}
        </Grid>
    </Grid>
  </div>;
}

export default OneGenre;
