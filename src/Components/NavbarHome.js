import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Modal, ModalBody
} from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import {getProfileDetails} from '../reduxsaga/actions/profileAction';

function NavbarHome(props) {

  const [isOpen, setIsOpen] = useState(false);
  
  // modal
  const {
    buttonLabel,
    className
  } = props;
  const [modalSignin, setModalSignin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);
  const toggleSignin = () => {
    setModalSignup(false);
    setModalSignin(!modalSignin);
  };
  const closeBtnSignin = <button className="close" onClick={toggleSignin}>&times;</button>;
  const toggleSignup = () => {
    setModalSignup(!modalSignup);
    setModalSignin(false);
  };
  const closeBtnSignup = <button className="close" onClick={toggleSignup}>&times;</button>;
  // modal ends

  // search
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }
  const searchSubmit = () => {
    setRedirectSearch(true);
  }

  const [redirectSearch, setRedirectSearch] = useState(false);
  // search ends

  // sign in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [store, setStore] = useState(null);
  const urlLogin = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/login';
  useEffect(() => {
    storeCollector()
  }, []);
  const storeCollector = () => {
    let store = JSON.parse(localStorage.getItem('login'));
    if(store && store.login) {
      props.setIsLoggedIn(true);
      setStore(store);
    }
  }
  const handleSubmitSignin = (e) => {
    e.preventDefault();
    const data = {
      emailOrUsername: email,
      password: password
    }
    axios.post(urlLogin, data).then(res => {
      console.log(res.data, 'login success');
      const {token} = res.data;
      Cookies.set('token', token);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: res.data.token
      }))
    })
    .then(() => {
      setModalSignin(false);
      storeCollector()
    });
  }

  const handleSignOut = () => {
    Cookies.remove('token');
    localStorage.clear();
    props.setIsLoggedIn(false);
  }
  // sign in ends

  // sign up
  const [username, setUsername] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [passSignup, setPassSignup] = useState('');
  const [passConfirmation, setPassConfirmation] = useState('');
  const urlSignup = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/signup';
  const handleSubmitSignup = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      email: emailSignup,
      password: passSignup,
      passwordConfirmation: passConfirmation
    }
    axios.post(urlSignup, data).then(res => {
      console.log(res.data, 'signup success')
      const {token} = res.data;
      Cookies.set('token', token);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: res.data.token
      }))
    })
    .then(() => {
      setModalSignup(false);
      storeCollector()
    });
  }
  // sign up ends

  // console.log(store, 'ini store')

  // get profile
  const [profiles, setProfiles] = useState([]);
  let userProfile;
  if(store !== null) {
    const getUserFromToken = (token) => {
      return JSON.parse(atob(token.split('.')[1]));
    }
    let usernameToken = getUserFromToken(store.token).user.username;
    axios.get('https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/').then(res => {
      setProfiles(res.data.data)
    })
    
    userProfile = profiles.find(data => data.username === usernameToken);
  }
  // get profile ends

  // pass profile
  props.dispatch(getProfileDetails(userProfile));
  // pass profile ends

  // console.log(userProfile, 'PROFILKU');

  return (
    <>
    <div>
      <React.Fragment>

      { redirectSearch ? <Redirect to={`/search/${searchValue}`} /> : null }

      < Modal isOpen={modalSignin} toggle={toggleSignin} className={className}>
          <ModalBody className='modalBody'>
            {closeBtnSignin}
            <h1 style={{fontFamily: 'Bebas Neue, sans-serif'}}><i class="fas fa-ticket-alt"></i> UlasFilm</h1>
            <form noValidate onSubmit={handleSubmitSignin}>
                <div className="form-group">
                  <label htmlFor="email">Email or Username</label>
                  <input noValidate 
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Password</label>
                  <input noValidate 
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn mr-2">Sign In</button>
            </form>
            <p>Don't have an account yet? <span onClick={toggleSignup}>Sign Up</span></p>
          </ModalBody>
        </Modal>
      
        <Modal isOpen={modalSignup} toggle={toggleSignup} className={className}>
          <ModalBody className='modalBody'>
            {closeBtnSignup}
            <h1 style={{fontFamily: 'Bebas Neue, sans-serif'}}><i class="fas fa-ticket-alt"></i> UlasFilm</h1>
              <form noValidate onSubmit={handleSubmitSignup}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input noValidate
                    id="username"
                    type="text"
                    name="username"
                    value= {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailSignup">Email</label>
                  <input noValidate
                    id="emailSignup"
                    type="text"
                    name="emailSignup"
                    value= {emailSignup}
                    onChange = {(e) => setEmailSignup(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passSignup">Password</label>
                  <input noValidate
                    id="passSignup"
                    type="password"
                    name="passSignup"
                    value= {passSignup}
                    onChange = {(e) => setPassSignup(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passConfirmation">Password Confirmation</label>
                  <input noValidate
                    id="passConfirmation"
                    type="password"
                    name="passConfirmation"
                    value= {passConfirmation}
                    onChange = {(e) => setPassConfirmation(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn mr-2">Sign Up</button>
              </form>
              <p>Already have an account? <span onClick={toggleSignin}>Sign In</span></p>
          </ModalBody>
        </Modal>

        <Navbar className="navbar" light expand="xs">
          <div className="navi">
            <Link to='/'>
              <h1 style={{fontFamily: 'Bebas Neue, sans-serif'}}><i class="fas fa-ticket-alt"></i> UlasFilm</h1>
            </Link>
          </div>
          <div className="search-container">
            <div className='search-border'></div>
            <div className='search-box'>
              <form>
                <input className="search-input"
                  type="text"
                  placeholder="search movie ..."
                  value={searchValue}
                  onChange={(e) => {handleSearchChange(e)}}
                />
                <button type='submit' onClick={searchSubmit}><i class="fas fa-search"></i></button>
              </form>
            </div>
            <div className='search-border'></div>
          </div>
          {!props.isLoggedIn ? (<Button className='signInButton' onClick={toggleSignin}>Sign In</Button>) : (
            <UncontrolledDropdown inNavbar className='profileNavbar'>
              <DropdownToggle nav className="people">
                <img src={`http://122.248.229.2:3100${userProfile === undefined ? null : userProfile.image}`} alt="logo"></img>
                <span>{userProfile === undefined ? null : userProfile.username}</span>
                <i class="fa fa-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='profileName'>
                  {userProfile === undefined ? null : userProfile.name}
                </DropdownItem>
                <DropdownItem divider />
                <Link to={`/profile/${store === null ? null : JSON.parse(atob(store.token.split('.')[1])).user.username}`}>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                </Link>
                <DropdownItem>
                  Settings
                </DropdownItem>
                <DropdownItem>
                  Help
                </DropdownItem>
                <form>
                  <input className="search-input"
                    type="text"
                    placeholder="search movie ..."
                    value={searchValue}
                    onChange={(e) => {handleSearchChange(e)}}
                  />
                  <button type='submit' onClick={searchSubmit}><i class="fas fa-search"></i></button>
                </form>
                <DropdownItem onClick={handleSignOut}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) }
        </Navbar>
      </React.Fragment>
    </div>
  </>
  );
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({getProfileDetails});
  return {
    ...actions, dispatch
  }
}

export default connect(null, mapDispatchToProps) (NavbarHome);