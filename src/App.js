import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {Provider} from 'react-redux';

// import components
import NavbarHome from './Components/NavbarHome';
import Article from './Components/Article';
import Main from './Components/Main';
import Footer from './Components/Footer';
import Search from './Components/Search';
import Profile from './Components/Profile';

// import css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsZuhry/icons/css/all.min.css';

// import redux
import store from './reduxsaga/index';

function App() {
  
  // const store = configureStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watch, setWatch] = useState([]);

  console.log(watch, 'WATCHLIST');
  
  return (
    <div>
      <Provider store={store}>

        <NavbarHome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Switch>
        <Route path="/profile/:profileName">
            <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  watch={watch} setWatch={setWatch} />
          </Route>
          <Route path="/search/:value">
            <Search />
          </Route>
          <Route path="/article/:movieId">
            <Article isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  watch={watch} setWatch={setWatch} />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>

        <Footer />

      </Provider>
    </div>
  );
}

export default App;
