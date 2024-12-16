export interface CommandResponse {
  type: 'success' | 'error' | 'info' | 'system' | 'matrix' | 'glitch';
  content: string;
}

export interface OutputLine {
  id: string;
  type: string;
  content: string;
}

export interface LoginInfo {
  time: string;
  ip: string;
}