"use client";
import {motion} from "framer-motion";

const WhatsAppIcon=()=> <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.03 3.2A12.7 12.7 0 0 0 5.14 22.46L3.2 29.55l7.25-1.9A12.72 12.72 0 1 0 16.03 3.2Zm0 23.3c-1.9 0-3.76-.51-5.38-1.47l-.39-.23-4.3 1.13 1.15-4.2-.25-.4a10.56 10.56 0 1 1 9.17 5.17Zm5.8-7.9c-.32-.16-1.88-.93-2.17-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57a9.57 9.57 0 0 1-1.77-2.2c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.42 4.8.76.32 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.14-.29-.21-.61-.37Z"/></svg>;

export default function WhatsAppFloat(){
 const phone="2349032691381";
 const text=encodeURIComponent("Hello Royal Rex Hotels & Spa, I would like to make an enquiry.");
 return <motion.div className="whatsapp-float" initial={{opacity:0,y:28,scale:.85}} animate={{opacity:1,y:0,scale:1}} transition={{delay:1.1,duration:.55,type:"spring",stiffness:150}}>
   <motion.span className="whatsapp-pulse" aria-hidden="true" animate={{scale:[1,1.42],opacity:[.42,0]}} transition={{duration:2.2,repeat:Infinity,ease:"easeOut"}}/>
   <motion.a href={`https://wa.me/${phone}?text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Royal Rex Hotels on WhatsApp" className="whatsapp-button" whileHover={{scale:1.08}} whileTap={{scale:.94}}>
     <WhatsAppIcon/>
     <span className="whatsapp-label"><small>Need assistance?</small><strong>Chat with us</strong></span>
   </motion.a>
 </motion.div>
}