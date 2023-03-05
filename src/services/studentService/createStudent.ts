import prisma from "../prisma";
import { IStudent } from "./types";

export async function createStudent({ email, name, password }: IStudent) {
  try {
    const students = await prisma.students.create({
      data: {
        email,
        name,
        password
      }
    });
    return students;
  } catch (error) {
    throw new Error("Não foi possível criar o estudante");
  }
}
