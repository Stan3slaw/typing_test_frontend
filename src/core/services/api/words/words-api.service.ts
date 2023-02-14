import type { AxiosResponse } from 'axios';

import ApiServiceAbstract from '../api.service.abstract';
import type { RequestService } from '../../request-service/request.service';
import requestService from '../../request-service/request.service';

export class WordsApiService extends ApiServiceAbstract {
  constructor(service: RequestService, baseUrl: string) {
    super(service, baseUrl);
  }

  getWords = async (): Promise<AxiosResponse> => this.get('words');
}

export default new WordsApiService(requestService, '');
