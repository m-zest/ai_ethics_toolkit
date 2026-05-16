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

const Dots = ({ selected }) => {
  const dots = [];
  for (let i = 1; i <= 7; i++) {
    let stroke = '#bdbbb3';
    if (i <= 3) stroke = CARDINAL;
    else if (i >= 5) stroke = GREEN;
    const on = selected === i;
    dots.push(
      <Svg key={i} width="20" height="20" viewBox="0 0 20 20">
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

export function EthicsToolkitPdf({ toolKey, draft }) {
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

export async function downloadToolkitPdf({ toolKey, draft }) {
  const { pdf } = await import('@react-pdf/renderer');
  const blob = await pdf(
    <EthicsToolkitPdf toolKey={toolKey} draft={draft} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safe = (TOOL_NAMES[toolKey] || 'worksheet')
    .replace(/\s+/g, '-')
    .toLowerCase();
  const name = (val(draft.title) || 'draft')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase();
  a.download = `ethics-toolkit-${safe}-${name}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
