import { PropsWithoutRef, useEffect, useState } from "react";

export interface LoImageProps {
  src: string;
  alt: string;
  feedback: JSX.Element;
}

export default function LoImage(props: PropsWithoutRef<LoImageProps>) {
  const [loaded, setLoaded] = useState(false);
  const [renderTarget, setRenderTarget] = useState(props.feedback);

  useEffect(() => {
    const img = new Image();
    img.src = props.src;
    const imgLoad = () => {
      setRenderTarget(
        <img className="AppList-app-logo" src={props.src} alt={props.alt} />
      );
      setLoaded(true);
    };
    const imgError = () => {
      setLoaded(true);
    };
    img.addEventListener("load", imgLoad, false);
    img.addEventListener("error", imgError, false);
    return () => {
      img.removeEventListener("load", imgLoad, false);
      img.removeEventListener("error", imgError, false);
    };
  }, [props.src]);

  if (loaded) {
    return renderTarget;
  } else {
    return null;
  }
}
