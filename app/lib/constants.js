// 网站配置
export const SITE_META = {
  NAME: "UpTapGame",
  URL: "https://www.uptapgame.com",
  DOMAIN: "uptapgame.com",
  SLOGAN: "Play Free Games Online",
  DESCRIPTION: "",
};

// 统计ID
export const GA_ID = "G-L2E7FV0F5M";

// 广告设置
export const SHOW_AD = true;
export const DEV_MODE = false;

// AdSense ID
export const ADSENSE_ID = "ca-pub-4975852181579567";

// AdSense 广告ID
export const ADS_SLOT_ID = {
  HOME: "3630570624",
  DETAIL: "9812835592",
  CATEGORY: "",
};

// 游戏参数设置
export const CHANNEL = `uptapgame`;
export const GAME_DOMAIN = `https://cdn.uptapgame.com/`;
export const GAME_PATH = `${GAME_DOMAIN}/newgames/minigame.html?platform=${CHANNEL}&appid=`;

// 图片参数设置
export const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/`;
export const IMAGE_FORMAT = `webp`;

// 推荐游戏
export const RECOMMEND_GAMES = [
  // 方式1：{ appid: "", weight: 10 }, { appid: "", weight: 9 }, { appid: "", weight: 8 }
  // 方式2："SausageRun", "HouseLink"
  "LostInLust",
];

// 推荐分类
export const RECOMMEND_CATEGORIES = [
  // 方式1：{ category: "", weight: 10 }, { category: "", weight: 9 }
  // 方式2："Adventure", "Action"
];
