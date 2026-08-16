import SpaceDetail from "../components/SpaceDetail";
const items=[
{eyebrow:"NEAR-EARTH OBJECT",title:"Asteroids",intro:"Primitive rock carrying a record of the early Solar System.",image:"/object-asteroid-transparent.png",facts:[["CATALOGUED","1.3M+"],["COMPOSITION","Rock / metal"]] as Array<[string,string]>,body:"Most orbit between Mars and Jupiter. A smaller population crosses Earth's orbit and is tracked continuously."},
{eyebrow:"HOME GALAXY",title:"The Milky Way",intro:"A barred spiral galaxy seen from within one of its minor arms.",image:"/object-galaxy-transparent.png",facts:[["DIAMETER","100K light-years"],["STARS","100–400B"]] as Array<[string,string]>,body:"Our Solar System circles the galactic centre once every 230 million years, about halfway out from the core."},
{eyebrow:"CELESTIAL MAP",title:"Orion",intro:"A familiar stellar pattern visible from both hemispheres.",image:"/object-constellation-transparent.png",facts:[["BRIGHTEST","Rigel"],["NEBULA","M42"]] as Array<[string,string]>,body:"The stars appear close on the sky but sit at very different distances, forming a line of sight rather than a physical group."}
];
export default function Page(){return <SpaceDetail section="DEEP SPACE ARCHIVE" title="Beyond our system." lede="Material, light and structure across distances that resist ordinary scale." items={items}/>}
