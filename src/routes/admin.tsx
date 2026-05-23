import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero-terraza.jpg";
import terraza1 from "@/assets/terraza-1.jpg";
import terraza2 from "@/assets/terraza-2.jpg";
import terraza3 from "@/assets/terraza-3.jpg";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Lux" },
      { name: "description", content: "Panel de administración de reservas, catálogo y rentabilidad." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Estado = "Confirmada" | "Pendiente" | "Cancelada";

interface Reserva {
  id: string;
  huesped: string;
  terraza: string;
  fechas: string;
  noches: number;
  total: number;
  estado: Estado;
}

interface Terraza {
  id: number;
  nombre: string;
  ubicacion: string;
  precio: number;
  capacidad: number;
  ocupacion: number; // 0-100
  ingresos: number; // mes
  costos: number; // mes
  rating: number;
  activa: boolean;
  img: string;
}

const reservasIniciales: Reserva[] = [
  { id: "LUX-2411-001", huesped: "María Fernández", terraza: "Terraza Sunset Lux", fechas: "15 — 17 Nov", noches: 2, total: 9000, estado: "Confirmada" },
  { id: "LUX-2411-002", huesped: "Carlos Ruiz", terraza: "Cabaña del Bosque", fechas: "18 — 20 Nov", noches: 2, total: 7600, estado: "Pendiente" },
  { id: "LUX-2411-003", huesped: "Ana Torres", terraza: "Refugio Desierto", fechas: "22 — 25 Nov", noches: 3, total: 15600, estado: "Confirmada" },
  { id: "LUX-2411-004", huesped: "Diego Salinas", terraza: "Rooftop Premium CDMX", fechas: "28 — 30 Nov", noches: 2, total: 12400, estado: "Cancelada" },
  { id: "LUX-2412-005", huesped: "Lucía Méndez", terraza: "Terraza Sunset Lux", fechas: "02 — 04 Dic", noches: 2, total: 9000, estado: "Confirmada" },
  { id: "LUX-2412-006", huesped: "Pablo Iglesias", terraza: "Rooftop Premium CDMX", fechas: "10 — 12 Dic", noches: 2, total: 12400, estado: "Pendiente" },
];

const terrazasIniciales: Terraza[] = [
  { id: 1, nombre: "Terraza Sunset Lux", ubicacion: "Valle de Bravo", precio: 4500, capacidad: 12, ocupacion: 82, ingresos: 124500, costos: 38000, rating: 4.9, activa: true, img: heroImg },
  { id: 2, nombre: "Cabaña del Bosque", ubicacion: "Tepoztlán", precio: 3800, capacidad: 8, ocupacion: 64, ingresos: 72200, costos: 31000, rating: 4.9, activa: true, img: terraza1 },
  { id: 3, nombre: "Refugio Desierto", ubicacion: "Valle de Guadalupe", precio: 5200, capacidad: 10, ocupacion: 71, ingresos: 110500, costos: 52000, rating: 5.0, activa: true, img: terraza2 },
  { id: 4, nombre: "Rooftop Premium CDMX", ubicacion: "Polanco, CDMX", precio: 6200, capacidad: 20, ocupacion: 88, ingresos: 163680, costos: 41000, rating: 5.0, activa: true, img: terraza3 },
];

type Tab = "reservas" | "catalogo" | "roles" | "dashboard";

type RolId = "superadmin" | "operaciones" | "finanzas" | "soporte" | "lectura";

interface Rol {
  id: RolId;
  nombre: string;
  descripcion: string;
  permisos: string[];
}

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: RolId;
  activo: boolean;
  ultimoAcceso: string;
}

const PERMISOS_DISPONIBLES = [
  "Ver dashboard",
  "Gestionar reservas",
  "Editar catálogo",
  "Crear terrazas",
  "Gestionar usuarios",
  "Ver finanzas",
  "Exportar reportes",
  "Atender soporte",
] as const;

