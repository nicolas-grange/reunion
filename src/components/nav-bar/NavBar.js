import "./NavBar.scss";
import {ReactComponent as HikeSvg} from '../../assets/hike.svg';
import {ReactComponent as CameraSvg} from '../../assets/camera.svg';
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="main-nav-bar">
      <ul>
        <li>
          <NavLink to={process.env.PUBLIC_URL + "/hikes"}>
            <HikeSvg />Randonnées
          </NavLink>
        </li>
        <li>
          <NavLink to={process.env.PUBLIC_URL + "/visits"}>
            <CameraSvg />Visites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
