/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface VoiceEngineConfig {
  onTranscriptUpdate?: (transcript: string) => void;
  onAudioLevelUpdate?: (level: number) => void;
  onError?: (error: string) => void;
  onProcessing?: (isProcessing: boolean) => void;
}

export class VoiceEngineService {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private isListening = false;
  private config: VoiceEngineConfig;
  private recognitionInstance: any = null;
  private currentTranscript = "";

  constructor(config: VoiceEngineConfig = {}) {
    this.config = config;
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognitionInstance = new SpeechRecognition();
      this.recognitionInstance.continuous = true;
      this.recognitionInstance.interimResults = true;
      this.recognitionInstance.language = "en-IN";

      this.recognitionInstance.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.currentTranscript += transcript + " ";
          } else {
            interim += transcript;
          }
        }
        const fullTranscript = this.currentTranscript + interim;
        this.config.onTranscriptUpdate?.(fullTranscript);
      };

      this.recognitionInstance.onerror = (event: any) => {
        this.config.onError?.(`Speech recognition error: ${event.error}`);
      };

      this.recognitionInstance.onend = () => {
        this.isListening = false;
        this.config.onProcessing?.(false);
      };
    }
  }

  async startListening(): Promise<void> {
    try {
      // Get microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Initialize Web Audio API for visualization
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(
        this.mediaStream
      );

      // Create analyser for audio level visualization
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      // Start audio level updates
      this.updateAudioLevel();

      // Start speech recognition
      if (this.recognitionInstance) {
        this.currentTranscript = "";
        this.recognitionInstance.start();
        this.isListening = true;
        this.config.onProcessing?.(false);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Microphone access denied";
      this.config.onError?.(errorMessage);
      throw error;
    }
  }

  stopListening(): void {
    try {
      this.isListening = false;

      // Stop speech recognition
      if (this.recognitionInstance) {
        this.recognitionInstance.stop();
      }

      // Close audio context
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }

      // Stop media stream
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((track) => track.stop());
        this.mediaStream = null;
      }

      this.analyser = null;
      this.processor = null;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error stopping listening";
      this.config.onError?.(errorMessage);
    }
  }

  private updateAudioLevel(): void {
    if (!this.isListening || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Calculate average frequency
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const normalizedLevel = Math.min(100, Math.round((average / 255) * 100));

    this.config.onAudioLevelUpdate?.(normalizedLevel);

    requestAnimationFrame(() => this.updateAudioLevel());
  }

  getTranscript(): string {
    return this.currentTranscript;
  }

  resetTranscript(): void {
    this.currentTranscript = "";
  }

  isSupported(): boolean {
    return (
      !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) &&
      !!this.recognitionInstance
    );
  }
}

// Create singleton instance
let voiceEngineInstance: VoiceEngineService | null = null;

export function getVoiceEngine(config?: VoiceEngineConfig): VoiceEngineService {
  if (!voiceEngineInstance) {
    voiceEngineInstance = new VoiceEngineService(config);
  }
  return voiceEngineInstance;
}
