/* 
Kita akan menuliskan routing yang ada di app.js, ke dalam file ini.

Perhatikan bahwa kita memiliki 3 route yang sudah dideklarasikan:
- GET /users
- GET /users/:id
- GET /users/:id/companies

Analisis:
- Semuanya memiliki prefix (awalan) `/users`

Sehingga pada file ini, kita hanya perlu menuliskan route TANPA PREFIX `/users`

Jadi yang akan dideklarasikan di sini adalah:
- GET /
- GET /:id
- GET /:id/companies
*/
