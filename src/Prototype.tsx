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
  yourName: "Richard",
  letter: [
    "I’ve been trying to find the right words for everything I feel about you, and I don’t think a normal conversation would ever give me enough time to say it properly. So I’m writing it instead.",
    "When I think about us, I don’t only think about the beautiful moments. I think about everything: the good, the difficult, the confusing, the laughter, the arguments, the times we’ve understood each other perfectly, and the times we’ve struggled to understand each other at all.",
    "Because the truth is, this hasn’t always been easy.",
    "We’ve had circumstances working against us that neither of us necessarily asked for. Your family not liking me or not necessarily accepting me has been difficult. There have been restrictions around when and how we can see each other, moments where we’ve wanted more time together but simply couldn’t have it, and times when all of that frustration has found its way into our relationship.",
    "There have been moments when I’ve questioned things. I’m sure you have too. We’ve probably both had moments where walking away would have been easier than continuing to try.",
    "But somehow, through all of that, I still find myself choosing you.",
    "And I think that’s one of the things that has made me realise how real my feelings for you are.",
    "It’s easy to care about someone when everything is perfect. It’s different when things become complicated and you still look at that person and think, I want you in my life.",
    "That’s how I feel about you.",
    "Despite everything surrounding us, we’ve still managed to create something that means so much to me. We’ve laughed together, annoyed each other, had conversations about absolutely nothing and conversations that meant everything. We’ve had moments together that I wish I could replay and ordinary days that became special simply because I got to spend part of them with you.",
    "And through all of it, I’ve gotten to know you. Not some perfect version of you, but you.",
    "Your personality. Your stubbornness 🤨. Your heart. Your humour. The way you think. The little things you do that you probably don’t even realise I’ve noticed. The things that make me smile when I randomly think about you.",
    "I’ve grown to love all those pieces.",
    "I know I’ve made mistakes too. There are probably moments when I could have listened better, understood you better, been more patient, or shown you more clearly how much you mean to me. I can’t promise that I’ll always get everything right. I’m human, and unfortunately for you, occasionally a very stubborn one 😝.",
    "But I can promise that what I’ve felt for you has been genuine.",
    "I don’t want our difficult moments to erase everything beautiful we’ve experienced. If anything, they’ve made me appreciate the good moments even more. Because despite the complications, somehow we kept finding our way back to each other.",
    "And if I’m being a little selfish, I wish things could have been easier for us. I wish seeing you didn’t sometimes require calculations 😂. I wish circumstances hadn’t put so much pressure on something that could have simply been allowed to grow naturally.",
    "But even with all of that, if you asked me whether knowing you was worth it, my answer would still be yes. 🥰",
    "Every time.",
    "You’ve become someone incredibly important to me. Someone I genuinely want to see happy, successful, and loved. Someone whose presence I’ve grown accustomed to in a way that makes absence feel noticeably different.",
    "I don’t know exactly what the future holds for us. Life has already shown us that we can’t control everything around us.",
    "But I know what I feel now.",
    "I know that after everything we’ve experienced, the beautiful parts and the difficult ones, I can still look at you and feel grateful that our paths crossed.",
    "I still want to make memories with you.",
    "I still want the random conversations.",
    "I still want the laughter.",
    "I still want those moments where it’s just you and me and, for a little while, everything outside of us becomes quiet.",
    "Most importantly, I want you to know that I don’t love some imaginary version of what we could have been if everything had been easy.",
    "I love what we’ve actually been.",
    "Imperfect. Complicated. Sometimes frustrating. Sometimes beautiful beyond words.",
    "Ours.",
    "And through every high and low, every obstacle, and every moment that tested us, one thing has remained surprisingly simple:",
    "I really, really like you.",
    "And despite everything that has tried to make things complicated, my affection for you has never changed. ❤️",
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
          <h1>My love,</h1>
          {CONTENT.letter.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="signature"><strong>{CONTENT.yourName}</strong></p>
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
