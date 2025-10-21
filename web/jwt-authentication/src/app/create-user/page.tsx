"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import path from "@/assets/logo.svg";
import Image from "next/image";
import React from "react";
import { Subtitle } from "@/components/ui/subtitle";
import { Link } from "@/components/ui/link";
import { CreateUser } from "@/interfaces/user";
import { Toaster } from "@/components/ui/sonner";
import { useCreateUser } from "@/hooks/useCreateUser";
import Spinner from "@/components/ui/loader";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();
  const { createUser, loading } = useCreateUser();
  const registerUser = async (data: CreateUser) => {
    const { status } = await createUser({
      name: data?.name,
      username: data?.username,
      password: data.password,
    });

    if (status === 201) {
      toast.success("Usuário cadastrado ;)", {
        position: "top-right",
      });
    } else {
      toast.error("Erro ao cadastrar usuário :(", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster richColors />
      <div className="relative w-[350px] flex flex-col justify-center gap-4 px-4 py-6 bg-secondary rounded">
        <div className="w-full flex flex-col items-center mb-4">
          <Image src={path} alt="Logo" width={100} />
          <Subtitle>Cadastrar usuário</Subtitle>
        </div>
        <div className="flex flex-col gap-1">
          <Label>Nome</Label>
          <Input
            placeholder="Seu nome..."
            {...register("name", { required: "Campo obrigatório" })}
            aria-invalid={!!errors.name}
          />
          {errors?.name && (
            <span className="text-red-400 text-[12px]">
              {errors?.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Usuário</Label>
          <Input
            placeholder="Seu usuário..."
            {...register("username", { required: "Campo obrigatório" })}
            aria-invalid={!!errors.username}
          />
          {errors?.username && (
            <span className="text-red-400 text-[12px]">
              {errors?.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Sua senha..."
            {...register("password", { required: "Campo obrigatório" })}
            aria-invalid={!!errors.password}
          />
          {errors?.password && (
            <span className="text-red-400 text-[12px]">
              {errors?.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Confirme a senha</Label>
          <Input
            type="password"
            placeholder="Sua senha..."
            aria-invalid={!!errors.passwordValidate}
            {...register("passwordValidate", {
              required: "Campo obrigatório",
              validate: (value) =>
                value === watch("password") || "As senhas não conferem",
            })}
          />
          {errors?.passwordValidate && (
            <span className="text-red-400 text-[12px]">
              {errors?.passwordValidate?.message}
            </span>
          )}
          <Link path="/login" className="text-end text-primary">
            Voltar para a tela de login
          </Link>
        </div>
        <Button onClick={() => handleSubmit(registerUser)()}>Cadastrar</Button>
        {loading && (
          <div className="absolute left-0 top-0 rounded w-full h-full flex justify-center items-center backdrop-blur bg-white/30">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
