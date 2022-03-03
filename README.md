统一封装前端 Vue-base，便于后续项目直接使用
初版：2021-05-06 开始

### 1.组件,过滤器,指令自动注册 组件已完成

公用组件直接写在@/components/common 文件夹下面，会自动注册，如果不想要自动注册，可以在 components 下面新建文件夹保存

### 2.mock 已完成

模拟后台接口，将 main.js 中 Vue.use(Mocks)注释掉即可取消 mock 拦截走真正后台接口

### 3.api,axios 已完成

接口调用步骤

#### 3.1 在 api/index.js 配置接口 base 前缀

（比如 url： /userservice/getUserInfo
const base = {
user: '/userservice'
}）

#### 3.2 在 api/service 下建文件，文件名 user，建议一个模块的放一个文件里面

#### 3.3 在新建的文件中配置各个接口名，这里可以引用到 base 对象，3.1 中配置了 url 前缀 key，这里可以直接 base.key 引用到

http.get 和 http.post 可以传第三个参数，里面配置 noLoading(不要 loading 特效)，配置请求头，会被自动拼接到接口请求上

#### 3.4 调用接口只需要

this.\$api.文件名.接口名(参数)

### 4.store

模块化自动注册
