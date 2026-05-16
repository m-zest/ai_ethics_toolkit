'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Pencil,
  Save,
  Share2,
  Download,
  Home,
  ChevronRight,
  Plus,
  X,
  Copy,
  Check,
  FileText,
  Layers,
  Frame,
  Gauge,
  Scale,
  Heart,
  Folder,
  Trash2,
  Inbox,
} from 'lucide-react';

// ============================================================
// CONTENT — Definitions, examples, value cards (from the toolkit)
// ============================================================

const TOOLS = {
  'future-story': {
    name: 'Future Story',
    icon: FileText,
    tagline: 'Think forward, by looking back.',
    stage: 'Explore',
    short: 'Write the story of your work, looking back from the future, to imagine implications.',
    what:
      "A storytelling structure that helps you imagine the impacts of your work by looking back from the future. Designed for early-stage exploration, its narrative arc and prompts encourage open reflection while guiding you to consider the key implications of your actions or creation.",
    benefits: [
      'Craft a cohesive story that connects your work to the motivations behind it and the problem you set out to solve, while also acknowledging and taking responsibility for any negative impacts.',
      'Articulate both the outcomes you hope for and those that may emerge along the way.',
      'Engage your team or stakeholders in brainstorming through storytelling.',
    ],
    howTo:
      'Work individually or as a team. The story spine consists of six elements, each with a narrative prompt. Write from your own perspective while maintaining the distance of an outsider. Think beyond your initial expectations.',
    example: {
      title: 'Vaping devices',
      fields: {
        problem:
          "people were smoking cigarettes and could not quit. They were getting cancer and dying.",
        solution: 'we introduced a smokeless vaping device.',
        benefits:
          'many people were able to stop smoking cigarettes in the U.S. and globally. A majority of people who started vaping completely ended cigarette use.',
        harms: 'new non-smokers started vaping and became addicted to nicotine.',
        impacts:
          "more people got highly addicted to vaping than those who stopped smoking. In turn their well-being and ability to make autonomous choices were diminished. In turn our product began to be viewed negatively and faced new regulations.",
        mitigation:
          'steer away from marketing that would attract non-smokers, and focus on addiction reduction.',
      },
    },
  },
  'impacts-explorer': {
    name: 'Impacts Explorer',
    icon: Layers,
    tagline: 'Map the ripple effects of your actions.',
    stage: 'Explore',
    short:
      'Consider effects on people and society, and how related ethical values are promoted or degraded.',
    what:
      "A structured brainstorming method that helps you explore and visualize the full range of consequences that your action or creation may generate. Building on the Futures Wheel technique, it adds a focus on how your actions may promote or undermine key values.",
    benefits: [
      'Identify how your actions may affect tangible outcomes and core values.',
      'Clarify how specific choices lead to specific consequences and how they align with your intended goals.',
      'Anticipate potential outcomes so you can adapt your plans with foresight.',
      'Spark ideas, deepen reflections, and expand perspectives as you use other tools.',
    ],
    howTo:
      'Start by writing the action or creation you are considering at the central node. Build out in two directions. In-to-Out: start from your action and map outward to effects and values. Out-to-In: start from values and trace back to actions.',
    example: {
      title: 'Crowd-sourced content moderation for misinformation',
      action: 'Crowd-sourced content moderation for misinformation, with community voting',
      direct: [
        'Reaches community consensus between diverse groups',
        'Discourages reshares',
        'Only a minority gets published',
        'Takes longer to be published',
      ],
      secondary: [
        'Dampens virality',
        'Less people get exposed to misinformation',
        'It is accurate',
        'POSSIBLE HARM: does not prevent misinfo going viral',
        'HARM: other misinformation remains unaddressed',
      ],
      values: [
        'Promotes knowledge (benefit)',
        'Increases trust in platform',
        'Promotes ability to make informed choices (autonomy)',
        'Uninformed people can be manipulated (autonomy reduced)',
        'Uninformed people can be harmed (well-being reduced)',
      ],
    },
  },
  'ethics-frame': {
    name: 'Ethics Frame',
    icon: Frame,
    tagline: 'Outline ethical considerations and actions in response.',
    stage: 'Evaluate',
    short: 'A single worksheet to outline ethical considerations and actions in response.',
    what:
      'A practical framework to guide you to think through the benefits and harms of your actions or creations and the possible actions in response.',
    benefits: [
      'Gain awareness and clarity about the ethical impacts of your work.',
      'Consider responses, changes to your plan, to those potential impacts.',
      'Translate reflection into meaningful, value-driven actions.',
      'Structure productive conversations between diverse stakeholders.',
      'Outline the motivations and intended benefits of your work while showing intentionality around responsible risk mitigation.',
    ],
    howTo:
      'Work as an individual or a team. Start at the top and work down. Name the activity or creation. Think about benefits and harms and how those are distributed. Consider the values at play. Finally, contemplate what specific changes in your plans to integrate.',
    example: {
      title: 'Generative AI art tools',
      action: 'GenAI visual tools and the scraping of art from the internet',
      values: 'Justice, Dignity, Privacy',
      benefits:
        'Democratizes creativity. Saves time and energy from technical details, allowing focus on creation. Innovates Art. Future-proof art.',
      harms:
        "No opportunities for artists to provide meaningful consent. Corporations get more power over creative labor. Loss of potential revenues for artists. Fewer opportunities for artists' work. Ecological impacts.",
      who:
        'Big tech companies and executives (great benefit). AI artists (moderate benefit). Workers displaced by AI (moderate harm). Artists getting their work scraped (great harm). People living in places with ecological impact from data centers (great harm).',
      expand:
        'Create licensing framework to compensate and ask for consent. Opt-in over opt-out, train models only on art owners have opted-in. Learn more about this technology.',
      reduce:
        'Artist-first copyright protections focused on fair use. AI regulation including pivoting on opt-out rules. Dehumanize AI in how we talk about it.',
      bottomLine:
        'In order to preserve justice, fairness, and accountability, it is essential that we have tools to avoid data scraping, artist-first legislation, and social awareness. Do this via community organizing, advocacy work, artist-led research, tool creation.',
    },
  },
  'ethics-gauge': {
    name: 'Ethics Gauge',
    icon: Gauge,
    tagline: 'A practical template for ethical assessment at a glance.',
    stage: 'Evaluate',
    short:
      'Assess the implications of your actions on a more granular level across multiple considerations.',
    what:
      'A template that helps you see how the impacts of your actions and creations align with core ethical principles, through questions that are simple, systematic, and grounded in what you can actually observe.',
    benefits: [
      'Gain clarity on key ethical considerations and avoid overlooking important aspects.',
      'Strengthen your ability to recognize how the observable implications of your work align with core principles.',
      'Track ethical impact over time by embedding the Gauge into your workflow.',
      'Inform impact assessment with clear guidance on what to assess and why.',
      'Spark and facilitate dialogue by comparing assessments across perspectives.',
    ],
    howTo:
      'Assess your activity or creation by addressing four key questions. Consider the descriptions of related observable outcomes. Mark your assessment on the slider or note what else you need to know.',
    example: {
      title: 'New features promoting online engagement and interaction',
      action: 'New features promoting online engagement and interaction',
      notes:
        'Teens may have stronger reactions to social interactions. In general they have higher vulnerability to mental health issues. Need more research on how to prevent or mitigate. Focus on teens specifically.',
    },
  },
  'weighing-options': {
    name: 'Weighing Options',
    icon: Scale,
    tagline: 'Compare different options and make principled decisions.',
    stage: 'Decide',
    short:
      'A tool to compare different options, considering the effects on society and your organization.',
    what:
      'A structure to compare and choose between different courses of action by assessing key ethical risks along with organizational implications.',
    benefits: [
      'Gain clarity on the full range of implications for each option.',
      'Identify and clearly express how each option aligns with values and organizational priorities.',
      'Build shared awareness and understanding of the risks and consequences a decision will produce.',
      'Enable effective conversations with stakeholders.',
    ],
    howTo:
      'Begin by describing the current context. Then outline two or more courses of action and assess their societal impact, organizational impact, and barriers to implementation.',
    example: {
      title: 'Smart data governance for a small city',
      current:
        'Government is managing data but is overwhelmed with limited resources and difficult stakeholder relationships.',
      option1: 'Data managed by a large corporation in partnership with local government',
      option2: 'Data managed by a multi-stakeholder civic group from different sectors',
    },
  },
};

