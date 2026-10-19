// Architecture showcase for the Pharmaceutical Inventory Management System (EY GDS).
// Content mirrors the high-level architecture diagram and the resume only.

const CLIENTS = ["Web Portal (Employees)", "Mobile App (Warehouse/Field)", "Barcode / RFID Scanners", "Suppliers", "Distributors", "ERP System (SAP/Oracle)", "Regulatory Systems", "IoT Sensors (Temperature)"];

const EDGE = [
  { t: "WAF", d: "DDoS, threat protection" },
  { t: "Load Balancer", d: "Traffic distribution" },
  { t: "API Gateway", d: "REST / gRPC", hot: true },
  { t: "AuthN / AuthZ", d: "OAuth 2.0 / OIDC, RBAC", hot: true },
  { t: "Rate Limiting", d: "Throttling" },
  { t: "Routing", d: "Caching, request transformation" },
];

const SERVICES = [
  { n: "Product", i: "📦", d: "Master data, categories, UOM", c: "#35D07F" },
  { n: "Inventory", i: "🧊", d: "Stock, batch/lot, expiry, reservations", c: "#4D9FFF" },
  { n: "Warehouse", i: "🏭", d: "Locations, bins, put-away, picking", c: "#FFB020" },
  { n: "Order", i: "🛒", d: "Sales/internal orders, fulfillment", c: "#FF5C93" },
  { n: "Procurement", i: "📑", d: "Suppliers, purchase orders, goods receipts", c: "#2FD4A6" },
  { n: "Quality", i: "🧪", d: "Batch inspection, release/quarantine", c: "#A67CFF" },
  { n: "Shipment", i: "🚚", d: "Dispatch, returns, tracking", c: "#3FB6FF" },
];

const EVENTS = ["StockReceived", "StockReserved", "StockReleased", "OrderCreated", "BatchApproved", "ShipmentDispatched", "TemperatureAlert"];

const SUPPORT = ["Notification", "Traceability", "Cold Chain", "Reporting", "Config / Audit", "Identity"];

const INTEGRATION = ["ERP (SAP/Oracle)", "Supplier (EDI / APIs)", "Regulatory (Track & Trace)", "Logistics / 3PL", "External APIs"];

const INFRA = ["Kubernetes", "Docker", "CI/CD (Azure DevOps)", "Monitoring & Observability", "Centralized Logging", "Secrets Management", "Backup & DR"];

const DECISIONS = [
  { h: "Database per service", p: "Each of the 7 microservices owns its PostgreSQL database, so services deploy and scale independently." },
  { h: "Event-driven with Kafka", p: "Services communicate through domain events such as StockReserved and BatchApproved instead of tight synchronous calls." },
  { h: "Redis for read-heavy data", p: "Distributed cache for product, warehouse, supplier and reference data. It is not the source of truth for critical inventory transactions." },
  { h: "Secured at the edge", p: "API gateway in front of every service with OAuth 2.0 / OIDC authentication and role-based access control." },
];

function Chip({ children, accent, hot, small }) {
  return (
    <span
      className="arch-chip"
      style={{
        borderColor: hot ? accent : "rgba(255,255,255,.12)",
        color: hot ? accent : "#B8B8C8",
        background: hot ? "rgba(255,230,0,.07)" : "rgba(255,255,255,.03)",
        fontSize: small ? 10 : 11,
      }}
    >
      {children}
    </span>
  );
}

function Layer({ label, sub, tint, children, id }) {
  return (
    <div className="arch-layer" id={id} style={{ "--tint": tint }}>
      <div className="arch-layer-label">
        <div className="bebas" style={{ fontSize: 20, letterSpacing: ".05em", color: "#E8E8F0", lineHeight: 1.05 }}>{label}</div>
        {sub && <div style={{ color: "#8A8A9C", fontSize: 10, marginTop: 4, lineHeight: 1.5 }}>{sub}</div>}
      </div>
      <div className="arch-layer-body">{children}</div>
    </div>
  );
}

const Down = () => <div className="arch-down" aria-hidden="true">▼</div>;

