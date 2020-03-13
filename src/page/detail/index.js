import '../../public/css/reset.css'
import '../../public/css/common.css'
import './demo.css'

console.log(2)

class Test{
    constructor(){
        console.log(process.env.url)
    }
}

new Test()