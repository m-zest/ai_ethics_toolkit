// ============================================================
// Professional PDF export — visually mirrors the worksheet
// layout/typography of the Ethics Toolkit (Travaglianti & Both,
// McCoy Family Center for Ethics in Society, Stanford University),
// adapted under CC BY 4.0. Uses this project's own stylized mark
// (NOT Stanford's logo) and carries an explicit "adapted, not
// endorsed" attribution, as required by the license.
// ============================================================

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
  Line,
  Path,
} from '@react-pdf/renderer';

const NAVY = '#1c3a5e';
const DEEP = '#0f2942';
const CARDINAL = '#8C1515';
const GREEN = '#15803d';
const INK = '#1a1a1a';
const MUTE = '#6b6b66';
const BOX = '#efeeea';
const LINE = '#d8d6cf';
const PAPER = '#ffffff';

const styles = StyleSheet.create({
  page: {
    backgroundColor: PAPER,
    paddingTop: 40,
    paddingBottom: 46,
    paddingLeft: 60,
    paddingRight: 48,
    fontFamily: 'Helvetica',
    color: INK,
    fontSize: 9.5,
    lineHeight: 1.45,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 23,
    color: NAVY,
  },
  titleThin: { fontFamily: 'Helvetica', color: '#5f7791' },
  tagline: {
    fontSize: 10,
    color: MUTE,
    marginTop: 3,
  },
  rule: {
    borderBottomWidth: 1,
    borderBottomColor: NAVY,
    marginTop: 10,
    marginBottom: 14,
  },
  thinRule: {
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    marginTop: 7,
    marginBottom: 10,
  },
  meta: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  metaItem: { marginRight: 22, marginBottom: 4 },
  metaLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 6.5,
    letterSpacing: 1.5,
    color: NAVY,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaValue: { fontSize: 10, color: INK },
  fieldRow: { flexDirection: 'row', marginBottom: 12 },
  fieldLabelCol: { width: 132, paddingRight: 14, paddingTop: 4 },
  fieldLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
    letterSpacing: 1.4,
    color: NAVY,
    textTransform: 'uppercase',
  },
  fieldDesc: { fontSize: 7.5, color: MUTE, marginTop: 3, lineHeight: 1.4 },
  box: {
    flex: 1,
    backgroundColor: BOX,
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minHeight: 40,
  },
  prompt: {
    fontFamily: 'Helvetica-BoldOblique',
    color: NAVY,
    fontSize: 10,
    marginBottom: 4,
  },
  promptHarm: { color: CARDINAL },
  answer: { fontSize: 9.5, color: INK, lineHeight: 1.5 },
  empty: { fontSize: 9, color: '#a8a59d', fontFamily: 'Helvetica-Oblique' },
  blockLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    letterSpacing: 1.4,
    color: NAVY,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  block: {
    backgroundColor: BOX,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
  },
  twoCol: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  col: { flex: 1 },
  bullet: { flexDirection: 'row', marginBottom: 3 },
  bulletDot: { width: 12, color: CARDINAL, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1, fontSize: 9.5, color: INK },
  highlight: {
    backgroundColor: '#eef3f8',
    borderLeftWidth: 3,
    borderLeftColor: NAVY,
    borderRadius: 2,
    padding: 12,
    marginBottom: 12,
  },
  gaugeSection: { marginBottom: 14 },
  gaugeTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: NAVY,
    marginBottom: 2,
  },
  gaugeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  gaugeStmt: { width: 168, fontSize: 8.5, color: INK, lineHeight: 1.35 },
  gaugeStmtR: { textAlign: 'right' },
  gaugeScale: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  gaugeNote: {
    fontSize: 8,
    color: MUTE,
    fontFamily: 'Helvetica-Oblique',
    marginTop: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 60,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerText: { fontSize: 6.5, color: '#9b988f', maxWidth: 560, lineHeight: 1.4 },
  pageNum: { fontSize: 8, color: '#b9b6ad', fontFamily: 'Helvetica-Bold' },
  // cover
  cover: { backgroundColor: PAPER, padding: 0, fontFamily: 'Helvetica' },
  coverBand: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#dcebf2',
  },
  coverInner: { padding: 60, height: '100%', justifyContent: 'space-between' },
  coverTitle: {
    fontFamily: 'Helvetica-BoldOblique',
    fontSize: 60,
    color: NAVY,
    letterSpacing: -1,
  },
  coverSub: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    color: NAVY,
    letterSpacing: 3,
    marginTop: 6,
  },
  coverMetaWrap: { marginTop: 34, borderTopWidth: 1, borderTopColor: NAVY, paddingTop: 16, maxWidth: 430 },
});

// Project's own stylized mark — intentionally NOT Stanford's concentric logo.
const BrandMark = ({ size = 30 }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40">
    <Circle cx="20" cy="20" r="18" fill="none" stroke={NAVY} strokeWidth="2.4" />
    <Circle cx="20" cy="20" r="12" fill="none" stroke={CARDINAL} strokeWidth="1.8" />
    <Circle cx="20" cy="20" r="6" fill="none" stroke={NAVY} strokeWidth="1.6" />
  </Svg>
);

const Brand = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <BrandMark size={26} />
    <View style={{ marginLeft: 8 }}>
      <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: NAVY }}>
        Ethics Toolkit
      </Text>
      <Text style={{ fontSize: 6, letterSpacing: 1.5, color: MUTE, textTransform: 'uppercase' }}>
        Put Values Into Action
      </Text>
    </View>
  </View>
);

