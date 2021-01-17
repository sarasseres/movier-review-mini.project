import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { Container, Jumbotron, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

function Article(props) {

  // get movies by title
  const [movies, setMovies] = useState(null);
  let {movieId} = useParams();
  useEffect(() => {
    const urlMovies = `https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/home/find/${movieId}`;
    axios.get(urlMovies).then(res => {
      setMovies(res.data);
    })
  }, []);
  let movieDetail;
  movies === null ? movieDetail = null : movieDetail = movies.movies[0];
  // get movies by title ends
  // console.log(movieDetail, 'MOVIES BARU');

  // cast
  const [cast, setCast] = useState({data: []});
  let castData;
  if(movieDetail !== null) {
    const urlCast = `https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/cast/${movieId}`;
    axios.get(urlCast).then((res) => {
      setCast(res.data);
    });
    castData = cast.data;
  }
  // cast ends

  // review
  const [review, setReview] = useState({data: []});
  const urlReview = `https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/review/title/${movieId}`;
  useEffect(() => {
    axios.get(urlReview).then((res) => {
      setReview(res.data);
    });
  }, []);
  let reviewData = review.data;
  console.log(reviewData, 'DONE STATE REVIEW');
  // review ends

  // tabs
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  // tabs ends

  // styles
  const jumbotron= {
    background: `url(${movieDetail === null ? null : movieDetail.header}) no-repeat`
  }
  // styles ends

  // post review
  let userProfile = props.profile;
  const [reviewed, setReviewed] = useState(false);
  const [myReview, setMyReview] = useState('');
  console.log(myReview, 'REVIEW')
  const urlPostReview = 'https://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100/review/create';
  const postReview = (e) => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}` }
    };
    const bodyParameters = {
      username: userProfile.username,
      title: movieId,
      comment: myReview,
      rating: rating
    };
    console.log(bodyParameters, 'PARAMETER')
    axios.post( 
      urlPostReview,
      bodyParameters,
      config
    ).then(res => {
      console.log(res.data, 'POST REVIEW SUCCESS');
      setReviewed(true);
    }).catch(console.log);
  }
  // post review ends
  // console.log(userProfile, 'PROFILE PASSED');

  // watchlist
  const addWatch = () => {
    props.setWatch([...props.watch, movieId]);
  }
  // watchlist

  // star rating
  const [rating, setRating] = useState(0);
  let n = 2.5;
  const starRating = {
    size: 15,
    count: 5,
    // color: "black",
    // activeColor: "red",
    edit: false,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
  };
  const star = {
    size: 23,
    count: 5,
    // color: "black",
    // activeColor: "red",
    edit: true,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      console.log(`Example 2: new value is ${newValue}`);
      setRating(newValue);
    }
  }
  console.log(rating, 'RATING');
  // console.log(review.ave, 'LOOK');
  // console.log(starRating.value, 'STARVALUE');
  // const onStarClick = (nextValue, prevValue, name) => {
  //   setRating(nextValue);
  //   console.log(nextValue, 'LOOK')
  // }
  // star rating ends

  return (
    <div>      
      <Jumbotron className='jumbotron' style={jumbotron}>
        <h1 className="display-3">{movieDetail === null ? null : movieDetail.title}</h1>
        <div>
          <ReactStars value={Math.round(review.ave)} classNames='star' {...starRating} />
          <span className='ave'>{Math.round(review.ave)}/5</span>
          <span>{review.total_of_reviewer} review(s)</span>
        </div>
        <p>{movieDetail === null ? null : movieDetail.synopsis}</p>
        <a href={movieDetail === null ? null : movieDetail.trailer} target='_blank'><button className='trailer'><i class="fas fa-play"></i> Trailer</button></a>
        <button className='watchlist' onClick={props.isLoggedIn ? addWatch : () => alert('You Should Sign In first')}><i class="fas fa-plus"></i> Watchlist</button>
      </Jumbotron>

      <Container className='tabs'>
        <Nav tabs className='tabsNav'>
          <NavItem className='tabsItem'>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { toggle('1'); }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem className='tabsItem'>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Cast
            </NavLink>
          </NavItem>
          <NavItem className='tabsItem'>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Review
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className='tabsContent'>
          <TabPane tabId="1">
            <Row>
              <Col sm="12" className='contentContainer'>
                <div className='overviewLine'>
                  <h4>Synopsis</h4>
                </div>
                <p>{movieDetail === null ? null : movieDetail.synopsis}</p>
                <div className='overviewLine'>
                  <h4>Movie Info</h4>
                </div>
                <p><b>Genre:</b> {movieDetail === null ? null : movieDetail.genre}</p>
                <p><b>Release:</b> {movieDetail === null ? null : movieDetail.year.$numberDecimal}</p>
                <p><b>Director:</b> {movieDetail === null ? null : movieDetail.director}</p>
                <p><b>Production:</b> {movieDetail === null ? null : movieDetail.production}</p>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12" className='castContainer'>
                {castData === undefined ? null : (castData.map(list => {
                  return (
                    <div class='cast'>
                      <img src={`${list.image}`}/>
                      <h5>{list.name}</h5>
                      <p>{list.as}</p>
                    </div>
                  );
                }))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12" className='reviewContainer'>
                {props.isLoggedIn && !reviewed ? (
                  <div className='review'>
                    <div className='reviewLeft'>
                      <img src={userProfile === undefined ? null : `hhttps://ec2-122-248-229-2.ap-southeast-1.compute.amazonaws.com:3100${userProfile.image}`} />
                    </div>
                    <div className='reviewRight'>
                      <h4>{userProfile === undefined ? null : userProfile.username}</h4>
                      <div><ReactStars value={rating} classNames='star' {...star} /></div>
                      <form>
                        <textarea placeholder='type your review here ...' onChange={(e) => setMyReview(e.target.value)}/>
                        <button type='submit' onClick={postReview}>Post</button>
                      </form>
                    </div>
                  </div>
                ) : null }
                {reviewData.map(list => {
                  return (
                    <div className='review'>
                      <div className='reviewLeft'>
                        <img />
                      </div>
                      <div className='reviewRight'>
                        <h4>{list.username}</h4>
                        <div><ReactStars value={list.rating} classNames='star' {...starRating} /></div>
                        <p>{list.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.userProfile.profile
  }
}

export default connect(mapStateToProps) (Article);