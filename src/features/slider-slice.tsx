import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SlideContent {
  year: string;     
  event: string;  
}

export interface Slide {
  id: number;
  title: string;
  years: string;
  content: SlideContent[]; 
}

interface SlidesState {
  slides: Slide[];
  activeSlideIndex: number;
}

// Моковые данные, при необходимости можно получать с API и подгружать через useEffect в компоненте
const initialState: SlidesState = {
  slides: [
    { 
      id: 0, 
      title: 'Спорт', 
      years: '1955 1966', 
      content: [
        { year: '1955', event: 'Первый чемпионат мира по футболу среди женщин' },
        { year: '1956', event: 'Олимпийские игры в Мельбурне' },
        { year: '1957', event: 'Спортивное событие 1957 года' },
        { year: '1958', event: 'Чемпионат мира по футболу в Швеции' },
        { year: '1959', event: 'Первый чемпионат Европы по баскетболу' },
        { year: '1960', event: 'Первые Летние Паралимпийские игры' },
      ]
    },
    { 
      id: 1, 
      title: 'Кино', 
      years: '1966 1977', 
      content: [
        { year: '1966', event: 'Выпуск фильма «Человек с бульвара Капуцинов»' },
        { year: '1967', event: 'Кинособытие 1967 года' },
        { year: '1968', event: 'Премьера фильма «Космическая одиссея 2001 года»' },
        { year: '1969', event: 'Первый международный кинофестиваль в Москве' },
        { year: '1970', event: 'Выход фильма «Звёздные войны»' },
        { year: '1971', event: 'Премьера фильма «Механический апельсин»' },
      ]
    },
    { 
      id: 2, 
      title: 'Литература', 
      years: '1978 1989', 
      content: [
        { year: '1978', event: 'Публикация романа «Дети капитана Гранта»' },
        { year: '1979', event: 'Литературное событие 1979 года' },
        { year: '1980', event: 'Нобелевская премия по литературе' },
        { year: '1981', event: 'Издание романа «Туманность Андромеды»' },
        { year: '1982', event: 'Литературное событие 1982 года' },
        { year: '1983', event: 'Выход романа «Один день Ивана Денисовича»' },
      ]
    },
    { 
      id: 3, 
      title: 'Культурка', 
      years: '1990 2001', 
      content: [
        { year: '1990', event: 'Открытие Эрмитажа для широкой публики' },
        { year: '1991', event: 'Культурное событие 1991 года' },
        { year: '1992', event: 'Начало выставки современного искусства в Москве' },
        { year: '1993', event: 'Музыкальный фестиваль в Санкт-Петербурге' },
        { year: '1994', event: 'Первый фестиваль «Кинотавр» в Сочи' },
        { year: '1995', event: 'Театральный фестиваль в Казани' },
      ]
    },
    { 
      id: 4, 
      title: 'Искусство', 
      years: '2002 2013', 
      content: [
        { year: '2002', event: 'Культурное событие 2002 года' },
        { year: '2003', event: 'Премьера мюзикла «Чикаго»' },
        { year: '2004', event: 'Культурное событие 2004 года' },
        { year: '2005', event: 'Выставка современного искусства' },
        { year: '2006', event: 'Первый фестиваль «АртМосква»' },
        { year: '2007', event: 'Культурное событие 2007 года' },
      ]
    },
    { 
      id: 5, 
      title: 'Наука', 
      years: '2024 2035', 
      content: [
        { year: '2024', event: 'Открытие нового физического закона' },
        { year: '2025', event: 'Научная конференция в Берлине' },
        { year: '2026', event: 'Изобретение нового медицинского устройства' },
        { year: '2027', event: 'Запуск первой колонии на Марсе' },
        { year: '2028', event: 'Открытие в области биоинженерии' },
        { year: '2029', event: 'Прорыв в квантовой физике' },
      ]
    }
  ],
  activeSlideIndex: 0, // индекс активного слайдера, для передачив компоненты
};

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {
    setSlides: (state, action: PayloadAction<Slide[]>) => {
      state.slides = action.payload;
    },
    setActiveSlideIndex: (state, action: PayloadAction<number>) => {
      state.activeSlideIndex = action.payload;
    },
  }
});

export const { setSlides, setActiveSlideIndex } = slidesSlice.actions;
export default slidesSlice.reducer;
