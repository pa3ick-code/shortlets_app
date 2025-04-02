type authData = {
    username?: string;
    email: string;
    password: string;
}

type ButtonUiProps = {
    title: string,
    icon?: any,
    disabled?: boolean,
    colorMode?: 'default' | 'primary',
    loading?: boolean,
    btnAction?: ()=>void
}

enum strategy {
  APPLE='oauth_apple',
  GITHUB='oauth_github',
  FACEBOOK='oauth_facebook',
}
