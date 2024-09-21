import React, { createContext, useContext } from 'react';

export interface Slide {
  id: number;
  title: string;
  years: string;
}

// моковые данные слайдов
const slidesData: Slide[] = [
  { id: 0, title: 'Спорт', years: '1955 1966 ' },
  { id: 1, title: 'Кино', years: '1966 1977' },
  { id: 2, title: 'Литература', years: '1978 1989' },
  { id: 3, title: 'Культурка', years: '1990 2001' },
  { id: 4, title: 'Слайд 5', years: '2002 2013' },
  { id: 5, title: 'Наука', years: '2024 2035' },
];

const SlidesContext = createContext<Slide[]>([]);

export const SlidesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SlidesContext.Provider value={slidesData}>{children}</SlidesContext.Provider>;
};

// кастомный хук для использования контекста
export const useSlides = () => useContext(SlidesContext);
