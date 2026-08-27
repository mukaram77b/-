// Web Audio API Relaxation Sound Synthesizer for Arashan Massage & Spa

class RelaxationAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrack: string | null = null;
  private gainNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private timerId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playSound(type: 'mountain_stream' | 'rain_retreat' | 'tibetan_bowl' | 'zen_breeze' | 'deep_meditation') {
    this.stopSound();
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentTrack = type;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.3, this.ctx.currentTime + 1.5);
    this.gainNode.connect(this.ctx.destination);

    switch (type) {
      case 'mountain_stream':
        this.createStreamSound();
        break;
      case 'rain_retreat':
        this.createRainSound();
        break;
      case 'tibetan_bowl':
        this.createTibetanBowlSound();
        break;
      case 'zen_breeze':
        this.createWindSound();
        break;
      case 'deep_meditation':
        this.createDroneSound();
        break;
    }
  }

  private createStreamSound() {
    if (!this.ctx || !this.gainNode) return;
    // Pink/Brownian noise with modulated bandpass filter for water rushing
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter1.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(800, this.ctx.currentTime);

    // LFO for bubbling ripple
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.4, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);
    lfo.start();

    whiteNoise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(this.gainNode);
    whiteNoise.start();

    this.activeNodes.push(whiteNoise, filter1, filter2, lfo, lfoGain);
  }

  private createRainSound() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();

    this.activeNodes.push(noise, filter);
  }

  private createTibetanBowlSound() {
    if (!this.ctx || !this.gainNode) return;
    const playBowlStrike = () => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      const baseFreq = 216; // A 432 harmonic
      const harmonics = [1, 2.76, 5.4, 8.9];
      const gains = [0.4, 0.2, 0.1, 0.05];

      harmonics.forEach((h, idx) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, this.ctx.currentTime);

        g.gain.setValueAtTime(0.001, this.ctx.currentTime);
        g.gain.linearRampToValueAtTime(gains[idx], this.ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 6.0);

        osc.connect(g);
        g.connect(this.gainNode);
        osc.start();
        osc.stop(this.ctx.currentTime + 6.1);
      });
    };

    playBowlStrike();
    const interval = window.setInterval(playBowlStrike, 7000);
    this.timerId = interval;
  }

  private createWindSound() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();

    this.activeNodes.push(noise, filter, lfo, lfoGain);
  }

  private createDroneSound() {
    if (!this.ctx || !this.gainNode) return;
    const frequencies = [108, 162, 216, 324]; // 432 Hz Pythagorean tuning
    frequencies.forEach((freq) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(0.08, this.ctx.currentTime);

      // Subtle detune chorus
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

      osc.connect(g);
      g.connect(this.gainNode);
      osc.start();
      this.activeNodes.push(osc, g);
    });
  }

  public stopSound() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // ignore
      }
    }
    this.activeNodes.forEach((node) => {
      if (typeof node === 'object' && 'stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {
          // ignore
        }
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentTrack = null;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: this.currentTrack,
    };
  }
}

export const spaAudioEngine = new RelaxationAudioEngine();
