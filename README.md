### Popovers

[![Build status](https://ci.appveyor.com/api/projects/status/j8xqp3bc0wpxdfke/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-form-popover-and-list-editor/branch/main)

deployment: https://marinaustinovich.github.io/ahj-homeworks-form-Popover_and_List-Editor/
#### Легенда

Есть замечательный фреймворк Bootstrap, в котором реализовано достаточно много интересных виджетов с использованием jQuery. Но, как говорят современные и модные программисты, «jQuery не нужен», поэтому реализован виджет на чистом JS.

#### Описание

Вот так выглядит виджет в целом. Виджет всегда показывается сверху.

![](./src/img/Popovers.png)


У popover есть название и текст. Центрируется он по горизонтали относительно элемента, который вызвал popover.

---

### Редактор списка

#### Легенда

CRM-система, где в списке представлены товары. Выглядит это примерно так, как на скетче:
![](./src/img/list.png)

#### Описание

Реализованы базовые операции CRUD: create, read, update, delete.

При нажатии на кнопку редактирования или добавления открывается всплывающее окно:

![](./src/img/list-2.png)

Если нажиать на кнопку + (добавить), то окно пустое, если  на кнопку ✎ (редактировать), то поля заполнены.

Только после нажатия на кнопку «Сохранить» данные в таблице обновляются.

Валидация данных:  в полях «Название» и «Стоимость» есть текст, причём в поле «Стоимость» допустимы только числа больше 0, т. к. в памяти стоимость должна храниться в виде числа, а не в виде строки. Если ошибки присутствуют, они отображаются под полями ввода в виде текста.

После редактирования, если нажать на кнопку добавить, форма находится в правильном состоянии: нет сообщений об ошибках, т. к. пользователь ещё не взаимодействовал с формой.

При нажатии на кнопку ✕ строка удаляется с подтверждением в виде всплывающего окна.

Все данные хранятся в памяти в виде JS-объектов. DOM-дерево перестраиваться исходя из содержимого в памяти.
