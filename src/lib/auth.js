import bcrypt from "bcryptjs";
import { db } from "./../db/index";
import { usersTable } from "./../db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(SECRET);
}

export async function decrypt(token) {
  const { payload } = await jwtVerify(token, SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function register(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1).execute();

    if (existingUser && existingUser.length > 0) {
      throw new Error("E-mail já cadastrado.");
    }
    
    await db.insert(usersTable).values({ name, email, password: hashedPassword });

    return login(email, password);
  } catch (error) {
  
    throw new Error(error.message || "Erro ao cadastrar usuário.");
  }

}

export async function login(email, password) {

  const user = (await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1).execute())[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Credenciais inválidas");
  }

  const expires = new Date(Date.now() + 1000 * 60 * 60 * 1);
  const session = await encrypt({ user, expires });

  (await cookies()).set('session', session, { expires, httpOnly: true } );
  return { success: true, userId: user.id };
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}



