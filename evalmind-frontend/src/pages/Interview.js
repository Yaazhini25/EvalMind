import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import useWhisperRecognition from '../hooks/useSpeechRecognition';
import { submitAnswer, pauseInterview, resumeInterview, stopInterview } from '../api';

const fadeUp = keyframes`from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}`;
const blink = keyframes`0%,100%{opacity:1}50%{opacity:0}`;
const waveAnim = keyframes`0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}`;
const spin = keyframes`to{transform:rotate(360deg)}`;

const Page = styled.div`
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem 2rem;
  position: relative;
  &::before {
    content:'';
    position:fixed; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
  }
`;

const TopBar = styled.div`
  width: 100%; max-width: 720px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.3s ease forwards;
`;

const LevelBadge = styled.div`
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  background: var(--accent-glow);
  border: 1px solid var(--accent-dim);
  padding: 4px 10px;
  border-radius: 100px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const TimerBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimerDot = styled.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: ${p => p.paused ? 'var(--text-muted)' : p.low ? 'var(--red)' : 'var(--green)'};
  ${p => !p.paused && css`animation: ${blink} 1.5s infinite;`}
`;

const TimerText = styled.div`
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 500;
  color: ${p => p.low ? 'var(--red)' : 'var(--text-primary)'};
  letter-spacing: 0.05em;
`;

const QCounter = styled.div`
  font-size: 13px;
  color: var(--text-secondary);
`;

const ProgressTrack = styled.div`
  width: 100%; max-width: 720px;
  height: 2px;
  background: var(--bg-card);
  border-radius: 1px;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--green));
  border-radius: 1px;
  width: ${p => p.pct}%;
  transition: width 1s linear;
`;

const Content = styled.div`
  width: 100%; max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Card = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  animation: ${fadeUp} 0.35s ease forwards;
`;

const CardLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionText = styled.p`
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
  color: var(--text-primary);
`;

const SpeakingBadge = styled.div`
  font-size: 11px;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 5px;
`;

const WaveContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 18px;
`;

const WaveBar = styled.span`
  display: block;
  width: 3px;
  border-radius: 2px;
  background: ${p => p.active ? 'var(--accent)' : 'var(--border-bright)'};
  height: ${p => p.active ? '100%' : '4px'};
  transform-origin: bottom;
  ${p => p.active && css`
    animation: ${waveAnim} ${p.delay}ms ease-in-out infinite;
  `}
`;

function WaveIndicator({ active }) {
  const delays = [600, 400, 700, 500];
  return (
    <WaveContainer>
      {delays.map((d, i) => <WaveBar key={i} active={active} delay={d} />)}
    </WaveContainer>
  );
}

const AnswerArea = styled.div`
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  min-height: 110px;
  font-size: 15px;
  line-height: 1.7;
  color: ${p => p.empty ? 'var(--text-muted)' : 'var(--text-primary)'};
  font-style: ${p => p.empty ? 'italic' : 'normal'};
`;

const RecordBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: ${p => p.recording ? 'var(--red-dim)' : 'var(--accent-glow)'};
  color: ${p => p.recording ? 'var(--red)' : 'var(--accent)'};
  border: 1px solid ${p => p.recording ? 'rgba(255,92,92,0.3)' : 'var(--accent-dim)'};
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: ${p => p.disabled ? 'var(--bg-card)' : 'var(--green)'};
  color: ${p => p.disabled ? 'var(--text-muted)' : '#0a120e'};
  border: 1px solid ${p => p.disabled ? 'var(--border)' : 'var(--green)'};
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  &:hover:not(:disabled) { background: #25b88d; transform: translateY(-1px); }
`;

const ControlRow = styled.div`
  display: flex;
  gap: 10px;
`;

const CtrlBtn = styled.button`
  flex: 1;
  padding: 11px;
  background: var(--bg-card);
  border: 1px solid ${p => p.danger ? 'rgba(255,92,92,0.35)' : 'var(--border)'};
  color: ${p => p.danger ? 'var(--red)' : 'var(--text-secondary)'};
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: var(--bg-card-hover);
    border-color: ${p => p.danger ? 'var(--red)' : 'var(--border-bright)'};
    color: ${p => p.danger ? 'var(--red)' : 'var(--text-primary)'};
  }
`;

