export const JOURNEY_STAGES = [
  {slug:"earth",name:"Earth",number:"01",image:"/flight-icon-earth.png",eyebrow:"HOME WORLD",title:"Begin from the blue planet.",description:"Calibrate your instruments and look back at the world every explorer calls home."},
  {slug:"planets",name:"Planets",number:"02",image:"/flight-icon-planets.png",eyebrow:"SOLAR SYSTEM",title:"Cross eight moving worlds.",description:"Compare the heat, scale and orbital rhythm of every planet around our Sun."},
  {slug:"asteroids",name:"Asteroids",number:"03",image:"/flight-icon-asteroids.png",eyebrow:"ANCIENT DEBRIS",title:"Navigate the oldest fragments.",description:"Trace rocky bodies that preserve material from the Solar System's formation."},
  {slug:"galaxy",name:"Galaxy",number:"04",image:"/flight-icon-galaxy.png",eyebrow:"THE MILKY WAY",title:"Find our place in the spiral.",description:"Move outward from the Orion Arm and read the structure of our home galaxy."},
  {slug:"constellations",name:"Constellations",number:"05",image:"/flight-icon-constellations.png",eyebrow:"CELESTIAL MAP",title:"Connect the night sky.",description:"Use recognised star patterns to navigate the celestial sphere."},
  {slug:"satellites",name:"Satellites",number:"06",image:"/flight-icon-satellites.png",eyebrow:"EARTH ORBIT",title:"Meet the machines above us.",description:"Track research, navigation and communications spacecraft around Earth."},
] as const;

export type JourneyStageSlug = typeof JOURNEY_STAGES[number]["slug"];

export function isJourneyStage(value:unknown):value is JourneyStageSlug{
  return typeof value==="string"&&JOURNEY_STAGES.some(stage=>stage.slug===value);
}
