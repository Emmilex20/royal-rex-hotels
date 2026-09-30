"use client";
import {motion} from "framer-motion";
import {Play} from "lucide-react";
import {useState} from "react";
export default function HotelFilm(){
 const [playing,setPlaying]=useState(false);
 return <section className="hotel-film-section"><div className="shell">
  <motion.div className="film-heading" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.75}}>
   <div><p className="eyebrow">Inside Royal Rex</p><h2 className="display">See the experience.<br/><i>Feel the difference.</i></h2></div>
   <p>A closer look at Royal Rex Hotels & Spa — the spaces, atmosphere and hospitality that shape every visit.</p>
  </motion.div>
  <motion.div className="film-frame" initial={{opacity:0,y:45,scale:.985}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.15}} transition={{duration:.85,ease:[.2,.8,.2,1]}}>
   {playing?<iframe src="https://www.youtube.com/embed/Mm69CcMAa8c?autoplay=1&rel=0&modestbranding=1" title="Royal Rex Hotels & Spa video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button className="film-poster" onClick={()=>setPlaying(true)} aria-label="Play Royal Rex Hotels video"><img src="https://img.youtube.com/vi/Mm69CcMAa8c/maxresdefault.jpg" alt="Royal Rex Hotels and Spa video"/><span className="film-shade"/><span className="film-play"><i><Play size={20} fill="currentColor"/></i><span><b>Watch Royal Rex</b><small>Hotel tour · Lagos</small></span></span><span className="film-corner">Official hotel film</span></button>}
  </motion.div>
 </div></section>
}