interface pagesUrl {
  loginUrl: string;
  loginUrl2: string;
  signUpUrl: string;
  homePageUrl: string;
  signUpWorkspaceUrl: string;
  resetPassUrl: string;
  resetPassSuccessUrl: string;
  trackerPageUrl: string;
}

const pagesUrl: pagesUrl = {
  loginUrl: "https://auth.dev.quidlo.com/",
  loginUrl2: "https://auth.dev.quidlo.com/login",
  signUpUrl: "https://auth.dev.quidlo.com/signup",
  homePageUrl: "https://timesheets.dev.quidlo.com/",
  signUpWorkspaceUrl: "https://auth.dev.quidlo.com/workspace",
  resetPassUrl: "https://auth.dev.quidlo.com/reset-password",
  resetPassSuccessUrl: "https://auth.dev.quidlo.com/reset-password-success",
  trackerPageUrl: "https://timesheets.dev.quidlo.com/tracker",
};

export default pagesUrl;
