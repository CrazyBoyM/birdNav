const getLocal = (keyName: string) => {
  try {
    let val = window.localStorage.getItem(keyName);
    let data = JSON.parse(val!);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const setLocal = (keyName: string, data: any) => {
  try {
    let val = JSON.stringify(data);
    window.localStorage.setItem(keyName, val);
  } catch (e) {
    console.error(e);
  }
};

const clearLocal = () => {
  try {
    window.localStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export { getLocal, setLocal, clearLocal };
