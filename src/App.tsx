import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Brand, EmailLink } from "./Brand";
import { Laptop3D, Orbit, useReveal } from "./three";

const navigation = [
  { label: "O projeto", id: "missao" },
  { label: "Como funciona", id: "como-funciona" },
  { label: "Doação", id: "doacao" },
  { label: "Educação em IA", id: "educacao" },
  { label: "Empresas", id: "empresas" },
  { label: "Nossa história", id: "historia" },
  { label: "Contato", id: "contato" },
];

const subjects = {
  doacao: "Quero doar um computador",
  empresa: "Doação de empresa e palestra de IA",
  aulas: "Quero saber sobre as aulas gratuitas",
  voluntario: "Quero ser voluntário",
  outro: "Outro assunto",
};

type Subject = keyof typeof subjects;
type ContactAction = (subject: Subject) => void;

function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg className={`arrow-icon ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  );
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span className="section-number">{number}</span><span className="section-label-line" />{children}</p>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      let current = "";
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 190) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1200) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="page-container header-inner">
          <a href="#top" className="header-brand" aria-label="LBEdu, página inicial" onClick={() => setOpen(false)}><Brand tagline /></a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map(({ label, id }) => (
              <a key={id} href={`#${id}`} className="nav-link" aria-current={active === id ? "location" : undefined}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <a href="#doacao" className="button button-lime header-donate" onClick={() => setOpen(false)}>Quero doar <Arrow diagonal /></a>
            <button ref={menuButton} className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
              <span className={open ? "menu-lines is-open" : "menu-lines"}><span /><span /></span>
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação para celular" hidden={!open}>
          <div className="page-container">
            {navigation.map(({ label, id }) => (
              <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}<Arrow diagonal /></a>
            ))}
          </div>
        </nav>
      </header>
      {open && <button className="menu-backdrop" aria-label="Fechar menu" tabIndex={-1} onClick={() => setOpen(false)} />}
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <img src="/images/hero.jpg" alt="Jovem sorrindo ao usar um notebook, com luz natural entrando pela janela" className="hero-photo" fetchPriority="high" width="1536" height="1024" />
      <div className="hero-shade" />
      <div className="page-container hero-layout">
        <div className="hero-content">
          <Brand className="hero-brand" />
          <h1 id="hero-title" className="display hero-title">Tecnologia que<br /><span className="text-lime">transforma</span><span className="hero-last-line"> vidas.</span></h1>
          <p className="hero-description">O computador que você não usa mais pode abrir um mundo de possibilidades para outra pessoa.</p>
          <div className="hero-actions">
            <a href="#doacao" className="button button-lime">Doe um computador <Arrow diagonal /></a>
            <a href="#missao" className="text-link">Conheça o projeto <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Missao() {
  return (
    <section id="missao" className="section section-light" aria-labelledby="mission-title">
      <div className="page-container">
        <div className="section-intro mission-intro">
          <div className="reveal">
            <SectionLabel number="01">Nossa missão</SectionLabel>
            <h2 id="mission-title" className="display section-title">Para você, um antigo.<br />Para alguém,<br /><span className="text-muted-ink">um novo começo.</span></h2>
          </div>
          <div className="reveal intro-copy">
            <p>A <Brand inline /> recupera computadores e os deixa prontos para pessoas de baixa renda e com deficiência. Mais do que doar um equipamento, queremos abrir caminhos.</p>
            <p>Com aulas gratuitas de inteligência artificial, ajudamos a transformar acesso à tecnologia em conhecimento, autonomia e oportunidade.</p>
          </div>
        </div>
        <div className="mission-gallery">
          <figure className="editorial-figure reveal">
            <div className="photo-frame"><img src="/images/elder.jpg" alt="Pessoa idosa usando um computador com o apoio de um jovem" loading="lazy" width="1536" height="1024" /></div>
            <figcaption><span className="caption-dot" />Acesso com autonomia</figcaption>
          </figure>
          <figure className="editorial-figure reveal">
            <div className="photo-frame"><img src="/images/laptops.jpg" alt="Notebooks organizados em uma prateleira, iluminados em cores naturais" loading="lazy" width="1536" height="1024" /></div>
            <figcaption><span className="caption-dot cyan" />Uma segunda vida para a tecnologia</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { number: "01", title: "Você doa", description: "Um notebook, desktop ou peça que já não faz parte da sua rotina." },
  { number: "02", title: "Nós recuperamos", description: "Avaliamos o equipamento e recuperamos o que for possível." },
  { number: "03", title: "Tudo pronto", description: "Deixamos o computador preparado para uso no dia a dia." },
  { number: "04", title: "Um novo destino", description: "A doação chega a quem precisa de acesso à tecnologia." },
  { number: "05", title: "O saber continua", description: "Aulas gratuitas de IA ajudam a dar os próximos passos." },
];

function ComoFunciona() {
  return (
    <section id="como-funciona" className="section section-dark process-section" aria-labelledby="process-title">
      <div className="page-container">
        <div className="reveal">
          <SectionLabel number="02">Como funciona</SectionLabel>
          <h2 id="process-title" className="display section-title">Um gesto seu.<br /><span className="text-lime">Um caminho inteiro.</span></h2>
          <p className="section-description">Da sua doação ao próximo começo, cada etapa tem cuidado e propósito.</p>
        </div>
        <ol className="process-steps">
          {steps.map((step) => (
            <li key={step.number} className="process-step reveal">
              <span className="step-number" aria-hidden="true">{step.number}</span>
              <h3 className="display step-title">{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Doacao({ onContact }: { onContact: ContactAction }) {
  return (
    <section id="doacao" className="section section-light" aria-labelledby="donation-title">
      <div className="page-container donation-layout">
        <div className="reveal donation-copy">
          <SectionLabel number="03">Doação de computadores</SectionLabel>
          <h2 id="donation-title" className="display section-title">Seu computador<br />ainda tem muito<br /><span className="text-muted-ink">para oferecer.</span></h2>
          <p className="section-description">Parado não precisa ser o fim. Vamos descobrir juntos o que ele ainda pode fazer.</p>
          <dl className="donation-items">
            <div><dt>Notebooks e desktops</dt><dd>Mesmo antigos, lentos ou com defeitos. Conte para nós o estado do equipamento.</dd></div>
            <div><dt>Peças e periféricos</dt><dd>Memórias, SSDs, monitores, teclados, mouses e carregadores também podem ajudar.</dd></div>
          </dl>
          <details className="donation-faq">
            <summary>Como cuidar dos meus dados?<span aria-hidden="true">+</span></summary>
            <p>Faça uma cópia dos seus arquivos importantes e, se possível, remova seus dados pessoais antes da doação. Se precisar de orientação, converse com a equipe antes de entregar o equipamento.</p>
          </details>
          <a href="#contato" className="button button-ink" onClick={() => onContact("doacao")}>Combinar uma doação <Arrow diagonal /></a>
        </div>
        <div className="donation-visuals">
          <figure className="editorial-figure reveal">
            <div className="photo-frame repair-photo"><img src="/images/repair.jpg" alt="Mãos trabalhando com cuidado na recuperação de um notebook" loading="lazy" width="1536" height="1024" /></div>
            <figcaption><span className="caption-dot" />Cuidado em cada detalhe</figcaption>
          </figure>
          <div className="laptop-stage reveal" role="img" aria-label="Ilustração 3D animada de um notebook recuperado, pronto para um novo começo">
            <div className="laptop-stage-grid" />
            <div className="laptop-stage-object float"><Laptop3D size={330} /></div>
            <div className="laptop-stage-caption"><span className="status-dot" />Pronto para um novo começo<Arrow diagonal /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Educacao({ onContact }: { onContact: ContactAction }) {
  const topics = [
    ["Começar com confiança", "Computador, internet e segurança digital, sem complicar."],
    ["Criar com inteligência artificial", "Ferramentas para aprender, organizar ideias e explorar possibilidades."],
    ["Usar com consciência", "Entender limites, proteger dados e reconhecer riscos."],
  ];

  return (
    <section id="educacao" className="section section-dark education-section" aria-labelledby="education-title">
      <div className="page-container">
        <div className="section-intro education-intro">
          <div className="reveal">
            <SectionLabel number="04">Educação em IA</SectionLabel>
            <h2 id="education-title" className="display section-title">O futuro se aprende.<br /><span className="text-cyan">E é para todos.</span></h2>
          </div>
          <div className="reveal intro-copy"><p>Aulas gratuitas para quem quer dar os primeiros passos na inteligência artificial. Com linguagem acessível, prática e espaço para perguntar.</p></div>
        </div>
        <div className="education-layout">
          <figure className="editorial-figure reveal">
            <div className="photo-frame class-photo"><img src="/images/class.jpg" alt="Grupo diverso, incluindo uma pessoa em cadeira de rodas, aprendendo com notebooks em uma sala iluminada" loading="lazy" width="1536" height="1024" /></div>
            <figcaption><span className="caption-dot cyan" />Conhecimento para abrir possibilidades</figcaption>
          </figure>
          <div className="reveal education-content">
            <p className="small-heading">Do primeiro clique à primeira ideia</p>
            <ol className="education-topics">
              {topics.map(([title, description], index) => <li key={title}><span className="topic-number">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
            </ol>
            <a href="#contato" className="text-link" onClick={() => onContact("aulas")}>Quero saber sobre as aulas <Arrow diagonal /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Empresas({ onContact }: { onContact: ContactAction }) {
  return (
    <section id="empresas" className="section section-light companies-section" aria-labelledby="companies-title">
      <div className="page-container companies-layout">
        <div className="reveal">
          <SectionLabel number="05">Para empresas</SectionLabel>
          <h2 id="companies-title" className="display section-title">Sua empresa doa.<br /><span className="text-muted-ink">Sua equipe aprende.</span></h2>
          <p className="section-description">Equipamentos que saem da sua operação podem entrar na história de outra pessoa.</p>
          <p className="companies-copy">Para empresas que doarem computadores, a <Brand inline /> oferece uma palestra gratuita de inteligência artificial para os funcionários.</p>
          <ul className="company-topics">
            <li><span aria-hidden="true">+</span>IA na prática e no dia a dia do trabalho</li>
            <li><span aria-hidden="true">+</span>Riscos, privacidade e segurança</li>
            <li><span aria-hidden="true">+</span>Uso responsável, crítico e consciente</li>
          </ul>
          <a href="#contato" className="button button-ink" onClick={() => onContact("empresa")}>Conversar sobre doação e palestra <Arrow diagonal /></a>
        </div>
        <figure className="editorial-figure reveal">
          <div className="photo-frame corporate-photo"><img src="/images/corporate.jpg" alt="Profissionais acompanhando uma palestra sobre inteligência artificial em um ambiente iluminado" loading="lazy" width="1536" height="1024" /></div>
          <figcaption><span className="caption-dot cyan" />Conhecimento que também transforma sua equipe</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Historia({ onContact }: { onContact: ContactAction }) {
  return (
    <section id="historia" className="section section-dark history-section" aria-labelledby="history-title">
      <div className="page-container history-layout">
        <div className="reveal history-copy">
          <SectionLabel number="06">Nossa história</SectionLabel>
          <h2 id="history-title" className="display section-title">Uma ideia simples.<br /><span className="text-lime">Um olhar humano.</span></h2>
          <p className="section-description">Criada por Felipe Leone, em São Paulo, a <Brand inline /> nasceu para aproximar a tecnologia de quem tem pouco acesso a ela.</p>
          <p>Nosso propósito é ensinar, compartilhar e construir caminhos. No futuro, queremos crescer para gerar oportunidades de trabalho e trazer quem aprendeu conosco para fazer parte dessa construção.</p>
          <div className="founder-line"><span className="founder-monogram" aria-hidden="true">FL</span><span><strong>Felipe Leone</strong><span>Fundador da <Brand inline /></span></span></div>
          <a href="#contato" className="text-link" onClick={() => onContact("voluntario")}>Quero fazer parte <Arrow diagonal /></a>
        </div>
        <div className="reveal history-visual">
          <div className="history-orbit"><Orbit /></div>
          <p className="display history-statement">Pessoas<br />no centro.<br /><span className="text-cyan">Sempre.</span></p>
          <p className="history-caption">A tecnologia é a ponte.<br />As pessoas são o propósito.</p>
        </div>
      </div>
    </section>
  );
}

function Contato({ subject, onSubjectChange }: { subject: Subject; onSubjectChange: ContactAction }) {
  const [fields, setFields] = useState({ nome: "", email: "", mensagem: "" });
  const [prepared, setPrepared] = useState<{ url: string; text: string } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => { setPrepared(null); }, [subject]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Olá, equipe LBEdu!\n\nNome: ${fields.nome.trim()}\nE-mail: ${fields.email.trim()}\nAssunto: ${subjects[subject]}\n\n${fields.mensagem.trim()}`;
    const url = `mailto:lb@lbedu.me?cc=lbedu.me%40gmail.com&subject=${encodeURIComponent(subjects[subject])}&body=${encodeURIComponent(text)}`;
    setPrepared({ url, text });
    setCopyStatus("");
    window.location.href = url;
  };

  const copyMessage = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.text);
      setCopyStatus("Mensagem copiada. Cole no seu e-mail para enviar.");
    } catch {
      setCopyStatus("Não foi possível copiar. Use o link para abrir seu e-mail ou escreva diretamente para a equipe.");
    }
  };

  return (
    <section id="contato" className="section contact-section" aria-labelledby="contact-title">
      <div className="page-container contact-layout">
        <div className="reveal contact-copy">
          <SectionLabel number="07">Contato</SectionLabel>
          <h2 id="contact-title" className="display section-title">O próximo começo<br /><span className="text-lime">pode vir de você.</span></h2>
          <p className="section-description">Para doar, aprender, ser voluntário ou levar uma palestra à sua empresa. Vamos conversar?</p>
          <div className="contact-emails"><EmailLink /><EmailLink secondary /></div>
          <p className="contact-location">São Paulo, Brasil<br />Iniciativa social sem fins lucrativos.</p>
        </div>
        <form className="contact-form reveal" onSubmit={submit}>
          <div className="form-heading"><h3>Conte com a gente.</h3><p>Escolha um assunto e deixe sua mensagem.</p></div>
          <div className="form-row">
            <div className="form-field"><label htmlFor="nome">Seu nome <span>(obrigatório)</span></label><input id="nome" name="nome" autoComplete="name" required maxLength={100} placeholder="Como podemos te chamar?" value={fields.nome} onChange={(event) => { setFields({ ...fields, nome: event.target.value }); setPrepared(null); }} /></div>
            <div className="form-field"><label htmlFor="email">Seu e-mail <span>(obrigatório)</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder="voce@email.com" value={fields.email} onChange={(event) => { setFields({ ...fields, email: event.target.value }); setPrepared(null); }} /></div>
          </div>
          <div className="form-field"><label htmlFor="assunto">Como podemos ajudar?</label><select id="assunto" name="assunto" value={subject} onChange={(event) => onSubjectChange(event.target.value as Subject)}>
            {Object.entries(subjects).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select></div>
          <div className="form-field"><label htmlFor="mensagem">Sua mensagem <span>(obrigatório)</span></label><textarea id="mensagem" name="mensagem" required rows={4} maxLength={2000} placeholder="Conte sua ideia ou como gostaria de participar..." value={fields.mensagem} onChange={(event) => { setFields({ ...fields, mensagem: event.target.value }); setPrepared(null); }} /></div>
          <button type="submit" className="button button-lime form-submit">Preparar e-mail <Arrow diagonal /></button>
          <p className="form-note">Seu aplicativo de e-mail será aberto com a mensagem pronta. O envio é concluído por você, sem armazenar dados neste site.</p>
          {prepared && <div className="form-result" role="status"><p>Mensagem preparada. Conclua o envio no seu aplicativo de e-mail.</p><div className="form-result-actions"><a href={prepared.url} className="text-link prepared-mail-link">Abrir e-mail <Arrow diagonal /></a><button type="button" className="copy-button" onClick={copyMessage}>Copiar mensagem</button></div>{copyStatus && <p className="copy-status">{copyStatus}</p>}</div>}
        </form>
      </div>
    </section>
  );
}

function Footer({ motionPaused, onToggleMotion }: { motionPaused: boolean; onToggleMotion: () => void }) {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <div className="footer-about"><Brand className="footer-brand" tagline /><p>Recuperar tecnologia.<br />Compartilhar conhecimento.<br />Criar possibilidades.</p></div>
          <nav className="footer-navigation" aria-label="Navegação do rodapé"><p className="small-heading">Explore o projeto</p><ul>{navigation.map(({ label, id }) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul></nav>
          <div className="footer-contact"><p className="small-heading">Fale com a gente</p><EmailLink /><EmailLink secondary /><p>São Paulo, Brasil.</p></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} <Brand inline /> <span className="footer-divider">/</span> Criada por Felipe Leone</p><button type="button" className="motion-toggle" aria-pressed={motionPaused} onClick={onToggleMotion}><svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">{motionPaused ? <path d="m3 1 8 5-8 5z" /> : <path d="M2 1h3v10H2zm5 0h3v10H7z" />}</svg>{motionPaused ? "Ativar animações" : "Pausar animações"}</button></div>
        <div className="footer-wordmark" aria-hidden="true"><Brand /></div>
        <p className="illustration-note">Imagens ilustrativas geradas por IA.</p>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();
  const [subject, setSubject] = useState<Subject>("doacao");
  const [motionPaused, setMotionPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setMotionPaused(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="site" data-motion={motionPaused ? "paused" : "full"}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Missao />
        <ComoFunciona />
        <Doacao onContact={setSubject} />
        <Educacao onContact={setSubject} />
        <Empresas onContact={setSubject} />
        <Historia onContact={setSubject} />
        <Contato subject={subject} onSubjectChange={setSubject} />
      </main>
      <Footer motionPaused={motionPaused} onToggleMotion={() => setMotionPaused(!motionPaused)} />
    </div>
  );
}