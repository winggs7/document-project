export enum EStatus {
  inactive,
  active,
}

export enum ERole {
  user = 0,
  admin,
}

export enum EDocumentType {
  file,
  question,
  text,
}

export enum EFileType {
  pdf,
  doc,
  sheet,
  image,
  youtube,
  vimeo,
  video_upload,
}

export enum EQuestionType {
  bool,
  single,
  multiple,
  ordered,
  linker,
  fill,
  pick,
  open,
  video,
  screencast,
}
