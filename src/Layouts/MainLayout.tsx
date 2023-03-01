import { Container, Grid } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import "../scss/Layouts/_MainLayout.scss";

const MainLayout = () => {
    return (
      <div className="wrapper">
          <Container className="header">
            <Grid container className="header_container">
              <Grid item xs={12} className='header_item'>
                <Link to={'/'} className='link'>
                  <button className="header_main_button">TO MAIN PAGE</button>
                </Link>
              </Grid>
            </Grid>
          </Container>
          <Container className="container">
            <div className="content" style={{paddingTop:"48px"}}>
                <Outlet />
            </div>
          </Container>
      </div>
    );
  };
  
  export default MainLayout;