const ATTRIB =
  'Adapted from the Ethics Toolkit by Manuela Travaglianti & Thomas Both, McCoy Family Center for Ethics in Society, Stanford University. Used and adapted into an interactive web format under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Changes were made. This is an independent adaptation and is not endorsed by Stanford.';

const Footer = ({ label }) => (
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>{ATTRIB}</Text>
    <Text
      style={styles.pageNum}
      render={({ pageNumber }) => `${label} · ${pageNumber}`}
    />
  </View>
);

const PageShell = ({ title, thin, tagline, sideLabel, children }) => (
  <Page size="LETTER" orientation="landscape" style={styles.page} wrap>
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {title}
          {thin ? <Text style={styles.titleThin}>{`  |  ${thin}`}</Text> : null}
        </Text>
        {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
      </View>
      <Brand />
    </View>
    <View style={styles.rule} />
    {children}
    <Footer label={sideLabel} />
  </Page>
);

const val = (v) => (v && String(v).trim() ? String(v) : null);

const Answer = ({ children }) =>
  children ? (
    <Text style={styles.answer}>{children}</Text>
  ) : (
    <Text style={styles.empty}>—</Text>
  );

const Meta = ({ draft, tool }) => (
  <View style={styles.meta}>
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>Worksheet</Text>
      <Text style={styles.metaValue}>{tool}</Text>
    </View>
    <View style={[styles.metaItem, { flex: 1, minWidth: 180 }]}>
      <Text style={styles.metaLabel}>Draft</Text>
      <Text style={styles.metaValue}>{val(draft.title) || 'Untitled'}</Text>
    </View>
    <View style={[styles.metaItem, { width: '100%' }]}>
      <Text style={styles.metaLabel}>Action / Creation</Text>
      <Text style={styles.metaValue}>
        {val(draft.action) || '—'}
      </Text>
    </View>
  </View>
);

const FieldRow = ({ label, desc, prompt, harm, value }) => (
  <View style={styles.fieldRow} wrap={false}>
    <View style={styles.fieldLabelCol}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {desc ? <Text style={styles.fieldDesc}>{desc}</Text> : null}
    </View>
    <View style={styles.box}>
      {prompt ? (
        <Text style={[styles.prompt, harm && styles.promptHarm]}>{prompt}</Text>
      ) : null}
      <Answer>{val(value)}</Answer>
    </View>
  </View>
);

const Block = ({ label, value, tint, children }) => (
  <View
    style={[
      styles.block,
      tint === 'green' && { backgroundColor: '#eef6f0' },
      tint === 'red' && { backgroundColor: '#f8eeee' },
    ]}
    wrap={false}
  >
    <Text style={styles.blockLabel}>{label}</Text>
    {children || <Answer>{val(value)}</Answer>}
  </View>
);

const Bullets = ({ items }) => {
  const list = (items || []).map(val).filter(Boolean);
  if (!list.length) return <Answer>{null}</Answer>;
  return (
    <View>
      {list.map((it, i) => (
        <View style={styles.bullet} key={i}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{it}</Text>
        </View>
      ))}
    </View>
  );
};

// ---- Future Story -------------------------------------------------
const FutureStory = ({ draft }) => (
  <PageShell
    title="Future Story"
    tagline="Think forward, by looking back."
    sideLabel="Future Story"
  >
    <Meta draft={draft} tool="Future Story" />
    <FieldRow
      label="Problem / Motivation"
      desc="The current problem or issue your work aims to address"
      prompt="Once upon a time …"
      value={draft.problem}
    />
    <FieldRow
      label="Solution / Value Prop"
      desc="Your creation or action in response to the issue"
      prompt="Until one day …"
      value={draft.solution}
    />
    <FieldRow
      label="Benefits"
      desc="How it benefits (or may benefit) people and society"
      prompt="And because of that …"
      value={draft.benefits}
    />
    <FieldRow
      label="Harms"
      desc="How it harms (or may harm) people and society"
      prompt="But also …"
      harm
      value={draft.harms}
    />
    <FieldRow
      label="Subsequent Impacts"
      desc="Additional harms or unintended consequences, and the ethical values impacted"
      prompt="In turn …"
      harm
      value={draft.impacts}
    />
    <FieldRow
      label="Mitigating Actions"
      desc="Actions that could mitigate these harms, or research to better understand issues"
      prompt="One thing we could have done differently is …"
      value={draft.mitigation}
    />
  </PageShell>
);

// ---- Impacts Explorer --------------------------------------------
const ImpactsExplorer = ({ draft }) => (
  <PageShell
    title="Impacts Explorer"
    thin="Map the ripple effects"
    tagline="Consider effects on people and society, and how related ethical values are promoted or degraded."
    sideLabel="Impacts Explorer"
  >
    <Meta draft={draft} tool="Impacts Explorer" />
    <View style={styles.twoCol}>
      <View style={styles.col}>
        <Block label="Direct Effects — on people and society">
          <Bullets items={draft.direct} />
        </Block>
      </View>
      <View style={styles.col}>
        <Block label="Secondary Effects — resulting from primary effects">
          <Bullets items={draft.secondary} />
        </Block>
      </View>
    </View>
    <Block label="Values Impacted — promoted or degraded">
      <Bullets items={draft.values} />
    </Block>
    <Block
      label="Key pathways & tensions"
      value={draft.synthesis}
    />
  </PageShell>
);

// ---- Ethics Frame -------------------------------------------------
const EthicsFrame = ({ draft }) => (
  <PageShell
    title="Ethics Frame"
    thin="A single worksheet"
    tagline="Outline ethical considerations and actions in response."
    sideLabel="Ethics Frame"
  >
    <Meta draft={draft} tool="Ethics Frame" />
    <View style={styles.twoCol}>
      <View style={styles.col}>
        <Block label="Values driving you" value={draft.values} />
      </View>
      <View style={styles.col}>
        <Block label="How are these values impacted?" value={draft.valuesImpacted} />
      </View>
    </View>
    <View style={styles.twoCol}>
      <View style={styles.col}>
        <Block label="Benefits — how is it beneficial?" tint="green" value={draft.benefits} />
      </View>
      <View style={styles.col}>
        <Block label="Harms — how is it (potentially) harmful?" tint="red" value={draft.harms} />
      </View>
    </View>
    <Block label="Who is affected, and in what way?" value={draft.who} />
    <Block label="Values prioritization" value={draft.prioritization} />
    <View style={styles.twoCol}>
      <View style={styles.col}>
        <Block label="How to expand benefits" value={draft.expand} />
      </View>
      <View style={styles.col}>
        <Block label="How to reduce harms" value={draft.reduce} />
      </View>
    </View>
    <View style={styles.highlight} wrap={false}>
      <Text style={styles.blockLabel}>Bottom line — what changes will you make?</Text>
      <Answer>{val(draft.bottomLine)}</Answer>
    </View>
  </PageShell>
);

// ---- Ethics Gauge -------------------------------------------------
const GAUGE_SECTIONS = [
  {
    key: 'beneficial',
    label: 'How is it beneficial?',
    rows: [
      ['Limited benefit. Existing alternatives are better.', 'Great benefit. More benefit than what exists.'],
      ['Benefit is limited to few select people.', 'Large numbers and multiple groups benefit.'],
      ['Unlikely to succeed. Benefit may not materialize.', 'Very likely the benefit will be achieved.'],
    ],
  },
  {
    key: 'harmful',
    label: 'How is it harmful?',
    rows: [
      ['Great harm to individuals. More harm than exists.', 'Limited harm. Less than what already exists.'],
      ['Large numbers and multiple groups harmed.', 'Harm is limited to few people.'],
      ['Harm is certain or impossible to prevent.', 'Harm unlikely. Likely to be prevented.'],
    ],
  },
  {
    key: 'fair',
    label: 'How fair is it?',
    rows: [
      ['Certain people or groups affected more than others.', 'All people and groups affected equally.'],
      ['Harmed are less advantaged. Benefitted hold privilege.', 'No more harm to disadvantaged. Benefitted have need.'],
      ['Burden on harmed is not justifiable.', 'Burden on harmed is acceptable and justifiable.'],
    ],
  },
  {
    key: 'empowering',
    label: 'How empowering is it?',
    rows: [
      ["People's ability to make informed choices reduced.", 'Ability to make informed choices unimpaired or increased.'],
      ["People's control over their lives is removed.", "People's control is retained or enhanced."],
      ['Removes freedom to do certain activities.', 'Does not coerce, manipulate, or pressure people.'],
    ],
  },
];

const Dots = ({ selected, size = 20 }) => {
  const dots = [];
  for (let i = 1; i <= 7; i++) {
    let stroke = '#bdbbb3';
    if (i <= 3) stroke = CARDINAL;
    else if (i >= 5) stroke = GREEN;
    const on = selected === i;
    dots.push(
      <Svg key={i} width={size} height={size} viewBox="0 0 20 20">
        <Circle
          cx="10"
          cy="10"
          r="7.5"
          fill={on ? stroke : 'none'}
          stroke={stroke}
          strokeWidth="1.4"
        />
        {i === 1 && (
          <Line x1="6" y1="10" x2="14" y2="10" stroke={on ? '#fff' : stroke} strokeWidth="1.4" />
        )}
        {i === 7 && (
          <>
            <Line x1="6" y1="10" x2="14" y2="10" stroke={on ? '#fff' : stroke} strokeWidth="1.4" />
            <Line x1="10" y1="6" x2="10" y2="14" stroke={on ? '#fff' : stroke} strokeWidth="1.4" />
          </>
        )}
      </Svg>
    );
  }
  return <>{dots}</>;
};

const EthicsGauge = ({ draft }) => (
  <PageShell
    title="Ethics Gauge"
    tagline="A practical template for ethical assessment at a glance."
    sideLabel="Ethics Gauge"
  >
    <Meta draft={draft} tool="Ethics Gauge" />
    {GAUGE_SECTIONS.map((s) => (
      <View style={styles.gaugeSection} key={s.key} wrap={false}>
        <Text style={styles.gaugeTitle}>{s.label}</Text>
        <View style={{ borderBottomWidth: 1, borderBottomColor: NAVY, marginBottom: 2 }} />
        {s.rows.map((row, i) => {
          const sel = (draft[s.key] || {})[i];
          return (
            <View style={styles.gaugeRow} key={i}>
              <Text style={styles.gaugeStmt}>{row[0]}</Text>
              <View style={styles.gaugeScale}>
                <Dots selected={sel} />
              </View>
              <Text style={[styles.gaugeStmt, styles.gaugeStmtR]}>{row[1]}</Text>
            </View>
          );
        })}
        {val((draft.notes || {})[s.key]) ? (
          <Text style={styles.gaugeNote}>
            Notes: {(draft.notes || {})[s.key]}
          </Text>
        ) : null}
      </View>
    ))}
  </PageShell>
);

// ---- Weighing Options --------------------------------------------
const WeighingOptions = ({ draft }) => {
  const options = (draft.options && draft.options.length ? draft.options : [{}, {}]);
  return (
    <PageShell
      title="Weighing Options"
      tagline="Compare options, considering effects on society and your organization."
      sideLabel="Weighing Options"
    >
      <Meta draft={draft} tool="Weighing Options" />
      <Block label="Current situation" value={draft.current} />
      <View style={styles.twoCol}>
        {options.map((opt, i) => (
          <View style={styles.col} key={i}>
            <View style={[styles.block, { minHeight: 10 }]} wrap={false}>
              <Text style={[styles.blockLabel, { fontSize: 9, color: NAVY }]}>
                {`Option ${i + 1}${val(opt.name) ? ` — ${opt.name}` : ''}`}
              </Text>
              <Text style={styles.metaLabel}>Societal — benefits</Text>
              <Answer>{val(opt.socBenefits)}</Answer>
              <Text style={[styles.metaLabel, { marginTop: 6 }]}>Societal — harms</Text>
              <Answer>{val(opt.socHarms)}</Answer>
              <Text style={[styles.metaLabel, { marginTop: 6 }]}>Organizational impact</Text>
              <Answer>{val(opt.orgImpact)}</Answer>
              <Text style={[styles.metaLabel, { marginTop: 6 }]}>Obstacles</Text>
              <Answer>{val(opt.obstacles)}</Answer>
              <Text style={[styles.metaLabel, { marginTop: 6 }]}>Prioritizing</Text>
              <Answer>{val(opt.priorities)}</Answer>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.highlight} wrap={false}>
        <Text style={styles.blockLabel}>Future direction</Text>
        <Answer>{val(draft.future)}</Answer>
      </View>
    </PageShell>
  );
};

const TOOL_PAGES = {
  'future-story': FutureStory,
  'impacts-explorer': ImpactsExplorer,
  'ethics-frame': EthicsFrame,
  'ethics-gauge': EthicsGauge,
  'weighing-options': WeighingOptions,
};

const TOOL_NAMES = {
  'future-story': 'Future Story',
  'impacts-explorer': 'Impacts Explorer',
  'ethics-frame': 'Ethics Frame',
  'ethics-gauge': 'Ethics Gauge',
  'weighing-options': 'Weighing Options',
};

const Cover = ({ toolKey, draft }) => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <Page size="LETTER" orientation="landscape" style={styles.cover}>
      <View style={styles.coverBand} />
      <View style={styles.coverInner}>
        <Brand />
        <View>
          <Text style={styles.coverTitle}>Ethics Toolkit</Text>
          <Text style={styles.coverSub}>PUT VALUES INTO ACTION</Text>
          <View style={styles.coverMetaWrap}>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11, color: NAVY, letterSpacing: 1 }}>
              {(TOOL_NAMES[toolKey] || 'Worksheet').toUpperCase()}
            </Text>
            <Text style={{ fontSize: 16, color: INK, marginTop: 8, fontFamily: 'Helvetica-Bold' }}>
              {val(draft.title) || 'Untitled draft'}
            </Text>
            {val(draft.action) ? (
              <Text style={{ fontSize: 10, color: MUTE, marginTop: 6 }}>{draft.action}</Text>
            ) : null}
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 8, color: MUTE }}>Completed worksheet · {today}</Text>
          <Text style={{ fontSize: 6.5, color: '#9b988f', marginTop: 6, maxWidth: 460, lineHeight: 1.4 }}>
            {ATTRIB}
          </Text>
        </View>
      </View>
    </Page>
  );
};

