import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import "../scss/Pages/_AddPublisher.scss";
import Form from "../Components/Form";
import { Author, Book, Publisher } from "../Types/Types";
import axios from "axios";
import { SERVER_URL } from "..";


const initialFormData:Publisher={
  id:0,
  name:'',
  country:'',
  booksIds:[]
}

function AddAuthor() {

  const OnSubmit=async (formData:Record<string, any>)=>{
    try{
        const dataJson= JSON.stringify({...formData});
        const response=await axios.post(SERVER_URL+"publishers/add",dataJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.assign('/publishers')
    }
    catch(error){
        console.log(error);
    }
}

  return <div id="addPublisher_page">
    <Form onSubmit={OnSubmit} initialData={initialFormData} emptyAtFisrt={true} />
  </div>;
}

export default AddAuthor;
