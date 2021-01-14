import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import MessageIcon from '@material-ui/icons/Message';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = {
  menuBars: {
    fontSize: '46px',
    color: '#fff9e6',
   
    '&:hover': {
      color: '#c78b50'
  },
  },
  x: {
    fontSize: '46px',
    color: '#fff9e6',
    '&:hover': {
      color: '#c78b50'
  },
  },
};

function Nav(props) {
  const { classes } = props;
  const [sidebar, setSidebar] = useState(false)
  //will set to the opposite of what it was
  const showSidebar = () => setSidebar(!sidebar)

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/forum';
    loginLinkData.text = `Welcome ${props.store.user.first_name}!`;
  } 
  
  if (props.store.user.administrator){
    loginLinkData.path = '/admin';
    loginLinkData.text = 'Admin';
  }

  return (
    
    <div className="nav">
     
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <MenuIcon className={classes.menuBars} onClick={showSidebar} />
        </Link>
        <section>
          <h1 className="title">Garden <br></br>Exchange</h1>
          {/* <p className="quote">"You don't have a garden just for yourself.  You have it to share."
          -  Augusta Carter</p> */}
        </section>
      </div>

      {/* <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link> */}

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">

            <Link to="#" className="menu-bars">
              <CloseIcon className="bars" className={classes.x}/>
            </Link>
          </li>


          <Link className="nav-link" to={loginLinkData.path}>
            {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
            {loginLinkData.text}
          </Link>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.store.user.id && (
            <>
              <li className="nav-text">
                <Link className="nav-link" to="/forum">
                  <HomeIcon className="icon" />
                    Forum
                  </Link>
              </li>

              <li className="nav-text">
                <Link className="nav-link" to="/form">
                  <AddIcon className="icon" />
                    Add Listing
                  </Link>
              </li>
              <li className="nav-text">
                <Link className="nav-link" to="/messages">
                  <MessageIcon className="icon" />
                  Messages
                 </Link>
              </li>
              <li className="nav-text">
                <Link className="nav-link" to="/profile">
                  <PersonOutlineIcon className="icon" />
                  Profile
                  </Link>
              </li>
              <li className="nav-text">
                <Link className="nav-link" to="/support">
                  <HelpOutlineIcon className="icon" />
                  Support
                  </Link>
              </li>
              <li className="nav-text">
                <LogOutButton className="nav-link" />
              </li>

            </>
          )}
          {/* Always show this link since the about page is not protected */}
          {/* <Link className="nav-link" to="/about">
          About
        </Link> */}

        </ul>
      </nav>
    </div>
  );
};

export default connect(mapStoreToProps)(withStyles(styles)(Nav));
