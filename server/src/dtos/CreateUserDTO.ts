export default interface CreateUserDTO {
  name: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
}
