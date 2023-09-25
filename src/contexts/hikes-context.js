import React from "react";
import {h1_fournaise_dolomieu} from "../data/hikes/1_fournaise_dolomieu";
import {h2_saint_philippe_coulee_2007} from "../data/hikes/2_saint_philippe_coulee_2007";
import {h3_saint_philippe_plage_tremblet} from "../data/hikes/3_saint_philippe_plage_tremblet";
import {h4_cilaos_chapelle} from "../data/hikes/4_cilaos_chapelle";
import {h5_salazie_hellbourg_belouve} from "../data/hikes/5_salazie_hellbourg_belouve";
import {h6_maido_glaciere} from "../data/hikes/6_maido_glaciere";
import {h7_vincendo_cap_jaune} from "../data/hikes/7_vincendo_cap_jaune";
import {h8_grand_galet_cap_blanc} from "../data/hikes/8_grand_galet_cap_blanc";
import {h9_mafate_sans_souci_ilet_orangers_canalisation} from "../data/hikes/9_mafate_sans_souci_ilet_orangers_canalisation";

const hikes = [
  h1_fournaise_dolomieu,
  h2_saint_philippe_coulee_2007,
  h3_saint_philippe_plage_tremblet,
  h4_cilaos_chapelle,
  h5_salazie_hellbourg_belouve,
  h6_maido_glaciere,
  h7_vincendo_cap_jaune,
  h8_grand_galet_cap_blanc,
  h9_mafate_sans_souci_ilet_orangers_canalisation
];

const getHikeById = (hikeId) => {
  return hikes.filter(hike => hike.id === hikeId)[0];
};

export const hikesContext = {
  hikes: hikes.reverse(),
  getHikeById: getHikeById
};

export const HikesContext = React.createContext(hikesContext);