const VALUE_CARDS = [
  {
    name: 'Well-being',
    definition:
      'The flourishing of individuals and society, including health, happiness, and growth.',
    spectra: [
      [
        'Our creation contributes to physical or mental harm, promoting unhealthy habits or conditions.',
        'Our creation enhances physical and mental health, fostering habits that support well-being.',
      ],
      [
        'Our creation fosters dissatisfaction, stress, or discomfort, leading to a decline in happiness.',
        'Our creation cultivates joy and fulfillment, enhancing overall happiness and well-being.',
      ],
      [
        'Our creation stifles personal development, keeping individuals stagnant.',
        'Our creation encourages personal growth, learning, and empowerment.',
      ],
    ],
  },
  {
    name: 'Justice',
    definition: 'The fair distribution of benefits and burdens of (social) goods.',
    spectra: [
      [
        'Certain groups are more negatively impacted by the effects of our actions or creation.',
        'There are no disproportionately impacted people or groups.',
      ],
      [
        'Our creation would cause or perpetuate a bias or the marginalization of certain people or groups.',
        'Our creation would reduce current bias or marginalization.',
      ],
      [
        'Those who are harmed are also more marginalized in society. Those who benefit hold power and privilege.',
        'Those who are currently marginalized or have the greatest need benefit the most.',
      ],
    ],
  },
  {
    name: 'Trust',
    definition:
      'Optimistic and voluntary reliance on the competence and goodwill of another with respect to our interests.',
    spectra: [
      [
        'We do not consider the key needs, interests, and expectations of those impacted by our creation.',
        'We proactively take into account the key needs, interests, and expectations of those impacted.',
      ],
      [
        "People's expectations do not match the limitations and weaknesses of our creation.",
        "We are properly managing people's expectations about our actions and creation.",
      ],
      [
        'There are insufficient ways for those affected by our creation to be heard and keep us accountable.',
        'There are effective ways for those affected to be heard and keep us accountable.',
      ],
    ],
  },
  {
    name: 'Privacy',
    definition:
      "The flow of personal information which supports the individual's rights to control or protection from unwanted intrusion.",
    spectra: [
      [
        'Personal or meaningful information is exposed to inappropriate parties or the public.',
        'No personal or meaningful data is collected, or sufficient precautions are taken.',
      ],
      [
        'Once personal data is shared, people lose the ability to revoke access or control how their data is used.',
        'There is ample ability for people to revoke sharing or use permissions, without penalty.',
      ],
      [
        'If our creation is used broadly, expectations of privacy would be reduced.',
        'If our creation is used broadly, expectations of privacy would be increased.',
      ],
    ],
  },
  {
    name: 'Dignity',
    definition:
      'The inherent worth that every person possesses equally, which deserves recognition and respect.',
    spectra: [
      [
        'Our creation manipulates, coerces, or misleads people, or allows others to.',
        "Our creation does not coerce, manipulate, or mislead and limits others' ability to do so.",
      ],
      [
        'Our creation works for people with particular abilities and backgrounds, and shuts out others.',
        'Diverse needs, abilities, and cultural backgrounds are adequately and conscientiously accommodated.',
      ],
      [
        'People are treated as means for our needs and exploited through the use of our creation.',
        'Our actions and creations are designed to serve the needs of people, and ultimately empower them.',
      ],
    ],
  },
  {
    name: 'Virtues',
    definition: 'Habits or dispositions that guide us to act in morally good ways.',
    spectra: [
      [
        'Our creation discourages virtuous behaviors (integrity, empathy, generosity).',
        'Our creation promotes virtuous behaviors and self-improvement.',
      ],
      [
        'Our creation removes opportunities to exercise virtues or makes it more costly.',
        'Our actions create opportunities to exercise virtues, or make it easier to do so.',
      ],
      [
        "Our creation discourages reflection on the importance of one's actions.",
        "Our creation encourages reflection on the importance of one's actions, and responsibility.",
      ],
    ],
  },
  {
    name: 'Autonomy',
    definition: "The ability to govern oneself by one's own judgment.",
    spectra: [
      [
        'Our creation makes decisions for people that should be up to them.',
        'Our actions allow people to make meaningful and consequential choices for themselves.',
      ],
      [
        'Our creation encourages misuse, overuse, or dependence.',
        'Our creation promotes responsible use and independence.',
      ],
      [
        'If used widely, our creation would make it hard for people to opt out.',
        'Widespread use of our creation would bolster autonomy and preserve ability to opt out.',
      ],
    ],
  },
  {
    name: 'Responsibility',
    definition:
      "Awareness, care, and accountability regarding the effects of one's choices and actions.",
    spectra: [
      [
        'There are limited ways to monitor misuse of our creation, or the negative impacts.',
        'There are sufficient ways to monitor misuse of our creation or its negative impacts.',
      ],
      [
        'There are limited ways to take action on misuse or negative impacts.',
        'There are effective ways to take action on misuse or negative impacts.',
      ],
      [
        'There is no commitment to act to mitigate negative impacts.',
        'There is a commitment to act to mitigate negative impacts, with reasonable expectations of action.',
      ],
    ],
  },
  {
    name: 'Relationships',
    definition: 'A social association, connection, or affiliation between two or more persons.',
    spectra: [
      [
        'When using our creation, people understand, communicate, and connect poorly with one another.',
        'When using our creation, people understand, communicate, and connect well with one another.',
      ],
      [
        'Negative attitudes and behaviors (conflict, polarization, isolation) appear or worsen.',
        'Positive attitudes and behaviors (reciprocity, empathy, community) appear or improve.',
      ],
      [
        'The way our creation alters how people interact degrades the goods of their relationships.',
        'The way our creation alters how people interact preserves or enhances those relationships.',
      ],
    ],
  },
];

// ============================================================
// STORAGE — localStorage for personal, fetch() for shared
// ============================================================

const STORAGE_PREFIX = 'ethics_draft_';

function isBrowser() {
  return typeof window !== 'undefined';
}

