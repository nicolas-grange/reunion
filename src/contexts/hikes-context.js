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
import {h10_mafate_maido_roche_plate} from "../data/hikes/10_mafate_maido_roche_plate";
import {h11_tampon_grand_bassin} from "../data/hikes/11_tampon_grand_bassin";
import {h12_etang_sale} from "../data/hikes/12_etang_sale";
import {h13_entre_deux_sentier_jacky_inard} from "../data/hikes/13_entre_deux_sentier_jacky_inard";
import {h14_cilaos_bras_rouge_bassin_alfred} from "../data/hikes/14_cilaos_bras_rouge_bassin_alfred";
import {h15_cilaos_bras_sec_puy_maillot_cilaos_centre} from "../data/hikes/15_cilaos_bras_sec_puy_maillot_cilaos_centre";
import {h16_sainte_rose_anse_cascade_notre_dame_des_laves} from "../data/hikes/16_sainte_rose_anse_cascade_notre_dame_des_laves";

const hikes = [
  h1_fournaise_dolomieu,
  h2_saint_philippe_coulee_2007,
  h3_saint_philippe_plage_tremblet,
  h4_cilaos_chapelle,
  h5_salazie_hellbourg_belouve,
  h6_maido_glaciere,
  h7_vincendo_cap_jaune,
  h8_grand_galet_cap_blanc,
  h9_mafate_sans_souci_ilet_orangers_canalisation,
  h10_mafate_maido_roche_plate,
  h11_tampon_grand_bassin,
  h12_etang_sale,
  h13_entre_deux_sentier_jacky_inard,
  h14_cilaos_bras_rouge_bassin_alfred,
  h15_cilaos_bras_sec_puy_maillot_cilaos_centre,
  h16_sainte_rose_anse_cascade_notre_dame_des_laves
];

const getHikeById = (hikeId) => {
  return hikes.filter(hike => hike.id === hikeId)[0];
};

export const hikesContext = {
  hikes: hikes.reverse(),
  getHikeById: getHikeById
};

export const HikesContext = React.createContext(hikesContext);
