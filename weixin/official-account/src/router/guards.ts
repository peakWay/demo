import { getLoginLink, getToken } from "@/service/login";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function weixinLoginGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {

    const token = localStorage.getItem('token')
    
    if (!token) {
        const code = to.query.code as string
        if (code) {
            const token = getToken(code)
            localStorage.setItem('token', token)
        } else {
            location.href = getLoginLink()
            return
        }
    } else {
        // 验证token是否失效
        
    }

    next()
}