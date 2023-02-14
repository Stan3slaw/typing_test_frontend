export default abstract class RequestService {
  abstract get: <R = void>(url: string, query?: Record<string, string>) => Promise<R>;

  abstract post: <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>) => Promise<R>;

  abstract put: <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>) => Promise<R>;

  abstract patch: <R = void, B = unknown>(url: string, body?: B, query?: Record<string, string>) => Promise<R>;

  abstract delete: <R = void>(url: string, query?: Record<string, string>) => Promise<R>;
}
