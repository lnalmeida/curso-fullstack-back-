import crypto from 'bcrypt';

function HashPassword(password: string): string {
  const salt = crypto.genSaltSync(16);

  const hashedPassword = crypto.hashSync(password, salt);

  return hashedPassword;
}

export default HashPassword;