// ModernPdfDocument — the original linear, document-style layout
// (cover page + stacked sections). Kept unchanged for backward
// compatibility; this is the "Modern" option in the layout toggle.
export function ModernPdfDocument({ toolKey, draft }) {
  const ToolPage = TOOL_PAGES[toolKey] || EthicsFrame;
  return (
    <Document
      title={`${TOOL_NAMES[toolKey] || 'Ethics Toolkit'} — ${val(draft.title) || 'Draft'}`}
      author="Ethics Toolkit (adapted, CC BY 4.0)"
      subject="Ethics Toolkit worksheet"
    >
      <Cover toolKey={toolKey} draft={draft} />
      <ToolPage draft={draft} />
    </Document>
  );
}

// ============================================================
// CLASSIC LAYOUT — template-matched, one component per tool.
// Visually mirrors the original Stanford McCoy Ethics Toolkit
// worksheet pages (source PDF pp. 8-9, 11-12, 17-18, 27-28,
// 37-38). Uses this project's own mark, not Stanford's logo,
// and carries the same CC BY 4.0 attribution footer.
// ============================================================

const HATCH = '#dededa';
const WBORDER = '#9a9a93';
const FILL = '#e9e9e6';
const LABEL_GRAY = '#5a5a55';
const DESC_GRAY = '#86857e';

