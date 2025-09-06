# Smart Student Hub — Quick start (PowerShell)

This README shows the minimum steps to run the project locally on Windows using PowerShell (`pwsh`).

Quick checklist

- The project uses SQLite (better-sqlite3) by default and creates `smart-student-hub.db` on first run.
- If you want PostgreSQL instead, see the "Migrate to PostgreSQL" section below.

1) Install dependencies

```pwsh
pnpm install
```

2) Run the app (SQLite, default)

The app will create the SQLite DB and run the SQL scripts automatically on first start.

```pwsh
pnpm dev
```

Verify the server started and is listening on http://localhost:3000.

3) (Optional) Use PostgreSQL instead

If you prefer Postgres, create `.env.local` from the example and then migrate the DB code and SQL scripts:

```pwsh
cp .env.local.example .env.local
notepad .env.local
# edit values: PGSQL_USER, PGSQL_PASSWORD, PGSQL_HOST, PGSQL_PORT, PGSQL_DATABASE
```

Notes on migration:
- The project currently uses `better-sqlite3` and `lib/database.ts`. To use Postgres you'll need to:
	1) Replace the SQLite-specific code in `lib/database.ts` with a Postgres client (for example, `pg` or an ORM).
	2) Update `scripts/01-init-database.sql` and `scripts/02-seed-data.sql` to Postgres syntax (change AUTOINCREMENT to SERIAL, DATETIME/CURRENT_TIMESTAMP to timestamptz DEFAULT now(), and adjust INSERT OR IGNORE usage).

I can convert the SQL scripts to PostgreSQL and produce a modified `lib/database.ts` that uses `pg` if you'd like — say "convert SQL to Postgres" or "migrate DB code".

Troubleshooting tips

- If TypeScript or Next complains about missing files, run `pnpm install` and then `pnpm dev` again.
- If you accidentally committed a `.env.local`, remove it from git and add it to `.gitignore`.

What's included

- `.env.local.example` — example env file (optional for SQLite).
- `scripts/` — SQL scripts used to create and seed the database (written for SQLite).

Next steps I can take for you

- Convert SQL scripts to PostgreSQL-compatible SQL.
- Update `lib/database.ts` to use PostgreSQL (`pg`) and read `DATABASE_URL`/PGSQL_* env vars.
- Start a local dev server in a terminal to verify it boots (I can run `pnpm dev` here if you want me to).
