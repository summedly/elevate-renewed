import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero-terraza.jpg";
import terraza1 from "@/assets/terraza-1.jpg";
import terraza2 from "@/assets/terraza-2.jpg";
import terraza3 from "@/assets/terraza-3.jpg";
import mapaImg from "@/assets/mapa-lux.jpg";
import regaloImg from "@/assets/regalo-lux.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const terrazas = [
  {
    id: 1,
    nombre: "Terraza Sunset Lux",
    ubicacion: "Valle de Bravo",
    precio: 4500,
    rating: 4.9,
    tags: ["Jacuzzi", "Cava", "DJ"],
    capacidad: 12,
    img: heroImg,
  },
  {
    id: 2,
    nombre: "Cabaña del Bosque",
    ubicacion: "Tepoztlán",
    precio: 3800,
    rating: 4.9,
    tags: ["Alberca", "Chef", "Fogata"],
    capacidad: 8,
    img: terraza1,
  },
  {
    id: 3,
    nombre: "Refugio Desierto",
    ubicacion: "Valle de Guadalupe",
    precio: 5200,
    rating: 5.0,
    tags: ["Cava", "Fogata", "Vista"],
    capacidad: 10,
    img: terraza2,
  },
  {
    id: 4,
    nombre: "Rooftop Premium CDMX",
    ubicacion: "Polanco, CDMX",
    precio: 6200,
    rating: 5.0,
    tags: ["Cava", "DJ", "Vista"],
    capacidad: 20,
    img: terraza3,
  },
];

const paquetes = [
  { id: "menu", nombre: "Menú Gourmet", desc: "Chef privado con menú de 5 tiempos.", precio: 2500 },
  { id: "dj", nombre: "DJ Premium", desc: "DJ profesional, 4 horas + equipo.", precio: 3200 },
  { id: "cata", nombre: "Cata de Vinos", desc: "Sommelier y 6 etiquetas premium.", precio: 1800 },
  { id: "musicos", nombre: "Músicos Pro", desc: "Ensamble en vivo, set acústico.", precio: 1200 },
];

function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        <a href="#" className="font-serif text-3xl italic tracking-tight text-sand-700">
          Lux
        </a>
        <div className="hidden items-center gap-10 text-sm md:flex">
          <a href="#destacadas" className="hover:text-sand-700 transition-colors">Terrazas</a>
          <a href="#experiencias" className="hover:text-sand-700 transition-colors">Experiencias</a>
          <a href="#galeria" className="hover:text-sand-700 transition-colors">Galería</a>
          <a href="#referidos" className="hover:text-sand-700 transition-colors">Referidos</a>
          <Link to="/admin" className="hover:text-sand-700 transition-colors">Admin</Link>
        </div>
        <button className="bg-sand-700 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-sand-50 transition-all hover:brightness-110 active:scale-[0.98]">
          Reservar
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="px-6 pt-24 pb-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
          Experiencia Premium · Desde 2019
        </span>
        <h1 className="max-w-[16ch] font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl lg:text-[7.5rem]">
          Momentos que <span className="italic text-sand-700">respiran</span> calma.
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
          Reserva escapadas únicas, contrata músicos y vive experiencias premium de cata de vinos,
          chef privado y música en vivo.
        </p>

        <div className="relative mt-16">
          <img
            src={heroImg}
            alt="Terraza al atardecer con copas de vino y vista al valle"
            width={1920}
            height={1080}
            className="h-[480px] w-full object-cover md:h-[600px]"
          />
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <div className="absolute -bottom-12 left-1/2 z-10 flex w-[94%] -translate-x-1/2 flex-col items-stretch gap-2 bg-background p-3 shadow-2xl ring-1 ring-border md:left-12 md:w-auto md:translate-x-0 md:flex-row md:items-center md:p-4">
      <Field label="Ubicación" value="Valle de Bravo" />
      <Divider />
      <Field label="Fecha" value="15 — 17 Nov" />
      <Divider />
      <Field label="Huéspedes" value="8 personas" />
      <Divider />
      <Field label="Filtros" value="Jacuzzi · Cava · DJ" muted />
      <button className="ml-0 mt-2 bg-sand-700 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110 md:ml-3 md:mt-0">
        Buscar refugio
      </button>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-10 w-px bg-border md:block" />;
}

