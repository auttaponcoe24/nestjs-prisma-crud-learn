## ติดตั้ง nestjs ลงเครื่อง

```bash
$ npm i -g @nestjs/cli
```

# nestjs Passport(auth)

```bash
$ yarn add @nestjs/passport passport passport-local
$ yarn add -D @types/passport-local
```

# nestjs Passport(JWT)

```bash
$ yarn add @nestjs/jwt passport-jwt
$ yarn add -D @types/passport-jwt
```

# nestjs Validator

```bash
$ yarn add class-validator class-transformer
```

# cookie

```bash
$ bun add cookie-parser
```

คำสั่งสร้างโปรเจค => nest new project-name

คำสั่ง generate module => nest generate products module => nest g products mo
คำสั่ง generate controller => nest generate products controller => nest g products co
คำสั่ง generate service => nest generate products service => nest g products s

คำสั่ง generate service มี path => nest g service src/test/ts110

คำสั่ง generate all => nest generate resource products หรือ nest g res products

MONGO_URL:mongodb://root:password@localhost:27017/db_nest_starter?authSource=admin

authSource แก้ปัญหา authenticate
