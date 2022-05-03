import 'dotenv/config';

export default {
    host: process.env.REAPI_HOST,
    port: Number(process.env.REAPI_PORT),
    user: process.env.REAPI_USER,
    password: process.env.REAPI_PASSWORD,
    schema: process.env.REAPI_SCHEMA,
}