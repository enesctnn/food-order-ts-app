import React from 'react';
import MealItem from './meal-item';
import classes from './meals-grid.module.css';
import { Meal } from '@/lib/meals';

async function MealsGrid({ meals }: { meals: Meal[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
