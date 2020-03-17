### Webpack 知识点

#### ATS(Abstract Syntax Tree) 抽象语法树
- 定义：是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

#### 原理
1. 通过入口，将文件通过 babel/parser 解析成 AST，在通过