import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import "../scss/Pages/_Main.scss";


type SectionButtonData=
{
    title:string;
    link:To;
}

function Main() {

    const sections:SectionButtonData[]=[
        {
            title:'Books',
            link:'/Books_Db_Panel/books'
        },
        {
            title:'Authors',
            link:'/Books_Db_Panel/authors'
        },
        {
            title:'Genres',
            link:'/Books_Db_Panel/genres'
        },
        {
            title:'Publishers',
            link:'/Books_Db_Panel/publishers'
        },
    ]

  return <div id="main_page">
    <Grid container>
    {sections.map(({title,link={}})=>
        <Grid item xs={12} className='section_button_container' key={title}>
            <Link to={link} className='section_button_link'>
                <div className="section_button">
                    <h3 className="section_button_text">{title}</h3>
                </div>
            </Link>
        </Grid>
    )}
    </Grid>
  </div>;
}

export default Main;
