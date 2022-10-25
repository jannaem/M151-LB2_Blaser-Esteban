DELETE FROM vinosfue_database.to_do_list_task;
DELETE FROM vinosfue_database.task;
DELETE FROM vinosfue_database.to_do_list;
DELETE FROM vinosfue_database.user;



insert into vinosfue_database.user (user_id, email, first_name, last_name, password, username)
       values (12, 'test@gmail.com', 'test', 'test','$2a$10$FiqmJs.ytHcn3ajXdvKHT.4duVLIO4SC5tiPhYGGQ6ZSPZsfb9Gjy', 'test'),
       (13, 'test1@gmail.com', 'test1', 'test1','$2a$10$FiqmJs.ytHcn3ajXdvKHT.4duVLIO4SC5tiPhYGGQ6ZSPZsfb9Gjy', 'test1');

 insert into vinosfue_database.to_do_list(to_do_list_id, name, id_user)
 values(1, 'testing', 12);
 insert into vinosfue_database.task(id, name, status) values (1, 'passing the test', true);
 insert into vinosfue_database.to_do_list_task(todo_list_task_id, id_list, id_task) values (1, 1, 1);
