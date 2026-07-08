import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getInterviewResult, evaluateInterview } from '../api';

const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`;
const spin = keyframes`to{transform:rotate(360deg)}`;
const fillArc = keyframes`from{stroke-dashoffset:283}`;

const Page = styled.div`
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 3rem;
  &::before {
    content:'';
    position:fixed; bottom:-20%; right:-10%;
    width:500px; height:500px;
    background: radial-gradient(circle, rgba(45,212,160,0.05) 0%, transparent 70%);
    pointer-events:none;
  }
`;

const Wrap = styled.div`
  width: 100%; max-width: 700px;
  animation: ${fadeUp} 0.4s ease forwards;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  h1 { font-family: var(--font-display); font-size: 28px; font-weight: 700; margin-bottom: 4px; }
  p { font-size: 14px; color: var(--text-secondary); }
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  @media(max-width:500px){ flex-direction:column; text-align:center; gap:1rem; }
`;

const RingWrap = styled.div`
  position: relative; flex-shrink: 0;
  width: 100px; height: 100px;
  svg { transform: rotate(-90deg); }
`;

const RingBg = styled.circle`
  fill: none; stroke: var(--border); stroke-width: 8;
`;

const RingFill = styled.circle`
  fill: none;
  stroke: ${p => p.score >= 75 ? 'var(--green)' : p.score >= 50 ? 'var(--amber)' : 'var(--red)'};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: ${p => 283 - (283 * p.score / 100)};
  animation: ${fillArc} 1s ease forwards;
  transition: stroke-dashoffset 1s ease;
`;

const RingLabel = styled.div`
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-family: var(--font-mono);
  font-size: 20px; font-weight: 500;
  color: var(--text-primary);
  span { font-size: 10px; color: var(--text-muted); margin-top: -2px; }
`;

const ScoreInfo = styled.div`
  flex: 1;
  h2 { font-family: var(--font-display); font-size: 20px; font-weight: 600; margin-bottom: 6px; }
  p { font-size: 14px; color: var(--text-secondary); line-height: 1.5; }
`;

const StatRow = styled.div`
  display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;
`;

const Stat = styled.div`
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 100px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  span { color: var(--text-primary); font-weight: 500; }
`;

const SectionTitle = styled.h3`
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 1.5rem 0 0.6rem;
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 7px;
`;

const Tag = styled.div`
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 100px;
  background: ${p =>
    p.type === 'strength' ? 'rgba(45,212,160,0.1)' :
    p.type === 'weakness' ? 'rgba(255,92,92,0.1)' :
    'rgba(108,99,255,0.1)'};
  color: ${p =>
    p.type === 'strength' ? 'var(--green)' :
    p.type === 'weakness' ? 'var(--red)' :
    'var(--accent)'};
  border: 1px solid ${p =>
    p.type === 'strength' ? 'rgba(45,212,160,0.25)' :
    p.type === 'weakness' ? 'rgba(255,92,92,0.25)' :
    'rgba(108,99,255,0.25)'};
`;

const EmptyNote = styled.div`
  font-size: 13px; color: var(--text-muted); font-style: italic;
`;

const QACard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.1rem 1.25rem;
  margin-bottom: 10px;
  animation: ${fadeUp} 0.4s ease forwards;
  animation-delay: ${p => p.idx * 0.06}s;
  opacity: 0;
`;

const QText = styled.div`
  font-size: 14px; font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-primary);
`;

const ScorePills = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px;
`;

const Pill = styled.span`
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 100px;
  background: ${p =>
    p.level === 'good' ? 'rgba(45,212,160,0.12)' :
    p.level === 'mid' ? 'rgba(245,166,35,0.12)' :
    'rgba(255,92,92,0.12)'};
  color: ${p =>
    p.level === 'good' ? 'var(--green)' :
    p.level === 'mid' ? 'var(--amber)' :
    'var(--red)'};
`;

const BarWrap = styled.div`
  height: 4px;
  background: var(--bg-surface);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 6px;
`;

const Bar = styled.div`
  height: 100%;
  border-radius: 2px;
  width: ${p => p.pct}%;
  background: ${p =>
    p.pct >= 75 ? 'var(--green)' :
    p.pct >= 50 ? 'var(--amber)' :
    'var(--red)'};
  transition: width 1s ease;
`;

const LoadingWrap = styled.div`
  display: flex; flex-direction: column; align-items: center; gap: 16px;
  padding: 4rem 0;
  p { font-size: 14px; color: var(--text-secondary); }
