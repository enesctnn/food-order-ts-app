import sql from 'better-sqlite3';

const db = sql('meals.db');

export type Meal = {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
};

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare('SELECT * FROM meals').all() as Meal[];
}

export function getMeal(slug: string) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug) as Meal;
}
