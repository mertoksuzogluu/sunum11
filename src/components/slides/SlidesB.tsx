import { motion } from "framer-motion";
import SlideShell from "../SlideShell";
import { Kicker, Title, Grad, Support, GlassCard, TrendArrow, CountUp, ImageSlot } from "../primitives";
import { colors, font } from "../../theme";
import {
  BeforeAfterBars,
  DonutChart,
  KpiCard,
  FlowDiagram,
} from "../charts";
import netherlandsSocialHousing from "../../assets/netherlands-social-housing-retrofit.jpg";

/* ============================= SLIDE 10 — 1 HAFTA ========================== */
export function Slide10() {
  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 60, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker color={colors.blueSoft}>Hollanda · sonuç</Kicker>
          <Title size={92} style={{ marginTop: 24 }}>
            Sadece <Grad from={colors.blueSoft} to={colors.greenNeon}>1 haftada</Grad> 110 daire.
          </Title>
          <div
            className="gv-reveal"
            style={{ ["--gv-i" as string]: 2, marginTop: 50, display: "flex", alignItems: "baseline", gap: 22 }}
          >
            <span style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 150, color: colors.greenNeon, lineHeight: 1, textShadow: `0 0 50px ${colors.green}66` }}>
              %74
            </span>
            <span style={{ fontFamily: font.body, fontSize: 34, color: colors.softGray, maxWidth: 360, lineHeight: 1.3 }}>
              enerji tüketiminde düşüş
            </span>
          </div>
          <Support style={{ marginTop: 40, fontSize: 28 }}>
            Malik aynı parayı ödüyor — ama artık enerji şirketine değil, binasının geleceğine.
          </Support>
        </div>
        <div
          className="gv-reveal"
          style={{ ["--gv-i" as string]: 3, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}
        >
          <BeforeAfterBars before={100} after={26} beforeLabel="Dönüşüm öncesi tüketim" afterLabel="Dönüşüm sonrası tüketim" />
          <ImageSlot
            asset="asset: netherlands-social-housing-retrofit.jpg"
            src={netherlandsSocialHousing}
            caption="Utrecht, Kanaleneiland · sosyal konut yenilemesi"
            tone="green"
            style={{ height: 220 }}
          />
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 11 — DONUT %76 ======================== */
export function Slide11() {
  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 80, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker color="#E0B07A">Türkiye sorusu</Kicker>
          <Title size={120} style={{ marginTop: 24 }}>
            Biz neyi <Grad from="#E0B07A" to="#fff">bekliyoruz?</Grad>
          </Title>
          <Support style={{ marginTop: 40, fontSize: 38 }}>
            Türkiye yapı stokunun <b style={{ color: "#E0B07A" }}>%76'sı</b> 2000 yılı öncesine ait — enerji performans düzenlemeleri yokken inşa edildi.
          </Support>
        </div>
        <div
          className="gv-scale-in"
          style={{ ["--gv-delay" as string]: "0.35s", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <DonutChart percent={76} label="2000 yılı öncesi yapı stoku" />
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 12 — TİCARİ OYUN DEĞİŞTİ ============== */
export function Slide12() {
  const oldC = ["Konum", "Alan", "Cephe"];
  const newC = ["Enerji performansı", "Sertifika durumu", "Yaşam döngüsü maliyeti", "Kahverengi iskonto"];
  return (
    <SlideShell>
      <Kicker color={colors.blueSoft}>Ticari gayrimenkul</Kicker>
      <Title size={88} style={{ marginTop: 22 }}>
        Ticari gayrimenkulde oyun <Grad>çoktan değişti.</Grad>
      </Title>

      <div style={{ display: "grid", gridTemplateColumns: "0.8fr auto 1.2fr", gap: 50, alignItems: "stretch", marginTop: 70 }}>
        <div>
          <ColHead label="ESKİ DÜNYA" color={colors.softGray} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 24 }}>
            {oldC.map((c, i) => (
              <div
                key={c}
                className="gv-reveal"
                style={{
                  ["--gv-delay" as string]: `${0.35 + i * 0.12}s`,
                  padding: "26px 32px",
                  borderRadius: 18,
                  background: "rgba(170,183,200,0.05)",
                  border: "1px solid rgba(170,183,200,0.16)",
                  fontFamily: font.heading,
                  fontSize: 34,
                  color: "rgba(170,183,200,0.55)",
                  opacity: 0.6,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="gv-pop" style={{ ["--gv-delay" as string]: "0.8s", fontSize: 60, color: colors.greenNeon }}>
            →
          </div>
        </div>

        <div>
          <ColHead label="YENİ GÖSTERGELER" color={colors.greenNeon} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 24 }}>
            {newC.map((c, i) => (
              <div
                key={c}
                className="gv-reveal"
                style={{
                  ["--gv-delay" as string]: `${1 + i * 0.18}s`,
                  padding: "26px 30px",
                  borderRadius: 18,
                  background: "linear-gradient(150deg, rgba(35,209,139,0.14), rgba(30,115,232,0.1))",
                  border: `1px solid ${i === 3 ? "rgba(180,122,60,0.5)" : "rgba(124,255,178,0.4)"}`,
                  boxShadow: `0 0 40px -16px ${i === 3 ? "rgba(180,122,60,0.6)" : colors.greenNeon + "88"}`,
                  fontFamily: font.heading,
                  fontWeight: 600,
                  fontSize: 30,
                  color: i === 3 ? "#E0B07A" : colors.iceWhite,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function ColHead({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="gv-reveal"
      style={{
        ["--gv-i" as string]: 2,
        fontFamily: font.body,
        fontSize: 22,
        letterSpacing: "0.26em",
        color,
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span style={{ width: 30, height: 3, background: color, borderRadius: 3 }} />
      {label}
    </div>
  );
}

/* ============================= SLIDE 13 — PRİM / İSKONTO =================== */
export function Slide13() {
  return (
    <SlideShell>
      <Kicker>Yeni fiyatlama mantığı</Kicker>
      <Title size={96} style={{ marginTop: 22 }}>
        <Grad from={colors.green} to={colors.greenNeon}>Yeşil prim.</Grad>{" "}
        <span style={{ color: "#E0B07A" }}>Kahverengi iskonto.</span>
      </Title>

      <div style={{ display: "flex", gap: 70, marginTop: 70, alignItems: "stretch", justifyContent: "center" }}>
        <CompareCol
          title="Yeşil sertifikalı bina"
          dir="up"
          headline="Kira primi"
          sub="Yüksek kira · düşük işletme gideri · artan satış değeri"
          tone="green"
          delay={0.4}
        />
        <CompareCol
          title="Sertifikasız / verimsiz bina"
          dir="down"
          headline="Kahverengi iskonto"
          sub="İskontolu fiyat · tıpkı hasarlı bir araba gibi"
          tone="amber"
          delay={0.9}
        />
      </div>
    </SlideShell>
  );
}

function CompareCol({
  title,
  dir,
  headline,
  sub,
  tone,
  delay,
}: {
  title: string;
  dir: "up" | "down";
  headline: string;
  sub: string;
  tone: "green" | "amber";
  delay: number;
}) {
  const c = tone === "green" ? colors.greenNeon : colors.amber;
  return (
    <div className="gv-reveal" style={{ ["--gv-delay" as string]: `${delay}s`, flex: "0 0 560px" }}>
      <GlassCard
        glow={tone === "green" ? "rgba(35,209,139,0.3)" : "rgba(180,122,60,0.3)"}
        border={tone === "green" ? "rgba(124,255,178,0.4)" : "rgba(180,122,60,0.5)"}
        style={{ padding: "48px 52px", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
      >
        <div style={{ fontFamily: font.body, fontSize: 26, color: colors.softGray }}>{title}</div>
        <div style={{ margin: "30px 0 20px" }}>
          <TrendArrow direction={dir} height={150} delay={delay + 0.3} color={c} />
        </div>
        <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 52, color: c }}>{headline}</div>
        <div style={{ fontFamily: font.body, fontSize: 24, color: colors.softGray, marginTop: 18, maxWidth: 420 }}>{sub}</div>
      </GlassCard>
    </div>
  );
}

/* ============================= SLIDE 14 — GLOBAL VERİ ====================== */
export function Slide14() {
  return (
    <SlideShell>
      <Kicker>Global veri</Kicker>
      <Title size={92} style={{ marginTop: 22 }}>
        Piyasa yeşili <Grad>zaten fiyatlıyor.</Grad>
      </Title>
      <Support style={{ marginTop: 30 }}>ABD'de 20.000 ofis binası incelendi — sonuçlar net.</Support>

      <div style={{ display: "flex", gap: 50, marginTop: 64 }}>
        <BigDataCard value={31} label="LEED sertifikalı yapılarda daha yüksek kira" sub="ABD · 20.000 ofis binası" delay={0.5} source="cbre.com/insights/viewpoints/green-is-good-the-endurance-of-the-rent-premium-in-leed-certified-us-office-buildings" />
        <BigDataCard value={27} prefix="+" plus label="BREEAM sertifikalı ofislerde daha yüksek kira" sub="Londra ofis piyasası" delay={0.9} source="savills.co.uk/research_articles/229130/381989-0" />
      </div>
    </SlideShell>
  );
}

function BigDataCard({
  value,
  label,
  sub,
  delay,
  prefix = "",
  plus = false,
  source,
}: {
  value: number;
  label: string;
  sub: string;
  delay: number;
  prefix?: string;
  plus?: boolean;
  source?: string;
}) {
  return (
    <div className="gv-reveal" style={{ ["--gv-delay" as string]: `${delay}s`, flex: 1 }}>
      <GlassCard glow="rgba(35,209,139,0.28)" border="rgba(124,255,178,0.35)" style={{ padding: "56px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <TrendArrow direction="up" height={96} delay={delay + 0.2} />
          <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: 180, color: colors.greenNeon, lineHeight: 0.9, textShadow: `0 0 50px ${colors.green}55` }}>
            <CountUpInline to={value} suffix="%" prefix={plus ? "+" : prefix} delay={delay + 0.2} />
          </div>
        </div>
        <div style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 34, color: colors.iceWhite, marginTop: 20, maxWidth: 520 }}>{label}</div>
        <div style={{ fontFamily: font.body, fontSize: 24, color: colors.softGray, marginTop: 10 }}>{sub}</div>
        {source && (
          <div style={{ fontFamily: font.body, fontSize: 14, color: "rgba(170,183,200,0.35)", marginTop: 16, lineHeight: 1.4 }}>
            {source}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

// thin wrapper to reuse CountUp from primitives without circular concerns
function CountUpInline(props: React.ComponentProps<typeof CountUp>) {
  return <CountUp {...props} />;
}

/* ============================= SLIDE 14b — GBCSA / MSCI GÜNEY AFRIKA ========= */
export function Slide14b() {
  return (
    <SlideShell pad={120}>
      <Kicker>Global veri · Güney Afrika</Kicker>
      <Title size={76} style={{ marginTop: 20, maxWidth: 1680 }}>
        MSCI & GBCSA: <Grad>10 yıllık</Grad> yeşil ofis performansı
      </Title>
      <Support style={{ marginTop: 28, fontSize: 30, maxWidth: 1500 }}>
        Güney Afrika Yeşil Bina Konseyi endeksleme çalışmasına göre —{" "}
        <span style={{ color: colors.greenNeon, fontWeight: 600 }}>2025</span> yılı sonuçları:
      </Support>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 64 }}>
        <MetricBenefitCard value={7} direction="down" label="daha düşük işletme maliyeti" delay={0.45} />
        <MetricBenefitCard value={3} direction="down" label="daha düşük boşluk oranı" delay={0.65} />
        <MetricBenefitCard value={34} direction="up" label="M² başına daha yüksek brüt gelir" delay={0.85} emphasis />
      </div>

      <div
        className="gv-reveal"
        style={{
          ["--gv-delay" as string]: "1.3s",
          marginTop: 48,
          fontFamily: font.body,
          fontSize: 14,
          color: "rgba(170,183,200,0.32)",
          lineHeight: 1.5,
        }}
      >
        gbcsa.org.za/news/msci-green-annual-property-index-2025-confirms-a-decade-of-outperformance-by-green-certified-offices
      </div>
    </SlideShell>
  );
}

function MetricBenefitCard({
  value,
  direction,
  label,
  delay,
  emphasis = false,
}: {
  value: number;
  direction: "up" | "down";
  label: string;
  delay: number;
  emphasis?: boolean;
}) {
  const c = colors.greenNeon;
  return (
    <div className="gv-reveal" style={{ ["--gv-delay" as string]: `${delay}s` }}>
      <GlassCard
        glow={emphasis ? "rgba(35,209,139,0.3)" : "rgba(35,209,139,0.18)"}
        border={emphasis ? "rgba(124,255,178,0.45)" : "rgba(124,255,178,0.28)"}
        style={{ padding: "48px 44px", textAlign: "center", height: "100%" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <TrendArrow direction={direction} height={88} delay={delay + 0.15} color={c} />
        </div>
        <div style={{ fontFamily: font.heading, fontWeight: 700, fontSize: emphasis ? 120 : 108, color: c, lineHeight: 1, textShadow: `0 0 40px ${colors.green}55` }}>
          <CountUpInline to={value} suffix="%" delay={delay + 0.2} />
        </div>
        <div style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 30, color: colors.iceWhite, marginTop: 22, lineHeight: 1.25 }}>
          {label}
        </div>
      </GlassCard>
    </div>
  );
}

/* ============================= SLIDE 15 — TÜRKİYE KPI ====================== */
export function Slide15() {
  return (
    <SlideShell pad={120}>
      <Kicker color="#E0B07A">Türkiye'de durum</Kicker>
      <Title size={88} style={{ marginTop: 18 }}>
        Biz ne <Grad from="#E0B07A" to="#fff">durumdayız?</Grad>
      </Title>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 56 }}>
        <KpiCard value={8.1} decimals={1} suffix=" M" label="Toplam bina stoku (2021)" tone="blue" delay={0.4} />
        <KpiCard value={76} suffix="%" label="2000 yılı öncesine ait" tone="amber" delay={0.6} />
        <KpiCard value={1.5} decimals={1} suffix=" M" label="Enerji kimlik belgesi aldı" tone="blue" delay={0.8} />
        <KpiCard value={67} suffix="%" label="C sınıfı binalar" tone="amber" delay={1.0} />
        <KpiCard value={3} suffix="%" label="Sadece A ve B sınıfı" tone="green" delay={1.2} emphasis />
        <div
          className="gv-reveal"
          style={{
            ["--gv-delay" as string]: "1.4s",
            borderRadius: 24,
            padding: "34px 38px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "linear-gradient(160deg, rgba(30,115,232,0.12), rgba(7,20,42,0.5))",
            border: "1px dashed rgba(124,180,255,0.3)",
          }}
        >
          <div style={{ fontFamily: font.body, fontSize: 24, color: colors.softGray, lineHeight: 1.4 }}>
            Piyasa yeşil binayı zaten fiyatlıyor ve mevzuat da artık bu noktada.
          </div>
          <div style={{ fontFamily: font.body, fontSize: 17, color: "rgba(170,183,200,0.5)", marginTop: 14 }}>
            Kaynak: Çevre, Şehircilik ve İklim Değişikliği Bakanlığı · Türkiye Bina Sektörü Karbonsuzlaşma Yol Haritası
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 16 — ORBIT GÖSTERGELER ================ */
export function Slide16() {
  const indicators = [
    "Karbon ayak izi",
    "Enerji kullanım yoğunluğu",
    "Yeşil prim",
    "Kahverengi iskonto",
    "Sertifika skoru",
    "Yaşam döngüsü maliyeti",
  ];
  return (
    <SlideShell>
      <Kicker>Yeni finansal göstergeler</Kicker>
      <Title size={88} style={{ marginTop: 20 }}>
        Yeni finansal göstergeyi <Grad>fiyatlamak.</Grad>
      </Title>

      <div style={{ position: "relative", flex: 1, marginTop: 30 }}>
        <div
          className="gv-pop"
          style={{
            ["--gv-delay" as string]: "0.4s",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 220,
            height: 220,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            background: "radial-gradient(circle, rgba(35,209,139,0.25), rgba(7,20,42,0.4))",
            border: `1.5px solid ${colors.greenNeon}`,
            boxShadow: `0 0 80px -10px ${colors.greenNeon}aa`,
            fontFamily: font.heading,
            fontWeight: 700,
            fontSize: 30,
            color: colors.iceWhite,
          }}
        >
          Yeşil
          <br />Değer
        </div>

        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 880,
            height: 560,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "1px dashed rgba(124,180,255,0.18)",
          }}
        />

        {indicators.map((ind, i) => {
          const angle = (i / indicators.length) * Math.PI * 2 - Math.PI / 2;
          const rx = 480;
          const ry = 270;
          const x = Math.cos(angle) * rx;
          const y = Math.sin(angle) * ry;
          return (
            <div
              key={ind}
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="gv-pop-scale"
                style={{ ["--gv-delay" as string]: `${0.7 + i * 0.16}s` }}
              >
              <div
                style={{
                  padding: "22px 34px",
                  borderRadius: 999,
                  background: "linear-gradient(150deg, rgba(18,42,84,0.8), rgba(7,20,42,0.65))",
                  border: `1px solid ${i % 2 === 0 ? "rgba(124,255,178,0.4)" : "rgba(62,139,255,0.45)"}`,
                  boxShadow: `0 0 40px -16px ${i % 2 === 0 ? colors.greenNeon : colors.blueSoft}`,
                  fontFamily: font.heading,
                  fontWeight: 600,
                  fontSize: 30,
                  color: colors.iceWhite,
                  whiteSpace: "nowrap",
                }}
              >
                {ind}
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </SlideShell>
  );
}

/* ============================= SLIDE 17 — EUI → NOI FLOW =================== */
export function Slide17() {
  return (
    <SlideShell>
      <Kicker color={colors.blueSoft}>Enerji kullanım yoğunluğu (EUI)</Kicker>
      <Title size={80} style={{ marginTop: 22, maxWidth: 1600 }}>
        Düşük enerji tüketimi = <Grad>yüksek net işletme geliri.</Grad>
      </Title>

      <div style={{ marginTop: 110 }}>
        <FlowDiagram
          steps={[
            { label: "Düşük enerji gideri", tone: "down" },
            { label: "Düşük işletme gideri", tone: "down" },
            { label: "Yüksek NOI", tone: "up" },
            { label: "Yüksek değer", tone: "up" },
          ]}
        />
      </div>
      <Support style={{ marginTop: 100, fontSize: 28 }}>
        Gelirlerin indirgenmesi yaklaşımında değer, net işletme gelirinden türetilir.
      </Support>
    </SlideShell>
  );
}

/* ============================= SLIDE 18 — KARBON / YAŞAM DÖNGÜSÜ ========== */
export function Slide18() {
  const stages = ["Malzeme", "İnşaat", "Kullanım", "Bakım", "Yıkım / yeniden kullanım"];
  const R = 230;
  const cx = 300;
  const cy = 300;
  const ringLen = 2 * Math.PI * R;
  return (
    <SlideShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 600px", gap: 60, alignItems: "center", height: "100%" }}>
        <div>
          <Kicker>Karbon ayak izi</Kicker>
          <Title size={84} style={{ marginTop: 22 }}>
            Binanın değeri artık <Grad>yaşam döngüsünde</Grad> ölçülüyor.
          </Title>
          <Support style={{ marginTop: 36, fontSize: 26, color: colors.greenNeon }}>
            2027 itibariyle 10.000 m²'den büyük tüm yapılardan bina yaşam döngüsü analizi zorunlu oldu.
          </Support>
        </div>

        <div
          className="gv-reveal"
          style={{ ["--gv-i" as string]: 3, position: "relative", width: 600, height: 600 }}
        >
          <svg width="600" height="600" viewBox="0 0 600 600" style={{ position: "absolute", inset: 0 }}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(35,209,139,0.12)" strokeWidth={3} />
            <circle
              className="gv-donut-arc"
              cx={cx}
              cy={cy}
              r={R}
              fill="none"
              stroke={colors.greenNeon}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={ringLen}
              style={{
                ["--gv-dash-total" as string]: ringLen,
                ["--gv-dash-offset" as string]: 0,
                ["--gv-delay" as string]: "0.4s",
                ["--gv-arc-dur" as string]: "3.6s",
                filter: `drop-shadow(0 0 8px ${colors.greenNeon})`,
              }}
            />
          </svg>
          {stages.map((s, i) => {
            const ang = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
            const x = cx + Math.cos(ang) * R;
            const y = cy + Math.sin(ang) * R;
            return (
              <div
                key={s}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  width: 180,
                }}
              >
                <div
                  className="gv-pop-scale"
                  style={{
                    ["--gv-delay" as string]: `${0.8 + i * 0.42}s`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(150deg, rgba(35,209,139,0.2), rgba(7,20,42,0.7))",
                      border: `1.5px solid ${colors.greenNeon}`,
                      boxShadow: `0 0 30px -6px ${colors.greenNeon}`,
                      fontFamily: font.heading,
                      fontWeight: 700,
                      fontSize: 28,
                      color: colors.greenNeon,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontFamily: font.heading, fontWeight: 600, fontSize: 26, color: colors.iceWhite, marginTop: 12 }}>{s}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