const cs = StyleSheet.create({
  page: {
    backgroundColor: PAPER,
    paddingTop: 32,
    paddingBottom: 44,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    color: INK,
    fontSize: 9,
  },
  hdr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  hTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 21,
    color: INK,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  hTag: { fontSize: 9.5, color: MUTE, marginTop: 3 },
  metaLine: { fontSize: 8, color: MUTE, marginTop: 6 },
  topRule: { borderBottomWidth: 1, borderBottomColor: '#cfcdc5', marginTop: 8, marginBottom: 12 },
  fill: { backgroundColor: FILL, borderRadius: 2, padding: 12 },
  white: { borderWidth: 1, borderColor: WBORDER, borderRadius: 2, padding: 12 },
  capLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: LABEL_GRAY,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  capDesc: { fontSize: 7.5, color: DESC_GRAY, marginTop: 3, lineHeight: 1.4 },
  body: { fontSize: 9, color: INK, marginTop: 8, lineHeight: 1.5 },
  bodyEmpty: { fontSize: 9, color: '#b4b2a9', fontFamily: 'Helvetica-Oblique', marginTop: 8 },
  // Future Story rows
  fsRow: { flexDirection: 'row', marginBottom: 10 },
  fsLabelCol: { width: 132, paddingRight: 12, paddingTop: 4 },
  fsLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
    color: NAVY,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  fsDesc: { fontSize: 7, color: MUTE, marginTop: 3, lineHeight: 1.35 },
  fsBox: { flex: 1, backgroundColor: FILL, borderRadius: 2, padding: 11, minHeight: 46 },
  fsPrompt: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: NAVY },
  fsPromptHarm: { color: CARDINAL },
  fsAns: { fontSize: 9, color: INK, marginTop: 5, lineHeight: 1.5 },
  // bands (Impacts Explorer)
  bandRow: { flexDirection: 'row', gap: 10 },
  band: { flex: 1 },
  bandLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: NAVY,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  bandDesc: { fontSize: 7, color: MUTE, marginTop: 2, marginBottom: 5, lineHeight: 1.35 },
  bandItem: { fontSize: 8.5, color: INK, marginBottom: 4, lineHeight: 1.4 },
  // gauge
  gSecTitle: { fontFamily: 'Helvetica-Bold', fontSize: 13, color: INK, marginBottom: 1 },
  gSecRule: { borderBottomWidth: 1, borderBottomColor: INK, marginBottom: 2 },
  gRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1d9',
  },
  gStmt: { width: 188, fontSize: 7.5, color: INK, lineHeight: 1.3 },
  gStmtR: { textAlign: 'right' },
  gScale: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  gHint: {
    backgroundColor: '#ededea',
    borderRadius: 2,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginTop: 6,
    marginBottom: 9,
  },
  gHintText: { fontSize: 7.5, color: '#7d7c75', fontFamily: 'Helvetica-Oblique', textAlign: 'right', lineHeight: 1.3 },
  gNote: { fontSize: 7.5, color: INK, marginTop: 5, lineHeight: 1.4 },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 42,
    right: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

