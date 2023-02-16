import type { Word } from '../../types/word.types';
import type { WrappedClientSocket } from './types/sockets.types';
import createSocket from './utils/create-socket';

export const onInputChangeEvent: WrappedClientSocket<string> = createSocket('onInputChange');
export const onInputCheckEvent: WrappedClientSocket<{ isValid: boolean }> = createSocket('onInputCheck');
export const onInputSubmitEvent: WrappedClientSocket<undefined> = createSocket('onInputSubmit');
export const getCurrentWordIndexEvent: WrappedClientSocket<number> = createSocket('getCurrentWordIndex');
export const loadMoreWordsEvent: WrappedClientSocket<undefined> = createSocket('loadMoreWords');
export const getWordsEvent: WrappedClientSocket<Word[]> = createSocket('getWords');
export const refreshWordsEvent: WrappedClientSocket<undefined> = createSocket('refreshWords');
