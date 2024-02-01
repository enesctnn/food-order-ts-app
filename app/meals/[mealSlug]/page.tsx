import React from 'react';

function MealDetails({ params }: { params: { mealSlug: string } }) {
  return <h1>{params.mealSlug}</h1>;
}

export default MealDetails;