const ClassicFooter = ({ label }) => (
  <View style={cs.footer} fixed>
    <Text style={styles.footerText}>{ATTRIB}</Text>
    <Text style={styles.pageNum} render={({ pageNumber }) => `${label} · ${pageNumber}`} />
  </View>
);

const ClassicHeader = ({ toolKey, draft }) => (
  <View>
    <View style={cs.hdr}>
      <View style={{ flex: 1, paddingRight: 16 }}>
        <Text style={cs.hTitle}>{TOOL_NAMES[toolKey] || 'Worksheet'}</Text>
        <Text style={cs.hTag}>{TOOL_TAGLINES[toolKey]}</Text>
        <Text style={cs.metaLine}>
          {(val(draft.title) || 'Untitled draft')}
          {val(draft.action) ? `  —  ${draft.action}` : ''}
        </Text>
      </View>
      <Brand />
    </View>
    <View style={cs.topRule} />
  </View>
);

const TOOL_TAGLINES = {
  'future-story': 'Think forward, by looking back.',
  'impacts-explorer': 'Map the ripple effects of your actions.',
  'ethics-frame': 'Outline ethical considerations and actions in response.',
  'ethics-gauge': 'A practical template for ethical assessment at a glance.',
  'weighing-options': 'Weigh considerations of different courses of action.',
};

const CBody = ({ value }) =>
  val(value) ? (
    <Text style={cs.body}>{value}</Text>
  ) : (
    <Text style={cs.bodyEmpty}>—</Text>
  );

// Diagonal-hatch fill behind the Ethics Frame "Values" column,
// mirroring the striped panel in the original worksheet.
const Hatch = ({ w, h }) => {
  const lines = [];
  const step = 9;
  for (let x = -h; x < w; x += step) {
    lines.push(
      <Line key={x} x1={x} y1={h} x2={x + h} y2={0} stroke={HATCH} strokeWidth={0.7} />
    );
  }
  return (
    <Svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {lines}
    </Svg>
  );
};

// ---- Classic: Future Story (source p. 9) -------------------------
const FS_ROWS = [
  ['Problem / Motivation', "The current 'problem' or 'issue' your work aims to address", 'Once upon a time …', 'problem', false],
  ['Solution / Value Prop', 'Your creation / action in response to the issue', 'Until one day …', 'solution', false],
  ['Benefits', 'How it benefits (or may benefit) people and society', 'And because of that …', 'benefits', false],
  ['Harms', 'How it harms (or may harm) people and society', 'But also …', 'harms', true],
  ['Subsequent Impacts', 'Additional harms or unintended consequences, and the ethical values impacted', 'In turn … *', 'impacts', true],
  ['Mitigating Actions', 'Action(s) that could mitigate these harms, or research to better understand issues', 'One thing we could have done differently is …', 'mitigation', false],
];