const rolesIniciales: Rol[] = [
  {
    id: "superadmin",
    nombre: "Super Admin",
    descripcion: "Acceso total al sistema, incluyendo gestión de roles y usuarios.",
    permisos: [...PERMISOS_DISPONIBLES],
  },
  {
    id: "operaciones",
    nombre: "Operaciones",
    descripcion: "Gestiona reservas y catálogo del día a día.",
    permisos: ["Ver dashboard", "Gestionar reservas", "Editar catálogo"],
  },
  {
    id: "finanzas",
    nombre: "Finanzas",
    descripcion: "Acceso a dashboards, ingresos y exportación de reportes.",
    permisos: ["Ver dashboard", "Ver finanzas", "Exportar reportes"],
  },
  {
    id: "soporte",
    nombre: "Soporte",
    descripcion: "Atiende huéspedes y consulta reservas.",
    permisos: ["Gestionar reservas", "Atender soporte"],
  },
  {
    id: "lectura",
    nombre: "Solo lectura",
    descripcion: "Visualiza información sin permisos de edición.",
    permisos: ["Ver dashboard"],
  },
];

const usuariosIniciales: Usuario[] = [
  { id: "u-001", nombre: "Sofía Navarro", email: "sofia@lux.mx", rol: "superadmin", activo: true, ultimoAcceso: "Hace 12 min" },
  { id: "u-002", nombre: "Mateo Linares", email: "mateo@lux.mx", rol: "operaciones", activo: true, ultimoAcceso: "Hace 2 h" },
  { id: "u-003", nombre: "Renata Ortiz", email: "renata@lux.mx", rol: "finanzas", activo: true, ultimoAcceso: "Ayer" },
  { id: "u-004", nombre: "Iván Pacheco", email: "ivan@lux.mx", rol: "soporte", activo: true, ultimoAcceso: "Hace 30 min" },
  { id: "u-005", nombre: "Camila Vega", email: "camila@lux.mx", rol: "lectura", activo: false, ultimoAcceso: "Hace 6 días" },
];