`;

const Spinner = styled.div`
  width: 36px; height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const RestartBtn = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 13px;
  background: transparent;
  border: 1px solid var(--border-bright);
  color: var(--text-secondary);
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px; font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-glow); }
`;

function scoreLevel(s) {
  if (s >= 75) return 'good';
  if (s >= 50) return 'mid';
  return 'bad';
}

function getVerdict(score) {
  if (score >= 80) return { label: 'Excellent performance', desc: 'You demonstrated strong command of the concepts.' };
  if (score >= 65) return { label: 'Good performance', desc: 'Solid understanding with room to sharpen some areas.' };
  if (score >= 50) return { label: 'Decent attempt', desc: 'You covered the basics — dive deeper on the weak spots.' };
  return { label: 'Keep practising', desc: 'Focus on the fundamentals and try again.' };
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, level } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null);
  const [evalData, setEvalData] = useState(null);

  useEffect(() => {
  if (!sessionId) { navigate('/'); return; }
  setLoading(true);
  setError('');
  setResultData(null);
  setEvalData(null);
  fetchResults();
  // eslint-disable-next-line
}, [sessionId]);

  const fetchResults = async () => {
    try {
      const result = await getInterviewResult(sessionId);
      setResultData(result);
      const responses = (result.questions_and_answers || []).map(r => ({
        question: r.question_text,
        expected: r.expected_answer,
        user_answer: r.user_answer,
      }));
      if (responses.length === 0) {
        setEvalData({ overall_score: 0, details: [], strengths: [], weaknesses: [], suggestions: ['No answers were recorded.'] });
      } else {
        const ev = await evaluateInterview(responses);
        setEvalData(ev);
      }
    } catch (e) {
      setError('Could not load results. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  if (!sessionId) return null;

  if (loading) return (
    <Page>
      <Wrap>
        <LoadingWrap>
          <Spinner />
          <p>Evaluating your answers...</p>
        </LoadingWrap>
      </Wrap>
    </Page>
  );

  if (error) return (
    <Page>
      <Wrap>
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--red)' }}>{error}</div>
        <RestartBtn onClick={() => navigate('/',)}>← Go back</RestartBtn>
      </Wrap>
    </Page>
  );

  const score = evalData?.overall_score ?? 0;
  const verdict = getVerdict(score);
  const answered = resultData?.answered_questions ?? 0;
  const total = resultData?.total_questions ?? 0;

  return (
    <Page>
      <Wrap>
        <Header>
          <h1>Interview report</h1>
          <p style={{ textTransform: 'capitalize' }}>{level} level · {answered} of {total} questions answered</p>
        </Header>

        <ScoreSection>
          <RingWrap>
            <svg viewBox="0 0 100 100" width="100" height="100">
              <RingBg cx="50" cy="50" r="45" />
              <RingFill cx="50" cy="50" r="45" score={score} />
            </svg>
            <RingLabel>
              {score.toFixed(0)}%
              <span>score</span>
            </RingLabel>
          </RingWrap>
          <ScoreInfo>
            <h2>{verdict.label}</h2>
            <p>{verdict.desc}</p>
            <StatRow>
              <Stat>answered <span>{answered}/{total}</span></Stat>
              <Stat>level <span style={{ textTransform: 'capitalize' }}>{level}</span></Stat>
            </StatRow>
          </ScoreInfo>
        </ScoreSection>

        <SectionTitle>Strengths</SectionTitle>
        <TagRow>
          {evalData?.strengths?.length
            ? evalData.strengths.map((s, i) => <Tag key={i} type="strength">{s}</Tag>)
            : <EmptyNote>None identified</EmptyNote>}
        </TagRow>

        <SectionTitle>Areas to improve</SectionTitle>
        <TagRow>
          {evalData?.weaknesses?.length
            ? evalData.weaknesses.map((w, i) => <Tag key={i} type="weakness">{w}</Tag>)
            : <EmptyNote>No weak areas — great job!</EmptyNote>}
        </TagRow>

        <SectionTitle>Suggestions</SectionTitle>
        <TagRow>
          {evalData?.suggestions?.map((s, i) => <Tag key={i} type="suggestion">{s}</Tag>)}
        </TagRow>

        <SectionTitle>Question breakdown</SectionTitle>
        {evalData?.details?.map((d, i) => {
          const pct = d.score * 100;
          const semPct = d.semantic_score ?? 0;
          const keyPct = d.keyword_score ?? 0;
          return (
            <QACard key={i} idx={i}>
              <QText>Q{i + 1}: {d.question}</QText>
              <ScorePills>
                <Pill level={scoreLevel(pct)}>Overall {pct.toFixed(1)}%</Pill>
                <Pill level={scoreLevel(semPct)}>Semantic {semPct.toFixed(1)}%</Pill>
                <Pill level={scoreLevel(keyPct)}>Keywords {keyPct.toFixed(1)}%</Pill>
              </ScorePills>
              <BarWrap><Bar pct={pct} /></BarWrap>
            </QACard>
          );
        })}

        <RestartBtn onClick={() => navigate('/')}>← Start a new interview</RestartBtn>
      </Wrap>
    </Page>
  );
}
