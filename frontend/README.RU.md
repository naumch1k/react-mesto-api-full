# Учебный проект: Mesto (React JS App) с авторизацией и регистрацией пользователей

фронтенд учебного проекта в Yandex Практикуме

*Read this in other languages:* [EN](https://github.com/naumch1k/react-mesto-api-full/blob/main/frontend/README.md)

* Адрес размещения фронтенда: [https://naumch1k.students.nomoredomains.rocks/](https://naumch1k.students.nomoredomains.rocks/)
* Адрес домена сервера: [https://api.naumch1k.students.nomoredomains.rocks/](https://api.naumch1k.students.nomoredomains.rocks/)
* Публичный IP: *3.23.105.46*

Если совсем лень регистрироваться  
логин: *test@test.com*  
пароль: *testtest*

## Описание проекта
Учебный проект [Yandex Практикум](https://praktikum.yandex.ru/web/ "Курс Веб-разработчик") - интерактивная страница, где пользователи могут делиться фотографиями.

### На данном этапе реализовано
* авторизация и регистрация пользователей
* редактирование данных профиля пользователя
* изменение аватара пользователя
* добавление и удаление фотографий пользователем
* лайки
* счетчик лайков
* просмотр полноразмерной фотографии

## Технологии, которые применялись в проекте
React JS | БЭМ / файловая структура в соответствии с Nested БЭМ | адаптивная верстка | Grid Layout и Flexbox-верстка

## Инструкция по установке

```bash
# Клонируем репозиторий
git clone https://github.com/naumch1k/react-mesto-api-full.git
# Заходим в папку с проектом
cd react-mesto-api-full && cd frontend
# Устанавливаем зависимости
npm i
```
Доступные скрипты:

`npm start`

> Запускает локальный сервер на [localhost:3000](http://localhost:3000)

`npm run build`

> Собирает проект в папку `build`

`npm run deploy`

> Публикует сборку в ветку `gh-pages`

<br>

## Планы по доработке проекта
- [ ] мобильная верстка для шапки и tooltips; меню-бургер на главной странице
- [ ] "живая" валидация форм