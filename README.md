# Домашнее задание по курсу «Технологии разработки веб-приложений»

## Вариант: ТРВП-020

Разработать клиент-серверное приложение, реализующее функциональные требования (CRUD-операции), заданные в пределах указанной предметной области, с соблюдением следующих технических требований:

- Клиентская сторона приложения должна быть разработана с использованием языка разметки HTML, таблиц стилей CSS и языка программирования JavaScript. Разрешено использоватьлюбую пользовательского веб-интерфейса.
- Серверная сторона приложения должна быть разработана с использованием языка программирования JavaScript и платформы Node.js. Разрешено использовать любую библиотеку/фреймворк для создания сервера.
- Взаимодействие между клиентом и сервером должно осуществляться через спроектированный REST-like API.
- Данные на серверной стороне должны храниться в базе данных. Разрешено использовать любую БД и СУБД, к которой возможно подключиться из JavaScript кода.
- Вместо JavaScript разрешено использовать TypeScript.

Приложение представляет собой раздел личного кабинета менеджера автомастерской, отвечающий за распределение работы на конечный период времени. В
разделе указывается список автомехаников с возможностью добавления автомеханика в
список, удаления его из списка и редактирования информации о нем. Информация об
автомеханике: ФИО (строка), ID (строка, нередактируемый атрибут), марки автомобилей
(множественный выбор из списка). Перечень марок автомобилей задается изначально и
может быть дополнен из интерфейса приложения. У каждого автомеханика есть список
назначенных ему заданий на ТО, в который можно добавлять задания и удалять их из
списка, а также переводить задание с одного механика на другого. Атрибуты задания на
ТО: марка автомобиля (выбор из списка), наименование операции (строка), сложность
(выбор варианта из списка в условных единицах), ID (строка, нередактируемый атрибут).
Каждый автомеханик может выполнить несколько заданий с суммарной сложностью N.
Если добавляемое (любым способом) механику задание превышает заданный лимит
сложности N или марка автомобиля в задании не соответствует перечню марок, с
которыми работает механик, должно отобразиться уведомление-предупреждение о
невозможности назначения задания данному мастеру. Соотношение уровней сложности
в условных единицах, а также величина N задается разработчиком.

## **Стек**
### front:
- HTML (YES :--) obviously)
- CSS (YES :--) obviously)
- JavaScript (Logic)
- React (UI)
- nginx ( default interlayer <->)
### back:
### server:
- Node.js (YES :--) obviously)
- Express (back framework)
- Sequelize (ORM why not i guess)
### DB:
- PostgreSql (cool <-------)

## **REST APi**
Будет реализовано несколько API-эндпоинтов для CRUD операций:
### Автомеханики
1. Получить список автомехаников
`GET /api/mechanics`
2. Добавить автомеханика
`POST /api/mechanics`
3. Редактировать информацию автомеханика
`PUT /api/mechanics/:id`
4. Удалить автомеханика
`DELETE /api/mechanics/:id`
### Задания на ТО
1. Получить список заданий механика
`GET /api/mechanics/:id/tasks`
2. Добавить задание
`POST /api/mechanics/:id/tasks`
3. Удалить задание
`DELETE /api/mechanics/:id/tasks/:taskId`
4. Переназначить задание на другого механика
`PUT /api/mechanics/:id/tasks/:taskId`
## **СТАТУС -> DONE (100%)**
### RUN:
`
study-WEB/> docker-compose up --build
`
### RERUN:
`
study-WEB/> docker-compose down 
`\
`
study-WEB/> docker-compose up 
`
### RESET:
`
study-WEB/> docker-compose down && docker volume rm study-web_postgres_data
`
