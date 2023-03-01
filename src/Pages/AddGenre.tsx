import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import "../scss/Pages/_AddGenre.scss";
import Form from "../Components/Form";
import { Book, Genre } from "../Types/Types";
import axios from "axios";
import { SERVER_URL } from "..";


const initialFormData:Genre={
  id:0,
  description:'',
  name:''
}

function AddGenre() {

  const OnSubmit=async (formData:Record<string, any>)=>{
    try{
        const dataJson= JSON.stringify({...formData});
        const response=await axios.post(SERVER_URL+"genres/add",dataJson,{
            headers: {
                "Content-Type": "application/json"
            }
        });
        window.location.assign('/genres')
    }
    catch(error){
        console.log(error);
    }
}

  return <div id="addGenre_page">
    <Form onSubmit={OnSubmit} initialData={initialFormData} emptyAtFisrt={true} />
  </div>;
}

export default AddGenre;
