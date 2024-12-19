interface User {
  id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: User | null;
    }
  }
}
