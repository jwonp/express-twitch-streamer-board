export const getEngToKorean = (name: string): string => {
  switch (name) {
    case "notice":
      return "공지사항";
    case "summary":
      return "컨텐츠 정리";
    case "result":
      return "컨텐츠 진행 결과";
    case "collabo":
      return "콜라보 제의";
    default:
      return "";
  }
};

export const getEngToShort = (name: string): string => {
  switch (name) {
    case "notice":
      return "NOT";
    case "summary":
      return "SUM";
    case "result":
      return "RES";
    case "collabo":
      return "COL";
    default:
      return "";
  }
};

export const getShortToKorean = (name: string): string => {
  switch (name) {
    case "NOT":
      return "공지사항";
    case "SUM":
      return "컨텐츠 정리";
    case "RES":
      return "컨텐츠 진행 결과";
    case "COL":
      return "콜라보 제의";
    default:
      return "";
  }
};
