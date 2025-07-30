// src/components/CourseList.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { info } from '../assets/info';

const CourseList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {info.map((course) => (
        <ProductCard
          key={course.title}
          title={course.title}
          description={course.description}
          price={course.price}
          image={course.image}
          category={course.category}
          level={course.level}
        />
      ))}
    </div>
  );
};

export default CourseList;