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

type Tab = "reservas" | "catalogo" | "roles" | "redes" | "crm" | "campanas" | "dashboard";

type EtapaCRM = "descubrimiento" | "interes" | "calificacion";
type Temperatura = "caliente" | "tibio" | "frio";

interface Lead {
  id: string;
  nombre: string;
  contacto: string;
  canal: "Instagram" | "Facebook" | "WhatsApp" | "TikTok" | "Web";
  etapa: EtapaCRM;
  temperatura: Temperatura;
  presupuesto: number;
  invitados: number;
  fecha: string;
  tipoEvento: string;
  tiempoRespuesta: number; // minutos
  respondio: boolean;
  notas: string;
  creado: string;
}

const leadsIniciales: Lead[] = [
  { id: "L-001", nombre: "Valeria Soto", contacto: "+52 55 1122 3344", canal: "Instagram", etapa: "calificacion", temperatura: "caliente", presupuesto: 85000, invitados: 80, fecha: "14 Feb 2026", tipoEvento: "Boda íntima", tiempoRespuesta: 4, respondio: true, notas: "Quiere terraza Sunset Lux, confirma en 48h.", creado: "Hace 2 días" },
  { id: "L-002", nombre: "Andrés Beltrán", contacto: "andres@mail.com", canal: "WhatsApp", etapa: "calificacion", temperatura: "tibio", presupuesto: 42000, invitados: 40, fecha: "Marzo 2026", tipoEvento: "Cumpleaños", tiempoRespuesta: 12, respondio: true, notas: "Comparando 3 venues.", creado: "Hace 3 días" },
  { id: "L-003", nombre: "Daniela Ortega", contacto: "@daniortega", canal: "TikTok", etapa: "interes", temperatura: "tibio", presupuesto: 0, invitados: 0, fecha: "—", tipoEvento: "Sesión de fotos", tiempoRespuesta: 9, respondio: true, notas: "Pidió catálogo completo.", creado: "Hoy" },
  { id: "L-004", nombre: "Roberto Lima", contacto: "+52 33 9988 7766", canal: "Facebook", etapa: "interes", temperatura: "frio", presupuesto: 0, invitados: 0, fecha: "—", tipoEvento: "—", tiempoRespuesta: 45, respondio: false, notas: "No ha respondido segundo mensaje.", creado: "Hace 5 días" },
  { id: "L-005", nombre: "Ximena Paredes", contacto: "@xime.paredes", canal: "Instagram", etapa: "descubrimiento", temperatura: "frio", presupuesto: 0, invitados: 0, fecha: "—", tipoEvento: "—", tiempoRespuesta: 0, respondio: false, notas: "Vio reel de Rooftop Premium.", creado: "Hoy" },
  { id: "L-006", nombre: "Grupo Corp. Mendez", contacto: "compras@mendez.com", canal: "Web", etapa: "calificacion", temperatura: "caliente", presupuesto: 180000, invitados: 150, fecha: "20 Ene 2026", tipoEvento: "Evento corporativo", tiempoRespuesta: 3, respondio: true, notas: "Decisión esta semana.", creado: "Ayer" },
  { id: "L-007", nombre: "Lucía Herrera", contacto: "+52 55 5544 7788", canal: "WhatsApp", etapa: "descubrimiento", temperatura: "tibio", presupuesto: 0, invitados: 0, fecha: "—", tipoEvento: "Aniversario", tiempoRespuesta: 0, respondio: false, notas: "Solicitó info inicial.", creado: "Hoy" },
];

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
  const [leads, setLeads] = useState<Lead[]>(leadsIniciales);

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
            { id: "crm", label: "CRM" },
            { id: "campanas", label: "Campañas MKT" },
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
        {tab === "crm" && <CRM leads={leads} setLeads={setLeads} />}
        {tab === "campanas" && <CampanasMKT />}
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

type TerrazaDraft = Omit<Terraza, "id"> & { id: number | null };

