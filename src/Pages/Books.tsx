import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, To } from "react-router-dom";
import { SERVER_URL } from "..";
import Preloader from "../Components/Preloader";
import "../scss/Pages/_Books.scss";
import { Book } from "../Types/Types";


function Books() {

    const [books,setBooks]=useState<Book[]>([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);

    const FetchBooks=async()=>{
        try{
            setLoading(true);
            const response=await axios.get(SERVER_URL+"books/all");
            console.log(response);
            
            setBooks(response.data);
            setLoading(false);
        }
        catch(error:any){
            console.log(error);

            setError(error.response.status)
        }
    }

    useEffect(()=>{
        FetchBooks();
    },[]);
    
    console.log(books);
    if(error){
        return <div id="books_page">
            <h1 style={{fontSize:'192px',textAlign:'center'}}>{error}</h1>
        </div>
    }
    if(loading) {
        return <div id="books_page">
            <Preloader circularProgressColor="primary"/>
        </div>
      }

  return <div id="books_page">
    <Grid container paddingX={'10%'} spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Link to={"/Books_Db_Panel/books/add"}>
                    <button className="button">Add Book</button>
                </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} className='books_list'>
            {books.map(({originalTitle,id})=>
                (
                    <Grid item xs={12} key={id} className='books_list_item'>
                        <Link to={"/Books_Db_Panel/books/"+id} className='books_list_item_link'>
                            <Grid container  className='books_list_item_container'>
                                <Grid item xs='auto'>
                                    <h3>{originalTitle}</h3>
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

export default Books;
