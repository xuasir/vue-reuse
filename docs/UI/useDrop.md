## 简介
一个帮你处理`Dom`元素`drag`/`drop`逻辑的`hooks`  :tada:
> 仅需要绑定一些`props`,如果您正在使用`jsx`可以直接通过扩展运算符展开来绑定`props`  
> 还能处理文件拖拽及超链接拖拽

## 代码演示
#### 基本使用  
::: tip Tips
1. 拖拽`item`到`drop`区域可将`customKey`值传递到`onDom`事件
2. 点选`drop`区域，然后进行粘贴操作，可以将粘贴内容传递到`onText`事件
3. 拖拽`uri`到`drop`区域可将`uri`传递到`onUri`事件
4. 拖拽文件到`drop`区域可将文件信息传递到`onFiles`事件
:::
<use-drop />
#### 代码  
::: details 点击查看代码
<<< @/docs/.vuepress/components/useDrop.vue
:::

## API  
```ts
const getDragProps = useDrag()
const dragProps = getDragProps(key?)
const [dropProps, isHovering] = useDrop({
  onDom?: (content, evt?) => void
  onText?: (text, evt?) => void
  onUri?: (uri, evt?) => void
  onFiles?: (files, evt?) => void
})
```

#### RetrunValue
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `getDragProps` | 获取`dragProps`的函数 | `(key?: any) => DragProps` |
| `isHovering` | `drop`元素是否有`drag`元素覆盖在上方 | `ComputedRef<boolean>` |

#### DragProps 
::: tip 
`getDragProps`是否传递`key`值，会直接影响`key`和`onDragStart`的生成  
如果不传递`key`则需要在绑定`key`和`onDragStart`的时候显示的调用并传入`customKey`来生成`key`和`onDragStart`这一般用于可`drag`的元素是多个的情况
:::
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `draggable` | 标识元素可拖拽 | `'true' as const` |
| `key` | 可拖拽元素的key值 | `string` | `(key: any) => string` |
| `onDragStart` | `dragstart`时间函数 | `(evt: DragEvent) => void` | `(key: any) => (evt: DragEvent) => void` |

#### DropProps
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `onDragOver` | `dragover`事件函数 | `(evt: DragEvent) => any` |
| `onDragEnter` | `dragenter`事件函数 | `(evt: DragEvent) => any` |
| `onDragLeave` | `dragleave`事件函数 | `(evt: DragEvent) => any` |
| `onDrop` | `drop`事件函数 | `(evt: DragEvent) => any` |
| `onPaste` | `paste`事件函数 | `(evt: ClipboardEvent) => any` |

#### Params
| 参数 | 说明 | 类型 |
| --- | --- | --- |
| `onDom` | 拖拽`Dom`时候的回调 | `(content: any, evt?: DragEvent) => void` |
| `onText` | 粘贴内容时候的回调 | `(text: string, evt?: ClipboardEvent) => void` |
| `onUri` | 拖拽`uri`时候的回调 | `(uri: string, evt?: DragEvent) => void` |
| `onFiles` | 拖拽文件时候的回调 | `(files: File[], evt?: DragEvent) => void` |

