import sql from 'better-sqlite3';

import slugify from 'slugify';
import xss from 'xss';
import { MealFormData } from './actions';

import { S3 } from '@aws-sdk/client-s3';

const db = sql('meals.db');

const s3 = new S3({
  region: 'eu-west-3',
});

export interface Meal {
  id: string;
  slug: string;
  title: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal;
}

export async function saveMeal(mealFormData: MealFormData) {
  const slug = slugify(mealFormData.title, { lower: true });
  mealFormData.instructions = xss(mealFormData.instructions);

  const extension = mealFormData.image?.name.split('.').pop();
  const fileName = `${slug}.${Math.random()}.${extension}`;

  const bufferedImage = await mealFormData.image?.arrayBuffer();

  if (bufferedImage) {
    s3.putObject({
      Bucket: 'enespcetin-nextjs-demo-users-image',
      Key: fileName,
      Body: Buffer.from(bufferedImage),
      ContentType: mealFormData.image?.type,
    });
  }

  const meal = {
    ...mealFormData,
    slug,
    image: fileName,
  };

  db.prepare(
    `
  INSERT INTO meals 
    (slug,title,image,summary,instructions,creator,creator_email)
  VALUES (
    @slug,
    @title,
    @image,
    @summary,
    @instructions,
    @creator,
    @creator_email
  )
  `
  ).run(meal);
}
