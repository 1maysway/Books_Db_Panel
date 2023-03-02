import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import "../scss/Pages/_AddAuthor.scss";
import Form from "../Components/Form";
import { Author, Book } from "../Types/Types";
import axios from "axios";
import { PAGE_BASEPATH, SERVER_URL } from "..";


const initialFormData:Author={
  id:0,
  birhday:'',
  booksIds:[],
  country:'',
  fullName:''
}

function AddAuthor() {

  const OnSubmit=async (formData:Record<string, any>)=>{
    try{
        const dataJson= JSON.stringify({...formData});
        
        const response=await axios.post(SERVER_URL+"authors/add",dataJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.assign(PAGE_BASEPATH+'authors')
    }
    catch(error){
        console.log(error);
    }
}

  return <div id="addAuthor_page">
    <Form onSubmit={OnSubmit} initialData={initialFormData} emptyAtFisrt={true} />
  </div>;
}

export default AddAuthor;
