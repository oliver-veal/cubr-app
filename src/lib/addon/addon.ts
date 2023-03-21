import { UAParser } from "ua-parser-js";

const { os } = new UAParser().getResult();
// possible OS are darwin, linux, and windows
let OS = "";
if (os.name === "Windows") {
  OS = "windows";
} else if (os.name === "Mac OS") {
  OS = "darwin";
} else if (os.name === "Linux") {
  OS = "linux";
}

const ADDON_VERSION = "1.9.0";
const ARCH = "amd64";
export const ADDON_URL =
  `https://addon.cubr.io/v${ADDON_VERSION}/${OS}/${ARCH}/cubr.zip`;
