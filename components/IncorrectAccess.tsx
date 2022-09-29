import Link from "next/link";

export default function IncorrectAccess() {
  return (
    <div>
      <div className="wrapper">
        <h1 className="warning-message">잘못된 접근입니다</h1>
        <Link href={"/"}>
          <div className="back-to-main">돌아가기</div>
        </Link>
      </div>

      <style jsx>{`
        .wrapper {
          width: 40%;
          margin: 0 auto;
          color: #e7f6f2;

          padding: 20px;
          display: inline-block;
          text-align: center;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .warning-message {
          padding: 20px;
          font-size: 48px;
        }
        .back-to-main {
          width: 40%;
          margin: 0 auto;
          cursor: pointer;
          font-size: 32px;
          border: 1px solid #a5c9ca;
          border-radius: 8px;
          padding: 20px;
          background-color: #2c3333;
        }
      `}</style>
    </div>
  );
}
