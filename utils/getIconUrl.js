import { IMAGE_FORMAT, IMAGE_PATH } from "@/lib/constants";

export default function getIconUrl(id) {
  return IMAGE_PATH + IMAGE_FORMAT + `/` + id + `.` + IMAGE_FORMAT;
}
