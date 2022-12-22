import PublicLayout from "components//Layout/Public";
import { Col, Row, Input } from "antd";
import AppButton from "components//AppButton";
import { useState } from "react";
import { useLogin } from "hooks/login";
import { getToken } from "services/api";
import { LOCAL_STORAGE } from "constants/common";
import { useRouter } from "next/router";
import { WEB_URL } from "constants/routes";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useLogin({});
  const router = useRouter();

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const data = await login.mutateAsync({ username, password });
    if (data?.data?.response) {
      setError("Sai tên tài khoản hoặc mật khẩu");
    } else if (data?.data?.role === "user") {
      setError("Vui lòng sử dụng tài khoản admin để đăng nhập");
    } else {
      const token = data?.data?.data?.token;
      getToken(token);
      localStorage.setItem(LOCAL_STORAGE.TOKEN, token);
      router.push(WEB_URL.ADMIN);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <PublicLayout notShowFooter={true} notShowHeader={true}>
      <div className="login-background" />
      <Row className="login">
        <Col span={14}></Col>
        <Col span={10} className="login__input-wrapper">
          <div className="login__input">
            <div>
              <div className="login__input__title">
                Nhập tài khoản và mật khẩu của bạn
              </div>
              <Input
                value={username}
                onChange={handleChangeUsername}
                placeholder="Tên tài khoản"
                autoComplete="false"
                className="login__input__username"
                onKeyDown={handleKeyDown}
              />
              <Input.Password
                value={password}
                onChange={handleChangePassword}
                placeholder="Mật khẩu"
                autoComplete="false"
                className="login__input__password"
                onKeyDown={handleKeyDown}
              />
              {error && <div className="error">{error}</div>}
              <AppButton
                onClick={handleLogin}
                text="Đăng nhập"
                variant="primary"
                className="login__input__button"
              />
            </div>
          </div>
        </Col>
      </Row>
    </PublicLayout>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
