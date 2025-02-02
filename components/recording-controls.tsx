"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Circle, Mic } from "lucide-react";

const RecordingControls = ({ setText }) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    setVoices(voices);

    if ("onvoiceschanged" in synth) {
      synth.onvoiceschanged = () => {
        setVoices(synth.getVoices());
      };
    }
  }, []);

  const startRecording = () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      // Set a timer to stop recording after 1 minute
      timerRef.current = setTimeout(() => {
        stopRecording();
      }, 60000);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setText((prevTranscript) => prevTranscript + transcript);
        }
      }
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div className="flex items-center justify-between m-3">
      <Button className="bg-red-500 rounded-full" onClick={startRecording}>
        {isRecording ? <Circle fill="#ffffff" /> : <Mic />}

        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default RecordingControls;
