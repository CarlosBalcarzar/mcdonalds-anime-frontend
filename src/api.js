const BASE=(import.meta.env.VITE_API_URL||'http://localhost:3001/api').replace(/\/+$/, '');
let token=sessionStorage.getItem('mcd-session')||'';
export function setToken(t){token=t||'';if(token)sessionStorage.setItem('mcd-session',token);else sessionStorage.removeItem('mcd-session')}
export const getToken=()=>token;
export async function api(path,{method='GET',body,signal}={}){let response;try{response=await fetch(BASE+path,{method,headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined,signal:signal||AbortSignal.timeout(15000)})}catch(e){if(e.name==='AbortError')throw e;throw Error('No se pudo conectar con la API. Comprueba el servidor y reintenta.')}let data;try{data=await response.json()}catch{throw Error('Respuesta inválida del servidor')}if(!response.ok)throw Object.assign(Error(data.error?.message||'Error del servidor'),{status:response.status});return data.data}
