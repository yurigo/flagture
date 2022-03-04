#Flagture

Flagture es un servicio que nos devolverá qué características tienen activadas o desactivadas los usuarios.

En clase hemos implementado el endpoint `/api`.

Dicho endpoint (según hemos diseñado en clase) requiere 2 parámetros: `user` y `app` (los cuales los hemos pasado por querystring).  La implementación de dicho endpoint hace una query a la base de datos y devuelve los flags/features para esa app y ese usuario.

Para conectarse a la base de datos se necesita un .env con las credenciales a la base de datos.  Duplica `sample.env`, renómbralo en `.env` y sustituye los datos de éste para conectarte con tu base de datos.