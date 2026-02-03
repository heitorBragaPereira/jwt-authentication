"use client";

import path from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { Subtitle } from "@/components/ui/subtitle";
import { useLoginUser } from "@/hooks/useLoginUser";
import { LoginUser } from "@/interfaces/user";
import Image from "next/image";
import Loader from "@/components/ui/loader";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const { login, loading } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();
  const router = useRouter();

  const loginUser = async (data: LoginUser) => {
    const res = await login(data);
    if (res?.success) {
      router.push("/home");
    } else {
      toast.error("Usuário ou senha incorretos!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster richColors />
      <form
        className="relative w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded"
        action={() => handleSubmit(loginUser)()}
      >
        <div className="w-full flex flex-col items-center mb-4">
          <Image src={path} alt="Logo" width={100} />
          <Subtitle>Acesso ao sistema</Subtitle>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            {...register("username", { required: "Campo obrigatório" })}
            aria-invalid={!!errors.username}
            placeholder="Seu usuário..."
          />
          {errors?.username && (
            <span className="text-red-400 text-[12px]">
              {errors?.username?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            {...register("password", { required: "Campo obrigatório" })}
            aria-invalid={!!errors.password}
            type="password"
            placeholder="Sua senha..."
          />
          {errors?.password && (
            <span className="text-red-400 text-[12px]">
              {errors?.password?.message}
            </span>
          )}
          <span className="text-end">
            <Link path="/create-user" className="text-primary">
              Cadastrar um novo usuário?
            </Link>
          </span>
        </div>
        <Button type="submit">Entrar</Button>

        {loading && (
          <div className="absolute left-0 top-0 rounded w-full h-full flex justify-center items-center backdrop-blur bg-white/30">
            <Loader />
          </div>
        )}
      </form>
    </div>
  );
}
