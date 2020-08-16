export default interface User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  whatsapp?: string;
  avatar?: string;
  bio?: string;
}
