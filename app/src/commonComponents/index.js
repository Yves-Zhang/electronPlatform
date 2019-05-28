import AsyncComponent from './asyncComponent'
import ThingsCard from './thingsCard'

// 使用module.exports 导出模块时，使用模块的地方import 会报错
// 这是因为module.exports 时node的导出方法，要配合require使用
// 所以这里采用export的方式导出， export和import搭配使用 是es6的导出规范

const a = AsyncComponent;
const B = ThingsCard;
export default {
    a,B
}