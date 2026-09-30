"use client";
import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight,ShieldCheck,Scale,FileText,LockKeyhole} from "lucide-react";

const sections=[
["01","Website use","Royal Rex provides this website to help guests review services, check availability and make genuine reservations. Visitors must not use the site for speculative, fraudulent or false bookings. Users must be at least 18 years old, have legal capacity to enter agreements and provide accurate information when using the website."],
["02","Information & agreements","Website information is provided for general guidance and may be changed without notice. Information displayed online does not by itself constitute a binding offer. An agreement is formed only when a quotation or other agreement identified as binding is accepted through an authorised Royal Rex Hotels & Spa representative."],
["03","Accuracy & liability","Royal Rex aims to keep website information useful and current, but does not guarantee that every item is complete, error-free, timely or suitable for every purpose. Guests are responsible for confirming that services or information meet their requirements. Prices and other website content may contain typographical or programming errors and an agreement cannot be based on an obvious error."],
["04","Copyright & intellectual property","Unless stated otherwise, the website's information, layout, concepts and intellectual property belong to Royal Rex Hotels & Spa or their respective rights holders. Content may not be copied, distributed or reused without express permission except where permitted by applicable law."],
["05","Privacy & lawful disclosure","Royal Rex seeks to protect guest information. Personal information may, however, be disclosed where required by law, legal process or an authorised regulatory body, or where disclosure is reasonably necessary for legal advice, proceedings, or the establishment, exercise or defence of legal rights."],
["06","Changes to these terms","Royal Rex Hotels & Spa may revise the website and these terms from time to time. Continued use of the website is governed by the terms in effect when the website is used."],
["07","External websites","Links may lead to websites that Royal Rex does not control. Their inclusion does not necessarily constitute an endorsement. Visitors should independently review information on external websites; Royal Rex does not assume responsibility for their content, availability, quality, safety or reliability."],
["08","Governing law & disputes","Disputes relating to use of the website are governed by the applicable laws of the country. Royal Rex states that amicable resolution should be pursued where possible. Unauthorised website use may also give rise to claims for damages or other legal consequences."],
["09","No additional warranty","Website materials are supplied without additional warranties regarding accuracy, completeness, performance or suitability. Advice, correspondence or information supplied through the website does not create a separate warranty merely because it was communicated to a visitor."],
["10","Updates","These website terms and related disclaimers may be updated from time to time. Guests should review the current version when using Royal Rex digital services."]
];

export default function TermsPage(){
 return <main className="terms-page">
  <section className="terms-hero"><div className="terms-orb terms-orb-one"/><div className="terms-orb terms-orb-two"/><div className="shell terms-hero-inner">
   <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
    <p className="eyebrow">Royal Rex Hotels & Spa · Legal</p><h1 className="display">Terms &<br/><i>Conditions.</i></h1><p>Clear terms for using the Royal Rex Hotels & Spa website, making legitimate reservations and engaging with our digital services.</p>
    <div className="terms-meta"><span><FileText size={15}/> Website terms</span><span><ShieldCheck size={15}/> Guest information</span><span><Scale size={15}/> Legal use</span></div>
   </motion.div>
  </div></section>
  <section className="terms-content"><div className="shell terms-layout">
   <aside className="terms-aside"><div className="terms-aside-card"><LockKeyhole size={20}/><p className="eyebrow">Important</p><h2 className="display">Please read before using our website.</h2><p>By continuing to browse or use Royal Rex digital services, you agree to the applicable website terms.</p><a href="https://royalrexhotels.com/uk/terms-condition/" target="_blank" rel="noopener noreferrer">View source terms <ArrowUpRight size={14}/></a></div></aside>
   <div className="terms-list">
    <motion.div className="terms-opening" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><p className="eyebrow">Welcome to Royal Rex</p><h2 className="display">Using our website.</h2><p>These terms explain the conditions governing access to Royal Rex Hotels & Spa's website, published materials and reservation-related information. Royal Rex may update, modify or remove website content without prior notice.</p></motion.div>
    {sections.map(([n,title,body],i)=><motion.article key={title} className="terms-row" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.55,delay:Math.min(i*.025,.15)}}><span className="terms-number">{n}</span><div><h3 className="display">{title}</h3><p>{body}</p></div></motion.article>)}
    <div className="terms-note"><p className="eyebrow">Questions about these terms?</p><h3 className="display">We’re here to help.</h3><p>Contact Royal Rex Hotels & Spa if you need clarification before making a reservation or using our services.</p><Link href="/contact" className="hero-cta hero-cta-primary">Contact Royal Rex</Link></div>
   </div>
  </div></section>
 </main>
}