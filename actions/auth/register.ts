// app/actions/register.ts
interface RegisterData {
  role: string;
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const { role, email, password } = data;

  if (!role || !email || !password) {
    return { error: "Todos los campos son obligatorios" };
  }

  try {
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Error al crear el usuario" };
    }

    return { success: true };
  } catch (err) {
    return { error: "Error de conexión con el servidor" };
  }
}
