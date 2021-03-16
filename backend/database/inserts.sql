-- INSERTS --
insert into lnk_profile (name_profile)
values ('Analista-ATC'),
       ('Gte-Finaciero'),
       ('Gte-Operaciones'),
       ('Analista-OPFX 1'),
       ('Analista-OPFX 2'),
       ('Analista-Bancario');

insert into routes (name_route,url_route,id_profile,icon)
values ('Messages','/messages',1,'chat-text-fill'),('Notifications',null,1,'bell-fill'), ('Users','/users',1,'people-fill'),('Messages','/messages',2,'chat-text-fill'),('Notifications',null,2,'bell-fill'),('Users','/users',3,'people-fill');


insert into routes (name_route,url_route,id_route_route)
values ('Sent', '/sent',8),('Sent', '/sent',11),('Received', '/received',8),('Received', '/received',11)

insert into profile_role (name_role, id_profile)
values ('app_access', 1),
       ('costumer_access_whatsapp', 1),
       ('costumer_access_telegram', 1),
       ('app_access', 2),
       ('banking_access_local', 2),
       ('banking_access_ext', 2),
       ('app_vista_gerenc_financ', 2),
       ('app_access', 3),
       ('op_venta_local_access', 3),
       ('op_ventas_ext_access', 3),
       ('op_compra_local_access', 3),
       ('op_compra_ext_access', 3),
       ('app_vista_gerenc_op', 3),
       ('app_access', 4),
       ('op_venta_local_access', 4),
       ('op_ventas_ext_access', 4),
       ('app_access', 5),
       ('op_compra_local_access', 5),
       ('op_compra_ext_access', 5),
       ('app_access', 6),
       ('banking_access_local', 6),
       ('banking_access_ext', 6);

insert into ms_users_list (email, name_user, lastname, phone, department, id_profile,gender)
values ('Rey.Padberg@karina.biz','Clementina','DuBuque','584141234040','CRM',1,'Female'),
       ('Chaim_McDermott@dana.io','Glenna','Reichert','584141234041','Tramite-Bancario',6,'Female'),
       ('Sherwood@rosamond.me','Nicholas','Runolfsdottir V','584141234042','Operaciones-FX',4,'Male'),
       ('Telly.Hoeger@billy.biz','Kurtis','Weissnat','584141234043','Operaciones-FX',4,'Male'),
       ('Karley_Dach@jasper.info','Dennis','Schulist','584141234044','Operaciones-FX',5,'Male'),
       ('Lucio_Hettinger@annie.ca','Chelsey','Dietrich','584141234045','Operaciones-FX',5,'Male'),
       ('Julianne.OConner@kory.org','Patricia','Lebsack','584141234046','Tramite-Bancario',6,'Female'),
       ('Nathan@yesenia.net','Clementine','Bauch','584141234047','CRM',1,'Female'),
       ('Shanna@melissa.tv','Ervin','Howell','584141234048','Gerencia-Operaciones',3,'Female'),
       ('Sincere@april.biz','Leanne','Graham','584141234049','Gerencia-Financiera',2,'Male')

-- END INSERTS --