function Field({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex flex-col px-4 py-2 md:px-6">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className={`text-sm font-medium ${muted ? "text-muted-foreground" : ""}`}>{value}</span>
    </div>
  );
}

function Destacadas() {
  return (
    <section id="destacadas" className="bg-surface px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-baseline justify-between gap-4 border-b border-border pb-8 md:flex-row">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
              Selección Editorial
            </span>
            <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
              Terrazas <span className="italic">destacadas</span>
            </h2>
          </div>
          <p className="max-w-[44ch] text-pretty text-sm text-muted-foreground">
            Los espacios mejor valorados por nuestros huéspedes — refugios curados para el
            silencio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {terrazas.map((t) => (
            <article key={t.id} className="group flex flex-col">
              <div className="overflow-hidden">
                <img
                  src={t.img}
                  alt={t.nombre}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{t.nombre}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                    {t.ubicacion}
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular font-medium">
                    ${t.precio.toLocaleString()}
                    <span className="text-xs text-muted-foreground">/noche</span>
                  </p>
                  <p className="tabular mt-1 text-[10px] font-semibold uppercase tracking-widest text-sand-700">
                    ★ {t.rating.toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">{t.capacidad} personas</span>
                <button className="text-sm font-medium text-sand-700 underline underline-offset-4 hover:text-foreground transition-colors">
                  Reservar
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DisponibilidadMapa() {
  const days = useMemo(() => {
    const list: { d: number | null; state?: "selected" | "range" | "booked" }[] = [];
    for (let i = 0; i < 5; i++) list.push({ d: null });
    for (let d = 1; d <= 30; d++) {
      let state: "selected" | "range" | "booked" | undefined;
      if (d === 15 || d === 17) state = "selected";
      else if (d === 16) state = "range";
      else if ([4, 5, 11, 12, 18, 19, 25].includes(d)) state = "booked";
      list.push({ d, state });
    }
    return list;
  }, []);

  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
        <div className="bg-card p-10 ring-1 ring-border">
          <div className="mb-8 flex items-baseline justify-between">
            <h3 className="font-serif text-3xl">Disponibilidad</h3>
            <span className="text-xs font-medium italic text-muted-foreground">
              Noviembre 2024
            </span>
          </div>
          <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
            {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
              <span key={i} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {d}
              </span>
            ))}
            {days.map((cell, i) => (
              <div key={i} className="flex h-10 items-center justify-center">
                {cell.d === null ? (
                  <span />
                ) : (
                  <span
                    className={`tabular flex h-9 w-9 items-center justify-center text-sm ${
                      cell.state === "selected"
                        ? "bg-sand-700 text-sand-50"
                        : cell.state === "range"
                          ? "bg-sand-200"
                          : cell.state === "booked"
                            ? "text-muted-foreground/40 line-through"
                            : "hover:bg-surface"
                    }`}
                  >
                    {cell.d}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-sand-700" /> Seleccionado
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-sand-200" /> Rango
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-border" /> Reservado
            </span>
          </div>
        </div>

        <div>
          <div className="mb-8 flex items-baseline justify-between">
            <h3 className="font-serif text-3xl">Explora por ubicación</h3>
            <span className="text-xs font-medium italic text-muted-foreground">12 destinos</span>
          </div>
          <div className="relative overflow-hidden ring-1 ring-border">
            <img
              src={mapaImg}
              alt="Mapa de destinos Lux"
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-background/90 px-5 py-3 backdrop-blur-md ring-1 ring-border">
              <span className="text-xs text-muted-foreground">12 terrazas en esta zona</span>
              <button className="text-xs font-semibold uppercase tracking-widest text-sand-700">
                Ver mapa →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Paquetes() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ menu: true, dj: true });
  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const total = paquetes.filter((p) => selected[p.id]).reduce((acc, p) => acc + p.precio, 0);
  const count = Object.values(selected).filter(Boolean).length;

  return (
    <section id="experiencias" className="bg-sand-700 px-6 py-32 text-sand-50 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 border-b border-sand-200/20 pb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-200">
            Paquetes & Experiencias
          </span>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            Comida, música y shows para <span className="italic">personalizar</span> tu evento.
          </h2>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex grow flex-col">
            {paquetes.map((p) => {
              const isOn = !!selected[p.id];
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className="group flex items-center justify-between border-b border-sand-200/20 py-6 text-left transition-colors hover:bg-sand-50/5"
                >
                  <div className="pr-6">
                    <h4 className="text-lg font-medium">{p.nombre}</h4>
                    <p className="mt-1 text-sm text-sand-200">{p.desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-6">
                    <span className="tabular font-serif text-xl italic">
                      ${p.precio.toLocaleString()}
                    </span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center text-lg transition-colors ${
                        isOn
                          ? "bg-sand-50 text-sand-700"
                          : "border border-sand-200/30 text-sand-50 group-hover:bg-sand-50/10"
                      }`}
                    >
                      {isOn ? "−" : "+"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <aside className="w-full lg:w-96">
            <div className="bg-sand-50/10 p-8 ring-1 ring-sand-200/20">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-200">
                Total experiencias
              </span>
              <p className="tabular mt-4 font-serif text-5xl">${total.toLocaleString()} MXN</p>
              <p className="mt-2 text-sm text-sand-200">{count} experiencias seleccionadas</p>
              <button className="mt-8 w-full bg-sand-50 py-4 text-xs font-semibold uppercase tracking-widest text-sand-700 transition-all hover:brightness-110 active:scale-[0.98]">
                Ver carrito ({count})
              </button>
              <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-sand-200/70">
                Soporte WhatsApp 24/7
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Soporte() {
  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card p-10 ring-1 ring-border">
          <div className="flex items-baseline justify-between border-b border-border pb-6">
            <h3 className="font-serif text-2xl">Soporte vía WhatsApp</h3>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Respuesta inmediata 24/7
            </span>
          </div>
          <div className="mt-8 space-y-4">
            <div className="max-w-md bg-surface px-5 py-3 text-sm">
              ¡Hola! Soy Marta de Lux. ¿En qué puedo ayudarte hoy?
              <span className="mt-2 block text-[10px] uppercase tracking-widest text-muted-foreground">
                10:42 AM
              </span>
            </div>
            <div className="ml-auto max-w-md bg-sand-700 px-5 py-3 text-sm text-sand-50">
              Quisiera reservar la terraza Sunset Lux para el 15 de noviembre.
              <span className="mt-2 block text-[10px] uppercase tracking-widest text-sand-200">
                10:43 AM
              </span>
            </div>
            <div className="max-w-md bg-surface px-5 py-3 text-sm">
              Excelente elección. Te confirmo disponibilidad en un momento ✨
              <span className="mt-2 block text-[10px] uppercase tracking-widest text-muted-foreground">
                10:43 AM
              </span>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
            <input
              type="text"
              placeholder="Escribe un mensaje…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="h-10 w-10 bg-sand-700 text-sand-50">→</button>
          </div>
        </div>

        <aside>
          <h3 className="font-serif text-2xl">Contactos</h3>
          <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
            Líneas directas
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Reservaciones
                </p>
                <p className="tabular mt-1 text-sm font-medium">+52 55 1234 5678</p>
              </div>
              <button className="text-xs font-semibold uppercase tracking-widest text-sand-700">
                Llamar
              </button>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Soporte Premium
                </p>
                <p className="tabular mt-1 text-sm font-medium">+52 55 8765 4321</p>
              </div>
              <button className="text-xs font-semibold uppercase tracking-widest text-sand-700">
                Llamar
              </button>
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 bg-sand-700 py-4 text-xs font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110">
              Chat WhatsApp
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Galeria() {
  const imgs = [heroImg, terraza1, terraza2, terraza3];
  return (
    <section id="galeria" className="bg-surface px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-baseline justify-between gap-4 md:flex-row">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
              Galería Administrable
            </span>
            <h2 className="mt-3 font-serif text-4xl">Momentos curados</h2>
          </div>
          <button className="text-xs font-semibold uppercase tracking-widest text-sand-700 underline underline-offset-4">
            Admin · Cargar nuevas
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Galería ${i + 1}`}
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Referidos() {
  return (
    <section id="referidos" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 overflow-hidden ring-1 ring-border lg:grid-cols-2">
          <div className="bg-ink p-12 text-sand-50 lg:p-20">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-200">
              Exclusivo para miembros
            </span>
            <h2 className="mt-4 max-w-[18ch] font-serif text-4xl leading-tight md:text-5xl">
              Invita, celebra y <span className="italic">gana</span> experiencias Lux.
            </h2>
            <p className="mt-6 max-w-[44ch] text-pretty text-sm leading-relaxed text-sand-200">
              Por cada amigo que reserve una terraza o paquete, ambos reciben puntos canjeables por
              catas de vino, cenas privadas y noches gratis.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-px border border-sand-200/20 bg-sand-200/20">
              {[
                { v: "500", l: "puntos por amigo" },
                { v: "1", l: "cata de cortesía" },
                { v: "1", l: "noche gratis" },
              ].map((s) => (
                <div key={s.l} className="bg-ink p-6">
                  <p className="tabular font-serif text-3xl">{s.v}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-sand-200">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3 bg-sand-50/10 px-4 py-3 ring-1 ring-sand-200/20">
              <span className="tabular flex-1 text-sm text-sand-50">LUX-MTY/MARTA-2024</span>
              <button className="text-xs font-semibold uppercase tracking-widest text-sand-200">
                Copiar
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="bg-sand-50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition-all hover:brightness-110">
                Invitar amigos
              </button>
              <button className="border border-sand-200/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-sand-50 transition-all hover:bg-sand-50/10">
                Compartir
              </button>
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-widest text-sand-200/60">
              Sin costo · Puntos al instante · Canjea cuando quieras
            </p>
          </div>
          <div className="relative min-h-[400px] bg-surface">
            <img
              src={regaloImg}
              alt="Regalo Lux con sobre y eucalipto"
              loading="lazy"
              width={1000}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div>
            <span className="font-serif text-3xl italic text-sand-700">Lux</span>
            <p className="mt-6 max-w-[30ch] text-sm text-muted-foreground">
              Refugios editoriales para almas buscadoras de silencio y diseño consciente.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Explorar
            </h5>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="#destacadas" className="hover:text-sand-700 transition-colors">Terrazas</a></li>
              <li><a href="#experiencias" className="hover:text-sand-700 transition-colors">Experiencias</a></li>
              <li><a href="#referidos" className="hover:text-sand-700 transition-colors">Referidos</a></li>
              <li><a href="#" className="hover:text-sand-700 transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Newsletter
            </h5>
            <p className="mt-6 text-sm text-muted-foreground">
              Historias de diseño y escapadas exclusivas en tu correo.
            </p>
            <div className="mt-4 flex border-b border-border py-2">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="text-xs font-semibold uppercase tracking-widest text-sand-700">
                Unirse
              </button>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 Lux Hospitality. Todos los derechos reservados.
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-sand-700 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-sand-700 transition-colors">Términos</a>
            <a href="#" className="hover:text-sand-700 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Nav />
      <main className="pt-16">
        <Hero />
        <Destacadas />
        <DisponibilidadMapa />
        <Paquetes />
        <Soporte />
        <Galeria />
        <Referidos />
      </main>
      <Footer />
    </div>
  );
}
