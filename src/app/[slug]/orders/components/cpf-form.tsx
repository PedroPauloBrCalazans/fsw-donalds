"use client";

import { z } from "zod";
import { isValidCpf, removeCpfPunctuation } from "../../menu/helpers/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const pathName = usePathname(); //pegando a rota atual

  const handleCancel = () => {
    router.back(); //usuario volta para pagina anterior
  };

  const onSubmit = (data: FormSchema) => {
    router.replace(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Digite seu CPF..."
                      format="###.###.###-##"
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button variant="destructive" className="w-full rounded-full">
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
