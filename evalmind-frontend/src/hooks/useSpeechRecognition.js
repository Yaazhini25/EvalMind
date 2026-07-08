import { useState, useRef, useCallback } from 'react';

export default function useWhisperRecognition({ onTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  const stop = useCallback(async () => {
    return new Promise((resolve) => {
      const mediaRecorder = mediaRecorderRef.current;
      if (!mediaRecorder) { resolve(''); return; }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', blob, 'answer.webm');

        try {
          const res = await fetch('http://localhost:8000/transcribe', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          const text = data.transcription || '';
          onTranscript(text);
          resolve(text);
        } catch (e) {
          resolve('');
        }

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
        }
      };

      mediaRecorder.stop();
      setIsListening(false);
    });
  }, [onTranscript]);

  const reset = useCallback(() => {
    onTranscript('');
    chunksRef.current = [];
  }, [onTranscript]);

  return { isListening, isSupported, start, stop, reset };
}