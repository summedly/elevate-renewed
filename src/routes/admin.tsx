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

type Tab = "reservas" | "catalogo" | "roles" | "redes" | "dashboard";

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
            { id: "redes", label: "Redes sociales" },
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
        {tab === "redes" && <RedesSociales terrazas={terrazas} />}
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

/* ------------------------- ROLES Y USUARIOS ------------------------- */

function RolesUsuarios({
  roles,
  setRoles,
  usuarios,
  setUsuarios,
}: {
  roles: Rol[];
  setRoles: (r: Rol[]) => void;
  usuarios: Usuario[];
  setUsuarios: (u: Usuario[]) => void;
}) {
  const [rolSeleccionado, setRolSeleccionado] = useState<RolId>(roles[0].id);
  const rolActivo = roles.find((r) => r.id === rolSeleccionado)!;

  const togglePermiso = (permiso: string) => {
    setRoles(
      roles.map((r) =>
        r.id === rolSeleccionado
          ? {
              ...r,
              permisos: r.permisos.includes(permiso)
                ? r.permisos.filter((p) => p !== permiso)
                : [...r.permisos, permiso],
            }
          : r,
      ),
    );
  };

  const cambiarRolUsuario = (id: string, rol: RolId) =>
    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, rol } : u)));

  const toggleActivo = (id: string) =>
    setUsuarios(usuarios.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)));

  const conteoPorRol = (rolId: RolId) => usuarios.filter((u) => u.rol === rolId).length;

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Accesos</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Roles <span className="italic">y usuarios</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Define qué puede hacer cada administrador dentro del panel.
          </p>
        </div>
        <button className="bg-sand-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110">
          + Invitar administrador
        </button>
      </div>

      {/* Roles + permisos */}
      <section className="grid grid-cols-1 gap-px bg-border lg:grid-cols-[280px_1fr]">
        <aside className="bg-card p-6">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Roles definidos
          </p>
          <ul className="space-y-1">
            {roles.map((r) => {
              const activo = r.id === rolSeleccionado;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setRolSeleccionado(r.id)}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition-colors ${
                      activo ? "bg-sand-700 text-sand-50" : "hover:bg-surface"
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-base">{r.nombre}</span>
                      <span className={`mt-0.5 block text-[10px] uppercase tracking-widest ${activo ? "text-sand-200" : "text-muted-foreground"}`}>
                        {r.permisos.length} permisos
                      </span>
                    </span>
                    <span className={`tabular text-xs ${activo ? "text-sand-200" : "text-muted-foreground"}`}>
                      {conteoPorRol(r.id)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="bg-card p-8 lg:p-10">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <div>
              <h2 className="font-serif text-2xl">{rolActivo.nombre}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{rolActivo.descripcion}</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {rolActivo.permisos.length} / {PERMISOS_DISPONIBLES.length} permisos
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
            {PERMISOS_DISPONIBLES.map((p) => {
              const activo = rolActivo.permisos.includes(p);
              const bloqueado = rolActivo.id === "superadmin";
              return (
                <label
                  key={p}
                  className={`flex cursor-pointer items-center justify-between gap-3 border border-border px-4 py-3 transition-colors ${
                    activo ? "bg-sand-50" : "bg-card hover:bg-surface"
                  } ${bloqueado ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <span className="text-sm">{p}</span>
                  <input
                    type="checkbox"
                    checked={activo}
                    disabled={bloqueado}
                    onChange={() => togglePermiso(p)}
                    className="h-4 w-4 accent-sand-700"
                  />
                </label>
              );
            })}
          </div>
          {rolActivo.id === "superadmin" && (
            <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              El rol Super Admin tiene todos los permisos por seguridad y no puede modificarse.
            </p>
          )}
        </div>
      </section>

      {/* Usuarios */}
      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-2xl">Administradores</h2>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            {usuarios.length} usuarios · {usuarios.filter((u) => u.activo).length} activos
          </span>
        </div>

        <div className="overflow-hidden bg-card ring-1 ring-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Último acceso</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-surface/60">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-200 font-serif text-sm text-sand-700">
                        {u.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                      <span className="font-medium">{u.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-muted-foreground">{u.email}</td>
                  <td className="px-6 py-5">
                    <select
                      value={u.rol}
                      onChange={(e) => cambiarRolUsuario(u.id, e.target.value as RolId)}
                      className="border border-border bg-card px-2 py-1 text-xs uppercase tracking-widest"
                    >
                      {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-5 text-xs text-muted-foreground">{u.ultimoAcceso}</td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${
                        u.activo ? "bg-sand-700 text-sand-50" : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {u.activo ? "Activo" : "Suspendido"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => toggleActivo(u.id)}
                      className="text-[10px] font-semibold uppercase tracking-widest text-sand-700 hover:text-foreground"
                    >
                      {u.activo ? "Suspender" : "Reactivar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ----------------------------- REDES SOCIALES ----------------------------- */

type RedId = "facebook" | "instagram" | "tiktok" | "whatsapp";

interface Red {
  id: RedId;
  nombre: string;
  handle: string;
  color: string;
  maxLength: number;
}

const REDES: Red[] = [
  { id: "facebook", nombre: "Facebook", handle: "@LuxTerrazas", color: "#1877F2", maxLength: 2000 },
  { id: "instagram", nombre: "Instagram", handle: "@lux.terrazas", color: "#E4405F", maxLength: 2200 },
  { id: "tiktok", nombre: "TikTok", handle: "@luxterrazas", color: "#000000", maxLength: 2200 },
  { id: "whatsapp", nombre: "WhatsApp Estados", handle: "Lux · Estados", color: "#25D366", maxLength: 700 },
];

const PLANTILLAS = [
  {
    id: "escapada",
    nombre: "Escapada de fin de semana",
    plantilla: (t: Terraza) =>
      `Escápate este fin de semana a ${t.nombre} en ${t.ubicacion}. \n\nDesde $${t.precio.toLocaleString()} MXN / noche · hasta ${t.capacidad} huéspedes · ★ ${t.rating.toFixed(1)}.\n\nReserva en lux.mx`,
  },
  {
    id: "promocion",
    nombre: "Promoción flash",
    plantilla: (t: Terraza) =>
      `Solo por hoy: 15% OFF en ${t.nombre} (${t.ubicacion}).\n\nIdeal para ${t.capacidad} personas. Reserva antes de medianoche en lux.mx · #LuxTerrazas`,
  },
  {
    id: "experiencia",
    nombre: "Experiencia premium",
    plantilla: (t: Terraza) =>
      `Vive una experiencia inolvidable en ${t.nombre}.\n\nUbicación privilegiada en ${t.ubicacion}. Chef privado, DJ y atardeceres de película. \n\nReserva: lux.mx`,
  },
];

interface Experiencia {
  id: string;
  nombre: string;
  tagline: string;
  ubicacion: string;
  duracion: string;
  precio: number;
  capacidad: number;
  servicios: string[];
  terrazaId: number;
}

const EXPERIENCIAS_INICIALES: Experiencia[] = [
  {
    id: "exp-romance",
    nombre: "Escape Romance",
    tagline: "Dos noches diseñadas para enamorarse otra vez.",
    ubicacion: "Valle de Guadalupe",
    duracion: "2 noches · 3 días",
    precio: 18900,
    capacidad: 2,
    servicios: [
      "Hospedaje en suite privada",
      "Cena maridaje con chef privado",
      "Masaje en pareja al atardecer",
      "Cata privada de vinos",
      "Desayuno gourmet en terraza",
    ],
    terrazaId: 1,
  },
  {
    id: "exp-celebracion",
    nombre: "Celebración Lux",
    tagline: "Tu evento, tu terraza, tu equipo creativo.",
    ubicacion: "Tepoztlán",
    duracion: "1 día · 12 horas",
    precio: 42500,
    capacidad: 20,
    servicios: [
      "Renta exclusiva de terraza",
      "DJ y sistema de audio premium",
      "Mixología de autor (4 horas barra libre)",
      "Cena de 4 tiempos para 20 personas",
      "Decoración floral y mantelería",
      "Fotógrafo de evento",
    ],
    terrazaId: 2,
  },
  {
    id: "exp-retiro",
    nombre: "Retiro Wellness",
    tagline: "Tres días para reconectar con calma y naturaleza.",
    ubicacion: "Tulum",
    duracion: "3 noches · 4 días",
    precio: 26400,
    capacidad: 4,
    servicios: [
      "Hospedaje con vista al mar",
      "Yoga al amanecer (3 sesiones)",
      "Temazcal ceremonial",
      "Menú plant-based diseñado por chef",
      "Masaje holístico individual",
      "Excursión a cenote privado",
    ],
    terrazaId: 3,
  },
];

const PLANTILLAS_EXPERIENCIA = [
  {
    id: "paquete",
    nombre: "Paquete completo",
    plantilla: (e: Experiencia) =>
      `${e.nombre} · ${e.tagline}\n\n${e.duracion} en ${e.ubicacion} · hasta ${e.capacidad} personas.\n\nIncluye:\n${e.servicios.map((s) => `• ${s}`).join("\n")}\n\nDesde $${e.precio.toLocaleString()} MXN · Reserva en lux.mx`,
  },
  {
    id: "invitacion",
    nombre: "Invitación íntima",
    plantilla: (e: Experiencia) =>
      `Te invitamos a vivir ${e.nombre} en ${e.ubicacion}.\n\n${e.tagline}\n\n${e.duracion} · ${e.servicios.length} servicios curados para ti.\n\nReserva: lux.mx`,
  },
  {
    id: "flash-exp",
    nombre: "Promo flash",
    plantilla: (e: Experiencia) =>
      `Solo 48 horas: 20% OFF en ${e.nombre}.\n\nUn paquete de ${e.servicios.length} experiencias en ${e.ubicacion}, ${e.duracion}.\n\nAntes $${e.precio.toLocaleString()} · Hoy $${Math.round(e.precio * 0.8).toLocaleString()} MXN.`,
  },
];

const HASHTAGS_BASE = "#LuxTerrazas #EscapadaPremium #FinDeSemana";
const HASHTAGS_EXPERIENCIA = "#LuxExperiencias #PaquetesLux #EscapadasCuradas";

function RedesSociales({ terrazas }: { terrazas: Terraza[] }) {
  const [terrazaId, setTerrazaId] = useState<number>(terrazas[0].id);
  const [plantillaId, setPlantillaId] = useState<string>(PLANTILLAS[0].id);
  const terraza = terrazas.find((t) => t.id === terrazaId)!;
  const plantilla = PLANTILLAS.find((p) => p.id === plantillaId)!;

  const [copy, setCopy] = useState<string>(plantilla.plantilla(terraza));
  const [hashtags, setHashtags] = useState<string>(HASHTAGS_BASE);
  const [redesSeleccionadas, setRedesSeleccionadas] = useState<Record<RedId, boolean>>({
    facebook: true,
    instagram: true,
    tiktok: false,
    whatsapp: true,
  });
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ red: RedId; ok: boolean }[] | null>(null);

  const aplicarPlantilla = (pId: string, tId: number) => {
    const p = PLANTILLAS.find((x) => x.id === pId)!;
    const t = terrazas.find((x) => x.id === tId)!;
    setCopy(p.plantilla(t));
    setResultado(null);
  };

  const toggleRed = (id: RedId) =>
    setRedesSeleccionadas((s) => ({ ...s, [id]: !s[id] }));

  const seleccionadas = REDES.filter((r) => redesSeleccionadas[r.id]);

  const publicar = () => {
    if (seleccionadas.length === 0) return;
    setEnviando(true);
    setResultado(null);
    setTimeout(() => {
      setResultado(seleccionadas.map((r) => ({ red: r.id, ok: true })));
      setEnviando(false);
    }, 1200);
  };

  const textoCompleto = `${copy}\n\n${hashtags}`.trim();

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Difusión</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Redes <span className="italic">sociales</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Anuncia una terraza y publica con un clic en Facebook, Instagram, TikTok y estados de WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-[1fr_380px]">
        {/* Editor */}
        <div className="space-y-8 bg-card p-8 lg:p-10">
          {/* Terraza */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Terraza a anunciar
            </label>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {terrazas.map((t) => {
                const activa = t.id === terrazaId;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTerrazaId(t.id);
                      aplicarPlantilla(plantillaId, t.id);
                    }}
                    className={`flex items-center gap-3 border p-3 text-left transition-colors ${
                      activa ? "border-sand-700 bg-sand-50" : "border-border bg-card hover:bg-surface"
                    }`}
                  >
                    <img src={t.img} alt={t.nombre} className="h-14 w-14 shrink-0 object-cover" />
                    <span className="flex-1">
                      <span className="block font-serif text-base">{t.nombre}</span>
                      <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-muted-foreground">
                        {t.ubicacion}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plantilla */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Plantilla de copy
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLANTILLAS.map((p) => {
                const activa = p.id === plantillaId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPlantillaId(p.id);
                      aplicarPlantilla(p.id, terrazaId);
                    }}
                    className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                      activa
                        ? "bg-sand-700 text-sand-50"
                        : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
                    }`}
                  >
                    {p.nombre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Copy del anuncio
              </label>
              <span className="tabular text-[10px] uppercase tracking-widest text-muted-foreground">
                {copy.length} caracteres
              </span>
            </div>
            <textarea
              value={copy}
              onChange={(e) => {
                setCopy(e.target.value);
                setResultado(null);
              }}
              rows={7}
              className="mt-3 w-full resize-none border border-border bg-card p-4 font-sans text-sm leading-relaxed text-foreground focus:border-sand-700 focus:outline-none"
            />
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Hashtags
            </label>
            <input
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="mt-3 w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:border-sand-700 focus:outline-none"
            />
          </div>

          {/* Redes */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Publicar en
            </label>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {REDES.map((r) => {
                const activa = redesSeleccionadas[r.id];
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleRed(r.id)}
                    className={`flex flex-col items-start gap-1 border p-3 text-left transition-colors ${
                      activa ? "border-sand-700 bg-sand-50" : "border-border bg-card hover:bg-surface"
                    }`}
                  >
                    <span
                      className="h-2 w-8"
                      style={{ backgroundColor: r.color }}
                    />
                    <span className="text-sm font-medium">{r.nombre}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {r.handle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Acción */}
          <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
            <p className="text-xs text-muted-foreground">
              Se publicará en {seleccionadas.length} red{seleccionadas.length === 1 ? "" : "es"} ·{" "}
              <span className="text-foreground">{terraza.nombre}</span>
            </p>
            <button
              onClick={publicar}
              disabled={enviando || seleccionadas.length === 0}
              className="bg-sand-700 px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? "Publicando…" : "Publicar ahora"}
            </button>
          </div>

          {resultado && (
            <div className="space-y-2 border-t border-border pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
                Publicación completada
              </p>
              <ul className="space-y-1 text-sm">
                {resultado.map((r) => {
                  const red = REDES.find((x) => x.id === r.red)!;
                  return (
                    <li key={r.red} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                      <span className="flex items-center gap-3">
                        <span className="h-2 w-2" style={{ backgroundColor: red.color }} />
                        {red.nombre}
                        <span className="text-xs text-muted-foreground">{red.handle}</span>
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-sand-700">
                        ✓ Publicado
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Vista previa */}
        <aside className="space-y-6 bg-surface p-8 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Vista previa
          </p>
          {seleccionadas.length === 0 && (
            <p className="text-sm text-muted-foreground">Selecciona al menos una red para ver la vista previa.</p>
          )}
          {seleccionadas.map((r) => (
            <article key={r.id} className="bg-card ring-1 ring-border">
              <header className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2" style={{ backgroundColor: r.color }} />
                  <span className="text-xs font-semibold uppercase tracking-widest">{r.nombre}</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.handle}</span>
              </header>
              <img src={terraza.img} alt={terraza.nombre} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <p className="whitespace-pre-line text-xs leading-relaxed">
                  {textoCompleto.length > r.maxLength
                    ? textoCompleto.slice(0, r.maxLength) + "…"
                    : textoCompleto}
                </p>
                <p className="tabular mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {Math.min(textoCompleto.length, r.maxLength)} / {r.maxLength}
                </p>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </div>
  );
}
