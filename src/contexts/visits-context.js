import React from "react";
import {v1_maison_curcuma} from "../data/visits/1_maison_curcuma";
import {v2_maison_coco} from "../data/visits/2_maison_coco";
import {v3_far_far_kreol} from "../data/visits/3_far_far_kreol";
import {v4_sainte_suzanne_vanilleraie} from "../data/visits/4_sainte_suzanne_vanilleraie";
import {v5_saga_rhum} from "../data/visits/5_saga_rhum";
import {v6_cap_la_houssaye} from "../data/visits/6_cap_la_houssaye";
import {v7_saint_gilles} from "../data/visits/7_saint_gilles";
import {v8_saint_pierre} from "../data/visits/8_saint_pierre";
import {v9_saint_denis} from "../data/visits/9_saint_denis";
import {v10_petite_ile} from "../data/visits/10_petite_ile";
import {v11_kelonia} from "../data/visits/11_kelonia";
import {v12_jardin_parfum_epices} from "../data/visits/12_jardin_parfums_epices";

const visits = [
  v1_maison_curcuma,
  v2_maison_coco,
  v3_far_far_kreol,
  v4_sainte_suzanne_vanilleraie,
  v5_saga_rhum,
  v6_cap_la_houssaye,
  v7_saint_gilles,
  v8_saint_pierre,
  v9_saint_denis,
  v10_petite_ile,
  v11_kelonia,
  v12_jardin_parfum_epices
];

const getVisitById = (visitId) => {
  return visits.filter(visit => visit.id == visitId)[0];
};

export const visitsContext = {
  visits: visits,
  getVisitById: getVisitById
};

export const VisitsContext = React.createContext(visitsContext);
