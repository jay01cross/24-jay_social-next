"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // check if current user is following user profile
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    // delete the following if current user is following user profile
    if (existingFollow) {
      await prisma.follower.delete({
        where: { id: existingFollow.id },
      });
    } else {
      // check if current user sent user profile follow request
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: { senderId: currentUserId, receiverId: userId },
      });

      // delete follow request if current user sent user profile follow request
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: { id: existingFollowRequest.id },
        });
      } else {
        // send a new follow request to user profile
        await prisma.followRequest.create({
          data: { senderId: currentUserId, receiverId: userId },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    // check if you blocked user already
    const existingBlock = await prisma.block.findFirst({
      where: { blockerId: currentUserId, blockedId: userId },
    });

    if (existingBlock) {
      // if true, unblock the user by deleting block
      await prisma.block.delete({ where: { id: existingBlock.id } });
    } else {
      // if false, block user by creating block
      await prisma.block.create({
        data: { blockerId: currentUserId, blockedId: userId },
      });
    }
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: { senderId: userId, receiverId: currentUserId },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });
    }

    await prisma.follower.create({
      data: { followerId: userId, followingId: currentUserId },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: { senderId: userId, receiverId: currentUserId },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: { id: existingFollowRequest.id },
      });
    }
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (formData: FormData) => {
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(60).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedFields = Profile.safeParse(filteredFields);

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return "err";
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: validatedFields.data,
    });
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong!");
  }
};
