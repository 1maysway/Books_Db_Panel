import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { SERVER_URL } from "..";
import Form from "../Components/Form";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_OnePublisher.scss";
import { Author, Book } from "../Types/Types";

function OnePublisher() {

    const [publisher,setPublisher]=useState<Author|null>(null);
    const [loading,setLoading]=useState(true);
    const [publishersId,setPublishersId]=useState(()=>{
        return parseInt(window.location.pathname.split("/").reverse()[0]);
    });
    const [error,setError]=useState<string|null>(null);

    function isNumber(value: any): boolean {
        return typeof value === 'number' && isFinite(value);
      }
    const FetchPublisher=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"publishers/"+publishersId);
            delete response.data.id;
            setPublisher(response.data);
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
        if(areObjectsEqual(formData,publisher || {})){
            alert("Objects are the same");
            return;
        }
        console.log(formData);
        
        try{
            const dataJson= JSON.stringify({...formData,id:publishersId});
            const response=await axios.post(SERVER_URL+"publishers/update/"+publishersId,dataJson,{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign('/Books_Db_Panel/publishers')
        }
        catch(error:any){
            console.log(error);
            alert(error.message);
        }
    }

    useEffect(()=>{
        if(!isNumber(publishersId)){
            window.location.assign('/Books_Db_Panel/publishers');
            return;
        }
        FetchPublisher();
    },[]);

    const deletePublisher=async()=>{
        try{
            const response=await axios.post(SERVER_URL+"publishers/delete/"+publishersId,{},{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign('/Books_Db_Panel/publishers')
        }
        catch(error){
            console.log(error);
        }
    }

    if(error){
        return <div id="onePublisher_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
      
      if(loading) {
        return <div id="onePublisher_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="onePublisher_page">
    <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent="end">
            <Button size='large' onClick={deletePublisher}>Delete</Button>
        </Grid>
        <Grid item xs={12}>
            {publisher && <Form onSubmit={onSubmit} initialData={publisher} />}
        </Grid>
    </Grid>
  </div>;
}

export default OnePublisher;
