import axios from 'axios';
import { getUserToken } from './authentication';

// export async function getCsfrToken() {
//   // TODO: Mudar url para apontar para o banco utilizado
//   await axios.get(import.meta.env.VITE_API_URL_CORS, {
//     headers: {
//       Accept: 'application/json'
//     },
//     withCredentials: true
//   });
// }

export async function getCookie(cookieName: string) {
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export async function checkCookie() {
  try {
    let xsrfToken = await getCookie('XSRF-TOKEN');

    if (xsrfToken != '') {
      return true;
    }

    getCsfrToken();
    xsrfToken = await getCookie('XSRF-TOKEN');

    if (xsrfToken != '') {
      return true;
    }

    return false;
  } catch (error) {
    return { success: false, msg: error };
  }
}

export function deleteCookie(name: string) {
  const date = new Date();

  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/';
}

export async function configMyRequest(authorization = true, withCredentials = true) {
  const config = {};

  if (authorization === true) {
    const aditionalConfig = {
      headers: {
        Authorization: `Bearer ${getUserToken()}`
      }
    };

    // CSRF TOKEN CONFIG
    // if (csrfToken === true) {
    //   const hasCookie = await checkCookie();

    //   if (!hasCookie) {
    //     return { success: false, msg: 'Você não tem um Cookie de autenticação!' };
    //   }

    //   Object.assign(aditionalConfig.headers, {
    //     'X-XSRF-TOKEN': await getCookie('XSRF-TOKEN')
    //   });
    // }

    Object.assign(config, aditionalConfig);
  }

  // CSRF TOKEN CONFIG
  // if (csrfToken === true && authorization === false) {
  //   const hasCookie = await checkCookie();

  //   if (!hasCookie) {
  //     return { success: false, msg: 'Você não tem um Cookie de autenticação!' };
  //   }

  //   const aditionalConfig = {
  //     headers: {
  //       'X-XSRF-TOKEN': await getCookie('XSRF-TOKEN')
  //     }
  //   };

  //   Object.assign(config, aditionalConfig);
  // }

  if (withCredentials === true) {
    const aditionalConfig = {
      withCredentials: true
    };

    Object.assign(config, aditionalConfig);
  }

  return config;
}
