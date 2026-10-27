import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; title: string; poster: string; alt: string };

type Project = {
  name: string;
  description: string;
  href: string;
};

function getMediaTransform(source: DOMRect, target: DOMRect) {
  const x = source.left - target.left;
  const y = source.top - target.top;
  const scaleX = source.width / target.width;
  const scaleY = source.height / target.height;

  return `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
}

const featuredMedia: ProjectMedia = {
  type: 'image',
  src: '/projects/photon-demo-bg.webp',
  alt: 'Photon logo over a blue and purple glowing background',
};

const projects: Project[] = [
  {
    name: 'Recorder',
    description: 'A lightweight, experimental Screen Studio alternative built with Rust and GPUI.',
    href: 'https://github.com/TheoSlater/recorder',
  },
  {
    name: 'Supertonic-rs',
    description: 'A Rust port of the Supertonic SDK.',
    href: 'https://github.com/TheoSlater/supertonic-rs',
  },
];

function FeaturedMedia({ media, detail = false }: { media: ProjectMedia; detail?: boolean }) {
  if (media.type === 'video' && detail) {
    return (
      <video
        aria-label={media.title}
        className="project-media"
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        src={media.src}
      />
    );
  }

  return (
    <img
      alt={media.alt}
      className="project-media"
      decoding="async"
      fetchPriority="high"
      src={media.type === 'image' ? media.src : media.poster}
    />
  );
}

function App() {
  const [dialogMounted, setDialogMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogClosing, setDialogClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previewMediaRef = useRef<HTMLSpanElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const dialogMediaRef = useRef<HTMLDivElement>(null);
  const sourceMediaRectRef = useRef<DOMRect | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const closeDialog = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const media = dialogMediaRef.current;
    const sourceRect = sourceMediaRectRef.current;
    if (media && sourceRect) {
      const targetRect = media.getBoundingClientRect();
      media.style.transition = 'transform var(--modal-close-dur) var(--modal-ease)';
      media.style.transform = getMediaTransform(sourceRect, targetRect);
    }

    const closeDuration =
      Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--modal-close-dur'),
      ) || 150;

    setDialogOpen(false);
    setDialogClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setDialogMounted(false);
      setDialogClosing(false);
      closeTimeoutRef.current = null;
      triggerRef.current?.focus();
    }, closeDuration);
  }, []);

  const openDialog = () => {
    sourceMediaRectRef.current = previewMediaRef.current?.getBoundingClientRect() ?? null;
    setDialogClosing(false);
    setDialogMounted(true);
  };

  useLayoutEffect(() => {
    if (!dialogMounted || dialogClosing) return;

    const media = dialogMediaRef.current;
    const sourceRect = sourceMediaRectRef.current;
    if (!media || !sourceRect) return;

    const targetRect = media.getBoundingClientRect();
    media.style.transition = 'none';
    media.style.transform = getMediaTransform(sourceRect, targetRect);
    media.getBoundingClientRect();

    const frame = window.requestAnimationFrame(() => {
      media.style.transition = 'transform var(--modal-open-dur) var(--modal-ease)';
      media.style.transform = 'none';
    });

    return () => window.cancelAnimationFrame(frame);
  }, [dialogClosing, dialogMounted]);

  useEffect(() => {
    if (!dialogMounted || dialogClosing || dialogOpen) return;

    const frame = window.requestAnimationFrame(() => setDialogOpen(true));
    return () => window.cancelAnimationFrame(frame);
  }, [dialogClosing, dialogMounted, dialogOpen]);

  useEffect(() => {
    if (!dialogMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], video[controls]',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeDialog, dialogMounted]);

  useEffect(() => {
    document.title = dialogOpen ? 'Theo · Photon browser' : 'Theo · Software Engineer';
  }, [dialogOpen]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  return (
    <main className="page-shell">
      <div className="intro-copy">
        <h1>
          I’m Theo, a 16-year-old software engineer in the UK. I build open-source apps and tools,
          especially when I think something could work better.
        </h1>
        <p>
          I’m currently a software developer and support apprentice at Nexdynamic, the team behind
          Squeegee.
        </p>
        <p>
          I’m currently building{' '}
          <a className="text-link" href="https://photonapp.co.uk">
            Photon
          </a>
          , a new kind of browser powered by Ladybird, an independent browser.{' '}
          <a className="text-link text-link--muted" href="https://photonapp.co.uk">
            More info
          </a>
        </p>
      </div>

      <section className="project-section" id="projects" aria-labelledby="projects-heading">
        <div className="project-section__heading">
          <h2 id="projects-heading">Projects</h2>
          <a className="project-section__all-link" href="https://github.com/theoslater">
            More on GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="project-icon"
              size={14}
              strokeWidth={1.75}
            />
          </a>
        </div>

        <article className="featured-project">
          <button
            ref={triggerRef}
            aria-controls="photon-project-dialog"
            aria-expanded={dialogOpen}
            aria-haspopup="dialog"
            aria-label="Open Photon project details"
            className={`project-preview${dialogMounted ? ' project-preview--active' : ''}`}
            onClick={openDialog}
            type="button"
          >
            <span ref={previewMediaRef} className="project-preview__media">
              <FeaturedMedia media={featuredMedia} />
            </span>
            <span className="project-preview__caption">
              An independent browser built on Ladybird.
            </span>
          </button>
        </article>

        <div className="project-list">
          <h3 className="project-list__heading">More projects</h3>
          <ul>
            {projects.map((project) => (
              <li key={project.name}>
                <a
                  aria-label={`View ${project.name} on GitHub`}
                  className="project-row"
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="project-row__copy">
                    <span className="project-row__name">{project.name}</span>
                    <span className="project-row__description">{project.description}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="project-row__arrow"
                    size={16}
                    strokeWidth={1.75}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {dialogMounted && (
        <div
          className={`t-modal project-overlay${dialogOpen ? ' is-open' : ''}${dialogClosing ? ' is-closing' : ''}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
          role="presentation"
        >
          <section
            ref={dialogRef}
            aria-describedby="photon-project-description"
            aria-labelledby="photon-project-title"
            aria-modal="true"
            className="project-dialog"
            id="photon-project-dialog"
            role="dialog"
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              aria-label="Close project details"
              className="project-dialog__close"
              onClick={closeDialog}
              type="button"
            >
              <X aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>

            <div ref={dialogMediaRef} className="project-dialog__media">
              <FeaturedMedia detail media={featuredMedia} />
            </div>
            <div className="project-dialog__details">
              <p className="project-dialog__eyebrow">In development</p>
              <h2 id="photon-project-title">Photon</h2>
              <p id="photon-project-description">
                An independent browser built on Ladybird, focused on a fast, private experience of
                the web.
              </p>
              <div className="project-dialog__links">
                <a
                  className="project-dialog__link"
                  href="https://photonapp.co.uk"
                  rel="noreferrer"
                  target="_blank"
                >
                  Website
                  <ArrowUpRight
                    aria-hidden="true"
                    className="project-icon"
                    size={14}
                    strokeWidth={1.75}
                  />
                </a>
                <a
                  className="project-dialog__link"
                  href="https://github.com/PhotonBrowser/photon"
                  rel="noreferrer"
                  target="_blank"
                >
                  GitHub
                  <ArrowUpRight
                    aria-hidden="true"
                    className="project-icon"
                    size={14}
                    strokeWidth={1.75}
                  />
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
