import { appVersion } from "@/store/config"
import { clearLocal, getLocal, setLocal } from "./local"

const localDataUpdate = () => {
  let localVersion = getLocal('version')
  if (localVersion !== appVersion) {
  clearLocal()
  setLocal('version', appVersion)
  }
}

export { localDataUpdate }