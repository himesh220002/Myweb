import React from "react";
import { Check } from "lucide-react";

export const hinglishContent: Record<string, React.ReactNode> = {

  "start": (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      <h1 className="text-lg font-bold text-primary uppercase">Polite & Respectful</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Namaste Doctor sahab, main Himesh bol raha hoon. Aapka clinic profile dekha — bahut impressive hai. Bas ek cheez nahi thi — dedicated website. Toh maine already ek demo ready kiya hai. Abhi 2-3 minute hain kya?"
      </div>
      <h1 className="text-lg font-bold text-primary uppercase">Energetic & Opportunity-Focused</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Hello Doctor ji! Profile dekha — fantastic kaam hai. Lekin apni clinic website nahi hai — yeh ek bada missed opportunity hai. Main full-stack demo le ke aaya hoon. Dekhenge?"
      </div>
      <h1 className="text-lg font-bold text-primary uppercase">Empathetic & Patient-Centric</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Hi Doctor, aapke patients bahut trust karte hain — clearly dikh raha hai. Bas dedicated website nahi hai jisse booking smooth ho. Maine ek demo ready kiya hai — workload thoda kam hoga. Available hain abhi?"
      </div>
      <h1 className="text-lg font-bold text-primary uppercase">Business-Value Angle</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Good day Doctor sahab. Clinic bahut acchi hai — par website nahi hai toh admin time waste hota hai aur double booking ka risk rehta hai. Maine demo system banaya hai. Walk-through karein?"
      </div>
      <h1 className="text-lg font-bold text-primary uppercase">Casual & Friendly</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Arre Doctor! Clinic ekdum mast hai. Bas apni website nahi thi — toh main already demo bana ke le aaya. Busy ho kya, ya dikha doon quickly?"
      </div>
      <h1 className="text-lg font-bold text-primary uppercase">Direct & Value-First</h1>
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-muted-foreground">
        "Good morning Doctor. Seedha bolunga — website nahi hai toh patient communication mein friction hai. Demo ready hai jo yeh solve karta hai. Kya 5 minute milenge?"
      </div>
    </div>
  ),

  "busy-check": (
    <div className="space-y-4">
      <p>Doctor ka time bahut valuable hota hai — pehle availability check karna respectful bhi hai aur conversation smooth bhi rehti hai.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
          <strong>Haan (Busy):</strong> Time respect karo, link baad mein bhejo.
        </div>
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
          <strong>Nahi:</strong> Value proposition pe aao.
        </div>
      </div>
    </div>
  ),

  "respect-time": (
    <div className="space-y-4">
      <p>Time respect karo, demo baad mein share karo.</p>
      <div className="p-4 rounded-xl bg-muted border border-border italic text-muted-foreground">
        "Bilkul samajh sakta hoon. Link bhej deta hoon — jab free ho tab dekh lena. Aapke feedback ka wait karunga!"
      </div>
    </div>
  ),

  "explain-demo": (
    <div className="space-y-4">
      <p>Maine ek demo platform banaya hai jisme smart booking, real-time alerts, aur treatment catalog hai — basically ek preview hai ki aapka clinic digitally kaisa kaam kar sakta hai.</p>
    </div>
  ),

  "why-need": (
    <div className="space-y-4 max-h-[50vh] overflow-y-auto">
      <p>Common objections jo doctors dete hain — social media kaafi hai, ya AI se ban jayega.</p>
      <p className="italic text-muted-foreground">
        Closing Line — "Doctor ji, sochiye aise: aapki reputation already strong hai. Website se patients aapko dhundh payenge, trust karenge, instantly book kar payenge. Sirf marketing nahi — operational peace of mind hai."
      </p>
      <ul className="list-disc space-y-2 pl-4">
        <li>
          <span className="font-semibold">Patient Convenience</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Call kiye bina kabhi bhi appointment book ho sakti hai.</li>
            <li>Missed calls aur messages ka jhanjhat khatam.</li>
            <li>Procedure ke waqt phone interrupt nahi karega.</li>
            <li>Treatments, pricing, FAQs — sab instantly dikhe.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Brand Trust & Professionalism</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Website se credibility establish hoti hai.</li>
            <li>Modern site patient ka confidence badhata hai.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Operational Efficiency</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Smart slot validation — double booking nahi hogi.</li>
            <li>Urgent cases ke liye real-time alerts.</li>
            <li>Automated reminders se no-shows kam hote hain.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Competitive Edge</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Sirf social media pe dependent clinics se alag dikhoge.</li>
            <li>Tech-savvy patients convenience dhundhte hain.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">24/7 Availability</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Raat ko bhi patients book kar sakte hain.</li>
            <li>Staff ka workload kam hoga.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Growth & Visibility</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>SEO se Google search mein clinic dikhegi.</li>
            <li>"Dentist near me" mein aap competitors se pehle aayenge.</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold">Future-Proofing</span>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cloud-ready — multiple branches support karta hai.</li>
            <li>Dental imaging ya insurance claims baad mein add ho sakte hain.</li>
          </ul>
        </li>
      </ul>
    </div>
  ),

  "social-media": (
    <div className="space-y-4">
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        <li>Double bookings nahi hongi — smart slot validation hai.</li>
        <li>Urgent cases ke liye admins ko instant alert milta hai.</li>
        <li>Treatment catalog se patient trust banta hai.</li>
        <li>Analytics se revenue aur performance track hota hai.</li>
        <li>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Visibility vs Functionality
              <ul className="list-disc pl-6">
                <li>Social platforms sirf visibility dete hain — bookings handle nahi karte.</li>
                <li>Feeds mein important info dab jaati hai — patient miss kar sakta hai.</li>
              </ul>
            </li>
            <li>
              Patient Experience
              <ul className="list-disc pl-6">
                <li>Slot validation nahi → double booking ka risk.</li>
                <li>Secure patient communication ya data storage nahi hota.</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  ),

  "ai-build": (
    <div className="space-y-4">
      <p>AI templates generic hote hain — real-time booking, Socket.io alerts, WhatsApp, Mailgun integrate nahi kar sakte. Mera solution dental workflows ke liye specifically banaya gaya hai.</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          AI ke Limitations
          <ul className="list-disc pl-6 space-y-1">
            <li>Generic designs — clinic-specific nahi hote.</li>
            <li>Patient data security standards follow nahi hote.</li>
            <li>Static pages — dynamic booking logic nahi hota.</li>
          </ul>
        </li>
        <li>
          Jo Missing Hai AI Mein
          <ul className="list-disc pl-6 space-y-1">
            <li>Real-time admin sync nahi.</li>
            <li>WhatsApp, Mailgun, analytics integrate nahi.</li>
            <li>Slot validation ya double-booking prevention nahi.</li>
          </ul>
        </li>
        <li>
          Purpose-Built Kyun Better Hai
          <ul className="list-disc pl-6 space-y-1">
            <li>Dental workflows ke liye specifically design kiya.</li>
            <li>Smart booking, instant alerts, transparent catalog.</li>
            <li>Secure data handling — role-based access, JWT.</li>
            <li>Scalable — multiple branches ke liye ready.</li>
          </ul>
        </li>
      </ul>
    </div>
  ),

  "practical-benefits": (
    <div className="space-y-4">
      <li>
        <span className="font-semibold">Practical Fayde</span>
        <ul className="space-y-4 pl-6">
          <li>
            <span className="font-medium">Operational Efficiency</span>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Smart slot se double booking nahi hogi.</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Urgent cases ke liye instant alert — response time better hoga.</span></li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Patient Trust</span>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Treatment catalog se transparency — patient confident rehta hai.</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Pricing aur FAQs instantly dikhe — calls kam ho jayengi.</span></li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Growth Tracking</span>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Analytics dashboard se revenue track hota hai.</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Konsa treatment zyada value deta hai — clearly pata chalta hai.</span></li>
            </ul>
          </li>
        </ul>
      </li>
    </div>
  ),

  "tech-stack": (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-xs font-bold text-primary uppercase">Frontend (UI)</p>
          <p className="text-sm">Next.js, React 19, Framer Motion — jo dikhta hai, yahi banata hai</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-xs font-bold text-primary uppercase">Backend (Server)</p>
          <p className="text-sm">Node.js, Socket.io, Mailgun — real-time alerts aur emails handle karta hai</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-xs font-bold text-primary uppercase">Database</p>
          <p className="text-sm">MongoDB Atlas — cloud mein secure data storage</p>
        </div>
        <div className="p-3 rounded-lg bg-background border border-border">
          <p className="text-xs font-bold text-primary uppercase">Focus</p>
          <p className="text-sm">Real-time sync — jo change hoga, turant dikh jayega</p>
        </div>
      </div>
    </div>
  ),

  "roi": (
    <div className="space-y-4">
      <p>Ek baar ka investment hai — baar baar ka kharcha nahi. ROI aata hai smooth operations aur zyada patient retention se.</p>
      <ul className="space-y-4 pl-6">
        <li>
          <span className="font-medium">Lagat (Cost)</span>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Ek baar ka investment — recurring surprises nahi.</span></li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>SSL ke saath hosting bundle mein — tension free.</span></li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Dental ke liye specifically banaya — generic nahi.</span></li>
          </ul>
        </li>
        <li>
          <span className="font-medium">Fayde (Benefits)</span>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Admin hours bachte hain — automated booking aur reminders.</span></li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Patient friction kam — communication smooth.</span></li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>Long-term trust banta hai — transparent catalog se.</span></li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-1 text-primary" /><span>ROI: zyada patient retention, smooth operations.</span></li>
          </ul>
        </li>
      </ul>
    </div>
  ),

  "security": (
    <div className="space-y-4">
      <p>Patient ka data MongoDB Atlas mein securely store hota hai — role-based access aur JWT authentication ke saath. Matlab sirf authorized log hi access kar sakte hain.</p>
    </div>
  ),

  "scalability": (
    <div className="space-y-4">
      <p>Architecture cloud-ready hai — ek branch ho ya teen, real-time sync ke saath sab smoothly handle ho jaata hai. Badhna easy hai.</p>
    </div>
  ),

  "discovery": (
    <div className="space-y-4">
      <p>SEO optimization aur Google ranking se patients directly aapko search karke dhundhte hain. Existing social profiles ke saath integrate karke aur zyada traffic aata hai website pe.</p>
    </div>
  ),

  "custom-features": (
    <div className="space-y-4">
      <p>Modular design hai — nayi features jaise dental imaging ya insurance claims baad mein bina kuch tod-phod ke add ho sakte hain.</p>
    </div>
  ),

  "close": (
    <div className="space-y-4 text-center">
      <p className="text-xl font-semibold text-primary">Invitation</p>
      <p>Doctor sahab ko demo dikhao aur implementation discuss karo. Ek demo, hazaar words se zyada kaafi hai.</p>
      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-transform">
        Live Demo Dekho
      </button>
    </div>
  ),

};
