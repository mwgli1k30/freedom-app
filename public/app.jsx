import React, { useState, useEffect, useRef } from "react";

const CHALLENGES = [
  { day: 1, title: "Connais ton ennemi", description: "Identifie les 3 moments de la journée où l'envie est la plus forte. Écris-les.", duration: "10 min", category: "Conscience", task: "Ouvre ton journal et note : matin, après-midi ou soir ?" },
  { day: 2, title: "Le protocole froid", description: "Termine ta douche par 60 secondes d'eau froide. Chaque matin pendant 7 jours.", duration: "5 min", category: "Physique", task: "Fais-le ce matin. Pas demain. Ce matin." },
  { day: 3, title: "Remplace, ne résiste pas", description: "Quand l'envie arrive, tu fais 30 pompes immédiatement. Sans négocier.", duration: "2 min", category: "Physique", task: "Pose ton téléphone et fais 30 pompes maintenant pour t'entraîner." },
  { day: 4, title: "Audit de ton environnement", description: "Supprime tout contenu déclencheur de ton téléphone et ordinateur.", duration: "20 min", category: "Environnement", task: "Applications, historique, abonnements. Tout. Maintenant." },
  { day: 5, title: "Le pourquoi profond", description: "Écris une lettre à toi-même dans 1 an. Qui veux-tu être ?", duration: "15 min", category: "Mental", task: "Minimum 10 lignes. Sois honnête." },
  { day: 6, title: "Connexion humaine", description: "Appelle ou retrouve quelqu'un en vrai aujourd'hui. La solitude nourrit l'addiction.", duration: "30 min", category: "Social", task: "Un ami, un frère, un collègue. Peu importe qui." },
  { day: 7, title: "Bilan de la semaine", description: "Relis ton journal. Analyse tes déclencheurs. Qu'as-tu appris sur toi ?", duration: "15 min", category: "Conscience", task: "Écris 3 apprentissages de cette semaine." },
  { day: 8, title: "Méditation de pleine conscience", description: "10 minutes assis en silence. Observe tes pensées sans les juger.", duration: "10 min", category: "Mental", task: "Minuterie à 10 min. Yeux fermés. C'est tout." },
  { day: 9, title: "Sport intense", description: "30 minutes d'effort physique intense. Course, musculation, boxe.", duration: "30 min", category: "Physique", task: "Pas de marche. Transpire vraiment." },
  { day: 10, title: "Jeûne numérique", description: "Pas de réseaux sociaux pendant 24h. Observe ce que tu ressens.", duration: "24h", category: "Environnement", task: "Désactive les apps. Mets ton téléphone dans une autre pièce." },
  { day: 14, title: "2 semaines — Bilan", description: "Ton cerveau commence à se recâbler. Tu observes des changements.", duration: "20 min", category: "Mental", task: "Écris les changements que tu observes : énergie, clarté, confiance." },
  { day: 21, title: "3 semaines — La nouvelle identité", description: "Tu n'es plus quelqu'un qui 'essaie d'arrêter'. Tu es quelqu'un de libre.", duration: "10 min", category: "Mental", task: "Écris : 'Je suis quelqu'un qui...' et complète avec ta nouvelle identité." },
  { day: 30, title: "30 jours — Le premier mois", description: "Un mois. Ton cortex préfrontal a récupéré une partie significative de son contrôle.", duration: "30 min", category: "Bilan", task: "Célèbre. Puis planifie les 30 prochains jours." },
];

const CATEGORIES = {
  Conscience: { color: "#a78bfa" },
  Physique: { color: "#34d399" },
  Mental: { color: "#818cf8" },
  Environnement: { color: "#fbbf24" },
  Social: { color: "#60a5fa" },
  Bilan: { color: "#f472b6" },
};

