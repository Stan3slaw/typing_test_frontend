import type { WrappedClientSocket } from './types/sockets.types';
import createSocket from './utils/create-socket';

export const onInputChangeEvent: WrappedClientSocket<string> = createSocket('onInputChange');
export const onInputCheckEvent: WrappedClientSocket<{ isValid: boolean }> = createSocket('onInputCheck');
export const onSubmitInputEvent: WrappedClientSocket<{ isValid: boolean }> = createSocket('onSubmitInput');
