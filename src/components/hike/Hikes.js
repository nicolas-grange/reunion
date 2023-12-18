import "./Hikes.scss";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {HikesContext} from "../../contexts/hikes-context";
import {MapActionsContext} from "../../contexts/map-actions-context";
import {ReactComponent as HikeSvg} from '../../assets/hike.svg';
import {ReactComponent as TimeSvg} from '../../assets/time.svg';


const Hikes = ({map}) => {
  const {hikes} = useContext(HikesContext);
  const {showHikes, shouldBeDisplayed} = useContext(MapActionsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldBeDisplayed()) return;
    if (map.current.loaded()) {
      showHikes(map, hikes, navigate);
    } else {
      map.current.on("load", async () => {
        showHikes(map, hikes, navigate);
      })
    }
  });

  return (
    <section className="hikes">
      <ul>
        {hikes.map(hike =>
          <li className="item" key={hike.id}>
            <a
              href={process.env.PUBLIC_URL + "/hikes/" + hike.id}
              onClick={(e) => {
                e.preventDefault();
                navigate(process.env.PUBLIC_URL + "/hikes/" + hike.id);
              }}
            >
              <img src={hike.photos[0].src} alt={hike.photos[0].title}/>
              <div className="infos">
                <h3 className="title">{hike.title}</h3>
                <ul>
                  <li>
                    <span><HikeSvg /></span>
                    <span>{hike.distance}</span>
                  </li>
                  <li>
                    <span><TimeSvg /></span>
                    <span>{hike.duration}</span>
                  </li>
                </ul>
              </div>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Hikes;
