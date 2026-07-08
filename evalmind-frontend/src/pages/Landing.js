import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { startInterview } from '../api';
import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: fixed;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Hero = styled.div`
  text-align: center;
  max-width: 580px;
  width: 100%;
  animation: ${fadeUp} 0.5s ease forwards;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid var(--accent-dim);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Dot = styled.span`
  width: 6px; height: 6px;
  background: var(--accent);
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
`;

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  span { color: var(--accent); }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.7;
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 1.5rem;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const LevelCard = styled.button`
  background: ${p => p.selected ? 'var(--bg-card-hover)' : 'var(--bg-card)'};
  border: 1px solid ${p => p.selected ? 'var(--accent)' : 'var(--border)'};
  border-radius: var(--radius);
  padding: 1.25rem 1rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  &:hover { border-color: var(--accent-dim); background: var(--bg-card-hover); }
  ${p => p.selected && `box-shadow: 0 0 0 1px var(--accent), 0 0 20px var(--accent-glow);`}
`;

const LevelIcon = styled.div`
  font-size: 28px;
  margin-bottom: 8px;
`;

const LevelTitle = styled.div`
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const LevelDesc = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
`;

const StartBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: ${p => p.disabled ? 'var(--bg-card)' : 'var(--accent)'};
  color: ${p => p.disabled ? 'var(--text-muted)' : '#fff'};
  border: 1px solid ${p => p.disabled ? 'var(--border)' : 'var(--accent)'};
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  letter-spacing: 0.02em;
  &:hover:not(:disabled) { background: #5a52e0; transform: translateY(-1px); box-shadow: 0 8px 24px var(--accent-glow); }
`;

const ErrorMsg = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: var(--red);
  background: var(--red-dim);
  border: 1px solid rgba(255,92,92,0.2);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
`;

const Spinner = styled.span`
  display: inline-block;
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 8px;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const levels = [
  { id: 'beginner', icon: '🌱', title: 'Beginner', desc: 'Core concepts & fundamentals' },
  { id: 'intermediate', icon: '⚡', title: 'Intermediate', desc: 'Applied knowledge & problem solving' },
  { id: 'advanced', icon: '🚀', title: 'Advanced', desc: 'Deep expertise & system design' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async () => {
    if (!selected) return;
    setLoading(true);
    setError('');
    try {
      const data = await startInterview(selected);
      if (data.error) { setError(data.error); setLoading(false); return; }
      navigate('/interview', { state: { sessionData: data, level: selected } });
    } catch (e) {
      setError('Cannot connect to server. Make sure FastAPI is running on localhost:8000.');
      setLoading(false);
    }
  };

  return (
    <Page>
      <Hero>
        <Tag><Dot /> AI-powered interview</Tag>
        <Title>Ace your next<br /><span>technical interview</span></Title>
        <Subtitle>
          Practice with an AI interviewer that listens to your answers,
          understands your intent, and gives you real feedback — not just keyword matching.
        </Subtitle>
        <LevelGrid>
          {levels.map((l, i) => (
            <LevelCard
              key={l.id}
              selected={selected === l.id}
              onClick={() => setSelected(l.id)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <LevelIcon>{l.icon}</LevelIcon>
              <LevelTitle>{l.title}</LevelTitle>
              <LevelDesc>{l.desc}</LevelDesc>
            </LevelCard>
          ))}
        </LevelGrid>
        <StartBtn disabled={!selected || loading} onClick={handleStart}>
          {loading && <Spinner />}
          {loading ? 'Starting session...' : selected ? `Start ${selected} interview →` : 'Select a level to begin'}
        </StartBtn>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Hero>
    </Page>
  );
}
