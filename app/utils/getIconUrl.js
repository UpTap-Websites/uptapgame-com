import { IMAGE_PATH, IMAGE_FORMAT } from "../lib/constants";

export default function getIconUrl(id) {
  return IMAGE_PATH + IMAGE_FORMAT + `/` + id + `.` + IMAGE_FORMAT;
}
