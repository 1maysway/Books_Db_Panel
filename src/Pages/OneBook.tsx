import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { PAGE_BASEPATH, SERVER_URL } from "..";
import Form from "../Components/Form";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_OneBook.scss";
import { Book } from "../Types/Types";

function OneBook() {

    const [book,setBook]=useState<Book|null>(null);
    const [loading,setLoading]=useState(true);
    const [booksId,setBooksId]=useState(()=>{
        return parseInt(window.location.pathname.split("/").reverse()[0]);
    });
    const [error,setError]=useState<string|null>(null);

    function isNumber(value: any): boolean {
        return typeof value === 'number' && isFinite(value);
      }
    const FetchBook=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"books/"+booksId);
            delete response.data.id;
            setBook(response.data);
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
        if(areObjectsEqual(formData,book || {})){
            alert("Objects are the same");
            
            return;
        }
        try{
            const dataJson= JSON.stringify({...formData,id:booksId});
            
            const response=await axios.post(SERVER_URL+"books/update/"+booksId,dataJson,{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign(PAGE_BASEPATH+'books')
        }
        catch(error){
            console.log(error);
        }
    }

    const deleteBook=async()=>{
        try{
            const response=await axios.post(SERVER_URL+"books/delete/"+booksId,{},{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            window.location.assign(PAGE_BASEPATH+'books')
        }
        catch(error:any){
            console.log(error);
            alert(error.message);
        }
    }

    useEffect(()=>{
        if(!isNumber(booksId)){
            window.location.assign(PAGE_BASEPATH+'books');
            return;
        }
        FetchBook();
    },[]);

    if(error){
        return <div id="oneBooks_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
      
      if(loading) {
        return <div id="oneBooks_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="oneBooks_page">
    <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent="end">
            <Button size='large' onClick={deleteBook}>Delete</Button>
        </Grid>
        <Grid item xs={12}>
            {book && <Form onSubmit={onSubmit} initialData={book} />}
        </Grid>
    </Grid>
  </div>;
}

export default OneBook;
