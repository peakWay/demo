export function getLoginLink() {
    const appId = 'wx18ee0cd2c914ef95'
    const redirectURI = encodeURIComponent(location.href)
    const scope = 'snsapi_base'
    const state = 123
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
}

export function getToken(code: string) {
    return 'eyJrZXkiOiJjb2VjNmtlY3Axc3M5MnQwZHA0Z3VrOWZrNyIsInZhbCI6ImUyNjE3NjQyNjI5MjUyMjZiYTBkZDc2YjdlOGI5NTA1IiwidG0iOjE3MTMxNjEwNDF9'
}