function saveDraftLocally(tool, data) {
  if (!isBrowser()) return null;
  const id =
    data.id || `${tool}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const payload = { ...data, id, tool, updated: Date.now() };
  try {
    localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(payload));
    return id;
  } catch (e) {
    console.error('save failed', e);
    return null;
  }
}

function listDrafts() {
  if (!isBrowser()) return [];
  const drafts = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        try {
          drafts.push(JSON.parse(localStorage.getItem(key)));
        } catch {}
      }
    }
  } catch {}
  return drafts.sort((a, b) => (b.updated || 0) - (a.updated || 0));
}

function deleteDraft(id) {
  if (!isBrowser()) return false;
  try {
    localStorage.removeItem(STORAGE_PREFIX + id);
    return true;
  } catch {
    return false;
  }
}

async function shareDraft(data) {
  try {
    const res = await fetch('/api/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: body.error || 'Share failed. Please try again.' };
    }
    return { code: body.code };
  } catch (e) {
    console.error('share failed', e);
    return { error: 'Network error while sharing. Please try again.' };
  }
}

async function loadSharedDraft(code) {
  try {
    const res = await fetch(`/api/share/${encodeURIComponent(code.toUpperCase().trim())}`);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { error: body.error || 'Code not found or expired.' };
    return { data: body };
  } catch {
    return { error: 'Network error while loading. Please try again.' };
  }
}

// ============================================================
// SHARED UI BITS
// ============================================================

const Tag = ({ children, variant = 'navy' }) => {
  const variants = {
    navy: 'bg-[#1c3a5e] text-white',
    sand: 'bg-[#e8dfca] text-[#5c4a1f]',
    red: 'bg-[#8C1515] text-white',
    soft: 'bg-white/70 backdrop-blur text-[#1c3a5e] border border-[#1c3a5e]/15',
  };
  return (
    <span
      className={`${variants[variant]} text-[10px] tracking-[0.15em] uppercase font-medium px-2.5 py-1 rounded-sm`}
    >
      {children}
    </span>
  );
};

const TextField = ({ label, value, onChange, placeholder, rows = 3, hint }) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline justify-between">
      <label className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#1c3a5e]">
        {label}
      </label>
      {hint && <span className="text-[11px] text-stone-500 italic">{hint}</span>}
    </div>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-sm text-[15px] text-stone-800 placeholder:text-stone-400 focus:border-[#1c3a5e] focus:outline-none focus:ring-2 focus:ring-[#1c3a5e]/10 resize-y font-serif"
    />
  </div>
);

const SmallButton = ({ children, onClick, variant = 'default', icon: Icon }) => {
  const styles = {
    default:
      'bg-white text-[#1c3a5e] border border-[#1c3a5e]/30 hover:bg-[#1c3a5e] hover:text-white',
    primary: 'bg-[#1c3a5e] text-white hover:bg-[#0f2942]',
    red: 'bg-[#8C1515] text-white hover:bg-[#6b0f0f]',
    ghost: 'text-[#1c3a5e] hover:bg-[#1c3a5e]/5',
  };
  return (
    <button
      onClick={onClick}
      className={`${styles[variant]} text-[12px] tracking-[0.1em] uppercase font-medium px-3.5 py-2 rounded-sm transition-all duration-200 inline-flex items-center gap-2`}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
};

// ============================================================
// HOME VIEW
// ============================================================

const HomeView = ({ onNavigate }) => {
  const stages = [
    {
      stage: 'Explore',
      blurb: 'Become aware of and reflect on the ethical considerations at play.',
      quote:
        'We need to get some of the ethical considerations on the table and start the conversation.',
      tools: ['future-story', 'impacts-explorer'],
    },
    {
      stage: 'Evaluate',
      blurb: 'Assess the ethical impact of decisions and identify areas to adjust.',
      quote:
        'We would like to get a solid assessment of the implications of our actions and consider options in response.',
      tools: ['ethics-frame', 'ethics-gauge'],
    },
    {
      stage: 'Decide',
      blurb:
        'Deliberate on how to address ethical dilemmas and adapt your plans to drive toward key values.',
      quote: 'We want to compare options and make principled decisions on how to move forward.',
      tools: ['weighing-options'],
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4e9f0] via-[#e8f1f4] to-white" />
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#9bc4d4]/40 to-transparent blur-3xl" />
        <div className="relative px-10 md:px-16 py-20 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border-2 border-[#1c3a5e] relative">
                <div className="absolute inset-1.5 rounded-full border border-[#8C1515]" />
                <div className="absolute inset-3 rounded-full border border-[#1c3a5e]" />
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#1c3a5e] leading-tight">
                <div className="font-semibold">An Interactive Framework</div>
                <div className="text-[#1c3a5e]/60">Adapted from Stanford McCoy Family Center</div>
              </div>
            </div>
            <h1
              className="text-7xl md:text-8xl text-[#1c3a5e] leading-[0.95] mb-4"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              Ethics
              <br />
              Toolkit
            </h1>
            <p className="text-lg md:text-xl text-[#1c3a5e] font-bold tracking-[0.2em] uppercase mb-8">
              Put Values Into Action
            </p>
            <p className="text-stone-700 text-lg leading-relaxed font-serif max-w-2xl">
              Five worksheets that move ethics from theory into team practice.
              Explore impacts, evaluate decisions, and decide thoughtfully. Fill them in,
              save your drafts, share with collaborators.
            </p>
            <div className="mt-10 flex gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('ethics-frame', 'use')}
                className="bg-[#1c3a5e] text-white text-[13px] tracking-[0.15em] uppercase font-medium px-6 py-3.5 hover:bg-[#0f2942] transition-all rounded-sm inline-flex items-center gap-2"
              >
                Start with Ethics Frame
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('workspace')}
                className="bg-white text-[#1c3a5e] border border-[#1c3a5e]/30 text-[13px] tracking-[0.15em] uppercase font-medium px-6 py-3.5 hover:bg-[#1c3a5e] hover:text-white transition-all rounded-sm inline-flex items-center gap-2"
              >
                <Folder size={16} />
                Open Workspace
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 md:px-16">
        <div className="flex items-baseline justify-between mb-2 border-b border-[#1c3a5e]/15 pb-4">
          <h2
            className="text-3xl text-[#1c3a5e]"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
          >
            Select the tools that serve your needs
          </h2>
          <Tag variant="soft">Three stages</Tag>
        </div>
        <p className="text-stone-600 max-w-3xl mt-4 font-serif text-[15px]">
          In the early stages of your project or if you are new to considering ethics,
          you may need more exploratory tools. In later stages you need decision-making tools.
          Often, the value lies not only in completing the tools themselves but also in the
          reflection and discussions they inspire.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {stages.map((s, i) => (
            <div
              key={s.stage}
              className="border border-[#1c3a5e]/15 bg-white/60 backdrop-blur rounded-sm overflow-hidden"
            >
              <div className="bg-[#1c3a5e] text-white px-6 py-4 flex items-baseline justify-between">
                <div
                  className="text-2xl"
                  style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
                >
                  {s.stage}
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase opacity-60">
                  Stage 0{i + 1}
                </span>
              </div>
              <div className="p-6">
                <p className="text-stone-700 text-[14px] mb-4 font-serif italic">
                  &ldquo;{s.quote}&rdquo;
                </p>
                <p className="text-stone-600 text-[13px] mb-6 leading-relaxed">{s.blurb}</p>
                <div className="space-y-2">
                  {s.tools.map((toolKey) => {
                    const tool = TOOLS[toolKey];
                    const Icon = tool.icon;
                    return (
                      <button
                        key={toolKey}
                        onClick={() => onNavigate(toolKey, 'learn')}
                        className="w-full text-left p-3 border border-stone-200 hover:border-[#1c3a5e] hover:bg-[#1c3a5e]/5 transition-all rounded-sm flex items-center gap-3 group"
                      >
                        <Icon size={18} className="text-[#8C1515] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-[#1c3a5e]">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-stone-500 truncate">{tool.tagline}</div>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-stone-400 group-hover:text-[#1c3a5e] flex-shrink-0"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 md:px-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 p-8 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <Check size={18} className="text-[#1c3a5e]" />
              <h3
                className="text-xl text-[#1c3a5e]"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
              >
                The tools do
              </h3>
            </div>
            <ul className="space-y-3 text-[14px] text-stone-700 font-serif leading-relaxed">
              <li>
                <span className="font-semibold text-[#1c3a5e]">Help you confront key ethical issues</span>, so important concerns are not overlooked.
              </li>
              <li>
                <span className="font-semibold text-[#1c3a5e]">Challenge you to think beyond your intentions</span>, so you consider broader impacts and different perspectives.
              </li>
              <li>
                <span className="font-semibold text-[#1c3a5e]">Help you plan for mitigation</span>, so you can fulfill your responsibilities.
              </li>
              <li>
                <span className="font-semibold text-[#1c3a5e]">Facilitate group exploration</span>, so you create a space where it is safe to question, doubt, and disagree.
              </li>
              <li>
                <span className="font-semibold text-[#1c3a5e]">Promote accountability</span>, so you can make informed, responsible choices.
              </li>
            </ul>
          </div>

          <div className="bg-stone-100 border border-stone-200 p-8 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <X size={18} className="text-stone-500" />
              <h3
                className="text-xl text-stone-700"
                style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
              >
                But they do not
              </h3>
            </div>
            <ul className="space-y-3 text-[14px] text-stone-700 font-serif leading-relaxed">
              <li>
                <span className="font-semibold">Tell you the right thing to do.</span> They offer structure; you must define the key values and assess trade-offs.
              </li>
              <li>
                <span className="font-semibold">Provide a complete checklist of harms.</span> They give a starting point. You evaluate how these issues apply.
              </li>
              <li>
                <span className="font-semibold">Tell you how to measure impacts.</span> They suggest key areas, but you must develop your own assessment plan.
              </li>
              <li>
                <span className="font-semibold">Guarantee your work is ethical.</span> You are ultimately responsible for ensuring you consider all relevant aspects.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-10 md:px-16">
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('value-cards')}
            className="text-left p-8 bg-gradient-to-br from-[#1c3a5e] to-[#0f2942] text-white rounded-sm hover:scale-[1.01] transition-transform"
          >
            <Heart size={24} className="mb-4 text-[#d4e9f0]" />
            <h3
              className="text-2xl mb-2"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              Value Explainer Cards
            </h3>
            <p className="text-white/70 text-[14px] mb-4 font-serif">
              Nine value cards with definitions and observable spectra. Use them alongside any
              tool to make abstract values concrete.
            </p>
            <span className="text-[12px] tracking-[0.15em] uppercase inline-flex items-center gap-1">
              Browse cards <ChevronRight size={14} />
            </span>
          </button>

          <button
            onClick={() => onNavigate('workspace')}
            className="text-left p-8 bg-white border-2 border-[#1c3a5e]/15 rounded-sm hover:border-[#1c3a5e] transition-all"
          >
            <Folder size={24} className="mb-4 text-[#8C1515]" />
            <h3
              className="text-2xl mb-2 text-[#1c3a5e]"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              My Workspace
            </h3>
            <p className="text-stone-600 text-[14px] mb-4 font-serif">
              View your saved drafts. Load drafts shared by others with a code. Continue where
              you left off.
            </p>
            <span className="text-[12px] tracking-[0.15em] uppercase text-[#1c3a5e] inline-flex items-center gap-1">
              Open workspace <ChevronRight size={14} />
            </span>
          </button>
        </div>
      </section>

      <section className="px-10 md:px-16 pt-8 border-t border-stone-200">
        <p className="text-[11px] text-stone-500 leading-relaxed font-serif italic max-w-3xl">
          Independent adaptation of the <span className="not-italic font-semibold">Ethics Toolkit</span> by
          Manuela Travaglianti and Thomas Both, McCoy Family Center for Ethics in Society,
          Stanford University, used under{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="not-italic underline hover:text-[#1c3a5e]"
          >
            CC&nbsp;BY&nbsp;4.0
          </a>
          . Changes were made: the original PDF worksheets were adapted into an
          interactive web app with form-based input and a custom PDF export. Not
          affiliated with or endorsed by Stanford University.
        </p>
      </section>
    </div>
  );
};

// ============================================================
// EXAMPLE DISPLAY
// ============================================================

const ExampleDisplay = ({ toolKey, example }) => {
  if (toolKey === 'future-story') {
    return (
      <div className="space-y-4 text-[14px] font-serif leading-relaxed">
        <p>
          <span className="font-semibold italic text-[#1c3a5e]">Once upon a time</span>{' '}
          {example.fields.problem}
        </p>
        <p>
          <span className="font-semibold italic text-[#1c3a5e]">Until one day</span>{' '}
          {example.fields.solution}
        </p>
        <p>
          <span className="font-semibold italic text-[#1c3a5e]">And because of that</span>{' '}
          {example.fields.benefits}
        </p>
        <p>
          <span className="font-semibold italic text-[#8C1515]">But also</span>{' '}
          {example.fields.harms}
        </p>
        <p>
          <span className="font-semibold italic text-[#8C1515]">In turn</span> {example.fields.impacts}
        </p>
        <p>
          <span className="font-semibold italic text-[#1c3a5e]">
            One thing we could have done differently is
          </span>{' '}
          {example.fields.mitigation}
        </p>
      </div>
    );
  }
  if (toolKey === 'impacts-explorer') {
    return (
      <div className="space-y-4 text-[14px] font-serif">
        <p>
          <span className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e]">
            Central action:
          </span>{' '}
          {example.action}
        </p>
        <div>
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Direct effects
          </p>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {example.direct.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Secondary effects
          </p>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {example.secondary.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Values impacted
          </p>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {example.values.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (toolKey === 'ethics-frame') {
    return (
      <div className="grid md:grid-cols-2 gap-4 text-[14px] font-serif">
        <div className="md:col-span-2 bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Action / Creation
          </p>
          <p className="text-stone-800">{example.action}</p>
        </div>
        <div className="bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Values driving
          </p>
          <p className="text-stone-800">{example.values}</p>
        </div>
        <div className="bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Bottom line
          </p>
          <p className="text-stone-800 text-[13px]">{example.bottomLine}</p>
        </div>
        <div className="bg-emerald-50 p-4 border border-emerald-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-emerald-800 mb-1">
            Benefits
          </p>
          <p className="text-stone-800 text-[13px]">{example.benefits}</p>
        </div>
        <div className="bg-red-50 p-4 border border-red-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-red-800 mb-1">
            Harms
          </p>
          <p className="text-stone-800 text-[13px]">{example.harms}</p>
        </div>
        <div className="md:col-span-2 bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            Who is affected
          </p>
          <p className="text-stone-800 text-[13px]">{example.who}</p>
        </div>
        <div className="bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            How to expand benefits
          </p>
          <p className="text-stone-800 text-[13px]">{example.expand}</p>
        </div>
        <div className="bg-white p-4 border border-stone-200">
          <p className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e] mb-1">
            How to reduce harms
          </p>
          <p className="text-stone-800 text-[13px]">{example.reduce}</p>
        </div>
      </div>
    );
  }
  if (toolKey === 'ethics-gauge') {
    return (
      <div className="text-[14px] font-serif space-y-2">
        <p>
          <span className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e]">
            Action:
          </span>{' '}
          {example.action}
        </p>
        <p className="text-stone-700">{example.notes}</p>
        <p className="text-[12px] text-stone-500 italic mt-3">
          The full Gauge example walks across four questions (benefit, harm, fairness,
          empowerment), placing the action on a red-to-green slider for each. The interactive
          worksheet lets you do this for your own work.
        </p>
      </div>
    );
  }
  if (toolKey === 'weighing-options') {
    return (
      <div className="text-[14px] font-serif space-y-3">
        <p>
          <span className="font-semibold uppercase text-[11px] tracking-[0.15em] text-[#1c3a5e]">
            Current situation:
          </span>{' '}
          {example.current}
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div className="bg-white p-4 border border-stone-200">
            <p className="font-semibold text-[12px] text-[#1c3a5e] mb-1">Option 1</p>
            <p className="text-stone-700 text-[13px]">{example.option1}</p>
          </div>
          <div className="bg-white p-4 border border-stone-200">
            <p className="font-semibold text-[12px] text-[#1c3a5e] mb-1">Option 2</p>
            <p className="text-stone-700 text-[13px]">{example.option2}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// ============================================================
// LEARN PANEL
// ============================================================

const LearnPanel = ({ toolKey, onSwitch }) => {
  const tool = TOOLS[toolKey];
  const Icon = tool.icon;

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-[#1c3a5e] text-white flex items-center justify-center rounded-sm flex-shrink-0">
          <Icon size={28} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Tag>{tool.stage}</Tag>
          </div>
          <h1
            className="text-5xl text-[#1c3a5e] mb-2"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
          >
            {tool.name}
          </h1>
          <p className="text-stone-600 text-lg font-serif italic">{tool.tagline}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#d4e9f0]/40 to-transparent border-l-4 border-[#1c3a5e] pl-6 py-2">
        <p className="text-[13px] tracking-[0.15em] uppercase text-[#1c3a5e] font-semibold mb-1">
          What is this?
        </p>
        <p className="text-stone-800 text-[15px] font-serif leading-relaxed">{tool.what}</p>
      </div>

      <div>
        <h3
          className="text-2xl text-[#1c3a5e] mb-4"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
        >
          How might this benefit you?
        </h3>
        <ul className="space-y-3">
          {tool.benefits.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[#8C1515] font-bold text-[15px] mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-stone-700 text-[15px] font-serif leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3
          className="text-2xl text-[#1c3a5e] mb-4"
          style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
        >
          How to use it
        </h3>
        <p className="text-stone-700 text-[15px] font-serif leading-relaxed">{tool.howTo}</p>
      </div>

      <div className="bg-stone-50 border border-stone-200 p-8 rounded-sm">
        <div className="flex items-baseline justify-between mb-4">
          <h3
            className="text-2xl text-[#1c3a5e]"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
          >
            Worked example
          </h3>
          <Tag variant="sand">{tool.example.title}</Tag>
        </div>
        <ExampleDisplay toolKey={toolKey} example={tool.example} />
      </div>

      <div className="bg-[#1c3a5e] text-white p-8 rounded-sm flex items-center justify-between gap-6">
        <div>
          <p className="text-[12px] tracking-[0.15em] uppercase opacity-70 mb-1">
            Ready to use this on your work?
          </p>
          <p
            className="text-2xl"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}
          >
            Open the {tool.name} worksheet
          </p>
        </div>
        <button
          onClick={() => onSwitch('use')}
          className="bg-white text-[#1c3a5e] text-[13px] tracking-[0.15em] uppercase font-medium px-6 py-3.5 hover:bg-[#d4e9f0] transition-all rounded-sm inline-flex items-center gap-2 flex-shrink-0"
        >
          <Pencil size={16} />
          Start writing
        </button>
      </div>
    </div>
  );
};

// ============================================================
// USE PANELS (one per tool)
// ============================================================

const ActionHeader = ({ tool, draft, update }) => (
  <div className="bg-gradient-to-r from-[#1c3a5e] to-[#0f2942] text-white p-6 rounded-sm">
    <p className="text-[11px] tracking-[0.15em] uppercase opacity-70 mb-2">
      {tool.name} worksheet
    </p>
    <input
      value={draft.title || ''}
      onChange={(e) => update('title', e.target.value)}
      placeholder="Name this draft (e.g., AI Recruiter Review Q3)"
      className="w-full bg-transparent border-b border-white/30 pb-2 text-2xl font-serif italic placeholder:text-white/40 focus:outline-none focus:border-white"
    />
    <input
      value={draft.action || ''}
      onChange={(e) => update('action', e.target.value)}
      placeholder="What action / creation are you considering?"
      className="w-full bg-transparent border-b border-white/20 pb-2 mt-3 text-[15px] placeholder:text-white/40 focus:outline-none focus:border-white"
    />
  </div>
);

const FutureStoryUse = ({ draft, update }) => (
  <div className="space-y-5">
    <ActionHeader tool={TOOLS['future-story']} draft={draft} update={update} />
    <TextField label="Once upon a time" hint="The problem your work aims to address" value={draft.problem} onChange={(v) => update('problem', v)} placeholder="people were... they were experiencing..." rows={2} />
    <TextField label="Until one day" hint="Your creation in response" value={draft.solution} onChange={(v) => update('solution', v)} placeholder="we introduced..." rows={2} />
    <TextField label="And because of that" hint="How it benefits people and society" value={draft.benefits} onChange={(v) => update('benefits', v)} placeholder="many people were able to..." rows={3} />
    <TextField label="But also" hint="How it harms or may harm people and society" value={draft.harms} onChange={(v) => update('harms', v)} placeholder="some people started..." rows={3} />
    <TextField label="In turn" hint="Subsequent or unintended consequences, values impacted" value={draft.impacts} onChange={(v) => update('impacts', v)} placeholder="In turn... In turn..." rows={4} />
    <TextField label="One thing we could have done differently is" hint="Mitigations, research to better understand issues" value={draft.mitigation} onChange={(v) => update('mitigation', v)} placeholder="steer away from... focus on..." rows={3} />
  </div>
);

const ImpactsExplorerUse = ({ draft, update }) => {
  const updateList = (field, idx, value) => {
    const list = draft[field] ? [...draft[field]] : [];
    list[idx] = value;
    update(field, list);
  };
  const addItem = (field) => {
    const list = draft[field] ? [...draft[field]] : [];
    list.push('');
    update(field, list);
  };
  const removeItem = (field, idx) => {
    const list = draft[field] ? [...draft[field]] : [];
    list.splice(idx, 1);
    update(field, list);
  };

  const ListField = ({ field, label, hint, placeholder }) => {
    const items = draft[field] || [''];
    return (
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <label className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[#1c3a5e]">{label}</label>
          <span className="text-[11px] text-stone-500 italic">{hint}</span>
        </div>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={(e) => updateList(field, i, e.target.value)} placeholder={placeholder} className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-sm text-[14px] focus:border-[#1c3a5e] focus:outline-none font-serif" />
            {items.length > 1 && (
              <button onClick={() => removeItem(field, i)} className="text-stone-400 hover:text-[#8C1515] px-2"><X size={16} /></button>
            )}
          </div>
        ))}
        <button onClick={() => addItem(field)} className="text-[12px] text-[#1c3a5e] hover:text-[#0f2942] inline-flex items-center gap-1 mt-1"><Plus size={12} /> Add another</button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ActionHeader tool={TOOLS['impacts-explorer']} draft={draft} update={update} />
      <p className="text-stone-600 text-[13px] font-serif italic">
        Map outward from your action. List direct effects, then trace their secondary effects, then identify which values get promoted or degraded along each path.
      </p>
      <ListField field="direct" label="Direct effects on people and society" hint="Changes that flow immediately from the action" placeholder="e.g., users get faster results, recruiters save time" />
      <ListField field="secondary" label="Secondary effects" hint="Effects resulting from primary effects" placeholder="e.g., recruiter workloads shrink, hiring quality changes" />
      <ListField field="values" label="Values impacted (promoted or degraded)" hint="Reference the Value Cards: well-being, justice, trust, privacy, dignity, autonomy, etc." placeholder="e.g., Justice degraded if bias replicates; Privacy degraded if data scraped" />
      <TextField label="What pathways or tensions matter most?" hint="Synthesis notes" value={draft.synthesis} onChange={(v) => update('synthesis', v)} placeholder="The most concerning chain is..." rows={3} />
    </div>
  );
};

const EthicsFrameUse = ({ draft, update }) => (
  <div className="space-y-5">
    <ActionHeader tool={TOOLS['ethics-frame']} draft={draft} update={update} />
    <div className="grid md:grid-cols-2 gap-5">
      <TextField label="Values driving you" hint="Pull from the Value Cards" value={draft.values} onChange={(v) => update('values', v)} placeholder="Justice, Privacy, Autonomy..." rows={3} />
      <TextField label="How are these values impacted?" value={draft.valuesImpacted} onChange={(v) => update('valuesImpacted', v)} placeholder="Privacy: at risk because... Justice: degraded if..." rows={3} />
    </div>
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-emerald-50 p-1 rounded-sm">
        <TextField label="Benefits — how is it beneficial?" hint="Magnitude, scope, likelihood, duration" value={draft.benefits} onChange={(v) => update('benefits', v)} placeholder="Saves time, reaches more people, surfaces..." rows={5} />
      </div>
      <div className="bg-red-50 p-1 rounded-sm">
        <TextField label="Harms — how is it (potentially) harmful?" hint="Include unintended uses, malicious or not" value={draft.harms} onChange={(v) => update('harms', v)} placeholder="Risks bias, privacy, manipulation, displacement..." rows={5} />
      </div>
    </div>
    <TextField label="Who is affected, in what way?" hint="Plot groups on a spectrum: great benefit → great harm. Is the distribution fair?" value={draft.who} onChange={(v) => update('who', v)} placeholder="Great benefit: ...   Moderate harm: ...   Great harm: ..." rows={4} />
    <TextField label="Values prioritization" hint="What are you prioritizing over what, and why?" value={draft.prioritization} onChange={(v) => update('prioritization', v)} placeholder="Justice and dignity over efficiency, because..." rows={2} />
    <div className="grid md:grid-cols-2 gap-5">
      <TextField label="How to expand benefits" hint="Amplify and spread the benefits" value={draft.expand} onChange={(v) => update('expand', v)} placeholder="Surface non-traditional candidates, audit access..." rows={4} />
      <TextField label="How to reduce harms" hint="Prevent, mitigate, support those affected" value={draft.reduce} onChange={(v) => update('reduce', v)} placeholder="Human-in-loop, pre-launch audit, transparency..." rows={4} />
    </div>
    <div className="bg-[#1c3a5e]/5 border-l-4 border-[#1c3a5e] p-1 rounded-sm">
      <TextField label="Bottom line — what changes will you make?" hint="Your governance verdict, the deliverable" value={draft.bottomLine} onChange={(v) => update('bottomLine', v)} placeholder="Conditional approval. Required: 1. ... 2. ... 3. ..." rows={5} />
    </div>
  </div>
);

const GaugeSlider = ({ leftLabel, rightLabel, value, onChange }) => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between gap-4 text-[13px]">
      <p className="text-stone-700 flex-1 font-serif">{leftLabel}</p>
      <span className="text-[#1c3a5e] font-semibold">{value || 4}/7</span>
      <p className="text-stone-700 flex-1 text-right font-serif">{rightLabel}</p>
    </div>
    <input
      type="range"
      min="1"
      max="7"
      value={value || 4}
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full accent-[#1c3a5e]"
      style={{
        background: 'linear-gradient(to right, #8C1515 0%, #f4f4f0 50%, #15803d 100%)',
        height: '8px',
        borderRadius: '0',
        WebkitAppearance: 'none',
        appearance: 'none',
      }}
    />
  </div>
);

const EthicsGaugeUse = ({ draft, update }) => {
  const sections = [
    { key: 'beneficial', label: 'How is it beneficial?', rows: [
      ['Limited benefit. Existing alternatives are better.', 'Great benefit. More benefit than what exists.'],
      ['Benefit is limited to few select people.', 'Large numbers and multiple groups benefit.'],
      ['Unlikely to succeed. Benefit may not materialize.', 'Very likely the benefit will be achieved.'],
    ]},
    { key: 'harmful', label: 'How is it harmful?', rows: [
      ['Great harm to individuals. More harm than exists.', 'Limited harm. Less than what already exists.'],
      ['Large numbers and multiple groups harmed.', 'Harm is limited to few people.'],
      ['Harm is certain or impossible to prevent.', 'Harm unlikely. Likely to be prevented.'],
    ]},
    { key: 'fair', label: 'How fair is it?', rows: [
      ['Certain people or groups affected more than others.', 'All people and groups affected equally.'],
      ['Harmed are less advantaged. Benefitted hold privilege.', 'No more harm to disadvantaged. Benefitted have need.'],
      ['Burden on harmed is not justifiable.', 'Burden on harmed is acceptable and justifiable.'],
    ]},
    { key: 'empowering', label: 'How empowering is it?', rows: [
      ["People's ability to make informed choices reduced.", 'Ability to make informed choices unimpaired or increased.'],
      ["People's control over their lives is removed.", "People's control is retained or enhanced."],
      ['Removes freedom to do certain activities.', 'Does not coerce, manipulate, or pressure people.'],
    ]},
  ];

  return (
    <div className="space-y-6">
      <ActionHeader tool={TOOLS['ethics-gauge']} draft={draft} update={update} />
      {sections.map((s) => (
        <div key={s.key} className="bg-white border border-stone-200 p-6 rounded-sm">
          <h3 className="text-xl text-[#1c3a5e] mb-5" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>{s.label}</h3>
          <div className="space-y-5">
            {s.rows.map((row, i) => (
              <GaugeSlider key={i} leftLabel={row[0]} rightLabel={row[1]} value={(draft[s.key] || {})[i]} onChange={(v) => update(s.key, { ...(draft[s.key] || {}), [i]: v })} />
            ))}
          </div>
          <textarea
            value={(draft.notes || {})[s.key] || ''}
            onChange={(e) => update('notes', { ...(draft.notes || {}), [s.key]: e.target.value })}
            placeholder="How might we measure this? What else do we need to investigate?"
            rows={2}
            className="w-full mt-4 px-3 py-2 bg-stone-50 border border-stone-200 rounded-sm text-[13px] font-serif italic focus:border-[#1c3a5e] focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
};

const WeighingOptionsUse = ({ draft, update }) => {
  const updateOpt = (i, field, value) => {
    const opts = draft.options ? [...draft.options] : [{}, {}];
    opts[i] = { ...(opts[i] || {}), [field]: value };
    update('options', opts);
  };
  const addOption = () => {
    const opts = draft.options ? [...draft.options] : [{}, {}];
    opts.push({});
    update('options', opts);
  };
  const removeOption = (i) => {
    const opts = draft.options ? [...draft.options] : [{}, {}];
    opts.splice(i, 1);
    update('options', opts);
  };
  const options = draft.options || [{}, {}];

  return (
    <div className="space-y-6">
      <ActionHeader tool={TOOLS['weighing-options']} draft={draft} update={update} />
      <TextField label="Current situation" hint="The status quo and context for the decision" value={draft.current} onChange={(v) => update('current', v)} placeholder="We currently... The context is..." rows={3} />
      <div className="grid md:grid-cols-2 gap-5">
        {options.map((opt, i) => (
          <div key={i} className="bg-white border border-stone-200 p-5 rounded-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <h3 className="text-lg text-[#1c3a5e]" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>Option {i + 1}</h3>
              {options.length > 2 && (
                <button onClick={() => removeOption(i)} className="text-stone-400 hover:text-[#8C1515]"><Trash2 size={14} /></button>
              )}
            </div>
            <input value={opt.name || ''} onChange={(e) => updateOpt(i, 'name', e.target.value)} placeholder="Describe this option" className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-sm text-[14px] font-serif focus:border-[#1c3a5e] focus:outline-none" />
            <TextField label="Societal — benefits" value={opt.socBenefits} onChange={(v) => updateOpt(i, 'socBenefits', v)} rows={2} placeholder="Who benefits, how" />
            <TextField label="Societal — harms" value={opt.socHarms} onChange={(v) => updateOpt(i, 'socHarms', v)} rows={2} placeholder="Who is harmed, how" />
            <TextField label="Organizational impact (internal / external)" value={opt.orgImpact} onChange={(v) => updateOpt(i, 'orgImpact', v)} rows={2} placeholder="Resources, revenue, reputation, compliance" />
            <TextField label="Obstacles (uncertainties / contingencies)" value={opt.obstacles} onChange={(v) => updateOpt(i, 'obstacles', v)} rows={2} placeholder="What could go wrong, plan B" />
            <TextField label="Prioritizing (values / other factors)" value={opt.priorities} onChange={(v) => updateOpt(i, 'priorities', v)} rows={2} placeholder="Trust, Public safety, Civic Participation..." />
          </div>
        ))}
      </div>
      <button onClick={addOption} className="text-[12px] text-[#1c3a5e] inline-flex items-center gap-1 hover:text-[#0f2942]"><Plus size={14} /> Add another option</button>
      <div className="bg-[#1c3a5e]/5 border-l-4 border-[#1c3a5e] p-1 rounded-sm">
        <TextField label="Future direction" hint="Which option will you pursue, and why? Or what else do you need to learn?" value={draft.future} onChange={(v) => update('future', v)} placeholder="We will pursue Option X because..." rows={4} />
      </div>
    </div>
  );
};

const USE_PANELS = {
  'future-story': FutureStoryUse,
  'impacts-explorer': ImpactsExplorerUse,
  'ethics-frame': EthicsFrameUse,
  'ethics-gauge': EthicsGaugeUse,
  'weighing-options': WeighingOptionsUse,
};

// ============================================================
// TOOL VIEW (wraps Learn + Use)
// ============================================================

const ToolView = ({ toolKey, mode, setMode, loadedDraft, onSaved }) => {
  const tool = TOOLS[toolKey];
  const [draft, setDraft] = useState(loadedDraft || {});
  const [savedStatus, setSavedStatus] = useState(null);
  const [shareCode, setShareCode] = useState(null);
  const [shareError, setShareError] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (loadedDraft) setDraft(loadedDraft);
  }, [loadedDraft]);

  const update = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));

  const UsePanel = USE_PANELS[toolKey];

  const handleSave = () => {
    if (!draft.title && !draft.action) {
      setSavedStatus('Add a title or action first');
      setTimeout(() => setSavedStatus(null), 2000);
      return;
    }
    const id = saveDraftLocally(toolKey, draft);
    if (id) {
      setDraft((prev) => ({ ...prev, id }));
      setSavedStatus('Saved');
      if (onSaved) onSaved();
      setTimeout(() => setSavedStatus(null), 2000);
    } else {
      setSavedStatus('Save failed');
      setTimeout(() => setSavedStatus(null), 2000);
    }
  };

  const handleShare = async () => {
    setShareError(null);
    const res = await shareDraft({ ...draft, tool: toolKey });
    if (res.code) {
      setShareCode(res.code);
    } else {
      setShareError(res.error);
    }
  };

  const copyShareCode = () => {
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const { downloadToolkitPdf } = await import('./pdf/EthicsToolkitPdf.jsx');
      await downloadToolkitPdf({ toolKey, draft: { ...draft, tool: toolKey } });
      setSavedStatus('PDF downloaded');
    } catch (e) {
      console.error('PDF export failed', e);
      setSavedStatus('PDF export failed');
    } finally {
      setExporting(false);
      setTimeout(() => setSavedStatus(null), 2500);
    }
  };

  return (
    <div>
      <div className="border-b border-stone-200 mb-8 -mx-10 md:-mx-16 px-10 md:px-16 sticky top-0 bg-white/95 backdrop-blur z-30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-0">
            <button onClick={() => setMode('learn')} className={`px-6 py-4 text-[13px] tracking-[0.15em] uppercase font-medium border-b-2 transition-all inline-flex items-center gap-2 ${mode === 'learn' ? 'border-[#1c3a5e] text-[#1c3a5e]' : 'border-transparent text-stone-500 hover:text-[#1c3a5e]'}`}>
              <BookOpen size={14} /> Learn
            </button>
            <button onClick={() => setMode('use')} className={`px-6 py-4 text-[13px] tracking-[0.15em] uppercase font-medium border-b-2 transition-all inline-flex items-center gap-2 ${mode === 'use' ? 'border-[#1c3a5e] text-[#1c3a5e]' : 'border-transparent text-stone-500 hover:text-[#1c3a5e]'}`}>
              <Pencil size={14} /> Use it
            </button>
          </div>
          {mode === 'use' && (
            <div className="flex items-center gap-2 py-3">
              {savedStatus && <span className="text-[12px] text-emerald-700 italic mr-2">{savedStatus}</span>}
              <SmallButton onClick={handleExport} icon={Download}>{exporting ? 'Generating…' : 'Download PDF'}</SmallButton>
              <SmallButton onClick={handleShare} icon={Share2}>Share</SmallButton>
              <SmallButton onClick={handleSave} icon={Save} variant="primary">Save Draft</SmallButton>
            </div>
          )}
        </div>
      </div>

      {shareError && (
        <div className="mb-6 -mt-2 bg-[#8C1515]/5 border border-[#8C1515]/25 text-[#8C1515] text-[13px] px-4 py-3 rounded-sm flex items-start gap-2">
          <span className="font-serif">{shareError}</span>
          <button onClick={() => setShareError(null)} className="ml-auto text-[#8C1515]/60 hover:text-[#8C1515] flex-shrink-0"><X size={14} /></button>
        </div>
      )}

      {shareCode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl text-[#1c3a5e]" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>Share this draft</h3>
              <button onClick={() => setShareCode(null)} className="text-stone-400 hover:text-stone-700"><X size={20} /></button>
            </div>
            <p className="text-stone-600 text-[14px] mb-6 font-serif">
              Send this code to your collaborators. They can open the Workspace and paste it to load your draft.
            </p>
            <div className="bg-stone-50 border border-stone-200 p-4 mb-4 flex items-center justify-between">
              <code className="text-2xl font-mono text-[#1c3a5e] tracking-widest">{shareCode}</code>
              <button onClick={copyShareCode} className="text-[#1c3a5e] hover:text-[#0f2942] inline-flex items-center gap-1 text-[12px] tracking-[0.1em] uppercase">
                {shareCopied ? <Check size={14} /> : <Copy size={14} />} {shareCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[11px] text-stone-500 italic">
              Code expires after 90 days. Anyone with the code can view this draft.
            </p>
          </div>
        </div>
      )}

      {mode === 'learn' ? (
        <LearnPanel toolKey={toolKey} onSwitch={setMode} />
      ) : (
        <div className="pb-32">
          <UsePanel draft={draft} update={update} />
        </div>
      )}
    </div>
  );
};

// ============================================================
// VALUE CARDS VIEW
// ============================================================

const ValueCardsView = () => {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="space-y-8 pb-20">
      <div>
        <Tag>Appendix</Tag>
        <h1 className="text-5xl text-[#1c3a5e] mt-3 mb-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>Value Explainer Cards</h1>
        <p className="text-stone-600 text-lg font-serif max-w-3xl">
          Nine cards that define ethical values through observable spectra. Use them alongside any tool to make abstract values concrete and actionable. Click a card to see its full spectrum.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {VALUE_CARDS.map((card, i) => (
          <button key={card.name} onClick={() => setExpanded(expanded === i ? null : i)} className={`text-left bg-white border-2 transition-all rounded-sm p-6 ${expanded === i ? 'border-[#1c3a5e] shadow-lg col-span-full' : 'border-stone-200 hover:border-[#1c3a5e]/40'}`}>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-2xl text-[#1c3a5e]" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>{card.name}</h3>
              <span className="text-[10px] tracking-[0.15em] uppercase text-stone-400">0{i + 1}</span>
            </div>
            <p className="text-stone-600 text-[14px] font-serif italic leading-snug mb-4">{card.definition}</p>
            {expanded === i && (
              <div className="mt-6 space-y-5 pt-6 border-t border-stone-200">
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#1c3a5e] font-semibold">How might this be impacted?</p>
                {card.spectra.map((row, j) => (
                  <div key={j} className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 border-l-4 border-[#8C1515] p-3">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#8C1515] mb-1 font-semibold">Degrading</p>
                      <p className="text-[13px] text-stone-700 font-serif">{row[0]}</p>
                    </div>
                    <div className="bg-emerald-50 border-l-4 border-emerald-700 p-3">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-emerald-800 mb-1 font-semibold">Promoting</p>
                      <p className="text-[13px] text-stone-700 font-serif">{row[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {expanded !== i && (
              <span className="text-[11px] tracking-[0.15em] uppercase text-stone-400 inline-flex items-center gap-1">Expand <ChevronRight size={12} /></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// WORKSPACE VIEW
// ============================================================

const WorkspaceView = ({ drafts, refreshDrafts, onLoad }) => {
  const [shareInput, setShareInput] = useState('');
  const [loadError, setLoadError] = useState(null);

  const handleLoadShared = async () => {
    setLoadError(null);
    if (!shareInput.trim()) return;
    const res = await loadSharedDraft(shareInput);
    if (res.error || !res.data) {
      setLoadError(res.error || 'Code not found or expired. Check the code and try again.');
      return;
    }
    onLoad(res.data.tool, res.data);
    setShareInput('');
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this draft?')) return;
    deleteDraft(id);
    refreshDrafts();
  };

  return (
    <div className="space-y-10 pb-20">
      <div>
        <Tag>Workspace</Tag>
        <h1 className="text-5xl text-[#1c3a5e] mt-3 mb-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>Your saved drafts</h1>
        <p className="text-stone-600 text-lg font-serif max-w-3xl">
          Drafts you save appear here (stored locally in your browser). Paste a share code to open a draft someone else sent you.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#1c3a5e]/5 to-transparent border border-[#1c3a5e]/15 p-6 rounded-sm">
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#1c3a5e] font-semibold mb-3">Load a shared draft</p>
        <div className="flex gap-2">
          <input value={shareInput} onChange={(e) => setShareInput(e.target.value)} placeholder="Enter 6-character share code (e.g., A3F9X7)" className="flex-1 px-4 py-3 bg-white border border-stone-300 rounded-sm text-[15px] font-mono tracking-widest focus:border-[#1c3a5e] focus:outline-none" />
          <SmallButton onClick={handleLoadShared} variant="primary" icon={Inbox}>Load</SmallButton>
        </div>
        {loadError && <p className="text-[12px] text-[#8C1515] mt-2 italic">{loadError}</p>}
      </div>

      <div>
        <h2 className="text-2xl text-[#1c3a5e] mb-4 border-b border-stone-200 pb-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>My drafts ({drafts.length})</h2>
        {drafts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-stone-300 rounded-sm">
            <Inbox size={32} className="mx-auto text-stone-300 mb-3" />
            <p className="text-stone-500 font-serif italic">No drafts yet. Open any tool and click Save Draft to keep your work here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {drafts.map((d) => {
              const tool = TOOLS[d.tool];
              if (!tool) return null;
              const Icon = tool.icon;
              return (
                <div key={d.id} className="bg-white border border-stone-200 rounded-sm p-5 hover:border-[#1c3a5e] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1c3a5e]/10 text-[#1c3a5e] rounded-sm flex items-center justify-center flex-shrink-0"><Icon size={18} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] tracking-[0.15em] uppercase text-stone-500">{tool.name}</p>
                      <h3 className="text-lg font-serif italic text-[#1c3a5e] truncate">{d.title || 'Untitled draft'}</h3>
                      <p className="text-[13px] text-stone-600 truncate font-serif">{d.action || 'No action set'}</p>
                      <p className="text-[11px] text-stone-400 mt-1">Updated {new Date(d.updated).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <button onClick={() => handleDelete(d.id)} className="text-stone-400 hover:text-[#8C1515] text-[11px] tracking-[0.1em] uppercase inline-flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                    <SmallButton onClick={() => onLoad(d.tool, d)} variant="primary">Open</SmallButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ROOT APP
// ============================================================

export default function EthicsToolkitApp() {
  const [view, setView] = useState('home');
  const [mode, setMode] = useState('learn');
  const [drafts, setDrafts] = useState([]);
  const [loadedDraft, setLoadedDraft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDrafts(listDrafts());
  }, []);

  const refreshDrafts = () => setDrafts(listDrafts());

  const navigate = (newView, newMode = 'learn', draft = null) => {
    setView(newView);
    setMode(newMode);
    setLoadedDraft(draft);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadDraft = (toolKey, draft) => navigate(toolKey, 'use', draft);

  const NAV_ITEMS = [
    { key: 'home', label: 'Home', icon: Home },
    ...Object.entries(TOOLS).map(([k, t]) => ({ key: k, label: t.name, icon: t.icon })),
    { key: 'value-cards', label: 'Value Cards', icon: Heart },
    { key: 'workspace', label: 'Workspace', icon: Folder },
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-[#fbfaf6]" />;
  }

  return (
    <div className="min-h-screen text-stone-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="px-6 md:px-10 py-3 flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border-2 border-[#1c3a5e] relative">
              <div className="absolute inset-1 rounded-full border border-[#8C1515]" />
              <div className="absolute inset-2 rounded-full border border-[#1c3a5e]" />
            </div>
            <div className="leading-tight">
              <div className="text-[#1c3a5e] text-lg" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 500 }}>Ethics Toolkit</div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-stone-500">Put Values Into Action</div>
            </div>
          </button>
          <div className="hidden md:flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-stone-500"><span>Interactive Framework</span></div>
        </div>
        <nav className="border-t border-stone-100 bg-stone-50/60 backdrop-blur overflow-x-auto">
          <div className="px-6 md:px-10 flex gap-1">
            {NAV_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              const active = view === item.key;
              return (
                <button key={item.key} onClick={() => navigate(item.key)} className={`px-3 py-3 text-[12px] tracking-[0.1em] uppercase font-medium whitespace-nowrap inline-flex items-center gap-2 border-b-2 transition-all ${active ? 'border-[#1c3a5e] text-[#1c3a5e]' : 'border-transparent text-stone-500 hover:text-[#1c3a5e]'}`}>
                  <ItemIcon size={13} /> {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="px-10 md:px-16 py-12 max-w-7xl mx-auto">
        {view === 'home' && <HomeView onNavigate={navigate} />}
        {view === 'value-cards' && <ValueCardsView />}
        {view === 'workspace' && <WorkspaceView drafts={drafts} refreshDrafts={refreshDrafts} onLoad={handleLoadDraft} />}
        {view in TOOLS && <ToolView key={view + (loadedDraft?.id || '')} toolKey={view} mode={mode} setMode={setMode} loadedDraft={loadedDraft} onSaved={refreshDrafts} />}
      </main>
    </div>
  );
}
