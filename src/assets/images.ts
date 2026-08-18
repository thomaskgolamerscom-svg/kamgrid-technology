// Centralized local asset directory for KAMGRID TECHNOLOGY visual assets
import solarEngineerHero from './images/solar_engineer_duty_1787022968614.jpg';
import solarServiceImg from './images/kamgrid_solar_install_1787024385076.jpg';
import cctvServiceImg from './images/kamgrid_cctv_install_1787024398374.jpg';
import electricalServiceImg from './images/kamgrid_electrical_eng_1787024413025.jpg';
import lightningServiceImg from './images/kamgrid_lightning_prot_1787024424719.jpg';
import networkServiceImg from './images/kamgrid_network_cable_1787024445474.jpg';
import engTeamImg from './images/kamgrid_eng_team_1787024460034.jpg';
import commercialProjImg from './images/kamgrid_comm_proj_1787024473045.jpg';
import projectSolarBankImg from './images/kamgrid_solar_bank_1787024486901.jpg';
import projectRoofSolarImg from './images/kamgrid_roof_solar_1787024500895.jpg';

export const KAMGRID_IMAGES = {
  hero: solarEngineerHero,
  services: {
    solar: solarServiceImg,
    cctv: cctvServiceImg,
    electrical: electricalServiceImg,
    lightning: lightningServiceImg,
    structuredCabling: networkServiceImg,
  },
  about: {
    teamInspection: engTeamImg,
    facility: commercialProjImg,
  },
  capability: {
    commercialInfrastructure: commercialProjImg,
    engineeringTeam: engTeamImg,
  },
  projects: {
    enugu33Kva: [
      projectRoofSolarImg,
      projectSolarBankImg,
      solarServiceImg,
    ],
  },
  fallback: solarEngineerHero,
};
