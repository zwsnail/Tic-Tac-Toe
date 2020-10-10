var express = require("express");
var app = express();
app.use(express.static("./")); //静态读取 HTML/CSS 文件

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
