import "./Hike.scss";
import Parser from 'html-react-parser';
import GalleryGrid from "../gallery/GalleryGrid";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {HikesContext} from '../../contexts/hikes-context';
import {MapActionsContext} from "../../contexts/map-actions-context";

const Hike = ({map}) => {
  const {hikes, getHikeById} = useContext(HikesContext);
  const {selectHike, shouldBeDisplayed} = useContext(MapActionsContext);
  const {hikeId} = useParams();
  const navigate = useNavigate();
  const hike = getHikeById(hikeId);

  useEffect(() => {
    if (!shouldBeDisplayed()) return;
    if (!hike) {
      return;
    }
    if (map.current.loaded()) {
      selectHike(map, hikes, hike, navigate);
    } else {
      map.current.on("load", async () => {
        selectHike(map, hikes, hike, navigate);
      })
    }
  });

  return (
    hike != null ?
      <section className="hike">
        <div className="hike-content">
          <h2 className="hike-title">{hike.title}</h2>
          <div className="hike-numbers">
            <div>
              <span className="hike-numbers-title">Difficulté</span>
              <span className="hike-numbers-content">{hike.difficulty}</span>
            </div>
            <div>
              <span className="hike-numbers-title">Distance</span>
              <span className="hike-numbers-content">{hike.distance}</span>
            </div>
            <div>
              <span className="hike-numbers-title">Dénivelé positif</span>
              <span className="hike-numbers-content">{hike.positiveElevation}</span>
            </div>
            <div>
              <span className="hike-numbers-title">Durée</span>
              <span className="hike-numbers-content">{hike.duration}</span>
            </div>
          </div>
          <div className="hike-description">
            {Parser(hike.description)}
          </div>
        </div>
        <div className="hike-photos">
          <GalleryGrid photos={hike.photos} />
        </div>
      </section>
      :
      <section className="hike">
        <div className="hike-content">
          <h2 className="hike-title">Aucune randonnée trouvée...</h2>
        </div>
      </section>
  );
};

export default Hike;
