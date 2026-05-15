import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

// Suporte para alternância de banco de dados por ambiente
const isProd = process.env.VITE_VERCEL_ENV === 'production' || process.env.TEST_ENV === 'production'

const connectionString = 
    process.env.DATABASE_URL || 
    (isProd ? process.env.DATABASE_PROD_URL : process.env.DATABASE_PREVIEW_URL)

const dialect = new PostgresDialect({
    pool: new pg.Pool({
        connectionString,
        max: 10,
    })
})

export const db = new Kysely<Database>({
    dialect,
})