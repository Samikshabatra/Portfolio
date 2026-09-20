import { FileText, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { CopyEmail } from "./CopyEmail";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const details = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}`, external: false },
  { icon: Phone, label: profile.phone, href: profile.phoneHref, external: false },
  {
    icon: GithubIcon,
    label: `github.com/${profile.githubHandle}`,
    href: profile.github,
    external: true,
  },
  {
    icon: LinkedinIcon,
    label: `linkedin.com/in/${profile.linkedinHandle}`,
    href: profile.linkedin,
    external: true,
  },
  { icon: MapPin, label: profile.location, href: null, external: false },
];

export function Contact() {
  return (
    <Section id="contact">
      <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-14">
        <div>
          <p className="display text-h2 leading-[1.05]">
            Let&rsquo;s build
            <br />
            what&rsquo;s next
            <span className="text-ember">.</span>
          </p>

          <p className="prose-measure mt-6 text-body text-muted">
            I am looking for AI/ML engineering roles and interesting problems to
            work on. Email is the fastest way to reach me, and I reply to
            everything.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 bg-ink px-5 py-3 text-small font-medium text-paper transition-opacity hover:opacity-85"
            >
              <Mail size={15} strokeWidth={2} aria-hidden />
              Send an email
            </a>
            <CopyEmail email={profile.email} />
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2.5 border border-line-strong px-5 py-3 text-small transition-colors hover:border-accent hover:text-accent"
            >
              <FileText size={15} strokeWidth={1.75} aria-hidden />
              Download r&eacute;sum&eacute;
            </a>
          </div>
        </div>

        <ul className="space-y-3">
          {details.map(({ icon: Icon, label, href, external }) => (
            <li key={label} className="border-t border-line pt-3">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="inline-flex items-center gap-2.5 text-small break-all text-muted transition-colors hover:text-accent"
                >
                  <Icon size={14} strokeWidth={1.75} aria-hidden className="shrink-0" />
                  {label}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2.5 text-small text-muted">
                  <Icon size={14} strokeWidth={1.75} aria-hidden className="shrink-0" />
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line py-7 sm:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 text-micro text-muted">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <p>Turning ideas into intelligent systems.</p>
      </div>
    </footer>
  );
}
