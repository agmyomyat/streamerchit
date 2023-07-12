export function getSCAccessToken() {
  return localStorage.getItem('SC_ACCESS_TOKEN');
}
export function storeSCAccessToken(token: string) {
  localStorage.setItem('SC_ACCESS_TOKEN', token);
}
