export type loginParams = Required<{
  email: string;
  password: string;
}>;

export type chessMoveParams = Required<{
  id: number;
  from: string;
  to: string;
}>;
