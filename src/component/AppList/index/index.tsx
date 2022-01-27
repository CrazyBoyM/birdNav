import { AddOne, SettingOne } from "@icon-park/react";
import { addApp } from "../Modal/AddModal";
import { editApp } from "../Modal/EditModal";
import "./index.css";
// import '@/styles/animation.css'
// @ts-ignore
import errorImg from "/assets/icon/error.png";
import { openWindow } from "../Window";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { defaultUserAppList, UserApp } from "@/store/app";
import {
  ReactEventHandler,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import LoImage from "./LoImage";

export const AppList = () => {
  // 内置应用列表属于不可删改的应用
  // const [preAppList, setPreAppList] = useState([])
  // todo: 网址文件夹管理器（）子应用、小游戏
  // 用户列表属于可自由改动操作的部分
  const [userAppList, setUserAppList] = useLocalStorageState(
    "userAppList",
    defaultUserAppList
  );

  const runApp = (appData: UserApp, appIndex: number) => {
    if (appData.type === "inner") {
      openWindow(appData, appIndex, userAppList, setUserAppList);
    } else {
      window.open(appData.link);
    }
  };
  const appListAppRef = useRef<Array<HTMLElement | null>>([]);
  const getAppListApp = useCallback(
    (el: HTMLElement | null) => {
      appListAppRef.current?.push(el);
    },
    [userAppList]
  );

  const appMounseEnter = useCallback(
    (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      const index = appListAppRef.current.indexOf(e.currentTarget);
      if (index >= 0) {
        const target = appListAppRef.current[index];
        const prev = appListAppRef.current[index - 1];
        const next = appListAppRef.current[index + 1];
        target!.style.transform = "scale(1.6)";
        const scalePre = 0.6;
        const rect = target?.getBoundingClientRect();
        const offset =
          Math.abs(e.nativeEvent.clientX - rect!.left) / rect!.width;
        if (prev) {
          prev!.style.transform = `scale(${
            1 + scalePre * Math.abs(offset - 1)
          }) `;
        }
        if (next) {
          next!.style.transform = `scale(${1 + scalePre * offset})`;
        }
      }
    },
    [userAppList]
  );
  const appMounseMove = useCallback(
    (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      const index = appListAppRef.current.indexOf(e.currentTarget);
      if (index >= 0) {
        const target = appListAppRef.current[index];
        const prev = appListAppRef.current[index - 1];
        const next = appListAppRef.current[index + 1];
        const scalePre = 0.6;
        const rect = target?.getBoundingClientRect();
        const offset =
          Math.abs(e.nativeEvent.clientX - rect!.left) / rect!.width;
        if (prev) {
          prev!.style.transform = `scale(${
            1 + scalePre * Math.abs(offset - 1)
          }) `;
        }
        if (next) {
          next!.style.transform = `scale(${1 + scalePre * offset})`;
        }
      }
    },
    [userAppList]
  );
  const appMounseLeave = useCallback(
    (e: SyntheticEvent<HTMLElement, MouseEvent>) => {
      const index = appListAppRef.current.indexOf(e.currentTarget);
      if (index >= 0) {
        const target = appListAppRef.current[index];
        const prev = appListAppRef.current[index - 1];
        const next = appListAppRef.current[index + 1];
        target!.style.transform = "scale(1)";
        if (prev) {
          prev!.style.transform = "scale(1)";
        }
        if (next) {
          next!.style.transform = "scale(1)";
        }
      }
    },
    [userAppList]
  );

  return (
    <>
      <div id="App-window"></div>
      <section className="AppList-bottom">
        <div
          className="AppList-app center"
          onClick={() => {}}
          ref={getAppListApp}
          onMouseEnter={appMounseEnter}
          onMouseLeave={appMounseLeave}
          onMouseMove={appMounseMove}
        >
          <SettingOne
            theme="outline"
            size="30"
            fill="slateblue"
            strokeWidth={3}
          />
        </div>
        {userAppList &&
          userAppList.map((appData: any, appIndex: number) => (
            <div
              className="AppList-app center"
              key={appIndex}
              onClick={() => runApp(appData, appIndex)}
              onContextMenu={(e) => {
                e.preventDefault();
                editApp(appData, appIndex, userAppList, setUserAppList);
              }}
              ref={getAppListApp}
              onMouseEnter={appMounseEnter}
              onMouseLeave={appMounseLeave}
              onMouseMove={appMounseMove}
            >
              <LoImage
                src={appData.logo}
                alt={appData.name}
                feedback={<img src={errorImg} alt={appData.name} />}
              />
            </div>
          ))}
        <div
          className="AppList-app center"
          onClick={() => addApp(userAppList, setUserAppList)}
          ref={getAppListApp}
          onMouseEnter={appMounseEnter}
          onMouseLeave={appMounseLeave}
          onMouseMove={appMounseMove}
        >
          <AddOne theme="outline" size="30" fill="slateblue" strokeWidth={3} />
        </div>
      </section>
    </>
  );
};
