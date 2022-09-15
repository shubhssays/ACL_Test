/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`

  CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(255) PRIMARY KEY NOT NULL,
    fullname VARCHAR(255) NULL,
    password VARCHAR(255),
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255),
    UNIQUE(username)
  );
  
 
 CREATE TABLE IF NOT EXISTS role (
    id serial primary key,
    role_name VARCHAR(255) NULL,
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255),
    UNIQUE(role_name)
  );
 
 
insert into role(role_name,created_by) values ('admin','DEFAULT');
insert into role(role_name,created_by) values ('seller','DEFAULT');
insert into role(role_name,created_by) values ('supporter','DEFAULT');
insert into role(role_name,created_by) values ('customer','DEFAULT');


CREATE TABLE IF NOT EXISTS permissions (
    id serial primary key,
    permission_name VARCHAR(255) NULL,
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255),
    UNIQUE(permission_name)
  );

insert into permissions(permission_name,created_by) values ('create','DEFAULT');
insert into permissions(permission_name,created_by) values ('update','DEFAULT');
insert into permissions(permission_name,created_by) values ('delete','DEFAULT');
insert into permissions(permission_name,created_by) values ('fetch','DEFAULT');


CREATE TABLE IF NOT EXISTS role_permissions (
    id serial primary key,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE RESTRICT,
    role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE RESTRICT,
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255),
    UNIQUE(permission_id,role_id)
  );
 
 --admin permissions
insert into role_permissions (permission_id,role_id,created_by) values (1,1,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (2,1,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (3,1,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (4,1,'DEFAULT');

--seller permission
insert into role_permissions (permission_id,role_id,created_by) values (1,2,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (2,2,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (4,2,'DEFAULT');
 
--supporter permission
insert into role_permissions (permission_id,role_id,created_by) values (3,3,'DEFAULT');
insert into role_permissions (permission_id,role_id,created_by) values (4,3,'DEFAULT');

--customer permission
insert into role_permissions (permission_id,role_id,created_by) values (4,4,'DEFAULT');

 
 CREATE TABLE IF NOT EXISTS users_role (
    id serial primary key,
    username VARCHAR(255) NOT NULL REFERENCES users(username) ON DELETE RESTRICT,
    role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE RESTRICT,
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255),
    UNIQUE(username)
 );
 

 CREATE TABLE IF NOT EXISTS products (
    id serial primary key,
    product_name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NULL,
    active BIT(1) DEFAULT '1' NOT NULL,
    enabled BIT(1) DEFAULT '1' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(255) NOT NULL,
    modified_by VARCHAR(255)
 );
 
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
drop table if exists products;
drop table if exists role_permissions;
drop table if exists permissions;
drop table if exists users_role;
drop table if exists role;
drop table if exists users;
`);
};