const ClassicFutureStory = ({ draft }) => (
  <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
    <ClassicHeader toolKey="future-story" draft={draft} />
    {FS_ROWS.map(([label, desc, prompt, key, harm]) => (
      <View style={cs.fsRow} key={key} wrap={false}>
        <View style={cs.fsLabelCol}>
          <Text style={cs.fsLabel}>{label}</Text>
          <Text style={cs.fsDesc}>{desc}</Text>
        </View>
        <View style={cs.fsBox}>
          <Text style={[cs.fsPrompt, harm && cs.fsPromptHarm]}>{prompt}</Text>
          {val(draft[key]) ? (
            <Text style={cs.fsAns}>{draft[key]}</Text>
          ) : (
            <Text style={[cs.fsAns, { color: '#b4b2a9', fontFamily: 'Helvetica-Oblique' }]}>—</Text>
          )}
        </View>
      </View>
    ))}
    <ClassicFooter label="Future Story · Classic" />
  </Page>
);

// ---- Classic: Impacts Explorer (source pp. 11-12) ---------------
// The original is a concentric-arc spread. We render the faithful
// light-gray arc backdrop via SVG, then place the user's items in
// the four labelled bands at the bottom (ACTION / EFFECTS /
// SECONDARY EFFECTS / VALUES IMPACTED). Precise text-on-arc layout
// is not feasible in @react-pdf/renderer, so the bottom-band
// rendering is the documented, legible fallback blended with the
// arc visual.
const ArcBackdrop = ({ w, h }) => {
  const cx = 8;
  const cy = h;
  const radii = [h * 0.42, h * 0.72, h * 1.0];
  return (
    <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', top: 0, left: 0 }}>
      {radii.map((r, i) => (
        <Path
          key={i}
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          stroke={i === 0 ? '#dededb' : i === 1 ? '#e6e6e3' : '#ececea'}
          strokeWidth={6 - i}
          fill="none"
        />
      ))}
    </Svg>
  );
};