const SOS_EXERCISES = [
  { title: "Respiration 4-7-8", steps: ["Inspire pendant 4 secondes", "Retiens pendant 7 secondes", "Expire pendant 8 secondes", "Répète 4 fois"], hasBreath: true },
  { title: "30 pompes maintenant", steps: ["Pose ton téléphone", "Mets-toi en position", "Fais 30 pompes", "L'envie aura disparu"] },
  { title: "Douche froide", steps: ["Va dans la salle de bain", "Lance l'eau froide", "Tiens 60 secondes", "Reset complet"] },
  { title: "Appelle quelqu'un", steps: ["Ouvre tes contacts", "Appelle n'importe qui", "Parle de n'importe quoi", "La connexion coupe l'impulsion"] },
];

const STATS = [
  { value: "90", unit: "jours", label: "pour recâbler ton cerveau" },
  { value: "21", unit: "jours", label: "pour créer une nouvelle habitude" },
  { value: "72h", unit: "", label: "pour sentir la différence" },
];

function AnimatedOrb() {
  return (
    <div style={{ position: "relative", width: 200, height: 200, margin: "0 auto" }}>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.6; }
        }
        @keyframes pulse-ring2 {
          0% { transform: scale(0.9); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(0.9); opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Outer ring */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.06)",
        animation: "pulse-ring2 4s ease-in-out infinite",
      }} />
      {/* Middle ring */}
      <div style={{
        position: "absolute", inset: 20, borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "pulse-ring 3s ease-in-out infinite",
      }} />
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 40,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        animation: "glow 3s ease-in-out infinite",
      }} />
      {/* Core */}
      <div style={{
        position: "absolute", inset: 50, borderRadius: "50%",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "float 4s ease-in-out infinite",
        boxShadow: "0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4C16 4 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 4 16 4Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M16 14C16 14 12 17 12 20C12 22.2 13.8 24 16 24C18.2 24 20 22.2 20 20C20 17 16 14 16 14Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

function StatCounter({ value, unit, label, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      textAlign: "center", opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
      transition: "all 0.6s ease",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2 }}>
        <span style={{ fontSize: 28, fontWeight: 800, color: "#e2e2e2", letterSpacing: -1, fontFamily: "'DM Sans', sans-serif" }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 10, color: "#333", fontWeight: 500, marginTop: 2, letterSpacing: 0.3 }}>{label}</div>
    </div>
  );
}

const ONBOARDING_STEPS = [
  { id: "welcome", hasOrb: true },
  { id: "understand", title: "Ce n'est pas\nune question\nde volonté.", subtitle: "La masturbation compulsive modifie les circuits de récompense du cerveau. C'est de la neurologie, pas de la faiblesse.", cta: "Je comprends" },
  { id: "method", title: "La méthode\nFreedom.", subtitle: "Défis quotidiens concrets. Un coach IA disponible 24h/24. Un suivi précis de ta progression.", cta: "C'est parti" },
  { id: "name", title: "Comment tu\nt'appelles ?", subtitle: "Pour personnaliser ton expérience.", cta: "Démarrer mon programme", hasInput: true },
];

