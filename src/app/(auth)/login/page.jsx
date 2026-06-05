"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      const { data } = await api.post("/token/", {
        email: dataForm.email,
        password: dataForm.password,
      });

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("userEmail", dataForm.email);

      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
          <p className="text-sm text-slate-500">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: "El email es obligatorio" })}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0066FF]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Accediendo..." : "Iniciar sesión"}
          </Button>

          {serverError && (
            <p className="text-xs text-center text-red-500 bg-red-50 p-2 rounded">
              {serverError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
