const userInfoDefault = [
  { name: 'fff', account: 'f333' },
  { name: 'ggg', account: 'g111' }
]
const userInfo = localStorage.userInfo || userInfoDefault
export default {
  getUserInfo() {
    return {
      code: '100',
      data: userInfo
    }
  },
  queryUser(param) {
    const certainUser =
      param &&
      userInfo.find((user) => {
        return Object.keys(user).some((key) => {
          return user[key].includes(param)
        })
      })
    return {
      type: 'post',
      code: param ? '100' : '101',
      data: certainUser || []
    }
  }
}
