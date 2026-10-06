export type DramaRequest = {
  title: string;
  durationMinutes: number;
  language: string;
  visualStyle: string;
};

export type Character = {
  name: string;
  role: string;
  description: string;
  voiceDirection?: string;
};

export type Shot = {
  shotNumber: number;
  durationSeconds: number;
  visualPrompt: string;
  dialogue?: string;
  speaker?: string;
};

export type Scene = {
  sceneNumber: number;
  title: string;
  summary: string;
  shots: Shot[];
};

export type DramaPlan = {
  title: string;
  logline: string;
  characters: Character[];
  scenes: Scene[];
};
