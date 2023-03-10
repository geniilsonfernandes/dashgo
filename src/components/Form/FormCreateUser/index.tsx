import { Input } from "@/components/Form/Input";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Skeleton,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  password: yup.string().required("Campo obrigatório")
});

export type IFormValues = {
  name: string;
  email: string;
  password: string;
};

type IFormProps = {
  initialValues?: IFormValues;
  onSubmit: (values: IFormValues) => void;
  isLoading?: boolean;
  loadingValues?: boolean;
};

const Form = ({
  onSubmit,
  initialValues,
  isLoading = false,
  loadingValues = false
}: IFormProps) => {
  console.log(initialValues);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormValues>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues?.name,
      email: initialValues?.email,
      password: initialValues?.password
    }
  });

  const hasInitialValues = !!initialValues;

  const handleCreateUser = (values: IFormValues) => {
    onSubmit(values);
  };

  useEffect(() => {
    if (hasInitialValues) {
      setValue("name", initialValues?.name);
      setValue("email", initialValues?.email);
      setValue("password", initialValues?.password);
    }
  }, [initialValues]);

  return (
    <>
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <Skeleton colorScheme="blue" isLoaded={!loadingValues} rounded="8px">
          <Heading size="lg" fontWeight="normal">
            {hasInitialValues ? "Editar usuário" : "Criar usuário"}
          </Heading>
        </Skeleton>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" columns={2} spacing={8} w="100%">
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Controller
                name="name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="name"
                    label="Nome completo"
                    value={value}
                    onChange={onChange}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    autoComplete="off"
                  />
                )}
              />
            </Skeleton>
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="email"
                    label="Email"
                    value={value}
                    onChange={onChange}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    autoComplete="off"
                  />
                )}
              />
            </Skeleton>
          </SimpleGrid>
          <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    name="password"
                    type="password"
                    label="Senha"
                    value={value}
                    onChange={onChange}
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                    autoComplete="off"
                  />
                )}
              />
            </Skeleton>
          </SimpleGrid>
        </VStack>
        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Link href="/student" passHref>
                <Button colorScheme="whiteAlpha" disabled>
                  cancelar
                </Button>
              </Link>
            </Skeleton>
            <Skeleton
              colorScheme="blue"
              isLoaded={!loadingValues}
              rounded="8px"
            >
              <Button
                isDisabled={Object.keys(errors).length > 0}
                isLoading={isLoading}
                loadingText="Enviando"
                colorScheme="facebook"
                onClick={handleSubmit(handleCreateUser)}
              >
                {hasInitialValues ? "Salvar" : "Criar"}
              </Button>
            </Skeleton>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Form;
