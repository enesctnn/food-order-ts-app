'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function isInvalidText(text: string) {
  return !text || text.trim() === '' || text.trim().length < 3;
}

export async function shareMeal(
  prevState: { message: string },
  formData: FormData
) {
  const meal: MealFormData = {
    title: formData.get('title') as string,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    };
  }
  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
}

export interface MealFormData {
  title: string;
  creator: string;
  creator_email: string;
  summary: string;
  instructions: string;
  image: File | null;
}
