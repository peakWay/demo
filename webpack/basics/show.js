
class Student {
    constructor() {
        this.name = 'feitao'
    }
}

module.exports =  {
    show (content) {
        const temp = new Student()
        console.log(temp)
        
        window.document.getElementById('js_app').innerText = 'Hello' + content + '!!!'

        
    }
}