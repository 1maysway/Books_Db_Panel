import { Grid } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import { PAGE_BASEPATH } from "..";
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
            link:PAGE_BASEPATH+'books'
        },
        {
            title:'Authors',
            link:PAGE_BASEPATH+'authors'
        },
        {
            title:'Genres',
            link:PAGE_BASEPATH+'genres'
        },
        {
            title:'Publishers',
            link:PAGE_BASEPATH+'publishers'
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
