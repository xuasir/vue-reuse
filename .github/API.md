#### 返回值

- 无返回值

- 仅存在一个值

  ```js
  const xxx = useXXX()
  ```

- 存在值与其相关的一种行为

  ```js
  const [xxx, changeXXX] = useXXX()
  ```

- 存在值与其相关的多种行为

  ```js
  const [xxx, { changeXX, updateXXX }] = useXXX()
  ```

- 多个值的情况

  ```js
  const { a, b, ... } = useXXX()
  ```

- 多值多行为

  ```js
  const { changeXX, updateXXX, a, b, ... } = useXXX()
  ```

- 对接组件`Props`

  ```js
  const [props, { changeXXX, a, b, ... }] = useXXX()
  ```

#### 参数

- 无参数

- 单个参数

  ```js
  useXXX(a)
  ```

- 多个必选参数

  ```js
  // 两个
  useXXX(a, b)
  // 两个以上
  useXXX({ a, b, c, ... })
  ```

- 多个非必选

  ```js
  useXXX({ a?, b?, c?, ... })
  ```

- 必选与多选

  ```js
  useXXX(a, b?)
  useXXX(a, { b?, c? })
  ```
