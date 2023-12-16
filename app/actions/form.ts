"use server";
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma?.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissionRate / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissionRate, submissions, bounceRate };
}

export async function CreateForm(data: formSchemaType) {
  const { name, description } = data;

  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Form Not Valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("Some thing went wrong");
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
