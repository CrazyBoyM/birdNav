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

export const AppList = () => {
  // const [preAppList, setPreAppList] = useState([])
  const [userAppList, setUserAppList] = useLocalStorageState(
    "userAppList",
    defaultUserAppList
  );

  const onError: ReactEventHandler<HTMLImageElement> = (e) => {
    (e.target as HTMLImageElement).src = errorImg;
  };

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
        const offet =
          Math.abs(e.nativeEvent.clientX - rect!.left) / rect!.width;
        if (prev) {
          prev!.style.transform = `scale(${
            1 + scalePre * Math.abs(offet - 1)
          }) `;
        }
        if (next) {
          next!.style.transform = `scale(${1 + scalePre * offet})`;
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
        const offet =
          Math.abs(e.nativeEvent.clientX - rect!.left) / rect!.width;
        if (prev) {
          prev!.style.transform = `scale(${
            1 + scalePre * Math.abs(offet - 1)
          }) `;
        }
        if (next) {
          next!.style.transform = `scale(${1 + scalePre * offet})`;
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
              <img
                className="AppList-app-logo"
                src={appData.logo}
                alt={appData.name}
                onError={onError}
              ></img>
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
