import "./Visits.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MapActionsContext} from "../../contexts/map-actions-context";
import {VisitsContext} from "../../contexts/visits-context";
import {ReactComponent as CameraSvg} from '../../assets/camera.svg';

const Visits = ({map}) => {
  const {visits} = useContext(VisitsContext);
  const {showVisits, shouldBeDisplayed} = useContext(MapActionsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldBeDisplayed()) return;
    if (map.current.loaded()) {
      showVisits(map, visits, navigate);;
    } else {
      map.current.on("load", async () => {
        showVisits(map, visits, navigate);;
      })
    }
  });

  return (
    <section className="visits">
      <ul>
        {visits.map(visit =>
          <li className="item" key={visit.id}>
            <a
              href={process.env.PUBLIC_URL + "/visits/" + visit.id}
              onClick={(e) => {
                e.preventDefault();
                navigate(process.env.PUBLIC_URL + "/visits/" + visit.id);
              }}
            >
              <img src={visit.photos[0].src} alt={visit.photos[0].title}/>
              <div className="infos">
                <h3 className="title">{visit.title}</h3>
                <h4 className="subtitle"><CameraSvg />{visit.subTitle}</h4>
              </div>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Visits;
