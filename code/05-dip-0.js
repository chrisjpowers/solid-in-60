class MemberLogin {
  constructor(user) {
    this.successPath = "/home";
    this.user = user;
  }
  authenticate(pw) {
    return UserAuth.isAuthenticatedBy(this.user.hashedPassword, pw);
  }
}

class UserAuth {
  isAuthenticatedBy(hashedPw, pw) {
    return UserAuth.hash(UserAuth.salt(pw)) === hashedPw;
  }
  static salt(str) { return `${str}-salted`; }
  static hash(str) { return `${str}-hashed`; }
}