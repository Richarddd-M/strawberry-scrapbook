import { useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Cross2Icon,
  EnvelopeClosedIcon,
  HeartFilledIcon,
  ImageIcon,
  LockClosedIcon,
  PlayIcon,
  ResetIcon,
} from "@radix-ui/react-icons";
import { MobileScroll } from "./mobile";
import "./prototype.css";

const CONTENT = {
  passcode: "0824",
  herName: "Beautiful",
  yourName: "Your favourite person",
  letter: [
    "Somewhere between our conversations, the small laughs, and all the ordinary moments, you became someone incredibly special to me.",
    "You make my days lighter and my world a little sweeter. I love the way being around you feels easy, warm, and completely real.",
    "I made this tiny corner of the internet so you could see a few pieces of what you mean to me. Take your time—every page was chosen with you in mind.",
  ],
  songs: [
    { title: "Until I Found You", artist: "Stephen Sanchez", url: "https://www.youtube.com/results?search_query=Until+I+Found+You+Stephen+Sanchez" },
    { title: "Best Part", artist: "Daniel Caesar feat. H.E.R.", url: "https://www.youtube.com/results?search_query=Best+Part+Daniel+Caesar+HER" },
    { title: "Those Eyes", artist: "New West", url: "https://www.youtube.com/results?search_query=Those+Eyes+New+West" },
  ],
};

type Page = "lock" | "home" | "letter" | "songs" | "memories" | "question" | "yes";
type Visit = "letter" | "songs" | "memories";

const navItems: { id: Visit | "question"; title: string; subtitle: string; icon: typeof EnvelopeClosedIcon; tone: string }[] = [
  { id: "letter", title: "A Note For You", subtitle: "A few words from my heart.", icon: EnvelopeClosedIcon, tone: "rose" },
  { id: "songs", title: "Press Play", subtitle: "A little soundtrack for us.", icon: PlayIcon, tone: "cream" },
  { id: "memories", title: "Our Little Gallery", subtitle: "Moments that make me smile.", icon: ImageIcon, tone: "blue" },
  { id: "question", title: "The Big Question", subtitle: "Explore the first three to unlock this…", icon: LockClosedIcon, tone: "muted" },
];

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="page-header">
      <button className="icon-button" onClick={onBack} aria-label="Back"><ArrowLeftIcon /></button>
      <span>{title}</span>
      <span className="header-heart"><HeartFilledIcon /></span>
    </header>
  );
}

