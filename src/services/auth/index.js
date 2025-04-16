import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/jwt";
import UserRepository from "../../../backend/Infra/Repository/UserRepository";

const userRepository = new UserRepository();

export async function register(name, email, password) {
  try {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
        throw new Error("E-mail já cadastrado.");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await userRepository.create({ name, email, password: hashedPassword });
  
    return login(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Erro ao cadastrar usuário.");
  }

}

export async function login(email, password) {

    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciais inválidas");
    }

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 1);
    const session = await encrypt({ user, expires });

    (await cookies()).set("session", session, {
        expires,
        httpOnly: true,
      });
    
    return { success: true, userId: user.id };
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}



