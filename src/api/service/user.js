export default function(base, http) {
  let baseUrl = base.user

  return {
    queryUserInfo(params) {
      return http.get(`${baseUrl}/getUserInfo`, params, { noLoading: true })
    },
    searchUser(params) {
      return http.post(`${baseUrl}/queryUser`, params)
    }
  }
}
