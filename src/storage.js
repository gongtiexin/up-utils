/* -----------------cookie---------------------*/

/**
 * 根据cookie的key取出对应的value
 * */
const getCookie = cookieName => {
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(`${cookieName}=`);
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1;
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cookieStart, cookieEnd));
    }
  }
  return "";
};

/**
 * 设置cookie
 * */
const setCookie = (cookieName, value, expireHours) => {
  const exdate = new Date();
  exdate.setHours(exdate.getHours() + expireHours);
  document.cookie = `${cookieName}=${escape(value)}${
    expireHours == null ? "" : `;expires=${exdate.toGMTString()}`
  }`;
};

/**
 * 删除cookie
 * */
const removeCookie = name => setCookie(name, 1, -1);

/* -----------------localStorage---------------------*/
/**
 * 设置localStorage
 * */
const setLocal = (key, val) => {
  const setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
    Object.entries(setting).forEach(item =>
      window.sessionStorage.setItem(item[0], JSON.stringify(item[1]))
    );
  } else {
    window.localStorage.setItem(key, JSON.stringify(val));
  }
};

/**
 * 获取localStorage
 * */
const getLocal = key => {
  if (key) return JSON.parse(window.localStorage.getItem(key));
  return null;
};

/**
 * 移除localStorage
 * */
const removeLocal = key => window.localStorage.removeItem(key);

/**
 * 移除所有localStorage
 * */
const clearLocal = () => window.localStorage.clear();

/* -----------------sessionStorage---------------------*/
/**
 * 设置sessionStorage
 * */
const setSession = (key, val) => {
  const setting = arguments[0];
  if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
    Object.entries(setting).forEach(item =>
      window.sessionStorage.setItem(item[0], JSON.stringify(item[1]))
    );
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  }
};

/**
 * 获取sessionStorage
 * */
const getSession = key => {
  if (key) return JSON.parse(window.sessionStorage.getItem(key));
  return null;
};

/**
 * 移除sessionStorage
 * */
const removeSession = key => window.sessionStorage.removeItem(key);

/**
 * 移除所有sessionStorage
 * */
const clearSession = () => window.sessionStorage.clear();

export {
  getCookie,
  setCookie,
  removeCookie,
  setLocal,
  getLocal,
  removeLocal,
  clearLocal,
  getSession,
  setSession,
  removeSession,
  clearSession,
};
