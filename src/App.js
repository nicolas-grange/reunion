import './App.scss';
import {useRef} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import Map from "./components/map/Map";
import Hikes from "./components/hike/Hikes";
import Hike from "./components/hike/Hike";
import Visits from "./components/visit/Visits";
import Visit from "./components/visit/Visit";

function App() {
  const map= useRef(null);

  return (
    <div className="app">
      <header className="header">
        <NavBar />
      </header>
      <div className="map-container">
        <Map map={map}/>
      </div>
      <div className="main">
        <Routes>
          <Route path={process.env.PUBLIC_URL + "/hikes"} element=<Hikes map={map}/>/>
          <Route path={process.env.PUBLIC_URL + "/hikes/:hikeId"} element=<Hike map={map}/>/>
          <Route path={process.env.PUBLIC_URL + "/visits"} element=<Visits map={map}/>/>
          <Route path={process.env.PUBLIC_URL + "/visits/:visitId"} element=<Visit map={map}/>/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