export default function ArchitectureSection({ ACC, FadeIn }) {
  const Wrap = FadeIn || (({ children }) => <div>{children}</div>);
  return (
    <section id="architecture" style={{ padding: "80px clamp(20px,7vw,120px)" }}>
      <style>{`
        .arch-layer{display:grid;grid-template-columns:190px 1fr;gap:18px;padding:18px 20px;border-radius:8px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(90deg,color-mix(in srgb,var(--tint) 14%,transparent),rgba(255,255,255,.015) 60%);position:relative;}
        .arch-layer:hover{border-color:color-mix(in srgb,var(--tint) 55%,transparent);}
        .arch-layer-body{display:flex;flex-wrap:wrap;gap:8px;align-items:center;min-width:0;}
        .arch-chip{display:inline-block;padding:5px 10px;border:1px solid;border-radius:4px;font-family:'DM Mono',monospace;letter-spacing:.02em;line-height:1.4;}
        .arch-down{text-align:center;color:${ACC};opacity:.55;font-size:11px;line-height:1;padding:7px 0;}
        .arch-svc-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;width:100%;}
        .arch-svc{border-radius:6px;padding:12px;border:1px solid rgba(255,255,255,.1);background:rgba(8,8,16,.55);border-top:3px solid var(--c);transition:transform .2s,box-shadow .2s;}
        .arch-svc:hover{transform:translateY(-3px);box-shadow:0 8px 24px color-mix(in srgb,var(--c) 22%,transparent);}
        .arch-kafka{width:100%;border-radius:6px;padding:14px 16px;background:linear-gradient(90deg,rgba(130,90,255,.35),rgba(130,90,255,.12));border:1px solid rgba(166,124,255,.55);}
        .arch-dec{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;margin-top:34px;}
        @media(max-width:1000px){.arch-svc-grid{grid-template-columns:repeat(3,minmax(0,1fr));}}
        @media(max-width:768px){
          .arch-layer{grid-template-columns:1fr;gap:10px;padding:14px;}
          .arch-svc-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
        }
      `}</style>

      <Wrap>
        <div className="reel-divider"><span className="section-label">🏗️ System Design</span></div>
        <h2 className="section-h" style={{ marginBottom: 14 }}>Architecture<br /><span style={{ color: ACC }}>Implementation</span></h2>
        <p style={{ color: "#9A9AAC", fontSize: 13, lineHeight: 1.8, maxWidth: 760, marginBottom: 12 }}>
          High-level architecture of the Pharmaceutical Inventory Management System (client: Pfizer, delivered at EY GDS): seven microservices on Kubernetes, event-driven through Apache Kafka, each with its own PostgreSQL database, behind an OAuth 2.0 / RBAC secured API gateway.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
          {["7 microservices", "Kafka events", "Redis cache", "DB per service", "Kubernetes"].map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
      </Wrap>

      <Wrap delay={0.05}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Layer label="Clients & External Systems" tint="#4D9FFF">
            {CLIENTS.map((c) => <Chip key={c}>{c}</Chip>)}
          </Layer>
          <Down />
          <Layer label="Edge & Security" sub="Single entry point for all traffic" tint="#B04DFF">
            {EDGE.map((e) => (
              <Chip key={e.t} accent={ACC} hot={e.hot}><b style={{ fontWeight: 500 }}>{e.t}</b> · {e.d}</Chip>
            ))}
          </Layer>
          <Down />
          <Layer label="Business Microservices" sub="Containers running in Kubernetes, each with a Redis cache" tint="#35D07F">
            <div className="arch-svc-grid">
              {SERVICES.map((s) => (
                <div key={s.n} className="arch-svc" style={{ "--c": s.c }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>{s.i}</span>
                    <span className="bebas" style={{ fontSize: 18, letterSpacing: ".05em", color: "#E8E8F0" }}>{s.n} Service</span>
                  </div>
                  <div style={{ color: "#8F8FA2", fontSize: 11, lineHeight: 1.55, marginBottom: 8 }}>{s.d}</div>
                  <Chip small hot accent="#FF6B6B">Redis cache</Chip>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 4, width: "100%" }}>
              <span style={{ color: "#6E6E80", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", marginRight: 4 }}>Supporting</span>
              {SUPPORT.map((s) => <Chip key={s} small>{s}</Chip>)}
            </div>
          </Layer>
          <Down />
          <Layer label="Event Streaming" sub="Asynchronous communication between services" tint="#A67CFF">
            <div className="arch-kafka">
              <div style={{ color: "#E8E8F0", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Apache Kafka · Event Streaming Platform</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {EVENTS.map((e) => <Chip key={e} small>{e}</Chip>)}
              </div>
              <div style={{ color: "#A99BD0", fontSize: 10, marginTop: 10 }}>Schema Registry · Dead Letter Queue · Retry & Reprocessing</div>
            </div>
          </Layer>
          <Down />
          <Layer label="Data Layer" sub="Each service owns its database" tint="#4D9FFF">
            {SERVICES.map((s) => <Chip key={s.n} accent="#6FB1FF" hot>{s.n} DB · PostgreSQL</Chip>)}
            <Chip>Search (Elasticsearch/OpenSearch)</Chip>
            <Chip>Analytics (Data Warehouse)</Chip>
          </Layer>
          <Down />
          <Layer label="Integration Layer" tint="#2FD4A6">
            {INTEGRATION.map((c) => <Chip key={c}>{c}</Chip>)}
          </Layer>
          <Down />
          <Layer label="Infrastructure & Operations" sub="Cloud / on-prem" tint="#FF6B6B">
            {INFRA.map((c) => <Chip key={c}>{c}</Chip>)}
          </Layer>
        </div>
      </Wrap>

      <Wrap delay={0.1}>
        <div className="arch-dec">
          {DECISIONS.map((d) => (
            <div key={d.h} className="card" style={{ padding: "18px 20px", borderLeft: `3px solid ${ACC}` }}>
              <div className="bebas" style={{ fontSize: 22, letterSpacing: ".05em", color: "#E8E8F0", marginBottom: 6 }}>{d.h}</div>
              <div style={{ color: "#9A9AAC", fontSize: 12, lineHeight: 1.7 }}>{d.p}</div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
