

// 环境变量
export const HOST_PLATFORM = 'weapp'
export const APP_RUN_ENV = process.env.NODE_ENV

// url常量
export const DOMAIN_MAIN = APP_RUN_ENV == 'development' ? 'https://www.pocketuniversity.com.cn' : 'https://www.pocketuniversity.cn'
export const DOMAIN_AUTH = APP_RUN_ENV == 'development' ? 'https://auth.pocketuniversity.com.cn' : 'https://auth.pocketuniversity.cn'
export const DOMAIN_MSY = APP_RUN_ENV == 'development' ? 'https://msy.pocketuniversity.com.cn' : 'https://msy.pocketuniversity.cn'

// 应用常量
export const DEFAULT_MEDIA_ID = 'gh_01c089b58dda'
export const OSS_SITE = 'https://oss.pocketuniversity.cn'

// 开关
const MOCK_API_OPEN = false
export const USE_MOCK_API = APP_RUN_ENV === 'prod' ? false : MOCK_API_OPEN
