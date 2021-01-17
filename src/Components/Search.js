import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {Redirect, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {Container} from 'reactstrap';

// actions
import {getMovieDetails} from '../reduxsaga/actions/movieDetailAction';

const Search = (props) => {

  let { value } = useParams();

  // get search data
  const [searchData, setSearchData] =useState([]);
  useEffect(() => {
    axios.get(`https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/home/find/${value}`)
    .then(response => {
      console.log(response.data.movies, 'success');
      setSearchData(response.data.movies);
    })
  }, []);
  // get search data ends

  // get movie details
  const [idMovie, setIdMovie] = useState('');
  const getMovieId = (e) => {
    let idMovie = e.currentTarget.id;
    console.log(idMovie, 'idMovie onclick');
    setIdMovie(idMovie);
  }
  console.log(idMovie, 'ID CUYY');
  // get movie details ends

  return (
    <>
      {idMovie === '' ? null : <Redirect to={`/article/${idMovie}`} />}
      <Container className='search'>
        <div className='searchLine'>
          <h4>Search Results</h4>
        </div>
        <p>for <span>"{value}"</span></p>
        <div className='searchContainer'>
          {searchData.map(list => {
            return (
                <div className='content' id={list.title} onClick={getMovieId}>
                  <img src={`${list.thumbnail}`} alt='Movie Poster' />
                  <h5>{list.title}</h5>
                  <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}


const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({getMovieDetails});
  return {
    ...actions, dispatch
  }
}

export default connect(null, mapDispatchToProps) (Search);