const defaultUserAppList = [
  {
    id: "dfsgdfhbfgrjhty",
    name: "谷歌翻译",
    link: "https://translate.google.cn/",
    logo: "https://translate.google.cn//favicon.ico",
    type: "outer",
    width: 1024,
    height: 528,
    x: 256,
    y: 132,
  },
  {
    id: "xfghfjytktdfgfht",
    name: "代码练习场",
    link: "http://code.ip3x.com",
    logo: "https://cdn.jsdelivr.net/gh/CrazyBoyM/haut-online-ide/dist/favicon.ico",
    type: "inner",
    width: 1024,
    height: 635,
    x: 245,
    y: 37,
  },
  {
    id: "usegyhjrAphgkjkp31",
    name: "GeoGebra",
    link: "https://www.geogebra.org/calculator",
    logo: "https://www.geogebra.org//favicon.ico",
    type: "inner",
    width: 1031,
    height: 666,
    x: 280,
    y: 32,
  },
  {
    id: "usejytjmhjfjytf",
    name: "Excalidraw",
    link: "https://excalidraw.com/",
    logo: "https://excalidraw.com//favicon.ico",
    type: "inner",
    width: 1123,
    height: 698,
    x: 218,
    y: 13,
  },
  {
    id: "0rdAOQGAf6_H1YKiCRBsO",
    name: "vscode",
    link: "https://vscode.dev/",
    logo: "https://vscode.dev/static/stable/favicon.ico",
    type: "outer",
    width: 1228,
    height: 689.1666666666667,
    x: 145,
    y: 9.916666666666629,
  },
];

export type UserApp = typeof defaultUserAppList[number];

export type UserAppList = Array<UserApp>;

export { defaultUserAppList };
