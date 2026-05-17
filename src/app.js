import { useState, useEffect } from "react";

const NAV = ["Home", "How It Works", "For Seafarers", "For Corporates", "About", "Contact"];
const C = { navy:"#0a0f1e", blue:"#0ea5e9", gold:"#f59e0b", green:"#10b981", text:"#e8eaf6", muted:"#94a3b8", dim:"#64748b" };

export default function App() {
  const [page, setPage] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name:"", mobile:"", rank:"", type:"seafarer", email:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (p) => { setPage(p); window.scrollTo(0,0); };
  const handleSubmit = () => { if (formData.name && formData.mobile) setSubmitted(true); };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:C.navy, color:C.text, minHeight:"100vh" }}>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:scrolled?"rgba(10,15,30,0.97)":"rgba(10,15,30,0.85)", backdropFilter:"blur(16px)", borderBottom:scrolled?"1px solid rgba(14,165,233,0.15)":"1px solid transparent", transition:"all 0.3s", padding:"0 1.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <div onClick={() => go("Home")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
            <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 0 16px rgba(14,165,233,0.4)" }}>⚓</div>
            <div>
              <div style={{ fontWeight:800, fontSize:18, letterSpacing:1, color:"#fff" }}>SHORE<span style={{ color:C.blue }}>BRIDGE</span></div>
              <div style={{ fontSize:8, letterSpacing:3, color:C.dim, textTransform:"uppercase" }}>India's Seafarer Platform</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:4, alignItems:"center", flexWrap:"wrap" }}>
            {NAV.map(n => (
              <button key={n} onClick={() => go(n)} style={{ background:page===n?"rgba(14,165,233,0.12)":"transparent", border:"none", color:page===n?C.blue:C.muted, padding:"6px 12px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:page===n?600:400 }}>{n}</button>
            ))}
            <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"8px 18px", borderRadius:8, cursor:"pointer", fontSize:13, fontWeight:700, marginLeft:8 }}>Register Now</button>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop:64 }}>
        {page==="Home" && <HomePage go={go} />}
        {page==="How It Works" && <HowItWorksPage go={go} />}
        {page==="For Seafarers" && <SeafarersPage go={go} />}
        {page==="For Corporates" && <CorporatesPage go={go} />}
        {page==="About" && <AboutPage go={go} />}
        {page==="Contact" && <ContactPage formData={formData} setFormData={setFormData} submitted={submitted} handleSubmit={handleSubmit} />}
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href="https://wa.me/91XXXXXXXXXX?text=Hello%20ShoreBridge!%20I%20want%20to%20register." target="_blank" rel="noopener noreferrer"
        style={{ position:"fixed", bottom:28, right:28, width:56, height:56, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, boxShadow:"0 4px 20px rgba(37,211,102,0.5)", zIndex:999, textDecoration:"none" }}>
        💬
      </a>

      {/* FOOTER */}
      <footer style={{ background:"#060b18", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", display:"flex", alignItems:"center", justifyContent:"center" }}>⚓</div>
                <div style={{ fontWeight:800, fontSize:16 }}>SHORE<span style={{ color:C.blue }}>BRIDGE</span></div>
              </div>
              <p style={{ color:C.dim, fontSize:13, lineHeight:1.7, maxWidth:280 }}>India's first platform connecting seafarers' shore leave to meaningful employment. Built for 1.8 million Indian seafarers.</p>
              <div style={{ marginTop:16 }}><a href="mailto:hello@shorebridge.in" style={{ color:C.blue, fontSize:13 }}>hello@shorebridge.in</a></div>
            </div>
            {[
              { title:"Platform", links:["For Seafarers","For Corporates","How It Works","Contact"] },
              { title:"Company", links:["About Us","Our Mission","Contact","Press"] },
              { title:"Legal", links:["Terms of Service","Privacy Policy","Refund Policy","Cookie Policy"] },
            ].map((col,i) => (
              <div key={i}>
                <div style={{ fontSize:12, fontWeight:700, color:C.blue, letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>{col.title}</div>
                {col.links.map(l => <div key={l} style={{ fontSize:13, color:C.dim, marginBottom:10, cursor:"pointer" }} onClick={() => go(l)}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:20, display:"flex", justifyContent:"space-between" }}>
            <div style={{ fontSize:12, color:C.dim }}>© 2026 ShoreBridge Technologies Pvt Ltd. All rights reserved.</div>
            <div style={{ fontSize:12, color:C.dim }}>Made with ⚓ for India's Seafarers</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ go }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => c < 1800000 ? c + 18000 : 1800000), 16);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <section style={{ minHeight:"92vh", display:"flex", alignItems:"center", background:"radial-gradient(ellipse at 50% -10%,rgba(14,165,233,0.12) 0%,transparent 60%)", padding:"4rem 1.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(14,165,233,0.08) 1px,transparent 1px)", backgroundSize:"40px 40px", zIndex:0 }} />
        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:720 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(14,165,233,0.1)", border:"1px solid rgba(14,165,233,0.25)", borderRadius:100, padding:"6px 16px", marginBottom:24 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }} />
              <span style={{ fontSize:12, color:"#0ea5e9", fontWeight:600, letterSpacing:1 }}>NOW LAUNCHING IN INDIA</span>
            </div>
            <h1 style={{ fontSize:"clamp(2.2rem,5vw,3.8rem)", fontWeight:800, lineHeight:1.12, margin:"0 0 24px", color:"#fff" }}>
              Where the Ocean's Best<br /><span style={{ color:"#0ea5e9" }}>Come Ashore</span> to Work
            </h1>
            <p style={{ fontSize:18, color:"#94a3b8", lineHeight:1.8, marginBottom:36, maxWidth:580 }}>
              India's first platform connecting <strong style={{ color:"#fff" }}>1.8 million seafarers</strong> to shore employment during their 4-6 month leave — AI matched, INDOS verified, with replacement clusters.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:56 }}>
              <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"14px 32px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700, boxShadow:"0 4px 24px rgba(14,165,233,0.35)" }}>Register as Seafarer →</button>
              <button onClick={() => go("For Corporates")} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", padding:"14px 32px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:600 }}>Hire Seafarers →</button>
            </div>
            <div style={{ display:"flex", gap:40, flexWrap:"wrap" }}>
              {[{ n:count.toLocaleString("en-IN")+"+", l:"Indian Seafarers" },{ n:"4-6 Mo", l:"Shore Availability" },{ n:"21+", l:"Rank Categories" },{ n:"Free", l:"To Join" }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize:26, fontWeight:800, color:"#0ea5e9" }}>{s.n}</div>
                  <div style={{ fontSize:11, color:"#64748b", letterSpacing:1, textTransform:"uppercase", marginTop:2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"rgba(239,68,68,0.04)", borderTop:"1px solid rgba(239,68,68,0.1)", borderBottom:"1px solid rgba(239,68,68,0.1)", padding:"2rem 1.5rem", textAlign:"center" }}>
        <p style={{ fontSize:18, color:"#e8eaf6", fontWeight:500, margin:0 }}>
          <span style={{ color:"#ef4444" }}>9 million man-months</span> of certified maritime talent sits idle every year in India.{" "}
          <span style={{ color:"#0ea5e9" }}>ShoreBridge changes that.</span>
        </p>
      </section>

      <section style={{ padding:"5rem 1.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>Simple Process</div>
            <h2 style={{ fontSize:30, fontWeight:800, color:"#fff", margin:0 }}>Shore to Work in 4 Steps</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {[
              { icon:"📋", n:"01", t:"Register & Verify", d:"Sign up with INDOS number. COC and STCW certs verified instantly against DG Shipping." },
              { icon:"📅", n:"02", t:"Log Availability", d:"Set your sign-off and join date. We market your profile automatically to employers." },
              { icon:"🤖", n:"03", t:"Get AI Matched", d:"Jobs matched to your rank, skills, location, and availability dates. Apply in one tap." },
              { icon:"💰", n:"04", t:"Earn Ashore", d:"Work 4-6 months ashore. Your cluster buddy takes over when you ship out." },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"1.8rem" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                <div style={{ fontSize:11, color:"#0ea5e9", letterSpacing:2, marginBottom:6 }}>{s.n}</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:8 }}>{s.t}</div>
                <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"4rem 1.5rem", background:"rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
          <div style={{ background:"rgba(14,165,233,0.05)", border:"1px solid rgba(14,165,233,0.2)", borderRadius:20, padding:"2.5rem" }}>
            <div style={{ fontSize:36, marginBottom:16 }}>⚓</div>
            <h3 style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:12 }}>For Seafarers</h3>
            <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.7, marginBottom:20 }}>Stop losing income during shore leave. Your maritime skills are worth real money on land. We translate your sea experience to shore employers automatically.</p>
            {["Free to join and register","AI-matched jobs by rank","Group health and life insurance","Replacement cluster — earn annually"].map(b => (
              <div key={b} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#94a3b8" }}><span style={{ color:"#10b981" }}>✓</span>{b}</div>
            ))}
            <button onClick={() => go("For Seafarers")} style={{ marginTop:20, background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"12px 24px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:700 }}>Learn More →</button>
          </div>
          <div style={{ background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, padding:"2.5rem" }}>
            <div style={{ fontSize:36, marginBottom:16 }}>🏢</div>
            <h3 style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:12 }}>For Corporates</h3>
            <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.7, marginBottom:20 }}>Access India's most disciplined workforce. Safety-trained, process-oriented, available for 4-6 month contracts. Replacement Cluster for year-round continuity.</p>
            {["Verified INDOS profiles","Pay 8-12% only on successful hire","Replacement Cluster continuity","Oil and gas, EPC, ports, logistics"].map(b => (
              <div key={b} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"#94a3b8" }}><span style={{ color:"#f59e0b" }}>✓</span>{b}</div>
            ))}
            <button onClick={() => go("For Corporates")} style={{ marginTop:20, background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", color:"#fff", padding:"12px 24px", borderRadius:8, cursor:"pointer", fontSize:14, fontWeight:700 }}>Hire Now →</button>
          </div>
        </div>
      </section>

      <section style={{ padding:"4rem 1.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>Every Rank Has Shore Value</div>
            <h2 style={{ fontSize:28, fontWeight:800, color:"#fff", margin:0 }}>From Master to Motorman — We Place All Ranks</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {[["Master / Captain","Project Director"],["Chief Officer","Ops Manager"],["2nd / 3rd Officer","Safety Officer"],["Chief Engineer","Plant Manager"],["2nd / 3rd Engineer","Maintenance Engr"],["Electrical Officer","Automation Engr"],["Bosun","Site Supervisor"],["AB / OS","Site Worker / Rigger"],["Motorman / Oiler","Plant Operator"],["Fitter / Pumpman","Mechanical Fitter"],["Chief Cook","Camp Chef"],["DP Officer","Marine Ops Coord"]].map(([sea,shore],i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"1rem" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#0ea5e9", marginBottom:4 }}>⚓ {sea}</div>
                <div style={{ fontSize:11, color:"#64748b" }}>→ 🏢 {shore}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:"4rem 1.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ background:"linear-gradient(135deg,rgba(14,165,233,0.12),rgba(29,78,216,0.12))", border:"1px solid rgba(14,165,233,0.2)", borderRadius:20, padding:"3rem", textAlign:"center" }}>
            <h2 style={{ fontSize:28, fontWeight:800, color:"#fff", marginBottom:12 }}>India's Seafarers Deserve Income Ashore</h2>
            <p style={{ color:"#94a3b8", fontSize:15, marginBottom:28 }}>Join the waitlist — first 5,000 seafarers get 12 months Premium free.</p>
            <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"14px 40px", borderRadius:10, cursor:"pointer", fontSize:16, fontWeight:700, boxShadow:"0 4px 24px rgba(14,165,233,0.35)" }}>Join Free — Register Now →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function HowItWorksPage({ go }) {
  return (
    <div style={{ padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>The Process</div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", marginBottom:12 }}>How ShoreBridge Works</h1>
          <p style={{ color:"#94a3b8", fontSize:16 }}>Simple, fast, built for the seafarer life cycle</p>
        </div>
        <h2 style={{ fontSize:20, fontWeight:700, color:"#0ea5e9", marginBottom:24 }}>⚓ For Seafarers</h2>
        {[
          { icon:"📱", t:"Download and Register", d:"Download the ShoreBridge app on Android. Sign up with mobile number — OTP verified instantly. Enter INDOS number for DG Shipping verification." },
          { icon:"📋", t:"Build Your Maritime Profile", d:"Enter rank, COC details, STCW certificates, vessel types, flag states, and experience. AI translates your profile to shore-employer language automatically." },
          { icon:"📅", t:"Log Your Shore Window", d:"Enter sign-off date and expected next contract joining date. ShoreBridge markets your profile to relevant employers during this window." },
          { icon:"🤖", t:"Receive Matched Jobs", d:"Get notified of matched shore project roles filtered by rank, location, and availability. Apply with one tap." },
          { icon:"🤝", t:"Interview and Get Hired", d:"Connect directly with the hiring corporate. Standard shore contract template provided. 4-6 month project role aligned to your shore leave." },
          { icon:"🔄", t:"Join a Replacement Cluster", d:"Form a buddy group with 2-4 seafarers of same rank. When you ship out, your buddy steps in. Corporate pays your cluster a year-round subscription." },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", gap:20, marginBottom:20, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"1.5rem" }}>
            <div style={{ fontSize:28, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>{i+1}. {s.t}</div>
              <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.7 }}>{s.d}</div>
            </div>
          </div>
        ))}
        <h2 style={{ fontSize:20, fontWeight:700, color:"#f59e0b", marginBottom:24, marginTop:40 }}>🏢 For Corporates</h2>
        {[
          { icon:"🖥️", t:"Register Your Company", d:"Create a corporate account on the ShoreBridge web dashboard. Verify with GST number. Access the full verified seafarer talent pool immediately." },
          { icon:"📝", t:"Post Your Project Role", d:"Describe the role — industry, location, duration, rank required. System surfaces matched verified profiles within 24 hours." },
          { icon:"👀", t:"Browse Verified Candidates", d:"Every candidate is INDOS-verified with DG Shipping. View rank, certifications, vessel experience, and shore availability window." },
          { icon:"💬", t:"Interview and Select", d:"Message candidates directly through the platform. Standard shore employment contract template provided." },
          { icon:"✅", t:"Confirm and Pay", d:"Confirm the placement. Invoice for 8-12% of CTC generated automatically. Pay only on successful hire — zero upfront cost." },
          { icon:"🔄", t:"Subscribe to Replacement Cluster", d:"Never lose continuity. Subscribe to a Replacement Cluster — same-background seafarers rotate in when your hire ships out." },
        ].map((s,i) => (
          <div key={i} style={{ display:"flex", gap:20, marginBottom:20, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"1.5rem" }}>
            <div style={{ fontSize:28, flexShrink:0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>{i+1}. {s.t}</div>
              <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.7 }}>{s.d}</div>
            </div>
          </div>
        ))}
        <div style={{ textAlign:"center", marginTop:40 }}>
          <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"14px 36px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>Get Started Free →</button>
        </div>
      </div>
    </div>
  );
}

function SeafarersPage({ go }) {
  return (
    <div style={{ padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>For Seafarers</div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", marginBottom:12 }}>Your Shore Leave. Your Income.</h1>
          <p style={{ color:"#94a3b8", fontSize:16, maxWidth:560, margin:"0 auto" }}>Stop earning zero during your 4-6 months ashore. Your skills are worth good money on land.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:48 }}>
          {[
            { icon:"🎯", t:"AI Job Matching by Rank", d:"Jobs matched specifically to your rank — Master to Motorman. No irrelevant listings. Only roles your background qualifies you for." },
            { icon:"✅", t:"INDOS Verified Badge", d:"Your INDOS verification gives you a trusted badge that shore employers respect. Stand out from unverified candidates instantly." },
            { icon:"🔄", t:"Replacement Cluster", d:"Form a buddy group. When you ship out, your buddy steps in. You earn annually — not just one contract at a time." },
            { icon:"🛡️", t:"Group Health Insurance", d:"Negotiate group health and life insurance at 30-40% below individual market rates. Medical cover during shore leave." },
            { icon:"📚", t:"Upskilling Courses", d:"STCW refreshers, HSE courses, logistics management — at group discounted rates. Improve your shore employability." },
            { icon:"💸", t:"Better Remittance Rates", d:"Send money home at 0.5-1.5% better FX rates than retail. Negotiated for the entire seafarer community." },
          ].map((f,i) => (
            <div key={i} style={{ background:"rgba(14,165,233,0.04)", border:"1px solid rgba(14,165,233,0.12)", borderRadius:12, padding:"1.5rem" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>{f.t}</div>
              <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:16, padding:"2rem", marginBottom:32 }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#10b981", marginBottom:16 }}>💰 What Can You Earn Ashore?</h3>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
            <thead>
              <tr style={{ background:"rgba(16,185,129,0.08)" }}>
                {["Your Rank","Shore Role","Monthly Earnings"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#10b981", fontWeight:600, borderBottom:"1px solid rgba(16,185,129,0.15)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Master / Captain","Project Director / HSE Head","₹1.8L – ₹3.5L/month"],
                ["Chief Engineer","Plant Manager / Turnaround Mgr","₹2.0L – ₹4.0L/month"],
                ["Chief Officer","Operations / Logistics Manager","₹1.2L – ₹2.2L/month"],
                ["2nd / 3rd Engineer","Maintenance Engineer","₹75K – ₹1.2L/month"],
                ["Electrical Officer (ETO)","Automation / Electrical Engr","₹90K – ₹1.6L/month"],
                ["Bosun","Site Supervisor / Foreman","₹35K – ₹60K/month"],
                ["AB / OS","Site Worker / Rigger","₹18K – ₹32K/month"],
                ["Motorman / Oiler","Plant Operator","₹18K – ₹32K/month"],
                ["Chief Cook","Camp Chef / F&B Manager","₹40K – ₹80K/month"],
              ].map((r,i) => (
                <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  {r.map((c,j) => <td key={j} style={{ padding:"10px 14px", color:j===2?"#10b981":"#94a3b8", fontWeight:j===2?700:400 }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"14px 40px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>Register Free — First 5,000 Get Premium Free →</button>
        </div>
      </div>
    </div>
  );
}

function CorporatesPage({ go }) {
  return (
    <div style={{ padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:1000, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"#f59e0b", textTransform:"uppercase", marginBottom:8 }}>For Corporates and MSMEs</div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", marginBottom:12 }}>India's Most Disciplined Workforce. Verified.</h1>
          <p style={{ color:"#94a3b8", fontSize:16, maxWidth:580, margin:"0 auto" }}>Safety-trained, process-oriented, certified workers available for 4-6 month project contracts.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:40 }}>
          {[
            { icon:"✅", t:"INDOS Verified", d:"Every candidate verified against DG Shipping national registry. Zero fake profiles." },
            { icon:"🎯", t:"Pay on Success Only", d:"8-12% placement fee only when you hire. Zero upfront cost. Zero risk." },
            { icon:"🔄", t:"Continuity Guaranteed", d:"Replacement Cluster ensures your project never stalls when a seafarer ships out." },
            { icon:"⚡", t:"Fast Matching", d:"Post a role, get matched candidates within 24 hours. AI-filtered by rank and location." },
            { icon:"📄", t:"Contract Templates", d:"Standard shore employment contract templates provided. TDS and payroll guidance included." },
            { icon:"📊", t:"Analytics Dashboard", d:"Track active hires, cluster rotations, and pipeline from your corporate dashboard." },
          ].map((f,i) => (
            <div key={i} style={{ background:"rgba(245,158,11,0.04)", border:"1px solid rgba(245,158,11,0.12)", borderRadius:12, padding:"1.4rem" }}>
              <div style={{ fontSize:26, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>{f.t}</div>
              <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>{f.d}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(245,158,11,0.04)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:16, padding:"2rem", marginBottom:32 }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:"#f59e0b", marginBottom:20 }}>💼 Pricing — Simple and Fair</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
            {[
              { plan:"Hire", price:"8-12% of CTC", sub:"Per successful placement", features:["Pay only on hire","INDOS verified candidates","Contract template included","60-day replacement guarantee"] },
              { plan:"Cluster SaaS", price:"₹15K-50K/month", sub:"Per replacement cluster", features:["Year-round continuity","Same-rank replacement pool","Zero retraining cost","Annual subscription"] },
              { plan:"Enterprise", price:"Custom", sub:"For large-scale hiring", features:["Batch hiring 5-50 seafarers","Dedicated account manager","Custom analytics","Priority matching"] },
            ].map((p,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"1.5rem" }}>
                <div style={{ fontSize:13, color:"#0ea5e9", fontWeight:700, marginBottom:8 }}>{p.plan}</div>
                <div style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:4 }}>{p.price}</div>
                <div style={{ fontSize:11, color:"#64748b", marginBottom:16 }}>{p.sub}</div>
                {p.features.map(f => <div key={f} style={{ fontSize:12, color:"#94a3b8", marginBottom:6, display:"flex", gap:6 }}><span style={{ color:"#10b981" }}>✓</span>{f}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", color:"#fff", padding:"14px 40px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>Post a Role — First 2 Hires Free →</button>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ go }) {
  return (
    <div style={{ padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>Our Story</div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", marginBottom:16 }}>Built for India's Seafarers</h1>
          <p style={{ color:"#94a3b8", fontSize:16, maxWidth:620, margin:"0 auto", lineHeight:1.8 }}>ShoreBridge was born from a simple observation: India produces the world's finest seafarers, yet they spend nearly half their working lives ashore — underemployed and undervalued. We are changing that.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:40 }}>
          <div style={{ background:"rgba(14,165,233,0.04)", border:"1px solid rgba(14,165,233,0.12)", borderRadius:16, padding:"2rem" }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#0ea5e9", marginBottom:12 }}>Our Mission</h3>
            <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.8 }}>To formalise and maximise shore employment for every Indian seafarer — from Master Mariners to Ordinary Seamen — ensuring their world-class skills are recognised, respected, and rewarded ashore.</p>
          </div>
          <div style={{ background:"rgba(16,185,129,0.04)", border:"1px solid rgba(16,185,129,0.12)", borderRadius:16, padding:"2rem" }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#10b981", marginBottom:12 }}>Our Vision</h3>
            <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.8 }}>To become the global operating system for seafarer shore employment — connecting 5 million seafarers across India, Philippines, Indonesia, UAE, and beyond to meaningful shore work.</p>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"2rem", marginBottom:40 }}>
          {[{ n:"1.8M+", l:"Indian Seafarers" },{ n:"9M", l:"Man-months idle/yr" },{ n:"₹0", l:"Shore income today" },{ n:"1st", l:"Platform to solve this" }].map((s,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:28, fontWeight:800, color:"#0ea5e9" }}>{s.n}</div>
              <div style={{ fontSize:12, color:"#64748b", marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={() => go("Contact")} style={{ background:"linear-gradient(135deg,#0ea5e9,#1d4ed8)", border:"none", color:"#fff", padding:"14px 36px", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700 }}>Join the Movement →</button>
        </div>
      </div>
    </div>
  );
}

function ContactPage({ formData, setFormData, submitted, handleSubmit }) {
  return (
    <div style={{ padding:"4rem 1.5rem" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:"#0ea5e9", textTransform:"uppercase", marginBottom:8 }}>Early Access</div>
          <h1 style={{ fontSize:36, fontWeight:800, color:"#fff", marginBottom:12 }}>Register Now</h1>
          <p style={{ color:"#94a3b8", fontSize:15 }}>First 5,000 seafarers get 12 months Premium free. First 20 corporates get 2 hires free.</p>
        </div>
        {submitted ? (
          <div style={{ background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:16, padding:"3rem", textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
            <h3 style={{ fontSize:22, fontWeight:700, color:"#10b981", marginBottom:8 }}>You're Registered!</h3>
            <p style={{ color:"#94a3b8", fontSize:14 }}>Welcome aboard, {formData.name}! We will WhatsApp you on {formData.mobile} when the platform launches in your area.</p>
            <a href="https://wa.me/91XXXXXXXXXX?text=Hello%20ShoreBridge!%20I%20just%20registered." target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-block", marginTop:20, background:"#25D366", color:"#fff", padding:"12px 28px", borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:14 }}>
              💬 Join WhatsApp Community
            </a>
          </div>
        ) : (
          <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"2.5rem" }}>
            <div style={{ display:"flex", gap:8, marginBottom:28, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:4 }}>
              {["seafarer","corporate"].map(t => (
                <button key={t} onClick={() => setFormData(f => ({ ...f, type:t }))} style={{ flex:1, padding:"10px", borderRadius:8, border:"none", cursor:"pointer", background:formData.type===t?(t==="seafarer"?"linear-gradient(135deg,#0ea5e9,#1d4ed8)":"linear-gradient(135deg,#f59e0b,#d97706)"):"transparent", color:formData.type===t?"#fff":"#64748b", fontWeight:700, fontSize:14 }}>
                  {t==="seafarer"?"⚓ I am a Seafarer":"🏢 I am a Corporate"}
                </button>
              ))}
            </div>
            {[
              { key:"name", label:"Full Name *", ph:"Your full name" },
              { key:"mobile", label:"Mobile Number *", ph:"+91 XXXXX XXXXX" },
              { key:"email", label:"Email Address", ph:"your@email.com" },
              { key:"rank", label:formData.type==="seafarer"?"Your Rank / Designation":"Company Name", ph:formData.type==="seafarer"?"e.g. Chief Engineer, AB, Master":"Your company name" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom:18 }}>
                <label style={{ fontSize:12, color:"#94a3b8", fontWeight:600, letterSpacing:0.5, display:"block", marginBottom:6 }}>{f.label}</label>
                <input value={formData[f.key]} onChange={e => setFormData(d => ({ ...d, [f.key]:e.target.value }))} placeholder={f.ph}
                  style={{ width:"100%", padding:"12px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box" }} />
              </div>
            ))}
            <button onClick={handleSubmit} style={{ width:"100%", padding:"14px", background:formData.type==="seafarer"?"linear-gradient(135deg,#0ea5e9,#1d4ed8)":"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", color:"#fff", borderRadius:10, cursor:"pointer", fontSize:15, fontWeight:700, marginTop:8 }}>
              {formData.type==="seafarer"?"Register as Seafarer — Free →":"Register as Corporate — First 2 Hires Free →"}
            </button>
            <div style={{ textAlign:"center", marginTop:20 }}>
              <p style={{ color:"#64748b", fontSize:12, marginBottom:12 }}>Or register instantly via WhatsApp</p>
              <a href="https://wa.me/91XXXXXXXXXX?text=Hello%20ShoreBridge!%20I%20am%20a%20Seafarer%20and%20want%20to%20register.%20My%20details%3A%0AName%3A%20%0ARank%3A%20%0AINDOS%20No%3A%20%0ASign-off%20Date%3A%20%0ALocation%3A" target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#25D366", color:"#fff", padding:"12px 28px", borderRadius:8, textDecoration:"none", fontWeight:700, fontSize:14, boxShadow:"0 4px 16px rgba(37,211,102,0.35)" }}>
                💬 Register via WhatsApp
              </a>
            </div>
            <p style={{ textAlign:"center", fontSize:11, color:"#64748b", marginTop:16 }}>No spam. No credit card. We will WhatsApp you when we launch.</p>
          </div>
        )}
        <div style={{ marginTop:40, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          {[{ icon:"📧", label:"Email", val:"hello@shorebridge.in" },{ icon:"💬", label:"WhatsApp", val:"+91 XXXXX XXXXX" },{ icon:"🌐", label:"Website", val:"www.shorebridge.in" }].map(c => (
            <div key={c.label} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"1rem", textAlign:"center" }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{c.icon}</div>
              <div style={{ fontSize:11, color:"#64748b", marginBottom:4 }}>{c.label}</div>
              <div style={{ fontSize:12, color:"#0ea5e9", fontWeight:600 }}>{c.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
