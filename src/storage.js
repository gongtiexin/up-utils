/**
 * 根据cookie的key取出对应的value
 * */
export const getCookie = (cookieName) => {
    if (document.cookie.length > 0) {
        let cookieStart = document.cookie.indexOf(`${cookieName}=`);
        if (cookieStart !== -1) {
            cookieStart = cookieStart + cookieName.length + 1;
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            return unescape(document.cookie.substring(cookieStart, cookieEnd));
        }
    }
    return '';
};

/**
 * 设置cookie
 * */
export const setCookie = (cookieName, value, expireHours) => {
    const date = new Date();
    date.setHours(date.getHours() + expireHours);
    document.cookie = `${cookieName}=${escape(value)}${
        !expireHours ? '' : `;expires=${date.toGMTString()}`
    }`;
};

/**
 * 删除cookie
 * */
export const removeCookie = (name) => setCookie(name, 1, -1);

/**
 * 设置localStorage
 * */
export const setLocal = (key, val) => {
    if (Object.prototype.toString.call(val).slice(8, -1) === 'Object') {
        Object.entries(val).forEach((item) =>
            window.sessionStorage.setItem(item[0], JSON.stringify(item[1]))
        );
    } else {
        window.localStorage.setItem(key, JSON.stringify(val));
    }
};

/**
 * 获取localStorage
 * */
export const getLocal = (key) => {
    if (key) return JSON.parse(window.localStorage.getItem(key));
    return null;
};

/**
 * 移除localStorage
 * */
export const removeLocal = (key) => window.localStorage.removeItem(key);

/**
 * 移除所有localStorage
 * */
export const clearLocal = () => window.localStorage.clear();

/**
 * 设置sessionStorage
 * */
export const setSession = (key, val) => {
    if (Object.prototype.toString.call(val).slice(8, -1) === 'Object') {
        Object.entries(val).forEach((item) =>
            window.sessionStorage.setItem(item[0], JSON.stringify(item[1]))
        );
    } else {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    }
};

/**
 * 获取sessionStorage
 * */
export const getSession = (key) => {
    if (key) return JSON.parse(window.sessionStorage.getItem(key));
    return null;
};

/**
 * 移除sessionStorage
 * */
export const removeSession = (key) => window.sessionStorage.removeItem(key);

/**
 * 移除所有sessionStorage
 * */
export const clearSession = () => window.sessionStorage.clear();
