window.APP_CONFIG = {

    // Modello LLM da utilizzare
    OPENROUTER_MODEL: 'openai/gpt-oss-20b:free',

    // Profili degli Avatar disponibili
    AVATAR_PROFILES: {
      tino: {
        id: 'tino',
        name: 'Tino',
        gender: 'Maschile',
        icon: '🤖',
        voice: 'it-IT-GiuseppeMultilingualNeural',
        modelFile: 'teal_v.2.glb',
        ragFile: 'tinorag.md',
        scale: 1.0,
        systemPrompt: `Sei Tino, un assistente AI virtuale amichevole, professionale ed empatico. Rispondi in modo conciso in italiano. Il tuo interlocutore deve trovarti naturale e colloquiale. Non usare prefazioni lunghe, sii amichevole. REGOLA TASSATIVA: NON USARE MAI asterischi (*), simboli speciali o descrizioni di azioni tra parentesi (es. *sorride*, [ride]). Rispondi SOLO con testo che possa essere letto ad alta voce in modo naturale.`,
        greeting: `👋 Ciao! Sono Tino, il tuo assistente virtuale.`,
        animations: {
          calib: {
            'Head_06': { x: 0.50, y: 0, z: 0 },
            'Spine_003_05': { x: -0.70, y: 0, z: 0 },
            'Arm_R_001_070': { x: 0, y: -0.18, z: 0 },
            'Arm_L_001_044': { x: 0, y: 0.18, z: 0 }
          },
          expressions: {
            neutral: { mC: -0.02, mL: -0.10, mR: -0.10, scale: 0.9 },
            thinking: { mC: -0.03, mL: -0.02, mR: -0.12, scale: 0.85 },
            surprised: { mC: -0.065, mL: 0, mR: 0, scale: 0.5 },
            happy: { mC: 0.05, mL: -0.10, mR: -0.10, scale: 1.1 },
            angry: { mC: -0.05, mL: 0, mR: 0, scale: 0.8 },
            sad: { mC: -0.02, mL: -0.20, mR: -0.20, scale: 0.85 }
          },
          gestures: {
            think: {
              aR: { x: 0.76, y: 2.25, z: -0.55 },
              faR: { x: -0.11, y: 0.32, z: 0.49 },
              hR: { x: -0.48, y: 1.66, z: -0.51 }
            }
          }
        }
      },
      aria: {
        id: 'aria',
        name: 'Aria',
        gender: 'Femminile',
        icon: '🤖',
        voice: 'it-IT-ElsaNeural',
        modelFile: 'aria.glb',
        ragFile: 'ariarag.md',
        scale: 0.10,
        systemPrompt: `Sei Aria, un'assistente AI virtuale amichevole e professionale. Rispondi in modo conciso, utile e con personalità. Usa l'italiano come lingua principale. REGOLA TASSATIVA: NON USARE MAI asterischi (*), simboli speciali o descrizioni di azioni tra parentesi (es. *sorride*, [ride]). Rispondi SOLO con testo che possa essere letto ad alta voce in modo naturale.`,
        greeting: `👋 Ciao! Sono Aria, la tua assistente virtuale.`,
        animations: {}
      }
    }
};
