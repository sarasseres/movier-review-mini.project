import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {Redirect, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {Container, Modal, ModalBody} from 'reactstrap';

// actions
import {getPage1} from '../reduxsaga/actions/moviePage1Action';
import {getPage2} from '../reduxsaga/actions/moviePage2Action';
import {getPage3} from '../reduxsaga/actions/moviePage3Action';

const Profile = (props) => {

  // get all movies
  useEffect(() => {
    props.dispatch(getPage1());
    props.dispatch(getPage2());
    props.dispatch(getPage3());
  }, []);

  console.log(props.moviesPage3, 'MOVIE PAGE 3');
  // let moviePage1 = [];
  // let moviePage2 = [];
  // let moviePage3 = [];
  let movies = [...props.moviesPage1.movies, ...props.moviesPage2.movies, ...props.moviesPage3.movies];
  let watch = props.watch;
  let watchlist = [];
  if(movies !== undefined) {
    for(let i = 0; i < movies.length; i++) {
      for(let x = 0; x < watch.length; x++) {
        if(movies[i].title === watch[x]) {
          watchlist.push(movies[i]);
        }
      }
    }
    
    // console.log(movies[0].id, 'ID WATCH1');
    // console.log(watch[0], 'ID WATCH2')
    // console.log(watchlist, 'WATCHLIST PROFILEEE')
  }

  // console.log(props.movies.movies, 'DAFTAR MOVIEEES');

  // modal
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
  // modal ends

  // get all profiles
  const [profile, setProfile] = useState([]);
  let { profileName } = useParams();
  useEffect(() => {
    axios.get('https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/').then(res => {
      setProfile(res.data.data);
        });
  }, []);
  let userProfile = profile.find(arr => arr.username === profileName);
  useEffect(() => {
    const urlProfile = `https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/profile/${profileName}` 
    const config = {
      headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}` }
    };
    const bodyParameters = {
      key: "value"
    };
    axios.get( 
      urlProfile,
      bodyParameters,
      config
    ).then(res => {
      console.log(res.data, 'SUCCESS')
    }).catch(console.log);
  }, []);
  // console.log(JSON.parse(localStorage.getItem('login')).token, 'TOKEN');
  console.log(profileName, 'PARAM GOT');
  console.log(userProfile, 'MY PROFILE');
  // get all profiles ends

  // update profile
  const urlUpdate = `https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/profile/update/${profileName}`
  const updateProfile = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      username: username,
      email: email,
      gender: gender,
      image: image,
      password: password,
    }
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}` }
    };
    axios.post(urlUpdate, data, config).then(res => {
      console.log(res.data, 'update profile success');
    }).then(() => {
      setModal(false);
    });
  }
  // update profile ends

  return (
    <>
    {props.isLoggedIn ? null : <Redirect to='/' />}
      <Container className='profile'>
        <div className='profileLine'>
          <h4>Profile</h4>
        </div>
        <div className='profileContainer'>
          <div className='profileLeft'>
            <img src={userProfile === undefined ? null : `http://122.248.229.2:3100${userProfile.image}`} />
            <div className='profileInfoContainer'>
              <p>Full Name: <span>{userProfile === undefined ? null : userProfile.name}</span></p>
              <p>Username: <span>{userProfile === undefined ? null : userProfile.username}</span></p>
              <p>E-mail: <span>{userProfile === undefined ? null : '-'}</span></p>
              <p>Gender: <span>{userProfile === undefined ? null : '-'}</span></p>
              <p>ID: <span>{userProfile === undefined ? null : userProfile.id}</span></p>
            </div>
            <button onClick={toggle}>Edit Profile</button>
          </div>
          <div className='profileRight'>
            <h5>Watchlist</h5>
            <div className='watchlist'>
              {watchlist.map(list => {
                return (
                  // <Link to={`/article/${idMovie}`}>
                    <div className='content' id={list.id}>
                      <img src={`${list.thumbnail}`} alt='Movie Poster' />
                      <h5>{list.title}</h5>
                      <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                    </div>
                  /* </Link> */
                );
              })}
            </div>
          </div>
        </div>

        < Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalBody className='modalBody'>
            {closeBtn}
            <h1 style={{fontWeight:'600'}}>Profile</h1>
            <form noValidate onSubmit={updateProfile}>
                <div className="form-group">
                  <input noValidate 
                    type="name"
                    name="name"
                    value={name}
                    placeholder='Full Name'
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input noValidate 
                    type="username"
                    name="username"
                    value={username}
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input noValidate 
                    type="email"
                    name="email"
                    value={email}
                    placeholder='E-mail'
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input noValidate 
                    type="gender"
                    name="gender"
                    placeholder='Gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input noValidate 
                    type="password"
                    name="password"
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                <label htmlFor="image">Profile Picture</label>
                  <input noValidate 
                    type="file"
                    name="image"
                    value={image}
                    placeholder='Profile Picture'
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn mr-2">Update</button>
            </form>
          </ModalBody>
        </Modal>

      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    moviesPage1: state.moviePage1List.moviesPage1,
    moviesPage2: state.moviePage2List.moviesPage2,
    moviesPage3: state.moviePage3List.moviesPage3,
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({getPage1, getPage2, getPage3});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);