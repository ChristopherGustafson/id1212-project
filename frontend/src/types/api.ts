export type loginParams = Required<{
  email: string;
  password: string;
}>;

export type chessMoveParams = Required<{
  code: string;
  from: string;
  to: string;
}>;
