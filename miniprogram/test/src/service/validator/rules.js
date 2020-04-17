
const rules = {
    sex: [
        {required: true, type: "enum", enum: ['1', '2', 1, 2], message: '请选择性别'}
    ],
    height: [
        {required: true, message: '请填写你的身高'}
    ],
    age: [
        {type: 'string', required: true, message: '请选择你的生日'}
    ],
    home: [
        {type: 'string', required: true, message: '请选择你所在的城市'}
    ],
    qq: [
        // {required: true, message: '请填写你的qq号', },
        {validator(rule, value, callback, source, options) {
            var errors = [];
            if( !source.qq && !source.weixin ) {
                errors.push('请填写你的qq号')
            }
            callback(errors)
        }}
    ],
    weixin: [
        {validator(rule, value, callback, source, options) {
            var errors = [];
            if( !source.qq && !source.weixin ) {
                errors.push('请填写你的微信号')
            }
            callback(errors)
        }}
    ],
    phone: [
        {required: true, message: '请填写你的手机号'}
    ],
    school: [
        {required: true, message: '请填写你的学校'}
    ],
    address: [
        {required: true, message: '请选择你所在的城市'}
    ],
    tag_1: [
        {type: 'string', required: true, message: '请选择你'}
    ],
    tag_2: [
        {type: 'string', required: true, message: '请选择你'}
    ]
}

export default rules

export const requiredUserInfoKeys = ["sex", "height", "age", "home", "qq", "weixin", "phone", "school", "address"]