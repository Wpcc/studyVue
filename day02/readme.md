## 文件说明
### example02
- 用node建立后台，提供数据接口
  + express：封装业务处理
  + mongoose：mongose数据库操作
- 用vue与后台建立连接，用于View视图层的增删改查
  + bootstrap:视图
  + vue-resource：promise数据获取

数据设计：

| id             | name   | date     | operation |
| -------------- | ------ | -------- | --------- |
| 数据库自动生成 | 汽车名 | 生成日期 | 删除      |
