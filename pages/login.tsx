export default function Login() {
  return (
    <div className="wrapper">
      <a href="http://localhost:3000/auth/twitch" className="login-a">
        <div className="login-div">트위치로 로그인</div>
      </a>

      <style jsx>{`
        .wrapper {
          margin: 0 auto;
          padding: 20%;
        }
        .login-div {
          width: 300px;
          height: 50px;
          padding: 15px 0 0 0;
          text-align: center;
          font-size: 30px;
          border: 1px solid #e7f6f2;
          border-radius: 7px;
          cursor: pointer;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .login-a {
          text-decoration: none;
          color: #e7f6f2;
        }
      `}</style>
    </div>
  );
}
