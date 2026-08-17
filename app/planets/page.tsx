import SpaceDetail from "../components/SpaceDetail";

export const dynamic = "force-static";

const items=[
  {eyebrow:"INNER PLANET",title:"Mercury",intro:"The smallest planet and the fastest traveller around the Sun.",image:"/planet-mercury-transparent.png",facts:[["DAY","59 Earth days"],["DISTANCE","57.9M km"]] as Array<[string,string]>,body:"With almost no atmosphere to hold heat, Mercury moves between severe temperature extremes."},
  {eyebrow:"INNER PLANET",title:"Venus",intro:"A world wrapped in reflective clouds and crushing pressure.",image:"/planet-venus-transparent.png",facts:[["DAY","243 Earth days"],["PRESSURE","92 bar"]] as Array<[string,string]>,body:"Venus rotates backwards and slower than any other planet, while its surface remains hot enough to melt lead."},
  {eyebrow:"OCEAN PLANET",title:"Earth",intro:"A dynamic planet shaped by water, plate tectonics and life.",image:"/planet-earth-transparent.png",facts:[["AGE","4.54B years"],["WATER","71% surface"]] as Array<[string,string]>,body:"A protective magnetic field and active atmosphere maintain the only biosphere we currently know."},
  {eyebrow:"INNER PLANET",title:"Mars",intro:"A cold desert world marked by volcanoes, canyons and ancient river valleys.",image:"/planet-mars-transparent.png",facts:[["DAY","24.6 hours"],["DISTANCE","227.9M km"]] as Array<[string,string]>,body:"Iron minerals colour the surface red, while polar ice and sediment preserve evidence of a wetter early climate."},
  {eyebrow:"GAS GIANT",title:"Jupiter",intro:"The largest planet, surrounded by powerful storms and a vast magnetic field.",image:"/planet-jupiter-transparent.png",facts:[["DAY","9.9 hours"],["DISTANCE","778.5M km"]] as Array<[string,string]>,body:"Jupiter contains more than twice the mass of every other planet combined and hosts the long-lived Great Red Spot."},
  {eyebrow:"GAS GIANT",title:"Saturn",intro:"A pale giant encircled by the most extensive ring system in the Solar System.",image:"/planet-saturn-transparent.png",facts:[["DAY","10.7 hours"],["RINGS","7 groups"]] as Array<[string,string]>,body:"Saturn is less dense than water. Its thin, bright rings are formed from countless pieces of ice and rock."},
  {eyebrow:"ICE GIANT",title:"Uranus",intro:"A blue-green world rotating almost completely on its side.",image:"/planet-uranus-transparent.png",facts:[["DAY","17.2 hours"],["TILT","97.8°"]] as Array<[string,string]>,body:"Methane in the upper atmosphere shapes its colour, while an extreme axial tilt produces unusual seasonal cycles."},
  {eyebrow:"ICE GIANT",title:"Neptune",intro:"The distant blue planet driven by the fastest winds in the Solar System.",image:"/planet-neptune-transparent.png",facts:[["YEAR","164.8 years"],["DISTANCE","4.5B km"]] as Array<[string,string]>,body:"Neptune receives little sunlight, yet internal heat powers dynamic clouds, dark storms and supersonic winds."},
];

export default function Page(){return <SpaceDetail section="PLANETARY ARCHIVE" title="Worlds in motion." lede="Meet all eight planets orbiting a star system formed 4.6 billion years ago." items={items}/>}
