import React, {useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import classnames from 'classnames';

// actions
import {getPage1} from '../reduxsaga/actions/moviePage1Action';
import {getPage2} from '../reduxsaga/actions/moviePage2Action';
import {getPage3} from '../reduxsaga/actions/moviePage3Action';
import {getActionMovies} from '../reduxsaga/actions/movieActionAction';
import {getThrillerMovies} from '../reduxsaga/actions/movieThrillerAction';
import {getComedyMovies} from '../reduxsaga/actions/movieComedyAction';
import {getRomanceMovies} from '../reduxsaga/actions/movieRomanceAction';
import {getWibuMovies} from '../reduxsaga/actions/movieWibuAction';

// carousel images
import carousel1 from '../AssetsZuhry/images/carousel1.jpg';
import carousel2 from '../AssetsZuhry/images/carousel2.jpg';
import carousel3 from '../AssetsZuhry/images/carousel3.jpg';
import carousel4 from '../AssetsZuhry/images/carousel4.jpg';

const items = [
  {
    src: carousel1,
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: carousel2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: carousel3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: carousel4,
    altText: 'Slide 4',
    caption: 'Slide 4'
  }
];
// carousel images ends

function Main(props) {

  // get movies
  useEffect(() => {
    props.dispatch(getPage1());
    props.dispatch(getPage2());
    props.dispatch(getPage3());
    props.dispatch(getActionMovies());
    props.dispatch(getThrillerMovies());
    props.dispatch(getRomanceMovies());
    props.dispatch(getComedyMovies());
    props.dispatch(getWibuMovies());
  }, []);
  // get movies ends
  
  console.log(props.moviesPage1, 'DATA PAGE 1');
  console.log(props.moviesPage2, 'DATA PAGE 2');
  console.log(props.moviesPage3, 'DATA PAGE 3');
  console.log(props.moviesPage4, 'DATA PAGE 4');
  console.log(props.moviesAction, 'DATA ACTION');
  console.log(props.moviesThriller, 'DATA THRILLER');
  console.log(props.moviesRomance, 'DATA ROMANCE');
  console.log(props.moviesComedy, 'DATA COMEDY');
  console.log(props.moviesWibu, 'DATA WIBU');

  // get movie details
  const [idMovie, setIdMovie] = useState('');
  const getMovieId = (e) => {
    let idMovie = e.currentTarget.id;
    console.log(idMovie, 'idMovie onclick');
    setIdMovie(idMovie);
  }
  // get movie details ends

  // carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }
  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className='carouselItem'
      >
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });
  // carousel ends

  // tabs
  const [activeTab, setActiveTab] = useState('1');

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  // tabs ends

  // pagination
  const [activePage, setActivePage] = useState('1');

  const togglePage = page => {
    if(activePage !== page) setActivePage(page);
  }
  const nextPage = page => {
    let temp = parseInt(page);
    let next = temp + 1;
    if(page !== '3') setActivePage(next.toString());
  }
  const prevPage = page => {
    let temp = parseInt(page);
    let prev = temp - 1;
    if(page !== '1') setActivePage(prev.toString());
  }
  // pagination ends

  return (
    <div>
      {idMovie === '' ? null : <Redirect to={`/article/${idMovie}`} />}
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        className='mainCarousel'
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>

      <Container className='tabs'>
        <div className='tabsContainer'>
          <h1 className='tabsTitle'><i class="fas fa-tags"></i> Genre</h1>
          <Nav tabs className='tabsNav'>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggleTab('1'); }}
              >
                All
              </NavLink>
            </NavItem>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggleTab('2'); }}
              >
                Action
              </NavLink>
            </NavItem>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggleTab('3'); }}
              >
                Horror
              </NavLink>
            </NavItem>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { toggleTab('4'); }}
              >
                Comedy
              </NavLink>
            </NavItem>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '5' })}
                onClick={() => { toggleTab('5'); }}
              >
                Romance
              </NavLink>
            </NavItem>
            <NavItem className='tabsItem'>
              <NavLink
                className={classnames({ active: activeTab === '6' })}
                onClick={() => { toggleTab('6'); }}
              >
                Anime
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab} className='tabsContent'>
          <TabPane tabId="1">
            <Row>
              <Col sm="12" className='allContainer'>
                <section
                  className={classnames({ active: activePage === '1' })}
                >
                  {'movies' in props.moviesPage1 === false ? (null) : (props.moviesPage1.movies.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
                </section>
                <section
                  className={classnames({ active: activePage === '2' })}
                >
                  {'movies' in props.moviesPage2 === false ? (null) : (props.moviesPage2.movies.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
                </section>
                <section
                  className={classnames({ active: activePage === '3' })}
                >
                  {'movies' in props.moviesPage3 === false ? (null) : (props.moviesPage3.movies.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
                </section>
              </Col>
              <Pagination aria-label="Page navigation example" className='pagination'>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink first 
                      onClick={() => { togglePage('1'); }}
                    />
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink previous
                      onClick={() => { prevPage(activePage); }}
                    />
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink
                      className={classnames({ active: activePage === '1' })}
                      onClick={() => { togglePage('1'); }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink
                      className={classnames({ active: activePage === '2' })}
                      onClick={() => { togglePage('2'); }}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink
                      className={classnames({ active: activePage === '3' })}
                      onClick={() => { togglePage('3'); }}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink next 
                      onClick={() => { nextPage(activePage); }}
                    />
                  </PaginationItem>
                  <PaginationItem className='paginationItem'>
                    <PaginationLink last
                      onClick={() => { togglePage('3'); }}
                    />
                  </PaginationItem>
                </Pagination>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12" className='contentContainer'>
                  {'data' in props.moviesAction === false ? (null) : (props.moviesAction.data.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12" className='contentContainer'>
                  {'data' in props.moviesThriller === false ? (null) : (props.moviesThriller.data.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12" className='contentContainer'>
                  {'data' in props.moviesComedy === false ? (null) : (props.moviesComedy.data.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12" className='contentContainer'>
                  {'data' in props.moviesRomance === false ? (null) : (props.moviesRomance.data.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="6">
            <Row>
              <Col sm="12" className='contentContainer'>
                  {'data' in props.moviesWibu === false ? (null) : (props.moviesWibu.data.map(list => {
                    return (
                      <Link to={`/article/${idMovie}`}>
                        <div className='content' id={list.title} onClick={getMovieId}>
                          <img src={`${list.thumbnail}`} alt='Movie Poster' />
                          <h5>{list.title}</h5>
                          <p>{list.year.$numberDecimal}<span>{list.genre}</span></p>
                        </div>
                      </Link>
                    );
                  }))}
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
    moviesPage1: state.moviePage1List.moviesPage1,
    moviesPage2: state.moviePage2List.moviesPage2,
    moviesPage3: state.moviePage3List.moviesPage3,
    moviesAction: state.movieActionList.moviesAction,
    moviesThriller: state.movieThrillerList.moviesThriller,
    moviesComedy: state.movieComedyList.moviesComedy,
    moviesRomance: state.movieRomanceList.moviesRomance,
    moviesWibu: state.movieWibuList.moviesWibu
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({getPage1, getPage2, getPage3, getActionMovies, getThrillerMovies, getComedyMovies, getRomanceMovies, getWibuMovies});
  return {
    ...actions, dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Main);