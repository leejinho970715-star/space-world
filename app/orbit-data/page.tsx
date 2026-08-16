import SpaceDetail from "../components/SpaceDetail";
const items=[
{eyebrow:"EARTH OBSERVATION",title:"Orbital instruments",intro:"Spacecraft turn altitude into a continuous view of a changing planet.",image:"/object-satellite-transparent.png",facts:[["ACTIVE OBJECTS","11.7K+"],["LEO ALTITUDE","160–2,000 km"]] as Array<[string,string]>,body:"Optical, radar and atmospheric instruments monitor weather, agriculture, oceans, ice and environmental change."},
{eyebrow:"ORBITAL DYNAMICS",title:"A moving network",intro:"Every satellite is falling around Earth at several kilometres per second.",image:"/planet-earth-transparent.png",facts:[["LEO SPEED","7.8 km/s"],["PERIOD","~90 minutes"]] as Array<[string,string]>,body:"Altitude, inclination and timing are carefully coordinated to create reliable coverage while avoiding conjunctions."}
];
export default function Page(){return <SpaceDetail section="ORBITAL OPERATIONS" title="Machines above us." lede="A working layer of observation, communication and navigation around Earth." items={items}/>}
