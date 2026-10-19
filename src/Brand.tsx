type BrandProps = {
  className?: string;
  inline?: boolean;
  tagline?: boolean;
};

export function Brand({ className = "", inline = false, tagline = false }: BrandProps) {
  return (
    <span className={`brand-lockup ${inline ? "brand-inline" : ""} ${className}`}>
      <span className="brand-mark" role="img" aria-label="LBEdu">
        <span className="brand-lb" aria-hidden="true">LB</span>
        <span className="brand-edu" aria-hidden="true">EDU</span>
      </span>
      {tagline && <span className="brand-tagline">SÃO PAULO / SOCIAL</span>}
    </span>
  );
}

export function EmailLink({ secondary = false, className = "" }: { secondary?: boolean; className?: string }) {
  const email = secondary ? "lbedu.me@gmail.com" : "lb@lbedu.me";

  return (
    <a href={`mailto:${email}`} className={`email-link ${className}`} aria-label={email}>
      {!secondary && "lb@"}
      <span className="email-brand"><span className="brand-lb">lb</span><span className="brand-edu">edu</span></span>
      {secondary ? ".me@gmail.com" : ".me"}
    </a>
  );
}