const ClassicImpactsExplorer = ({ draft }) => {
  const arcW = 708;
  const arcH = 300;
  const bands = [
    ['Action / Creation', 'What you are (considering) doing or creating?', val(draft.action) ? [draft.action] : []],
    ['Effects', 'Effects on people and society.', (draft.direct || []).map(val).filter(Boolean)],
    ['Secondary Effects', '(Potential) effects resulting from primary effects.', (draft.secondary || []).map(val).filter(Boolean)],
    ['Values Impacted', 'How values are promoted or degraded by these effects.', (draft.values || []).map(val).filter(Boolean)],
  ];
  return (
    <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
      <ClassicHeader toolKey="impacts-explorer" draft={draft} />
      <View style={{ height: arcH }}>
        <ArcBackdrop w={arcW} h={arcH} />
      </View>
      <View style={cs.bandRow}>
        {bands.map(([label, desc, items], i) => (
          <View style={cs.band} key={i}>
            <View style={{ borderTopWidth: 2, borderTopColor: NAVY, paddingTop: 6 }}>
              <Text style={cs.bandLabel}>{label}</Text>
              <Text style={cs.bandDesc}>{desc}</Text>
              {items.length ? (
                items.map((it, k) => (
                  <Text style={cs.bandItem} key={k}>
                    • {it}
                  </Text>
                ))
              ) : (
                <Text style={[cs.bandItem, { color: '#b4b2a9', fontFamily: 'Helvetica-Oblique' }]}>—</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      {val(draft.synthesis) ? (
        <View style={{ marginTop: 12 }}>
          <Text style={cs.fsLabel}>Key pathways &amp; tensions</Text>
          <Text style={cs.body}>{draft.synthesis}</Text>
        </View>
      ) : null}
      <ClassicFooter label="Impacts Explorer · Classic" />
    </Page>
  );
};

// ---- Classic: Ethics Frame (source pp. 17-18, two pages) --------
const FrameCap = ({ label, desc }) => (
  <View>
    <Text style={cs.capLabel}>{label}</Text>
    {desc ? <Text style={cs.capDesc}>{desc}</Text> : null}
  </View>
);

const Spectrum = () => (
  <View style={{ marginTop: 10 }}>
    <View style={{ flexDirection: 'row', height: 7 }}>
      <View style={{ flex: 1, backgroundColor: '#cfe3d4' }} />
      <View style={{ flex: 1, backgroundColor: '#e6efe2' }} />
      <View style={{ flex: 1, backgroundColor: '#f3e2e2' }} />
      <View style={{ flex: 1, backgroundColor: '#e8c9c9' }} />
    </View>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
      <Text style={{ fontSize: 7, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>Great benefit</Text>
      <Text style={{ fontSize: 7, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>Moderate benefit</Text>
      <Text style={{ fontSize: 7, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>Moderate harm</Text>
      <Text style={{ fontSize: 7, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>Great harm</Text>
    </View>
  </View>
);

const ClassicEthicsFrame = ({ draft }) => {
  const colH = 344;
  const colH2 = 372;
  return (
    <>
      <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
        <ClassicHeader toolKey="ethics-frame" draft={draft} />
        <View style={[cs.fill, { marginBottom: 10 }]} wrap={false}>
          <FrameCap label="Action / Creation" desc="What are you (considering) creating or doing?" />
          <CBody value={draft.action} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }} wrap={false}>
          <View style={[cs.white, { width: 206, height: colH, overflow: 'hidden' }]}>
            <Hatch w={206} h={colH} />
            <View>
              <FrameCap label="Values" desc="What values are driving you?" />
              <CBody value={draft.values} />
            </View>
            <View style={{ marginTop: 18 }}>
              <Text style={cs.capDesc}>How are these values, and others, impacted?</Text>
              <CBody value={draft.valuesImpacted} />
            </View>
          </View>
          <View style={{ flex: 1, height: colH, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
              <View style={[cs.white, { flex: 1 }]}>
                <FrameCap label="Benefits" desc="How is it beneficial?" />
                <CBody value={draft.benefits} />
              </View>
              <View style={[cs.white, { flex: 1 }]}>
                <FrameCap label="Harms" desc="How is it (potentially) harmful?" />
                <CBody value={draft.harms} />
              </View>
            </View>
            <View style={[cs.white, { flex: 1, marginTop: 10 }]}>
              <FrameCap label="Who is affected, in what way" desc="How do effects differ for different people and groups? Is this distribution fair?" />
              <CBody value={draft.who} />
              <Spectrum />
            </View>
          </View>
        </View>
        <ClassicFooter label="Ethics Frame · Classic" />
      </Page>
      <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
        <View style={{ flexDirection: 'row', gap: 10 }} wrap={false}>
          <View style={[cs.white, { width: 206, height: colH2, overflow: 'hidden' }]}>
            <Hatch w={206} h={colH2} />
            <FrameCap label="Values" desc="What values are you prioritizing over others, and why?" />
            <CBody value={draft.prioritization} />
          </View>
          <View style={[cs.white, { flex: 1, height: colH2 }]}>
            <FrameCap label="How to Expand Benefits?" desc="How might you amplify and spread the benefits?" />
            <CBody value={draft.expand} />
          </View>
          <View style={[cs.white, { flex: 1, height: colH2 }]}>
            <FrameCap label="How to Reduce Harms?" desc="How might you prevent, mitigate, and dilute the harms?" />
            <CBody value={draft.reduce} />
          </View>
        </View>
        <View style={[cs.fill, { marginTop: 10 }]} wrap={false}>
          <FrameCap label="Bottom Line" desc="What changes in your plans will you make?" />
          <CBody value={draft.bottomLine} />
        </View>
        <ClassicFooter label="Ethics Frame · Classic" />
      </Page>
    </>
  );
};

// ---- Classic: Ethics Gauge (source pp. 27-28, two pages) --------
const CLASSIC_GAUGE = {
  beneficial: {
    title: 'How is it beneficial?',
    rows: [
      ['There is limited benefit to individuals. What already exists benefits people more.', 'There is great benefit to individuals. There is more benefit than what already exists.'],
      ['The benefit is limited to few select people.', 'Large numbers and multiple (or all) groups benefit.'],
      ['The action or creation is unlikely to succeed, and there is a high likelihood that people will not benefit from it.', 'It is very likely that the benefit will be achieved.'],
    ],
  },
  harmful: {
    title: 'How is it harmful?',
    rows: [
      ['There is great harm to individuals. There is more harm than what already exists.', 'There is limited harm to individuals. Harm that is caused is less than what already exists (alternatives).'],
      ['Large numbers and multiple (or all) groups are harmed.', 'The harm is limited to few people.'],
      ['Harm is certain to occur or impossible to prevent.', 'Harm is unlikely to occur. Potential harm is likely to be successfully prevented.'],
    ],
  },
  fair: {
    title: 'How fair is it?',
    rows: [
      ['Certain people or groups are affected more than others.', 'All people and groups are affected equally.'],
      ['Those who are harmed are also less advantaged in society. Those who benefit have privilege in society.', 'There is no more harm to those who are less advantaged in society. Those who benefit have greater need.'],
      ['The burden faced by those who are (most) harmed is not acceptable or justifiable.', 'All things considered, the burden faced by those who are (most) harmed is acceptable or justifiable.'],
    ],
  },
  empowering: {
    title: 'How empowering is it?',
    rows: [
      ["People's abilities to make informed choices for themselves are reduced.", "People's abilities to make informed choices for themselves are unimpaired or increased."],
      ["People's control of aspect(s) of their lives is removed.", "People's control of aspect(s) of their lives is retained or enhanced."],
      ['There are activities that our actions or creations remove freedom to do.', "Our creation does not coerce, manipulate, or pressure people, and limits others' ability to do so."],
    ],
  },
};

const GaugeSection = ({ sectionKey, draft }) => {
  const sec = CLASSIC_GAUGE[sectionKey];
  const note = val((draft.notes || {})[sectionKey]);
  return (
    <View wrap={false} style={{ marginBottom: 4 }}>
      <Text style={cs.gSecTitle}>{sec.title}</Text>
      <View style={cs.gSecRule} />
      {sec.rows.map((row, i) => {
        const sel = (draft[sectionKey] || {})[i];
        return (
          <View style={cs.gRow} key={i}>
            <Text style={cs.gStmt}>{row[0]}</Text>
            <View style={cs.gScale}>
              <Dots selected={sel} size={17} />
            </View>
            <Text style={[cs.gStmt, cs.gStmtR]}>{row[1]}</Text>
          </View>
        );
      })}
      <View style={cs.gHint}>
        <Text style={cs.gHintText}>How do we measure the effects?</Text>
        <Text style={cs.gHintText}>How might we move to the right?</Text>
        <Text style={cs.gHintText}>What else do we need to investigate?</Text>
        {note ? <Text style={cs.gNote}>{note}</Text> : null}
      </View>
    </View>
  );
};

const ClassicEthicsGauge = ({ draft }) => (
  <>
    <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
      <ClassicHeader toolKey="ethics-gauge" draft={draft} />
      <Text style={{ fontSize: 9.5, color: INK, fontFamily: 'Helvetica-Oblique', marginBottom: 8 }}>
        Considering our action / creation …
      </Text>
      <GaugeSection sectionKey="beneficial" draft={draft} />
      <GaugeSection sectionKey="harmful" draft={draft} />
      <ClassicFooter label="Ethics Gauge · Classic" />
    </Page>
    <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
      <GaugeSection sectionKey="fair" draft={draft} />
      <GaugeSection sectionKey="empowering" draft={draft} />
      <ClassicFooter label="Ethics Gauge · Classic" />
    </Page>
  </>
);

// ---- Classic: Weighing Options (source pp. 37-38, two pages) ----
const SubBox = ({ label, desc, leftTag, rightTag, value, fill = true }) => (
  <View style={[fill ? cs.fill : cs.white, { marginBottom: 10 }]}>
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text style={[cs.capLabel, { fontSize: 9 }]}>{label}</Text>
      {desc ? <Text style={[cs.capDesc, { marginTop: 0, marginLeft: 8 }]}>{desc}</Text> : null}
    </View>
    {leftTag ? (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
        <Text style={{ fontSize: 7.5, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>{leftTag}</Text>
        <Text style={{ fontSize: 7.5, color: MUTE, fontFamily: 'Helvetica-Oblique' }}>{rightTag}</Text>
      </View>
    ) : null}
    <CBody value={value} />
  </View>
);

const ClassicWeighingOptions = ({ draft }) => {
  const options = (draft.options && draft.options.length ? draft.options : [{}, {}]).slice(0, 2);
  while (options.length < 2) options.push({});
  return (
    <>
      <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
        <ClassicHeader toolKey="weighing-options" draft={draft} />
        <View style={[cs.fill, { marginBottom: 10 }]} wrap={false}>
          <FrameCap label="Current Situation" desc="What is the status quo? What is the context in which you make this decision?" />
          <CBody value={draft.current} />
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {options.map((opt, i) => (
            <View style={{ flex: 1 }} key={i}>
              <View style={[cs.white, { marginBottom: 10 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={[cs.capLabel, { fontSize: 10 }]}>{`Option ${i + 1}`}</Text>
                  <Text style={[cs.capDesc, { marginTop: 0, marginLeft: 8 }]}>
                    {i === 0 ? 'Write one possible course of action.' : 'Write another possible course of action.'}
                  </Text>
                </View>
                <CBody value={opt.name} />
              </View>
              <SubBox
                label="Societal Impact"
                desc="How are people and society affected?"
                leftTag="Benefits"
                rightTag="Harms"
                value={[val(opt.socBenefits) && `Benefits: ${opt.socBenefits}`, val(opt.socHarms) && `Harms: ${opt.socHarms}`].filter(Boolean).join('\n') || null}
              />
              <SubBox
                label="Organizational Impact"
                desc="How might the organization be affected?"
                leftTag="Internally"
                rightTag="Externally"
                value={opt.orgImpact}
              />
            </View>
          ))}
        </View>
        <ClassicFooter label="Weighing Options · Classic" />
      </Page>
      <Page size="LETTER" orientation="landscape" style={cs.page} wrap>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {options.map((opt, i) => (
            <View style={{ flex: 1 }} key={i}>
              <SubBox
                label="Obstacles"
                desc="What might prevent implementing / achieving this option?"
                leftTag="Uncertainties"
                rightTag="Contingency plans"
                value={opt.obstacles}
              />
              <SubBox
                label="If you choose this option, what are you prioritizing?"
                leftTag="Values"
                rightTag="Other factors"
                value={opt.priorities}
              />
            </View>
          ))}
        </View>
        <View style={[cs.fill, { marginTop: 2 }]} wrap={false}>
          <FrameCap label="Future Direction" desc="Which option will you pursue, and why? Or what else do you need to learn or do?" />
          <CBody value={draft.future} />
        </View>
        <ClassicFooter label="Weighing Options · Classic" />
      </Page>
    </>
  );
};

const CLASSIC_PAGES = {
  'future-story': ClassicFutureStory,
  'impacts-explorer': ClassicImpactsExplorer,
  'ethics-frame': ClassicEthicsFrame,
  'ethics-gauge': ClassicEthicsGauge,
  'weighing-options': ClassicWeighingOptions,
};

// ClassicPdfDocument — template-matched layout; switches on toolKey.
export function ClassicPdfDocument({ toolKey, draft }) {
  const ToolPages = CLASSIC_PAGES[toolKey] || ClassicEthicsFrame;
  return (
    <Document
      title={`${TOOL_NAMES[toolKey] || 'Ethics Toolkit'} (Classic) — ${val(draft.title) || 'Draft'}`}
      author="Ethics Toolkit (adapted, CC BY 4.0)"
      subject="Ethics Toolkit worksheet"
    >
      <ToolPages draft={draft} />
    </Document>
  );
}

// downloadPdf — picks the layout, renders in the browser, downloads.
export async function downloadPdf(toolKey, draft, layout = 'modern') {
  const { pdf } = await import('@react-pdf/renderer');
  const Doc = layout === 'classic' ? ClassicPdfDocument : ModernPdfDocument;
  const blob = await pdf(<Doc toolKey={toolKey} draft={draft} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safe = (TOOL_NAMES[toolKey] || 'worksheet').replace(/\s+/g, '-').toLowerCase();
  const name = (val(draft.title) || 'draft').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  a.download = `${safe}-${layout === 'classic' ? 'classic' : 'modern'}-${name}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
