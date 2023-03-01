import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import "../scss/Pages/_AddBook.scss";
import Form from "../Components/Form";
import { Book } from "../Types/Types";
import axios from "axios";
import { SERVER_URL } from "..";


const initialFormData:Book={
  id:0,
  description:'',
  pagesCount:0,
  publishedCountry:'',
  publishedDate:'',
  publisherId:0,
  authorsIds:[],
  genresIds:[],
  originalTitle:''
}

function AddBook() {

  const OnSubmit=async (formData:Record<string, any>)=>{
    try{
        const dataJson= JSON.stringify({...formData});
        
        const response=await axios.post(SERVER_URL+"books/add",dataJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.assign('/books')
    }
    catch(error){
        console.log(error);
    }
}

  return <div id="addBook_page">
    <Form onSubmit={OnSubmit} initialData={initialFormData} emptyAtFisrt={true} />
  </div>;
}

export default AddBook;
