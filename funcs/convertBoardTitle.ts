type ObjType = {
  [index: string]: string;
  "notice"?: string;
  "summary"?: string;
  "result"?: string;
  "collabo"?: string;
  "NOT"?: string;
  "SUM"?: string;
  "RES"?: string;
  "COL"?: string;
};
export const getEngToKorean: ObjType = {
  "notice": "공지사항",
  "summary": "컨텐츠 정리",
  "result": "컨텐츠 진행 결과",
  "collabo": "콜라보 제의",
};
export const getEngToShort: ObjType = {
  "notice": "NOT",
  "summary": "SUM",
  "result": "RES",
  "collabo": "COL",
};

export const getShortToKorean: ObjType = {
  "NOT": "공지사항",
  "SUM": "컨텐츠 정리",
  "RES": "컨텐츠 진행 결과",
  "COL": "콜라보 제의",
};
export const getShortToEng: ObjType = {
  "NOT": "notice",
  "SUM": "summary",
  "RES": "result",
  "COL": "collabo",
};
