import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { SERVER_URL } from "..";
import Form from "../Components/Form";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_OneAuthor.scss";
import { Author, Book } from "../Types/Types";

function OneAuthor() {

    const [author,setAuthor]=useState<Author|null>(null);
    const [loading,setLoading]=useState(true);
    const [authorsId,setAuthorsId]=useState(()=>{
        return parseInt(window.location.pathname.split("/").reverse()[0]);
    });
    const [error,setError]=useState<string|null>(null);

    function isNumber(value: any): boolean {
        return typeof value === 'number' && isFinite(value);
      }
    const FetchAuthor=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"authors/"+authorsId);
            delete response.data.id;
            setAuthor(response.data);
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
        if(areObjectsEqual(formData,author || {})){
            alert("Objects are the same");
            return;
        }
        console.log(formData);
        
        try{
            const dataJson= JSON.stringify({...formData,id:authorsId});
            console.log(dataJson);
            
            const response=await axios.post(SERVER_URL+"authors/update/"+authorsId,dataJson,{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign('/authors')
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!isNumber(authorsId)){
            window.location.assign('/authors');
            return;
        }
        FetchAuthor();
    },[]);

    const deleteAuthor=async()=>{
        try{
            const response=await axios.post(SERVER_URL+"books/delete/"+authorsId,{},{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign('/authors')
        }
        catch(error:any){
            console.log(error);
            alert(error.message);
        }
    }

    if(error){
        return <div id="oneAuthor_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
      
      if(loading) {
        return <div id="oneAuthor_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="oneAuthor_page">
    <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent="end">
            <Button size='large' onClick={deleteAuthor}>Delete</Button>
        </Grid>
        <Grid item xs={12}>
            {author && <Form onSubmit={onSubmit} initialData={author} />}
        </Grid>
    </Grid>
  </div>;
}

export default OneAuthor;
