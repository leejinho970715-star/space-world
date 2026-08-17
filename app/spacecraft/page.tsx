import SpaceDetail from "../components/SpaceDetail";

export const dynamic = "force-static";

const items=[
 {eyebrow:"CREW EXPLORATION VEHICLE",title:"Orion",intro:"A crew spacecraft developed for missions beyond low Earth orbit.",image:"/spacecraft-orion-transparent.png",facts:[["ROLE","Crew transport"],["CREW","Up to 4"]] as Array<[string,string]>,body:"Orion combines a pressurized crew module, service module, launch-abort capability and a heat shield designed for high-energy returns from lunar distance."},
 {eyebrow:"INTERSTELLAR MESSENGER",title:"Voyager 1",intro:"A robotic explorer that transformed our view of the outer planets.",image:"/spacecraft-voyager-transparent.png",facts:[["LAUNCHED","1977"],["POWER","Radioisotope"]] as Array<[string,string]>,body:"Voyager 1 studied Jupiter and Saturn before continuing outward. Its high-gain antenna maintains a narrow communications link across immense distance."},
 {eyebrow:"SOLAR OBSERVATORY",title:"Parker Solar Probe",intro:"A spacecraft engineered to sample the environment close to the Sun.",image:"/spacecraft-parker-transparent.png",facts:[["LAUNCHED","2018"],["TARGET","Solar corona"]] as Array<[string,string]>,body:"A carbon-composite heat shield protects the instruments while repeated Venus gravity assists reshape the probe’s orbit for increasingly close solar passes."},
 {eyebrow:"REUSABLE ORBITAL SYSTEM",title:"Space Shuttle",intro:"A winged orbiter that launched like a rocket and landed like an aircraft.",image:"/spacecraft-shuttle-transparent.png",facts:[["ERA","1981–2011"],["MISSIONS","135"]] as Array<[string,string]>,body:"The Space Shuttle carried satellites, laboratories and crews, helped assemble the International Space Station and returned large payloads from orbit."},
];

export default function Page(){return <SpaceDetail section="NASA SPACECRAFT ARCHIVE" title="Built for the impossible." lede="Four machines shaped by four environments: lunar distance, interstellar space, the solar corona and low Earth orbit." items={items}/>}
