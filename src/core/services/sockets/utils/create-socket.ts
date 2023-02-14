import { io } from 'socket.io-client';

import getBaseUrl from '../../../utils/base-url.util';
import type { WrappedClientSocket } from '../types/sockets.types';
import type { SocketEvents } from '../types/sockets-events.types';

const socketClient = io(import.meta.env.REACT_APP_BASE_URL || getBaseUrl());

const createSocket = <T>(event: SocketEvents): WrappedClientSocket<T> => ({
  emit: (data) => socketClient.emit(event, data),
  on: (callback) => socketClient.on(event, callback),
  off: (callback) => socketClient.off(event, callback),
});

export default createSocket;
