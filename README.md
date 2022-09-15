# ACL_Test

PLEASE FIND THE sample_env file and create new .env file and change the environment variables accoriding to your pc.

1. CREATE DATABASE "acl" MANUALLY BEFORE RUNNING MIGRATION FILE.
2. COMMANDS TO RUN MIGRATION

1. FIRE UP GIT BASH AND EXECUTE BELOW

-- please replace DB_PASSWORD FROM YOUR database password in below string.

DATABASE_URL=postgres://postgres:DB_PASSWORD@localhost:5432/acl npm run migrate up

Note: role_name can have any of the four values i.e. "admin","seller","supporter","customer"

#END_POINTS
1. /create-user: 
   method-type: POST
   request_body: { username, fullname, password, role_name } 


2. /login   
   method-type: POST
   request_body: { username, password} 


3. /products   
   method-type: POST
   request_body: { product_name, price, quantity }   

   /products   
   method-type: PUT
   request_body: { product_name, price, quantity, id }   

   /products   
   method-type: GET

   /products   
   method-type: DELETE
   request_body: { id }   


  note : SOFT Delete functionality is given. Deleted products are set active = '0' in database. 
  



    
