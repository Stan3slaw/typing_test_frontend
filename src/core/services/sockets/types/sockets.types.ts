import type { Socket } from 'socket.io-client';

export interface EmitterCallback<T> {
  (data: T): void;
}

export interface WrappedClientSocket<T> {
  emit: (data?: T) => Socket;
  on: (callback: EmitterCallback<T>) => Socket;
  off: (callback: EmitterCallback<T>) => Socket;
}