const TERRAZA_VACIA: TerrazaDraft = {
  id: null,
  nombre: "",
  ubicacion: "",
  precio: 0,
  capacidad: 0,
  ocupacion: 0,
  ingresos: 0,
  costos: 0,
  rating: 5,
  activa: true,
  img: "",
};

function Catalogo({ terrazas, setTerrazas }: { terrazas: Terraza[]; setTerrazas: (t: Terraza[]) => void }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [draft, setDraft] = useState<TerrazaDraft>(TERRAZA_VACIA);

  const toggleActiva = (id: number) =>
    setTerrazas(terrazas.map((t) => (t.id === id ? { ...t, activa: !t.activa } : t)));

  const eliminar = (id: number) => setTerrazas(terrazas.filter((t) => t.id !== id));

  const abrirNueva = () => {
    setDraft(TERRAZA_VACIA);
    setModalAbierto(true);
  };

  const abrirEdicion = (t: Terraza) => {
    setDraft({ ...t });
    setModalAbierto(true);
  };

  const cerrar = () => setModalAbierto(false);

  const onImagen = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, img: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const guardar = () => {
    if (!draft.nombre.trim() || !draft.ubicacion.trim()) return;
    if (draft.id === null) {
      const nuevoId = terrazas.length ? Math.max(...terrazas.map((t) => t.id)) + 1 : 1;
      setTerrazas([...terrazas, { ...draft, id: nuevoId, img: draft.img || heroImg } as Terraza]);
    } else {
      setTerrazas(terrazas.map((t) => (t.id === draft.id ? ({ ...draft, id: draft.id } as Terraza) : t)));
    }
    setModalAbierto(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Inventario</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">Catálogo de terrazas</h1>
          <p className="mt-2 text-sm text-muted-foreground">{terrazas.length} propiedades activas en el sistema.</p>
        </div>
        <button
          onClick={abrirNueva}
          className="bg-sand-700 px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110"
        >
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
                <button
                  onClick={() => abrirEdicion(t)}
                  className="text-[10px] font-semibold uppercase tracking-widest text-sand-700 hover:text-foreground"
                >
                  Editar
                </button>
                <button onClick={() => toggleActiva(t.id)} className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
                  {t.activa ? "Pausar" : "Activar"}
                </button>
                <button
                  onClick={() => eliminar(t.id)}
                  className="text-[10px] font-semibold uppercase tracking-widest text-destructive/80 hover:text-destructive"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalAbierto && (
        <TerrazaModal
          draft={draft}
          setDraft={setDraft}
          onImagen={onImagen}
          onCerrar={cerrar}
          onGuardar={guardar}
        />
      )}
    </div>
  );
}

