export interface Program {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  duration: number;
  thumbnail?: string;
}

export interface Channel {
  id: string;
  name: string;
  number: number;
  logo: string;
  currentProgram: Program;
  nextPrograms: Program[];
}