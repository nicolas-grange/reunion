import React from "react";
import {h1_fournaise_dolomieu} from "../data/hikes/1_fournaise_dolomieu";
import {h2_saint_philippe_coulee_2007} from "../data/hikes/2_saint_philippe_coulee_2007";
import {h3_saint_philippe_plage_tremblet} from "../data/hikes/3_saint_philippe_plage_tremblet";
import {h4_cilaos_chapelle} from "../data/hikes/4_cilaos_chapelle";
import {h5_salazie_hellbourg_belouve} from "../data/hikes/5_salazie_hellbourg_belouve";
import {h6_maido_glaciere} from "../data/hikes/6_maido_glaciere";
import {h7_vincendo_cap_jaune} from "../data/hikes/7_vincendo_cap_jaune";

const hikes = [
  h1_fournaise_dolomieu,
  h2_saint_philippe_coulee_2007,
  h3_saint_philippe_plage_tremblet,
  h4_cilaos_chapelle,
  h5_salazie_hellbourg_belouve,
  h6_maido_glaciere,
  h7_vincendo_cap_jaune
];

const getHikeById = (hikeId) => {
  return hikes.filter(hike => hike.id === hikeId)[0];
};

export const hikesContext = {
  hikes: hikes,
  getHikeById: getHikeById
};

export const HikesContext = React.createContext(hikesContext);