export default function FreedomApp() {
  const [screen, setScreen] = useState("onboarding");
  const [onboardStep, setOnboardStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [tab, setTab] = useState("home");
  const [startDate, setStartDate] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [activeSOS, setActiveSOS] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [journal, setJournal] = useState([]);
  const [journalText, setJournalText] = useState("");
  const [breathState, setBreathState] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Bonjour. Je suis là pour t'aider. Comment tu te sens en ce moment ?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const breathRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!startDate) return;
    const tick = () => {
      const diff = Date.now() - startDate.getTime();
      const s = Math.floor(diff / 1000);
      setElapsed({ days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startDate]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const finishOnboarding = () => {
    setUserName(nameInput.trim() || "toi");
    setScreen("app");
  };

  const nextOnboard = () => {
    if (onboardStep < ONBOARDING_STEPS.length - 1) setOnboardStep(onboardStep + 1);
    else finishOnboarding();
  };

  const startStreak = () => setStartDate(new Date());
  const reset = () => { setStartDate(null); setCompleted([]); setShowReset(false); };
  const toggleComplete = (day) => setCompleted(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  const saveJournal = () => {
    if (!journalText.trim()) return;
    setJournal(prev => [{ text: journalText, date: new Date().toLocaleDateString("fr-FR"), time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) }, ...prev]);
    setJournalText("");
  };

  const startBreath = () => {
    let cycle = 0;
    const phases = [{ label: "INSPIRE", duration: 4000 }, { label: "RETIENS", duration: 7000 }, { label: "EXPIRE", duration: 8000 }];
    let pi = 0;
    const next = () => {
      if (cycle >= 4) { setBreathState(null); return; }
      setBreathState({ phase: phases[pi].label, cycle });
      breathRef.current = setTimeout(() => { pi = (pi + 1) % 3; if (pi === 0) cycle++; next(); }, phases[pi].duration);
    };
    next();
  };

  useEffect(() => () => clearTimeout(breathRef.current), []);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setChatLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Tu es un coach bienveillant et direct dans l'app Freedom, pour aider à se libérer de l'addiction à la masturbation compulsive. L'utilisateur s'appelle ${userName}. Sois empathique mais direct, jamais condescendant. Propose des actions concrètes. Ne juge jamais. Réponds en français, 3-4 phrases max. Si en crise, suggère le mode SOS.`,
          messages: [...chatMessages, { role: "user", content: userMsg }].map(m => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: "assistant", text: data.content?.[0]?.text || "Je suis là. Dis-moi ce qui se passe." }]);
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", text: "Je suis là pour toi. Dis-moi ce que tu ressens." }]);
    }
    setChatLoading(false);
  };

  const currentDay = elapsed.days + 1;
  const availableChallenges = CHALLENGES.filter(c => c.day <= currentDay);
  const upcomingChallenges = CHALLENGES.filter(c => c.day > currentDay).slice(0, 3);
  const progress = startDate ? Math.min((elapsed.days / 30) * 100, 100) : 0;

  const tabs = [
    { id: "home", label: "Accueil" },
    { id: "challenges", label: "Défis" },
    { id: "chat", label: "Coach" },
    { id: "sos", label: "SOS" },
    { id: "journal", label: "Journal" },
  ];

  const S = {
    app: { fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#080808", color: "#e2e2e2", maxWidth: 430, margin: "0 auto", position: "relative" },
    card: { background: "#101010", border: "1px solid #1c1c1c", borderRadius: 18, padding: "18px", marginBottom: 10 },
    label: { fontSize: 9, letterSpacing: 2.5, color: "#3a3a3a", fontWeight: 700, textTransform: "uppercase", marginBottom: 8, display: "block" },
    btn: { background: "#e2e2e2", color: "#080808", border: "none", borderRadius: 14, padding: "15px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%", fontFamily: "inherit" },
    ghost: { background: "transparent", color: "#3a3a3a", border: "1px solid #1c1c1c", borderRadius: 12, padding: "10px 18px", fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" },
  };

  // ONBOARDING
  if (screen === "onboarding") {
    const step = ONBOARDING_STEPS[onboardStep];
    return (
      <div style={{ ...S.app, display: "flex", flexDirection: "column", minHeight: "100vh", padding: "0" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

        {/* STEP 0 — Hero */}
        {step.id === "welcome" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "52px 28px 48px", minHeight: "100vh" }}>
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#2a2a2a", fontWeight: 700 }}>FREEDOM</div>
              <div style={{ display: "flex", gap: 5 }}>
                {ONBOARDING_STEPS.map((_, i) => (
                  <div key={i} style={{ width: i === 0 ? 20 : 5, height: 5, borderRadius: 3, background: i === 0 ? "#e2e2e2" : "#1c1c1c", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>

            {/* Orb */}
            <div style={{ marginBottom: 40 }}>
              <AnimatedOrb />
            </div>

            {/* Headline */}
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: -1, color: "#e2e2e2", marginBottom: 16 }}>
                Reprends<br />le contrôle.
              </h1>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 36 }}>
                Un programme structuré de 90 jours pour te libérer définitivement.
              </p>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 40, padding: "18px 0", borderTop: "1px solid #141414", borderBottom: "1px solid #141414" }}>
                {STATS.map((s, i) => (
                  <StatCounter key={i} value={s.value} unit={s.unit} label={s.label} delay={300 + i * 150} />
                ))}
              </div>
            </div>

            <button onClick={nextOnboard} style={S.btn}>Commencer</button>
          </div>
        )}

        {/* STEPS 1, 2 */}
        {(step.id === "understand" || step.id === "method") && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 28px 48px", minHeight: "100vh" }}>
            <div style={{ display: "flex", gap: 5 }}>
              {ONBOARDING_STEPS.map((_, i) => (
                <div key={i} style={{ height: 2, flex: 1, background: i <= onboardStep ? "#e2e2e2" : "#1c1c1c", borderRadius: 2, transition: "all 0.3s" }} />
              ))}
            </div>

            <div>
              {step.id === "method" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                  {[
                    { icon: "◈", title: "Défis quotidiens", desc: "13 défis structurés sur 90 jours. Concrets et progressifs." },
                    { icon: "◎", title: "Coach IA 24h/24", desc: "Une IA entraînée pour t'aider dans les moments difficiles." },
                    { icon: "◉", title: "Suivi précis", desc: "Compteur, journal, statistiques. Tu vois ta progression." },
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#101010", border: "1px solid #1c1c1c", borderRadius: 14, padding: "14px 16px" }}>
                      <div style={{ fontSize: 18, color: "#555", marginTop: 1 }}>{f.icon}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{f.title}</div>
                        <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step.id === "understand" && (
                <div style={{ marginBottom: 40 }}>
                  <div style={{ background: "#101010", border: "1px solid #1c1c1c", borderRadius: 16, padding: "20px", marginBottom: 12 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: "#3a3a3a", marginBottom: 10 }}>CE QUI SE PASSE DANS TON CERVEAU</div>
                    {[
                      { label: "Dopamine saturée", pct: 90 },
                      { label: "Contrôle impulsions", pct: 28 },
                      { label: "Motivation naturelle", pct: 35 },
                    ].map((b, i) => (
                      <div key={i} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 11, color: "#666" }}>{b.label}</span>
                          <span style={{ fontSize: 11, color: "#444" }}>{b.pct}%</span>
                        </div>
                        <div style={{ background: "#0a0a0a", borderRadius: 3, height: 3 }}>
                          <div style={{ height: "100%", width: `${b.pct}%`, background: b.pct > 60 ? "#f87171" : "#34d399", borderRadius: 3 }} />
                        </div>
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: "#333", marginTop: 6, lineHeight: 1.5 }}>
                      Après 90 jours de sevrage, ces chiffres s'inversent.
                    </div>
                  </div>
                </div>
              )}

              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 38, fontWeight: 400, lineHeight: 1.1, letterSpacing: -1, color: "#e2e2e2", marginBottom: 16, whiteSpace: "pre-line" }}>
                {step.title}
              </h1>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>{step.subtitle}</p>
            </div>

            <div>
              <button onClick={nextOnboard} style={S.btn}>{step.cta}</button>
              <button onClick={() => setOnboardStep(onboardStep - 1)} style={{ ...S.ghost, width: "100%", marginTop: 10 }}>Retour</button>
            </div>
          </div>
        )}

        {/* STEP 3 — Name */}
        {step.id === "name" && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 28px 48px", minHeight: "100vh" }}>
            <div style={{ display: "flex", gap: 5 }}>
              {ONBOARDING_STEPS.map((_, i) => (
                <div key={i} style={{ height: 2, flex: 1, background: i <= onboardStep ? "#e2e2e2" : "#1c1c1c", borderRadius: 2, transition: "all 0.3s" }} />
              ))}
            </div>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, lineHeight: 1.1, letterSpacing: -1, color: "#e2e2e2", marginBottom: 16, whiteSpace: "pre-line" }}>
                {step.title}
              </h1>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>{step.subtitle}</p>
              <input autoFocus value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && finishOnboarding()} placeholder="Ton prénom..."
                style={{ background: "#101010", border: "1px solid #1c1c1c", borderRadius: 12, padding: "16px 18px", color: "#e2e2e2", fontSize: 16, fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <button onClick={finishOnboarding} style={S.btn}>{step.cta}</button>
              <button onClick={() => setOnboardStep(onboardStep - 1)} style={{ ...S.ghost, width: "100%", marginTop: 10 }}>Retour</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MAIN APP
  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={{ padding: "32px 20px 0", borderBottom: "1px solid #141414" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "#2a2a2a", fontWeight: 700, marginBottom: 6 }}>FREEDOM</div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#e2e2e2" }}>
              {startDate ? `Jour ${elapsed.days}, ${userName}` : `Bonjour, ${userName}`}
            </div>
          </div>
          {startDate && <button onClick={() => setShowReset(true)} style={{ ...S.ghost, fontSize: 10, padding: "7px 12px" }}>Rechute</button>}
        </div>
        <div style={{ display: "flex", overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setActiveChallenge(null); }} style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 14px", fontSize: 11, fontWeight: 600, fontFamily: "inherit", color: tab === t.id ? "#e2e2e2" : "#333", borderBottom: tab === t.id ? "1.5px solid #e2e2e2" : "1.5px solid transparent", whiteSpace: "nowrap" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "18px 16px 100px" }}>

        {tab === "home" && (
          <div>
            {!startDate ? (
              <div style={{ ...S.card, padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, marginBottom: 12, color: "#e2e2e2" }}>Prêt à commencer ?</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 28 }}>Lance ton compteur. Les défis se débloquent jour après jour.</div>
                <button onClick={startStreak} style={S.btn}>Démarrer le programme</button>
              </div>
            ) : (
              <>
                <div style={S.card}>
                  <span style={S.label}>Temps sans rechute</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[{ v: elapsed.days, l: "JOURS" }, { v: elapsed.hours, l: "HEURES" }, { v: elapsed.minutes, l: "MIN" }, { v: elapsed.seconds, l: "SEC" }].map(({ v, l }) => (
                      <div key={l} style={{ flex: 1, background: "#080808", border: "1px solid #181818", borderRadius: 12, padding: "12px 6px", textAlign: "center" }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#e2e2e2", letterSpacing: -1 }}>{String(v).padStart(2, "0")}</div>
                        <div style={{ fontSize: 8, color: "#333", fontWeight: 600, marginTop: 3, letterSpacing: 1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={S.card}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={S.label}>Progression 30 jours</span>
                    <span style={{ fontSize: 10, color: "#333" }}>{Math.round(progress)}%</span>
                  </div>
                  <div style={{ background: "#080808", borderRadius: 3, height: 3 }}>
                    <div style={{ height: "100%", width: `${progress}%`, background: "#e2e2e2", borderRadius: 3, transition: "width 1s ease" }} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <div style={{ ...S.card, marginBottom: 0, textAlign: "center" }}>
                    <span style={S.label}>Complétés</span>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#e2e2e2" }}>{completed.length}</div>
                  </div>
                  <div style={{ ...S.card, marginBottom: 0, textAlign: "center" }}>
                    <span style={S.label}>Disponibles</span>
                    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#e2e2e2" }}>{availableChallenges.length}</div>
                  </div>
                </div>
                {availableChallenges.filter(c => !completed.includes(c.day))[0] && (() => {
                  const next = availableChallenges.filter(c => !completed.includes(c.day))[0];
                  return (
                    <div onClick={() => { setActiveChallenge(next); setTab("challenges"); }} style={{ ...S.card, cursor: "pointer" }}>
                      <span style={S.label}>Défi du jour</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORIES[next.category].color }} />
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{next.title}</div>
                      </div>
                      <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{next.description}</div>
                    </div>
                  );
                })()}
                <div onClick={() => setTab("chat")} style={{ ...S.card, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#080808", border: "1px solid #1c1c1c", display: "flex", alignItems: "center", justifyContent: "center" }}>◎</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Parler au coach IA</div>
                    <div style={{ fontSize: 11, color: "#444" }}>Disponible 24h/24 · Confidentiel</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#2a2a2a" }}>›</div>
                </div>
              </>
            )}
          </div>
        )}

        {tab === "challenges" && (
          <div>
            {!startDate ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#333", fontSize: 13 }}>Lance le programme depuis l'accueil.</div>
            ) : activeChallenge ? (
              <div>
                <button onClick={() => setActiveChallenge(null)} style={{ ...S.ghost, marginBottom: 16, fontSize: 11 }}>← Retour</button>
                <div style={S.card}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: CATEGORIES[activeChallenge.category].color, fontWeight: 700, marginBottom: 8 }}>{activeChallenge.category.toUpperCase()} · JOUR {activeChallenge.day}</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#e2e2e2", marginBottom: 16 }}>{activeChallenge.title}</div>
                  <div style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 20 }}>{activeChallenge.description}</div>
                  <div style={{ background: "#080808", border: "1px solid #181818", borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: "#333", marginBottom: 8 }}>ACTION MAINTENANT</div>
                    <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>{activeChallenge.task}</div>
                  </div>
                  <button onClick={() => { toggleComplete(activeChallenge.day); setActiveChallenge(null); }} style={{ ...S.btn, background: completed.includes(activeChallenge.day) ? "#101010" : "#e2e2e2", color: completed.includes(activeChallenge.day) ? "#444" : "#080808", border: completed.includes(activeChallenge.day) ? "1px solid #1c1c1c" : "none" }}>
                    {completed.includes(activeChallenge.day) ? "Marquer comme non complété" : "Défi complété ✓"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {availableChallenges.map(c => {
                  const done = completed.includes(c.day);
                  return (
                    <div key={c.day} onClick={() => setActiveChallenge(c)} style={{ ...S.card, cursor: "pointer", opacity: done ? 0.4 : 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: "#080808", border: `1px solid ${done ? "#1c1c1c" : CATEGORIES[c.category].color + "44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: done ? "#333" : CATEGORIES[c.category].color, fontWeight: 700, flexShrink: 0 }}>
                          {done ? "✓" : c.day}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, color: done ? "#444" : "#e2e2e2" }}>{c.title}</div>
                          <div style={{ fontSize: 10, color: "#2a2a2a" }}>{c.category.toUpperCase()} · {c.duration}</div>
                        </div>
                        <div style={{ color: "#222" }}>›</div>
                      </div>
                    </div>
                  );
                })}
                {upcomingChallenges.map(c => (
                  <div key={c.day} style={{ ...S.card, opacity: 0.25 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: "#080808", border: "1px solid #181818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#2a2a2a", fontWeight: 700 }}>{c.day}j</div>
                      <div style={{ fontSize: 13, color: "#333" }}>{c.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)" }}>
            <div style={{ ...S.card, marginBottom: 12 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#2a2a2a", marginBottom: 4 }}>COACH IA · CONFIDENTIEL</div>
              <div style={{ fontSize: 12, color: "#444" }}>Parle librement. Sans jugement. 24h/24.</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 12 }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "78%", background: m.role === "user" ? "#e2e2e2" : "#101010", color: m.role === "user" ? "#080808" : "#ccc", border: m.role === "assistant" ? "1px solid #1c1c1c" : "none", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "12px 16px", fontSize: 13, lineHeight: 1.6 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex" }}>
                  <div style={{ background: "#101010", border: "1px solid #1c1c1c", borderRadius: "16px 16px 16px 4px", padding: "12px 20px", color: "#333", fontSize: 18, letterSpacing: 3 }}>· · ·</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px solid #141414" }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendChat()} placeholder="Écris ce que tu ressens..."
                style={{ flex: 1, background: "#101010", border: "1px solid #1c1c1c", borderRadius: 12, padding: "13px 16px", color: "#e2e2e2", fontSize: 13, fontFamily: "inherit", outline: "none" }}
              />
              <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} style={{ background: chatInput.trim() ? "#e2e2e2" : "#101010", color: chatInput.trim() ? "#080808" : "#2a2a2a", border: "1px solid #1c1c1c", borderRadius: 12, padding: "0 18px", fontWeight: 700, cursor: "pointer", fontSize: 18 }}>›</button>
            </div>
          </div>
        )}

        {tab === "sos" && (
          <div>
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#444", marginBottom: 6 }}>MODE URGENCE</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 8 }}>L'envie est là.</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Choisis un exercice. Fais-le maintenant. L'impulsion dure 90 secondes maximum.</div>
            </div>
            {breathState && (
              <div style={{ ...S.card, textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#333", marginBottom: 20 }}>CYCLE {breathState.cycle + 1} / 4</div>
                <div style={{ width: 90, height: 90, borderRadius: "50%", margin: "0 auto 20px", border: `1px solid ${breathState.phase === "INSPIRE" ? "#e2e2e2" : "#1c1c1c"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: 1.5, transition: "all 1s ease", transform: breathState.phase === "INSPIRE" ? "scale(1.4)" : breathState.phase === "EXPIRE" ? "scale(0.7)" : "scale(1.05)" }}>
                  {breathState.phase}
                </div>
                <button onClick={() => { clearTimeout(breathRef.current); setBreathState(null); }} style={S.ghost}>Arrêter</button>
              </div>
            )}
            {SOS_EXERCISES.map((ex, i) => (
              <div key={i} style={S.card}>
                <div onClick={() => setActiveSOS(activeSOS === i ? null : i)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{ex.title}</div>
                  <div style={{ color: "#2a2a2a" }}>{activeSOS === i ? "▲" : "▼"}</div>
                </div>
                {activeSOS === i && (
                  <div style={{ marginTop: 14 }}>
                    {ex.steps.map((step, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1px solid #1c1c1c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#444", flexShrink: 0 }}>{j + 1}</div>
                        <div style={{ fontSize: 13, color: "#777", lineHeight: 1.5 }}>{step}</div>
                      </div>
                    ))}
                    {ex.hasBreath && !breathState && <button onClick={startBreath} style={{ ...S.btn, marginTop: 10 }}>Lancer la respiration guidée</button>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "journal" && (
          <div>
            <div style={S.card}>
              <span style={S.label}>Nouvelle entrée</span>
              <textarea value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="Qu'est-ce qui s'est passé ? Comment tu te sens ?"
                style={{ width: "100%", background: "#080808", border: "1px solid #181818", borderRadius: 10, padding: 14, color: "#ccc", fontSize: 13, resize: "none", height: 120, fontFamily: "inherit", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }}
              />
              <button onClick={saveJournal} disabled={!journalText.trim()} style={{ ...S.btn, marginTop: 10, opacity: journalText.trim() ? 1 : 0.3 }}>Enregistrer</button>
            </div>
            {journal.map((e, i) => (
              <div key={i} style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: "#333" }}>{e.date}</span>
                  <span style={{ fontSize: 10, color: "#222" }}>{e.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{e.text}</div>
              </div>
            ))}
            {journal.length === 0 && <div style={{ textAlign: "center", color: "#222", fontSize: 12, padding: "30px 0" }}>Aucune entrée pour l'instant.</div>}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#080808", borderTop: "1px solid #111", display: "flex", padding: "10px 0 20px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setActiveChallenge(null); }} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: tab === t.id ? "#e2e2e2" : "transparent", transition: "all 0.2s" }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: tab === t.id ? "#e2e2e2" : "#2a2a2a", letterSpacing: 0.5 }}>{t.label.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {showReset && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
          <div style={{ background: "#101010", border: "1px solid #1c1c1c", borderRadius: 20, padding: 28, maxWidth: 300, width: "100%" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 10 }}>Tu as rechuté ?</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 24 }}>Une rechute n'est pas un échec. C'est une information. Tu sais maintenant ce qui t'a fait tomber.</div>
            <button onClick={reset} style={{ ...S.btn, marginBottom: 10 }}>Repartir de zéro</button>
            <button onClick={() => setShowReset(false)} style={{ ...S.ghost, width: "100%" }}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}