function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [reservas, setReservas] = useState<Reserva[]>(reservasIniciales);
  const [terrazas, setTerrazas] = useState<Terraza[]>(terrazasIniciales);
  const [roles, setRoles] = useState<Rol[]>(rolesIniciales);
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosIniciales);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link to="/" className="font-serif text-3xl italic tracking-tight text-sand-700">Lux</Link>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Panel Administrativo
          </span>
          <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-sand-700 hover:text-foreground">
            ← Sitio
          </Link>
        </div>
      </header>

      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl gap-8 px-6 lg:px-12">
          {([
            { id: "dashboard", label: "Dashboard" },
            { id: "reservas", label: "Reservas" },
            { id: "catalogo", label: "Catálogo" },
            { id: "roles", label: "Roles y usuarios" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative py-5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                tab === t.id ? "text-sand-700" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {tab === t.id && <span className="absolute inset-x-0 -bottom-px h-px bg-sand-700" />}
            </button>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        {tab === "dashboard" && <Dashboard terrazas={terrazas} reservas={reservas} />}
        {tab === "reservas" && <Reservas reservas={reservas} setReservas={setReservas} />}
        {tab === "catalogo" && <Catalogo terrazas={terrazas} setTerrazas={setTerrazas} />}
        {tab === "roles" && (
          <RolesUsuarios
            roles={roles}
            setRoles={setRoles}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
          />
        )}
      </main>
    </div>
  );
}

/* ----------------------------- DASHBOARD ----------------------------- */

function Dashboard({ terrazas, reservas }: { terrazas: Terraza[]; reservas: Reserva[] }) {
  const stats = useMemo(() => {
    const ingresos = terrazas.reduce((a, t) => a + t.ingresos, 0);
    const costos = terrazas.reduce((a, t) => a + t.costos, 0);
    const margen = ingresos - costos;
    const ocupacion = Math.round(
      terrazas.reduce((a, t) => a + t.ocupacion, 0) / terrazas.length,
    );
    return { ingresos, costos, margen, ocupacion };
  }, [terrazas]);

  const ranking = useMemo(
    () =>
      [...terrazas]
        .map((t) => ({ ...t, rentabilidad: t.ingresos - t.costos, margenPct: Math.round(((t.ingresos - t.costos) / t.ingresos) * 100) }))
        .sort((a, b) => b.rentabilidad - a.rentabilidad),
    [terrazas],
  );

  const mejor = ranking[0];
  const peor = ranking[ranking.length - 1];
  const maxRent = Math.max(...ranking.map((r) => r.rentabilidad));

  const reservasConfirmadas = reservas.filter((r) => r.estado === "Confirmada").length;
  const reservasPendientes = reservas.filter((r) => r.estado === "Pendiente").length;

  return (
    <div className="space-y-12">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Resumen mensual</span>
        <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
          Rentabilidad <span className="italic">en vivo</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        <KPI label="Ingresos" value={`$${stats.ingresos.toLocaleString()}`} hint="MXN · mes" />
        <KPI label="Costos" value={`$${stats.costos.toLocaleString()}`} hint="MXN · mes" />
        <KPI label="Margen neto" value={`$${stats.margen.toLocaleString()}`} hint={`${Math.round((stats.margen / stats.ingresos) * 100)}% sobre ingresos`} accent />
        <KPI label="Ocupación promedio" value={`${stats.ocupacion}%`} hint={`${reservasConfirmadas} confirmadas · ${reservasPendientes} pendientes`} />
      </div>

      <section className="bg-card p-8 ring-1 ring-border lg:p-10">
        <div className="mb-8 flex items-baseline justify-between border-b border-border pb-6">
          <h2 className="font-serif text-2xl">Rentabilidad por terraza</h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Ordenado por margen</span>
        </div>
        <div className="space-y-6">
          {ranking.map((r, i) => (
            <div key={r.id} className="space-y-2">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="tabular text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    #{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-lg">{r.nombre}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.ubicacion}</span>
                </div>
                <div className="text-right">
                  <p className="tabular font-medium">${r.rentabilidad.toLocaleString()}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.margenPct}% margen · {r.ocupacion}% ocup.</p>
                </div>
              </div>
              <div className="h-2 w-full bg-surface">
                <div
                  className={`h-full ${i === 0 ? "bg-sand-700" : i === ranking.length - 1 ? "bg-sand-200" : "bg-sand-700/60"}`}
                  style={{ width: `${(r.rentabilidad / maxRent) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Insight title="Mayor rentabilidad" tag="Top performer" tone="positive" terraza={mejor} />
        <Insight title="Menor rentabilidad" tag="Requiere atención" tone="warn" terraza={peor} />
      </div>
    </div>
  );
}

function KPI({ label, value, hint, accent = false }: { label: string; value: string; hint: string; accent?: boolean }) {
  return (
    <div className={`p-8 ${accent ? "bg-sand-700 text-sand-50" : "bg-card"}`}>
      <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${accent ? "text-sand-200" : "text-muted-foreground"}`}>
        {label}
      </p>
      <p className="tabular mt-4 font-serif text-3xl md:text-4xl">{value}</p>
      <p className={`mt-2 text-xs ${accent ? "text-sand-200" : "text-muted-foreground"}`}>{hint}</p>
    </div>
  );
}

function Insight({
  title,
  tag,
  tone,
  terraza,
}: {
  title: string;
  tag: string;
  tone: "positive" | "warn";
  terraza: Terraza & { rentabilidad: number; margenPct: number };
}) {
  return (
    <div className={`flex gap-6 p-8 ring-1 ${tone === "positive" ? "bg-card ring-border" : "bg-surface ring-border"}`}>
      <img src={terraza.img} alt={terraza.nombre} className="h-28 w-28 shrink-0 object-cover" />
      <div className="flex-1">
        <span className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${tone === "positive" ? "text-sand-700" : "text-muted-foreground"}`}>
          {tag}
        </span>
        <h3 className="mt-2 font-serif text-2xl">{title}</h3>
        <p className="mt-1 text-sm">{terraza.nombre} <span className="text-muted-foreground">· {terraza.ubicacion}</span></p>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4 text-xs">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Margen</p>
            <p className="tabular mt-1 font-medium">${terraza.rentabilidad.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ocupación</p>
            <p className="tabular mt-1 font-medium">{terraza.ocupacion}%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating</p>
            <p className="tabular mt-1 font-medium">★ {terraza.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ RESERVAS ----------------------------- */

function Reservas({ reservas, setReservas }: { reservas: Reserva[]; setReservas: (r: Reserva[]) => void }) {
  const [filtro, setFiltro] = useState<"Todas" | Estado>("Todas");
  const filtradas = filtro === "Todas" ? reservas : reservas.filter((r) => r.estado === filtro);

  const cambiarEstado = (id: string, estado: Estado) => {
    setReservas(reservas.map((r) => (r.id === id ? { ...r, estado } : r)));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Operaciones</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Reservas</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtradas.length} reservas · gestiona estado y confirma huéspedes.</p>
        </div>
        <div className="flex gap-2">
          {(["Todas", "Confirmada", "Pendiente", "Cancelada"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                filtro === f ? "bg-sand-700 text-sand-50" : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-card ring-1 ring-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4">Folio</th>
              <th className="px-6 py-4">Huésped</th>
              <th className="px-6 py-4">Terraza</th>
              <th className="px-6 py-4">Fechas</th>
              <th className="px-6 py-4 text-right">Total</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                <td className="tabular px-6 py-5 text-xs text-muted-foreground">{r.id}</td>
                <td className="px-6 py-5 font-medium">{r.huesped}</td>
                <td className="px-6 py-5">{r.terraza}</td>
                <td className="px-6 py-5 text-muted-foreground">{r.fechas} <span className="text-xs">· {r.noches}n</span></td>
                <td className="tabular px-6 py-5 text-right font-medium">${r.total.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <EstadoBadge estado={r.estado} />
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    {r.estado !== "Confirmada" && (
                      <button onClick={() => cambiarEstado(r.id, "Confirmada")} className="text-[10px] font-semibold uppercase tracking-widest text-sand-700 hover:text-foreground">
                        Confirmar
                      </button>
                    )}
                    {r.estado !== "Cancelada" && (
                      <button onClick={() => cambiarEstado(r.id, "Cancelada")} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                        Cancelar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                  Sin reservas en este estado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: Estado }) {
  const map = {
    Confirmada: "bg-sand-700 text-sand-50",
    Pendiente: "bg-sand-200 text-sand-700",
    Cancelada: "bg-surface text-muted-foreground line-through",
  } as const;
  return (
    <span className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${map[estado]}`}>
      {estado}
    </span>
  );
}

/* ------------------------------ CATÁLOGO ----------------------------- */

function Catalogo({ terrazas, setTerrazas }: { terrazas: Terraza[]; setTerrazas: (t: Terraza[]) => void }) {
  const toggleActiva = (id: number) =>
    setTerrazas(terrazas.map((t) => (t.id === id ? { ...t, activa: !t.activa } : t)));

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Inventario</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Catálogo de terrazas</h1>
          <p className="mt-2 text-sm text-muted-foreground">{terrazas.length} propiedades activas en el sistema.</p>
        </div>
        <button className="bg-sand-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110">
          + Nueva terraza
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {terrazas.map((t) => (
          <article key={t.id} className="flex gap-6 bg-card p-6 ring-1 ring-border">
            <img src={t.img} alt={t.nombre} className="h-40 w-40 shrink-0 object-cover" />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl">{t.nombre}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{t.ubicacion}</p>
                </div>
                <span className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${t.activa ? "bg-sand-700 text-sand-50" : "bg-surface text-muted-foreground"}`}>
                  {t.activa ? "Activa" : "Pausada"}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Precio</p>
                  <p className="tabular mt-1 font-medium">${t.precio.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Capacidad</p>
                  <p className="tabular mt-1 font-medium">{t.capacidad} pax</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ocupación</p>
                  <p className="tabular mt-1 font-medium">{t.ocupacion}%</p>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-end gap-3 pt-4">
                <button className="text-[10px] font-semibold uppercase tracking-widest text-sand-700 hover:text-foreground">
                  Editar
                </button>
                <button onClick={() => toggleActiva(t.id)} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                  {t.activa ? "Pausar" : "Activar"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
