"use client";
import {motion} from "framer-motion";
import {Send,CheckCircle2} from "lucide-react";
import {FormEvent,useState} from "react";
export default function ContactForm(){
 const [sent,setSent]=useState(false);
 function submit(e:FormEvent){e.preventDefault();setSent(true)}
 return <motion.div className="contact-form-wrap" initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.7}}>
 <div className="contact-form-heading"><p className="eyebrow">Send an enquiry</p><h2 className="display">How may we<br/><i>assist you?</i></h2><p>Tell us what you need and the Royal Rex team will be able to follow up with you.</p></div>
 {sent?<motion.div className="form-success" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}}><CheckCircle2 size={34}/><p className="eyebrow">Enquiry prepared</p><h3 className="display">Thank you.</h3><p>This demo form is ready for the hotel's preferred email or reservation workflow to be connected.</p><button onClick={()=>setSent(false)} className="editorial-link">Send another enquiry <span>↗</span></button></motion.div>:
 <form className="royal-contact-form" onSubmit={submit}>
 <div className="form-grid"><label><span>Full name *</span><input required name="name" placeholder="Your name"/></label><label><span>Email address *</span><input required type="email" name="email" placeholder="you@example.com"/></label><label><span>Phone number</span><input type="tel" name="phone" placeholder="+234"/></label><label><span>Enquiry type *</span><select required name="type" defaultValue=""><option value="" disabled>Select an option</option><option>Room reservation</option><option>Events & celebrations</option><option>Spa & wellness</option><option>Restaurant & lounge</option><option>General enquiry</option></select></label></div>
 <label className="form-full"><span>Message *</span><textarea required name="message" rows={6} placeholder="Tell us how we can help..."/></label>
 <button className="contact-submit" type="submit"><span>Send enquiry</span><Send size={16}/></button>
 </form>}</motion.div>
}