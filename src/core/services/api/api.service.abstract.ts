import type { RequestService } from '../request-service/request.service';

export default abstract class ApiService {
  constructor(protected requestService: RequestService, protected baseUrl: string) {}

  protected getUrl = (url: string): string => {
    const trimedBaseUrl = this.baseUrl.replace(/\/$/, '');
    const trimedUrl = url.replace(/^\//, '');

    return `${trimedBaseUrl}/${trimedUrl}`;
  };

  protected post = <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>): Promise<R> =>
    this.requestService.post(this.getUrl(url), body, query);

  protected get = <R = void>(url: string, query?: Record<string, string | number>): Promise<R> =>
    this.requestService.get(this.getUrl(url), query);

  protected put = <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>): Promise<R> =>
    this.requestService.put(this.getUrl(url), body, query);

  protected patch = <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>): Promise<R> =>
    this.requestService.patch(this.getUrl(url), body, query);

  protected delete = <R = void>(url: string, query?: Record<string, string>): Promise<R> =>
    this.requestService.delete(this.getUrl(url), query);
}
