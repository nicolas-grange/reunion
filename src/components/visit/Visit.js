import "./Visit.scss";
import Parser from 'html-react-parser';
import GalleryGrid from "../gallery/GalleryGrid";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {MapActionsContext} from "../../contexts/map-actions-context";
import {VisitsContext} from "../../contexts/visits-context";

const Visit = ({map}) => {
  const {visits, getVisitById} = useContext(VisitsContext);
  const {selectVisit} = useContext(MapActionsContext);
  const {visitId} = useParams();
  const navigate = useNavigate();
  const visit = getVisitById(visitId);

  useEffect(() => {
    if (!visit) {
      return;
    }
    if (map.current.loaded()) {
      selectVisit(map, visits, visit, navigate);
    } else {
      map.current.on("load", async () => {
        selectVisit(map, visits, visit, navigate);
      })
    }
  });

  return (
    visit != null ?
      <section className="visit">
        <div className="visit-content">
          <h2 className="visit-title">{visit.title}</h2>
          <div className="visit-description">
            {Parser(visit.description)}
          </div>
        </div>
        <div className="visit-photos">
          <GalleryGrid photos={visit.photos} />
        </div>
      </section>
      :
      <section className="visit">
        <div className="visit-content">
          <h2 className="visit-title">Aucune visite trouvée...</h2>
        </div>
      </section>
  );
};

export default Visit;
