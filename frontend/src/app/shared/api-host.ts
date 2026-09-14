import { Env } from '@app/services/state.service';

/** Origin for XHR/WS when NGINX_HOSTNAME is a remote API (not same-host nginx). */
export function remoteApiOrigin(env: Env): string | null {
  const host = env.NGINX_HOSTNAME;
  if (!host || host === '127.0.0.1' || host === 'localhost') {
    return null;
  }
  const proto = env.NGINX_PROTOCOL || 'https';
  const port = env.NGINX_PORT;
  const portPart = ((port === '443' && proto === 'https') || (port === '80' && proto === 'http'))
    ? ''
    : (port ? ':' + port : '');
  return proto + '://' + host + portPart;
}

export function httpApiBaseUrl(env: Env, isBrowser: boolean): string {
  if (isBrowser) {
    return remoteApiOrigin(env) || '';
  }
  return (env.NGINX_PROTOCOL || 'http') + '://' + env.NGINX_HOSTNAME + ':' + env.NGINX_PORT;
}

export function webSocketUrlTemplate(
  env: Env,
  isBrowser: boolean,
  pageWsProtocol: string,
  pageHost: string,
  pagePort: string,
): string {
  const suffix = '{network}/api/v1/ws';
  if (isBrowser) {
    const origin = remoteApiOrigin(env);
    if (origin) {
      const ws = origin.replace(/^http/, 'ws');
      return ws + suffix;
    }
  }
  return pageWsProtocol + '//' + pageHost + ':' + pagePort + suffix;
}