const PausedBanner = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1rem 1.25rem;
  text-align: center;
  h3 { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 4px; }
  p { font-size: 13px; color: var(--text-secondary); }
`;

const ConfirmOverlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
`;

const ConfirmBox = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 360px; width: 90%;
  text-align: center;
  animation: ${fadeUp} 0.2s ease;
  h3 { font-family: var(--font-display); font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  p { font-size: 14px; color: var(--text-secondary); margin-bottom: 1.5rem; }
`;

const ConfirmBtns = styled.div`
  display: flex; gap: 10px;
  button {
    flex:1; padding: 10px; border-radius: var(--radius-sm);
    font-size: 14px; font-weight: 500; cursor: pointer;
    font-family: var(--font-body); transition: all 0.15s;
  }
`;

const SpinnerIcon = styled.div`
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const StatusText = styled.div`
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin-top: -6px;
`;

const TOTAL_TIME = 300;

export default function Interview() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [sessionId] = useState(state?.sessionData?.session_id);
  const [level] = useState(state?.level || 'beginner');
  const [questionText, setQuestionText] = useState(state?.sessionData?.question?.question_text || '');
  const [questionId, setQuestionId] = useState(state?.sessionData?.question?.question_id);
  const [qNum, setQNum] = useState(1);
  const [transcript, setTranscript] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(state?.sessionData?.time_left || TOTAL_TIME);
  const [submitting, setSubmitting] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [breakCountdown, setBreakCountdown] = useState(0);

  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const hasStarted = useRef(false);

  const handleTranscript = useCallback((text) => setTranscript(text), []);
  const { isListening, start, stop, reset } = useWhisperRecognition({ onTranscript: handleTranscript });

  const handleAutoEnd = useCallback(async () => {
    if (isListening) await stop();
    try { await stopInterview(sessionId); } catch (_) {}
    navigate('/results', { state: { sessionId, level } });
  }, [isListening, stop, sessionId, level, navigate]);

  const startTimer = useCallback(() => {
    hasStarted.current = true;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleAutoEnd(); return 0; }
        return t - 1;
      });
    }, 1000);
  }, [handleAutoEnd]);

  const playQuestion = useCallback(async (text) => {
    try {
      setIsPlayingQuestion(true);
      const res = await fetch(`http://localhost:8000/speak?text=${encodeURIComponent(text)}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setIsPlayingQuestion(false);
        URL.revokeObjectURL(url);
        startTimer(); // timer starts after question finishes speaking
      };
      audio.play();
    } catch (e) {
      setIsPlayingQuestion(false);
      startTimer(); // fallback if TTS fails
    }
  }, [startTimer]);

  // On mount: play first question (timer starts after it finishes)
  useEffect(() => {
    if (!sessionId) { navigate('/'); return; }
    playQuestion(questionText);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  // Pause / resume timer
  useEffect(() => {
    if (!hasStarted.current) return; // don't run before first question finishes
    if (isPaused) {
      clearInterval(timerRef.current);
    } else {
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, startTimer]);

  const handleStartRecording = async () => {
    setTranscript('');
    reset();
    await start();
  };

  const handleStopRecording = async () => {
    setTranscribing(true);
    await stop();
    setTranscribing(false);
  };

  const handleSubmit = async () => {
    if (!transcript.trim() || submitting) return;
    setSubmitting(true);
    try {
      const data = await submitAnswer(sessionId, questionId, transcript.trim());
      setTranscript('');
      reset();
      if (data.status === 'running') {
        setQuestionText(data.question.question_text);
        setQuestionId(data.question.question_id);
        setQNum(n => n + 1);
        setSubmitting(false);

        // Pause timer during 20s break
        clearInterval(timerRef.current);
        setIsBreak(true);

        await new Promise(resolve => {
          let count = 20;
          setBreakCountdown(count);
          const interval = setInterval(() => {
            count--;
            setBreakCountdown(count);
            if (count <= 0) {
              clearInterval(interval);
              resolve();
            }
          }, 1000);
        });

        setIsBreak(false);
        playQuestion(data.question.question_text); // timer restarts after question finishes

      } else {
        clearInterval(timerRef.current);
        navigate('/results', { state: { sessionId, level } });
      }
    } catch (_) {
      setSubmitting(false);
    }
  };

  const handlePause = async () => {
    if (isPaused) {
      await resumeInterview(sessionId);
      setIsPaused(false);
    } else {
      if (isListening) await stop();
      if (audioRef.current) audioRef.current.pause();
      await pauseInterview(sessionId);
      setIsPaused(true);
    }
  };

  const handleStop = async () => {
    setShowConfirm(false);
    clearInterval(timerRef.current);
    if (isListening) await stop();
    try { await stopInterview(sessionId); } catch (_) {}
    navigate('/results', { state: { sessionId, level } });
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const timeLow = timeLeft <= 60;
  const pct = (timeLeft / TOTAL_TIME) * 100;

  if (!sessionId) return null;

  return (
    <Page>
      <TopBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LevelBadge>{level}</LevelBadge>
          <QCounter>Question {qNum}</QCounter>
        </div>
        <TimerBox>
          <TimerDot paused={isPaused || isBreak} low={timeLow} />
          <TimerText low={timeLow}>{formatTime(timeLeft)}</TimerText>
        </TimerBox>
      </TopBar>

      <ProgressTrack>
        <ProgressFill pct={pct} />
      </ProgressTrack>

      <Content>

        {isPaused && (
          <PausedBanner>
            <h3>⏸ Interview paused</h3>
            <p>Click resume whenever you're ready to continue.</p>
          </PausedBanner>
        )}

        {isBreak && (
          <PausedBanner>
            <h3>⏳ Next question in {breakCountdown}s</h3>
            <p>Take a breath — the next question is coming up shortly.</p>
          </PausedBanner>
        )}

        <Card>
          <CardLabel>
            <span>Question</span>
            {isPlayingQuestion && (
              <SpeakingBadge>
                <WaveIndicator active={true} />
                <span>speaking...</span>
              </SpeakingBadge>
            )}
          </CardLabel>
          <QuestionText>{questionText}</QuestionText>
        </Card>

        <Card style={{ padding: '1.25rem 1.5rem' }}>
          <CardLabel>
            <span>Your answer</span>
            {isListening && <WaveIndicator active={true} />}
          </CardLabel>
          <AnswerArea empty={!transcript}>
            {transcript || 'Your transcribed answer will appear here after recording...'}
          </AnswerArea>
        </Card>

        {!isListening ? (
          <RecordBtn
            onClick={handleStartRecording}
            disabled={isPaused || transcribing || isPlayingQuestion || isBreak}
          >
            {transcribing ? <><SpinnerIcon /> Transcribing...</> : '🎙 Start recording answer'}
          </RecordBtn>
        ) : (
          <RecordBtn recording onClick={handleStopRecording}>
            <WaveIndicator active={true} />
            Stop recording
          </RecordBtn>
        )}

        {transcribing && (
          <StatusText>Sending audio to Whisper for transcription...</StatusText>
        )}

        <SubmitBtn
          disabled={!transcript.trim() || submitting || isPaused || isBreak}
          onClick={handleSubmit}
        >
          {submitting ? 'Submitting...' : 'Submit answer & next question →'}
        </SubmitBtn>

        <ControlRow>
          <CtrlBtn onClick={handlePause}>
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </CtrlBtn>
          <CtrlBtn danger onClick={() => setShowConfirm(true)}>
            ◼ Stop interview
          </CtrlBtn>
        </ControlRow>

      </Content>

      {showConfirm && (
        <ConfirmOverlay onClick={() => setShowConfirm(false)}>
          <ConfirmBox onClick={e => e.stopPropagation()}>
            <h3>Stop interview?</h3>
            <p>Your answers so far will be evaluated and you'll see your report.</p>
            <ConfirmBtns>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleStop}
                style={{ background: 'var(--red-dim)', border: '1px solid rgba(255,92,92,0.3)', color: 'var(--red)' }}
              >
                Yes, stop
              </button>
            </ConfirmBtns>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
    </Page>
  );
}