"use client";
import {useMemo,useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {CalendarDays,Users,BedDouble,ArrowRight,ShieldCheck,Phone,Mail,Check} from "lucide-react";
import {rooms} from "@/lib/data";

const money=(v:string)=>Number(v.replace(/[^0-9]/g,""));
export default function BookingExperience(){
 const [room,setRoom]=useState(rooms[0].slug);const [guests,setGuests]=useState("2");const [cin,setCin]=useState("");const [cout,setCout]=useState("");
 const selected=rooms.find(r=>r.slug===room)!;
 const nights=useMemo(()=>{if(!cin||!cout)return 1;const n=Math.ceil((new Date(cout).getTime()-new Date(cin).getTime())/86400000);return Math.max(1,n)},[cin,cout]);
 const total=money(selected.price)*nights;
 return <main className="booking-v2">
  <section className="bk-hero"><div className="bk-hero-image"/><div className="bk-hero-shade"/><div className="shell bk-hero-copy"><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.75}}><p className="eyebrow">Direct reservations</p><h1 className="display">Your stay,<br/><i>beautifully planned.</i></h1><p>Choose your room and dates. We’ll make the rest feel effortless.</p></motion.div></div></section>
  <section className="bk-body theme-surface"><div className="shell bk-layout">
   <div className="bk-form">
    <div className="bk-heading"><span>01</span><div><p className="eyebrow">Plan your stay</p><h2 className="display">When will we<br/><i>welcome you?</i></h2></div></div>
    <div className="bk-date-grid"><label><CalendarDays/><span>Check in</span><input type="date" value={cin} onChange={e=>setCin(e.target.value)}/></label><label><CalendarDays/><span>Check out</span><input type="date" value={cout} onChange={e=>setCout(e.target.value)}/></label><label><Users/><span>Guests</span><select value={guests} onChange={e=>setGuests(e.target.value)}><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4 Guests</option></select></label></div>
    <div className="bk-room-head"><span>02</span><div><p className="eyebrow">Choose your room</p><h2 className="display">Find your <i>fit.</i></h2></div></div>
    <div className="bk-room-list">{rooms.map((r,i)=><motion.button key={r.slug} onClick={()=>setRoom(r.slug)} className={"bk-room-option "+(room===r.slug?"selected":"")} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}}><img src={r.image} alt=""/><div><b className="display">{r.name}</b><small>{r.size} · {r.guests}</small></div><span><strong>{r.price}</strong><small>/ night</small></span>{room===r.slug&&<i><Check size={14}/></i>}</motion.button>)}</div>
   </div>
   <aside className="bk-summary"><div className="bk-summary-card"><p className="eyebrow">Your reservation</p><h3 className="display">{selected.name}</h3><div className="bk-summary-image"><img src={selected.image} alt={selected.name}/></div><div className="bk-summary-lines"><p><span>Dates</span><b>{cin||"Select check-in"} <small>→</small> {cout||"check-out"}</b></p><p><span>Guests</span><b>{guests} {guests==="1"?"Guest":"Guests"}</b></p><p><span>Stay</span><b>{nights} {nights===1?"Night":"Nights"}</b></p><p><span>Nightly rate</span><b>{selected.price}</b></p></div><div className="bk-total"><span>Estimated total</span><strong>₦{total.toLocaleString()}</strong></div><Link href="/contact" className="bk-continue">Continue reservation <ArrowRight size={17}/></Link><div className="bk-assurance"><ShieldCheck size={16}/><span>Direct with Royal Rex Hotels & Spa</span></div></div><div className="bk-help"><p>Need a little help?</p><a href="tel:+2349032691381"><Phone size={14}/> Call reservations</a><a href="mailto:reservation@royalrexhotels.com"><Mail size={14}/> Email us</a></div></aside>
  </div></section>
 </main>
}