export default function Prototype() {
  const [page, setPage] = useState<Page>("lock");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [visited, setVisited] = useState<Visit[]>([]);
  const [noCount, setNoCount] = useState(0);
  const finaleUnlocked = visited.length === 3;

  const openPage = (next: Page) => {
    if (["letter", "songs", "memories"].includes(next)) {
      setVisited((current) => current.includes(next as Visit) ? current : [...current, next as Visit]);
    }
    setPage(next);
  };

  const digit = (value: string) => {
    setError(false);
    if (code.length >= 4) return;
    const next = code + value;
    setCode(next);
    if (next.length === 4) {
      window.setTimeout(() => {
        if (next === CONTENT.passcode) setPage("home");
        else { setError(true); setCode(""); }
      }, 180);
    }
  };

  const progress = useMemo(() => ["letter", "songs", "memories"].map((id) => visited.includes(id as Visit)), [visited]);

  if (page === "lock") return (
    <MobileScroll className="app-screen scrapbook-bg">
      <main className="lock-screen">
        <div className="mini-label">a little world for you</div>
        <div className="heart-seal"><HeartFilledIcon /></div>
        <h1>Unlock your<br />little surprise</h1>
        <p>Enter our four-digit code</p>
        <div className={`code-dots ${error ? "shake" : ""}`} aria-label={`${code.length} of 4 digits entered`}>
          {[0, 1, 2, 3].map((i) => <span key={i} className={i < code.length ? "filled" : ""} />)}
        </div>
        <div className="keypad" aria-label="Numeric keypad">
          {["1","2","3","4","5","6","7","8","9"].map((n) => <button key={n} onClick={() => digit(n)}>{n}</button>)}
          <button className="key-action" onClick={() => setCode("")} aria-label="Clear"><Cross2Icon /></button>
          <button onClick={() => digit("0")}>0</button>
          <button className="key-action" onClick={() => setCode((v) => v.slice(0, -1))} aria-label="Delete"><ResetIcon /></button>
        </div>
        <p className="hint">Hint: a date that means something to us.</p>
      </main>
    </MobileScroll>
  );

  if (page === "home") return (
    <MobileScroll className="app-screen scrapbook-bg">
      <main className="home-screen">
        <div className="brand-script">Strawberry Scrapbook</div>
        <section className="welcome-note">
          <span className="paperclip"><HeartFilledIcon /></span>
          <p className="eyebrow">made only for you</p>
          <h1>Hey, {CONTENT.herName}!</h1>
          <p>Every page here holds a tiny piece of how much you mean to me.</p>
        </section>
        <div className="journey" aria-label={`${visited.length} of 3 chapters visited`}>
          {progress.map((done, index) => <span key={index} className={done ? "done" : ""}>{done ? <CheckIcon /> : index + 1}</span>)}
          <span className={finaleUnlocked ? "done" : "locked"}>{finaleUnlocked ? <CheckIcon /> : <LockClosedIcon />}</span>
        </div>
        <section className="chapter-grid">
          {navItems.map((item) => {
            const locked = item.id === "question" && !finaleUnlocked;
            const Icon = locked ? LockClosedIcon : item.icon;
            return (
              <button key={item.id} className={`chapter ${item.tone} ${locked ? "is-locked" : ""}`} disabled={locked} onClick={() => openPage(item.id)}>
                <span className="chapter-icon"><Icon /></span>
                <span className="chapter-copy"><strong>{item.title}</strong><small>{locked ? `Visit ${3 - visited.length} more ${3 - visited.length === 1 ? "page" : "pages"} to unlock.` : item.subtitle}</small></span>
                {!locked && <ArrowRightIcon />}
              </button>
            );
          })}
        </section>
        <p className="footer-note">you make ordinary days feel special</p>
      </main>
    </MobileScroll>
  );

  if (page === "letter") return (
    <MobileScroll className="app-screen scrapbook-bg">
      <main className="detail-screen">
        <Header title="A note for you" onBack={() => setPage("home")} />
        <article className="letter-paper">
          <EnvelopeClosedIcon className="large-icon" />
          <p className="eyebrow">open when you need a reminder</p>
          <h1>My dearest {CONTENT.herName},</h1>
          {CONTENT.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="signature">Always,<br /><strong>{CONTENT.yourName}</strong></p>
        </article>
        <button className="primary-button" onClick={() => setPage("home")}>Keep going <ArrowRightIcon /></button>
      </main>
    </MobileScroll>
  );

  if (page === "songs") return (
    <MobileScroll className="app-screen scrapbook-bg">
      <main className="detail-screen">
        <Header title="Press play" onBack={() => setPage("home")} />
        <section className="section-intro">
          <span className="vinyl"><PlayIcon /></span>
          <p className="eyebrow">our little soundtrack</p>
          <h1>Songs that feel like us</h1>
          <p>Three melodies I hope make you smile.</p>
        </section>
        <div className="song-list">
          {CONTENT.songs.map((song, index) => <a key={song.title} href={song.url} target="_blank" rel="noreferrer"><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{song.title}</strong><small>{song.artist}</small></div><PlayIcon /></a>)}
        </div>
        <button className="primary-button" onClick={() => setPage("home")}>Back to our pages <ArrowRightIcon /></button>
      </main>
    </MobileScroll>
  );

  if (page === "memories") return (
    <MobileScroll className="app-screen scrapbook-bg">
      <main className="detail-screen gallery-screen">
        <Header title="Our little gallery" onBack={() => setPage("home")} />
        <section className="section-intro"><p className="eyebrow">tiny moments, big feelings</p><h1>Us, in little snapshots</h1><p>Replace these sample memories with your own photos before sharing.</p></section>
        <div className="memory-collage" role="img" aria-label="Four romantic sample memories" />
        <p className="caption">My favourite memories are the ones with you.</p>
        <button className="primary-button" onClick={() => setPage("home")}>One page closer <ArrowRightIcon /></button>
      </main>
    </MobileScroll>
  );

  if (page === "question") return (
    <MobileScroll className="app-screen question-bg">
      <main className="question-screen">
        <p className="eyebrow">one last thing…</p>
        <HeartFilledIcon className="question-heart" />
        <h1>{CONTENT.herName}, will you be my girlfriend?</h1>
        <p>I’d really love to keep making beautiful memories with you.</p>
        <div className="answer-buttons">
          <button className="yes-button" onClick={() => setPage("yes")}>Yes, absolutely!</button>
          <button className="maybe-button" onClick={() => setNoCount((n) => n + 1)}>{noCount === 0 ? "I need a second" : noCount === 1 ? "Are you sure?" : "Okay… look at the other button"}</button>
        </div>
        <button className="text-button" onClick={() => setPage("home")}><ArrowLeftIcon /> Back</button>
      </main>
    </MobileScroll>
  );

  return (
    <MobileScroll className="app-screen celebration-bg">
      <main className="yes-screen">
        <div className="yes-burst"><HeartFilledIcon /></div>
        <p className="eyebrow">best answer ever</p>
        <h1>You just made me the happiest person.</h1>
        <p>Here’s to our first official chapter—and all the sweet little moments still ahead.</p>
        <div className="date-stamp">OUR STORY STARTS HERE</div>
        <button className="primary-button" onClick={() => setPage("home")}>Read it all again</button>
      </main>
    </MobileScroll>
  );
}
