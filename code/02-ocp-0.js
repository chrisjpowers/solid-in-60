class UserAuthController {
  login(user, pw) {
    let result, path;
    path = "/home";
    result = UserAuth.isAuthenticatedBy(user.email, pw);
    return result ? {redirect: path} : {redirect: "/login"};
  }
}