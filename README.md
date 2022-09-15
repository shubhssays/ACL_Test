# ACL_Test

1. CREATE DATABASE "acl" MANUALLY BEFORE RUNNING MIGRATION FILE.
2. COMMANDS TO RUN MIGRATION

1. FIRE UP GIT BASH AND EXECUTE BELOW

-- please replace DB_PASSWORD FROM YOUR database password in below string.

DATABASE_URL=postgres://postgres:DB_PASSWORD@localhost:5432/question_bank npm run migrate up
