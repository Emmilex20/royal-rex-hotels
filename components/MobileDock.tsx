"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {BedDouble,UtensilsCrossed,Sparkles,CalendarDays,MessageCircle} from "lucide-react";
const items=[
 {label:"Stay",href:"/rooms",Icon:BedDouble},
 {label:"Dining",href:"/restaurant",Icon:UtensilsCrossed},
 {label:"Wellness",href:"/spa",Icon:Sparkles},
 {label:"Events",href:"/events",Icon:CalendarDays},
];
export default function MobileDock(){
 const pathname=usePathname();
 const phone="2349032691381";
 const msg=encodeURIComponent("Hello Royal Rex Hotels & Spa, I would like to make an enquiry.");
 return <nav className="mobile-dock" aria-label="Quick navigation">
   <div className="mobile-dock-inner">
    {items.map(({label,href,Icon})=>{const active=pathname===href||pathname.startsWith(href+"/");return <Link key={href} href={href} className={"dock-item "+(active?"is-active":"")}><span className="dock-icon"><Icon size={20} strokeWidth={1.7}/></span><span>{label}</span></Link>})}
    <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noopener noreferrer" className="dock-item dock-chat" aria-label="Chat with Royal Rex on WhatsApp"><span className="dock-icon"><MessageCircle size={21} strokeWidth={1.8}/></span><span>Chat</span></a>
   </div>
 </nav>
}