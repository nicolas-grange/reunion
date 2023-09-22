import React from "react";
import {v1_maison_curcuma} from "../data/visits/1_maison_curcuma";
import {v2_maison_coco} from "../data/visits/2_maison_coco";
import {v3_far_far_kreol} from "../data/visits/3_far_far_kreol";
import {v4_sainte_suzanne_vanilleraie} from "../data/visits/4_sainte_suzanne_vanilleraie";

const visits = [
  v1_maison_curcuma,
  v2_maison_coco,
  v3_far_far_kreol,
  v4_sainte_suzanne_vanilleraie
];

const getVisitById = (visitId) => {
  return visits.filter(visit => visit.id === visitId)[0];
};

export const visitsContext = {
  visits: visits,
  getVisitById: getVisitById
};

export const VisitsContext = React.createContext(visitsContext);