function TerrazaModal({
  draft,
  setDraft,
  onImagen,
  onCerrar,
  onGuardar,
}: {
  draft: TerrazaDraft;
  setDraft: (fn: (d: TerrazaDraft) => TerrazaDraft) => void;
  onImagen: (f: File) => void;
  onCerrar: () => void;
  onGuardar: () => void;
}) {
  const esEdicion = draft.id !== null;
  const set = <K extends keyof TerrazaDraft>(k: K, v: TerrazaDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-card ring-1 ring-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-8 py-5 backdrop-blur">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
              {esEdicion ? "Editar propiedad" : "Nueva propiedad"}
            </span>
            <h2 className="mt-1 font-serif text-2xl tracking-tight">
              {esEdicion ? draft.nombre || "Sin nombre" : "Crea una nueva terraza"}
            </h2>
          </div>
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="text-2xl leading-none text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        {/* Body: preview + form */}
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-[1fr_1.2fr]">
          {/* Preview card */}
          <div className="space-y-4 bg-surface p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Vista previa
            </p>
            <div className="overflow-hidden bg-card ring-1 ring-border">
              <div className="relative aspect-[4/3] w-full bg-muted">
                {draft.img ? (
                  <img src={draft.img} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground">
                    Sin imagen
                  </div>
                )}
                <span className={`absolute right-3 top-3 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest ${draft.activa ? "bg-sand-700 text-sand-50" : "bg-card text-muted-foreground"}`}>
                  {draft.activa ? "Activa" : "Pausada"}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="font-serif text-xl">{draft.nombre || "Nombre de la terraza"}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {draft.ubicacion || "Ubicación"}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-border pt-3 text-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Precio</p>
                    <p className="tabular mt-1 font-medium">${Number(draft.precio).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Capacidad</p>
                    <p className="tabular mt-1 font-medium">{draft.capacidad} pax</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating</p>
                    <p className="tabular mt-1 font-medium">★ {Number(draft.rating).toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image uploader */}
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-card p-6 text-center transition-colors hover:border-sand-700">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">
                Subir imagen
              </span>
              <span className="text-xs text-muted-foreground">PNG, JPG o WEBP · arrastra o haz clic</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onImagen(f);
                }}
              />
            </label>
          </div>

          {/* Form */}
          <div className="space-y-6 bg-card p-8">
            <Campo label="Nombre de la terraza">
              <input
                type="text"
                value={draft.nombre}
                onChange={(e) => set("nombre", e.target.value)}
                placeholder="Ej. Terraza Sunset Lux"
                className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
              />
            </Campo>

            <Campo label="Ubicación">
              <input
                type="text"
                value={draft.ubicacion}
                onChange={(e) => set("ubicacion", e.target.value)}
                placeholder="Ej. Valle de Bravo"
                className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
              />
            </Campo>

            <div className="grid grid-cols-2 gap-5">
              <Campo label="Precio por noche (MXN)">
                <input
                  type="number"
                  min={0}
                  value={draft.precio || ""}
                  onChange={(e) => set("precio", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
              <Campo label="Capacidad (personas)">
                <input
                  type="number"
                  min={0}
                  value={draft.capacidad || ""}
                  onChange={(e) => set("capacidad", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
              <Campo label="Ocupación (%)">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={draft.ocupacion || ""}
                  onChange={(e) => set("ocupacion", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
              <Campo label="Rating">
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={draft.rating || ""}
                  onChange={(e) => set("rating", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
              <Campo label="Ingresos mensuales (MXN)">
                <input
                  type="number"
                  min={0}
                  value={draft.ingresos || ""}
                  onChange={(e) => set("ingresos", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
              <Campo label="Costos mensuales (MXN)">
                <input
                  type="number"
                  min={0}
                  value={draft.costos || ""}
                  onChange={(e) => set("costos", Number(e.target.value))}
                  className="w-full border-b border-border bg-transparent py-2 text-sm outline-none focus:border-sand-700"
                />
              </Campo>
            </div>

            <label className="flex cursor-pointer items-center gap-3 pt-2">
              <input
                type="checkbox"
                checked={draft.activa}
                onChange={(e) => set("activa", e.target.checked)}
                className="h-4 w-4 accent-sand-700"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
                Propiedad activa y visible en el catálogo
              </span>
            </label>

            <div className="flex items-center justify-end gap-3 border-t border-border pt-6">
              <button
                onClick={onCerrar}
                className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </button>
              <button
                onClick={onGuardar}
                disabled={!draft.nombre.trim() || !draft.ubicacion.trim()}
                className="bg-sand-700 px-6 py-3 text-[10px] font-semibold uppercase tracking-widest text-sand-50 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {esEdicion ? "Guardar cambios" : "Crear terraza"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
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
  const [modo, setModo] = useState<"terraza" | "experiencia">("terraza");
  const [terrazaId, setTerrazaId] = useState<number>(terrazas[0].id);
  const [experienciaId, setExperienciaId] = useState<string>(EXPERIENCIAS_INICIALES[0].id);
  const [plantillaId, setPlantillaId] = useState<string>(PLANTILLAS[0].id);
  const [plantillaExpId, setPlantillaExpId] = useState<string>(PLANTILLAS_EXPERIENCIA[0].id);

  const terraza = terrazas.find((t) => t.id === terrazaId)!;
  const experiencia = EXPERIENCIAS_INICIALES.find((e) => e.id === experienciaId)!;
  const terrazaExp = terrazas.find((t) => t.id === experiencia.terrazaId) ?? terrazas[0];

  const plantillaInicial =
    modo === "terraza"
      ? PLANTILLAS[0].plantilla(terrazas[0])
      : PLANTILLAS_EXPERIENCIA[0].plantilla(EXPERIENCIAS_INICIALES[0]);

  const [copy, setCopy] = useState<string>(plantillaInicial);
  const [hashtags, setHashtags] = useState<string>(HASHTAGS_BASE);
  const [redesSeleccionadas, setRedesSeleccionadas] = useState<Record<RedId, boolean>>({
    facebook: true,
    instagram: true,
    tiktok: false,
    whatsapp: true,
  });
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ red: RedId; ok: boolean }[] | null>(null);

  const aplicarPlantillaTerraza = (pId: string, tId: number) => {
    const p = PLANTILLAS.find((x) => x.id === pId)!;
    const t = terrazas.find((x) => x.id === tId)!;
    setCopy(p.plantilla(t));
    setResultado(null);
  };

  const aplicarPlantillaExperiencia = (pId: string, eId: string) => {
    const p = PLANTILLAS_EXPERIENCIA.find((x) => x.id === pId)!;
    const e = EXPERIENCIAS_INICIALES.find((x) => x.id === eId)!;
    setCopy(p.plantilla(e));
    setResultado(null);
  };

  const cambiarModo = (m: "terraza" | "experiencia") => {
    setModo(m);
    setResultado(null);
    if (m === "terraza") {
      setHashtags(HASHTAGS_BASE);
      aplicarPlantillaTerraza(plantillaId, terrazaId);
    } else {
      setHashtags(HASHTAGS_EXPERIENCIA);
      aplicarPlantillaExperiencia(plantillaExpId, experienciaId);
    }
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

  const tituloPreview = modo === "terraza" ? terraza.nombre : experiencia.nombre;
  const imagenPreview = modo === "terraza" ? terraza.img : terrazaExp.img;

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sand-700">Difusión</span>
          <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Redes <span className="italic">sociales</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Anuncia una terraza o una experiencia y publica con un clic en Facebook, Instagram, TikTok y estados de WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-border lg:grid-cols-[1fr_380px]">
        {/* Editor */}
        <div className="space-y-8 bg-card p-8 lg:p-10">
          {/* Tipo de anuncio */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Tipo de anuncio
            </label>
            <div className="mt-3 inline-flex border border-border bg-card">
              {(["terraza", "experiencia"] as const).map((m) => {
                const activa = modo === m;
                return (
                  <button
                    key={m}
                    onClick={() => cambiarModo(m)}
                    className={`px-5 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                      activa ? "bg-sand-700 text-sand-50" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "terraza" ? "Terraza" : "Experiencia / paquete"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selector */}
          {modo === "terraza" ? (
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
                        aplicarPlantillaTerraza(plantillaId, t.id);
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
          ) : (
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Experiencia o paquete
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3">
                {EXPERIENCIAS_INICIALES.map((e) => {
                  const activa = e.id === experienciaId;
                  return (
                    <button
                      key={e.id}
                      onClick={() => {
                        setExperienciaId(e.id);
                        aplicarPlantillaExperiencia(plantillaExpId, e.id);
                      }}
                      className={`flex flex-col gap-2 border p-4 text-left transition-colors ${
                        activa ? "border-sand-700 bg-sand-50" : "border-border bg-card hover:bg-surface"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-lg">{e.nombre}</span>
                        <span className="tabular text-xs text-muted-foreground">
                          ${e.precio.toLocaleString()} MXN
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{e.tagline}</span>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                        <span>{e.ubicacion}</span>
                        <span>·</span>
                        <span>{e.duracion}</span>
                        <span>·</span>
                        <span>{e.servicios.length} servicios</span>
                      </div>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {e.servicios.slice(0, 4).map((s) => (
                          <li
                            key={s}
                            className="bg-surface px-2 py-1 text-[10px] text-muted-foreground ring-1 ring-border"
                          >
                            {s}
                          </li>
                        ))}
                        {e.servicios.length > 4 && (
                          <li className="px-2 py-1 text-[10px] text-muted-foreground">
                            +{e.servicios.length - 4} más
                          </li>
                        )}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Plantilla */}
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Plantilla de copy
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {(modo === "terraza" ? PLANTILLAS : PLANTILLAS_EXPERIENCIA).map((p) => {
                const activa = modo === "terraza" ? p.id === plantillaId : p.id === plantillaExpId;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (modo === "terraza") {
                        setPlantillaId(p.id);
                        aplicarPlantillaTerraza(p.id, terrazaId);
                      } else {
                        setPlantillaExpId(p.id);
                        aplicarPlantillaExperiencia(p.id, experienciaId);
                      }
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
              rows={modo === "experiencia" ? 10 : 7}
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
              <span className="text-foreground">{tituloPreview}</span>
              {modo === "experiencia" && (
                <span className="ml-1 text-[10px] uppercase tracking-widest text-sand-700">
                  · Paquete
                </span>
              )}
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
              <div className="relative">
                <img src={imagenPreview} alt={tituloPreview} className="aspect-[4/3] w-full object-cover" />
                {modo === "experiencia" && (
                  <span className="absolute left-3 top-3 bg-sand-700 px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-sand-50">
                    Paquete
                  </span>
                )}
              </div>
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

/* ----------------------------- CRM ----------------------------- */

const ETAPAS: { id: EtapaCRM; label: string; desc: string }[] = [
  { id: "descubrimiento", label: "Descubrimiento", desc: "Primer contacto. Detectaron la marca." },
  { id: "interes", label: "Interés", desc: "Pidieron info, iniciaron conversación." },
  { id: "calificacion", label: "Calificación", desc: "Presupuesto, invitados, fecha y tipo de evento." },
];

const TEMP_COLOR: Record<Temperatura, string> = {
  caliente: "bg-red-100 text-red-700 border-red-200",
  tibio: "bg-amber-100 text-amber-700 border-amber-200",
  frio: "bg-sky-100 text-sky-700 border-sky-200",
};

function CRM({ leads, setLeads }: { leads: Lead[]; setLeads: React.Dispatch<React.SetStateAction<Lead[]>> }) {
  const [etapaActiva, setEtapaActiva] = useState<EtapaCRM>("calificacion");

  const kpisInteres = useMemo(() => {
    const enInteres = leads.filter((l) => l.etapa === "interes" || l.etapa === "calificacion");
    const conversaciones = leads.filter((l) => l.respondio || l.etapa !== "descubrimiento").length;
    const generados = enInteres.length;
    const conResp = leads.filter((l) => l.tiempoRespuesta > 0);
    const tiempoProm = conResp.length
      ? Math.round(conResp.reduce((a, l) => a + l.tiempoRespuesta, 0) / conResp.length)
      : 0;
    const pctResp = leads.length
      ? Math.round((leads.filter((l) => l.respondio).length / leads.length) * 100)
      : 0;
    return { conversaciones, generados, tiempoProm, pctResp };
  }, [leads]);

  const kpisCalif = useMemo(() => {
    const calif = leads.filter((l) => l.etapa === "calificacion");
    const calientes = calif.filter((l) => l.temperatura === "caliente");
    const pctCal = calif.length ? Math.round((calientes.length / calif.length) * 100) : 0;
    const presProm = calif.length
      ? Math.round(calif.reduce((a, l) => a + l.presupuesto, 0) / calif.length)
      : 0;
    return { total: calif.length, pctCal, presProm };
  }, [leads]);

  const moverEtapa = (id: string, etapa: EtapaCRM) =>
    setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, etapa } : l)));
  const cambiarTemp = (id: string, t: Temperatura) =>
    setLeads((arr) => arr.map((l) => (l.id === id ? { ...l, temperatura: t } : l)));

  const leadsEtapa = leads.filter((l) => l.etapa === etapaActiva);

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl text-foreground">CRM · Pipeline de leads</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Da seguimiento a prospectos desde el primer contacto hasta el lead calificado.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Total leads</div>
          <div className="font-serif text-4xl text-sand-700">{leads.length}</div>
        </div>
      </div>

      {/* Pipeline visual */}
      <div className="grid gap-4 lg:grid-cols-3">
        {ETAPAS.map((e, i) => {
          const count = leads.filter((l) => l.etapa === e.id).length;
          const activa = etapaActiva === e.id;
          return (
            <button
              key={e.id}
              onClick={() => setEtapaActiva(e.id)}
              className={`group rounded-xl border p-5 text-left transition-all ${
                activa
                  ? "border-sand-700 bg-sand-50 shadow-md"
                  : "border-border bg-card hover:border-sand-700/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Etapa {i + 1}
                </span>
                <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs font-semibold">
                  {count}
                </span>
              </div>
              <div className="mt-3 font-serif text-xl text-foreground">{e.label}</div>
              <p className="mt-1 text-xs text-muted-foreground">{e.desc}</p>
            </button>
          );
        })}
      </div>

      {/* KPIs Interés */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">KPIs · Interés</h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Etapa 2
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICrm label="Conversaciones iniciadas" value={kpisInteres.conversaciones} />
          <KPICrm label="Leads generados" value={kpisInteres.generados} />
          <KPICrm label="Tiempo de respuesta" value={`${kpisInteres.tiempoProm} min`} />
          <KPICrm label="% que responde" value={`${kpisInteres.pctResp}%`} />
        </div>
      </section>

      {/* KPIs Calificación */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">KPIs · Calificación</h3>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Etapa 3
          </span>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Objetivo: no perder tiempo con leads poco probables.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <KPICrm label="Leads calificados" value={kpisCalif.total} />
          <KPICrm label="% de leads calientes" value={`${kpisCalif.pctCal}%`} />
          <KPICrm label="Presupuesto promedio" value={`$${kpisCalif.presProm.toLocaleString()}`} />
        </div>
      </section>

      {/* Tabla de leads de la etapa activa */}
      <section className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h3 className="font-serif text-xl text-foreground">
              {ETAPAS.find((e) => e.id === etapaActiva)?.label}
            </h3>
            <p className="text-xs text-muted-foreground">
              {leadsEtapa.length} {leadsEtapa.length === 1 ? "lead" : "leads"} en esta etapa
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Lead</th>
                <th className="px-4 py-3 text-left">Canal</th>
                <th className="px-4 py-3 text-left">Evento</th>
                <th className="px-4 py-3 text-right">Invitados</th>
                <th className="px-4 py-3 text-right">Presupuesto</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Temperatura</th>
                <th className="px-4 py-3 text-left">Mover</th>
              </tr>
            </thead>
            <tbody>
              {leadsEtapa.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    Sin leads en esta etapa.
                  </td>
                </tr>
              )}
              {leadsEtapa.map((l) => (
                <tr key={l.id} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">{l.nombre}</div>
                    <div className="text-xs text-muted-foreground">{l.contacto}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{l.creado}</div>
                  </td>
                  <td className="px-4 py-3 text-xs">{l.canal}</td>
                  <td className="px-4 py-3 text-xs">{l.tipoEvento}</td>
                  <td className="px-4 py-3 text-right text-xs">{l.invitados || "—"}</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold">
                    {l.presupuesto ? `$${l.presupuesto.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">{l.fecha}</td>
                  <td className="px-4 py-3">
                    <select
                      value={l.temperatura}
                      onChange={(e) => cambiarTemp(l.id, e.target.value as Temperatura)}
                      className={`rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wider ${TEMP_COLOR[l.temperatura]}`}
                    >
                      <option value="caliente">Caliente</option>
                      <option value="tibio">Tibio</option>
                      <option value="frio">Frío</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={l.etapa}
                      onChange={(e) => moverEtapa(l.id, e.target.value as EtapaCRM)}
                      className="rounded-md border border-border bg-background px-2 py-1 text-xs"
                    >
                      {ETAPAS.map((e) => (
                        <option key={e.id} value={e.id}>{e.label}</option>
                      ))}
                    </select>
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

function KPICrm({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-serif text-2xl text-foreground">{value}</div>
    </div>
  );
}

/* ----------------------------- CAMPAÑAS MKT ----------------------------- */

type CanalMKT = "Facebook" | "Instagram" | "WhatsApp" | "TikTok";
type EstadoCampana = "activa" | "pausada" | "finalizada";

interface Campana {
  id: string;
  nombre: string;
  canal: CanalMKT;
  estado: EstadoCampana;
  inicio: string;
  fin: string;
  inversion: number;
  ingresos: number;
  alcance: number;
  clics: number;
  leads: number;
  clientes: number;
  kpiRoi: number; // ROI objetivo en %
}

const CANAL_COLOR: Record<CanalMKT, string> = {
  Facebook: "bg-blue-100 text-blue-700 border-blue-200",
  Instagram: "bg-pink-100 text-pink-700 border-pink-200",
  WhatsApp: "bg-emerald-100 text-emerald-700 border-emerald-200",
  TikTok: "bg-neutral-900 text-white border-neutral-900",
};

const ESTADO_COLOR: Record<EstadoCampana, string> = {
  activa: "bg-emerald-100 text-emerald-700",
  pausada: "bg-amber-100 text-amber-700",
  finalizada: "bg-neutral-200 text-neutral-700",
};

const CAMPANAS_INICIALES: Campana[] = [
  { id: "c1", nombre: "Bodas Primavera", canal: "Instagram", estado: "activa", inicio: "01 Mar", fin: "31 May", inversion: 5000, ingresos: 15000, alcance: 48200, clics: 1820, leads: 64, clientes: 6, kpiRoi: 150 },
  { id: "c2", nombre: "Lead Magnet WA", canal: "WhatsApp", estado: "activa", inicio: "15 Mar", fin: "15 Abr", inversion: 2500, ingresos: 9800, alcance: 12400, clics: 940, leads: 88, clientes: 5, kpiRoi: 200 },
  { id: "c3", nombre: "Reels Terraza", canal: "TikTok", estado: "activa", inicio: "10 Abr", fin: "10 May", inversion: 3000, ingresos: 2200, alcance: 92000, clics: 2100, leads: 42, clientes: 1, kpiRoi: 150 },
  { id: "c4", nombre: "Eventos Corporativos", canal: "Facebook", estado: "finalizada", inicio: "01 Feb", fin: "28 Feb", inversion: 6000, ingresos: 21000, alcance: 35000, clics: 1450, leads: 52, clientes: 7, kpiRoi: 150 },
  { id: "c5", nombre: "XV Años Promo", canal: "Instagram", estado: "pausada", inicio: "01 Abr", fin: "30 Abr", inversion: 1800, ingresos: 900, alcance: 9800, clics: 420, leads: 14, clientes: 0, kpiRoi: 150 },
];

function CampanasMKT() {
  const [campanas] = useState<Campana[]>(CAMPANAS_INICIALES);
  const [filtro, setFiltro] = useState<"todas" | CanalMKT>("todas");

  const lista = filtro === "todas" ? campanas : campanas.filter((c) => c.canal === filtro);

  const totales = useMemo(() => {
    const inv = lista.reduce((a, c) => a + c.inversion, 0);
    const ing = lista.reduce((a, c) => a + c.ingresos, 0);
    const leads = lista.reduce((a, c) => a + c.leads, 0);
    const cli = lista.reduce((a, c) => a + c.clientes, 0);
    const roi = inv ? Math.round(((ing - inv) / inv) * 100) : 0;
    const conv = leads ? Math.round((cli / leads) * 100) : 0;
    const cpl = leads ? Math.round(inv / leads) : 0;
    const cac = cli ? Math.round(inv / cli) : 0;
    return { inv, ing, leads, cli, roi, conv, cpl, cac, neto: ing - inv };
  }, [lista]);

  const canales: ("todas" | CanalMKT)[] = ["todas", "Facebook", "Instagram", "WhatsApp", "TikTok"];

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl text-foreground">Campañas MKT</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mide el rendimiento de tus campañas en redes sociales y el retorno real de cada peso invertido.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">ROI global</div>
          <div className={`font-serif text-4xl ${totales.roi >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {totales.roi}%
          </div>
        </div>
      </div>

      {/* Filtros canal */}
      <div className="flex flex-wrap gap-2">
        {canales.map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
              filtro === c ? "border-sand-700 bg-sand-700 text-white" : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c === "todas" ? "Todas" : c}
          </button>
        ))}
      </div>

      {/* KPIs globales */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICrm label="Inversión total" value={`$${totales.inv.toLocaleString()}`} />
        <KPICrm label="Ingresos generados" value={`$${totales.ing.toLocaleString()}`} />
        <KPICrm label="Retorno neto" value={`$${totales.neto.toLocaleString()}`} />
        <KPICrm label="Conversión lead → cliente" value={`${totales.conv}%`} />
        <KPICrm label="Leads generados" value={totales.leads} />
        <KPICrm label="Clientes cerrados" value={totales.cli} />
        <KPICrm label="Costo por lead (CPL)" value={`$${totales.cpl.toLocaleString()}`} />
        <KPICrm label="Costo por cliente (CAC)" value={`$${totales.cac.toLocaleString()}`} />
      </div>

      {/* Tarjetas por campaña */}
      <div className="grid gap-4 lg:grid-cols-2">
        {lista.map((c) => {
          const roi = c.inversion ? Math.round(((c.ingresos - c.inversion) / c.inversion) * 100) : 0;
          const conv = c.leads ? Math.round((c.clientes / c.leads) * 100) : 0;
          const ctr = c.alcance ? ((c.clics / c.alcance) * 100).toFixed(1) : "0";
          const exito = roi >= c.kpiRoi;
          return (
            <div key={c.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${CANAL_COLOR[c.canal]}`}>
                      {c.canal}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${ESTADO_COLOR[c.estado]}`}>
                      {c.estado}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-foreground">{c.nombre}</h3>
                  <p className="text-xs text-muted-foreground">{c.inicio} → {c.fin}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">ROI</div>
                  <div className={`font-serif text-3xl ${roi >= c.kpiRoi ? "text-emerald-600" : roi >= 0 ? "text-amber-600" : "text-red-600"}`}>
                    {roi}%
                  </div>
                  <div className="text-[10px] text-muted-foreground">KPI: {c.kpiRoi}%</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <Mini label="Inversión" value={`$${c.inversion.toLocaleString()}`} />
                <Mini label="Ingresos" value={`$${c.ingresos.toLocaleString()}`} />
                <Mini label="Retorno neto" value={`$${(c.ingresos - c.inversion).toLocaleString()}`} positive={c.ingresos - c.inversion >= 0} />
                <Mini label="Conversión" value={`${conv}%`} />
                <Mini label="Alcance" value={c.alcance.toLocaleString()} />
                <Mini label="Clics (CTR)" value={`${c.clics.toLocaleString()} · ${ctr}%`} />
                <Mini label="Leads" value={String(c.leads)} />
                <Mini label="Clientes" value={String(c.clientes)} />
              </div>

              <div className={`mt-4 rounded-md px-3 py-2 text-xs font-semibold ${exito ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {exito
                  ? `✓ Campaña exitosa — superó el KPI de ${c.kpiRoi}% ROI`
                  : `△ Por debajo del KPI (${c.kpiRoi}% ROI). Revisar segmentación o creatividad.`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Mini({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-0.5 font-semibold ${positive === false ? "text-red-600" : positive ? "text-emerald-600" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}
