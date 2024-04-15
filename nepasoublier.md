## ALL TEAM

Supprimer la contrainte "users_color_key"
ALTER TABLE IF EXISTS public.users DROP CONSTRAINT IF EXISTS users_color_key;

migration models Task de tasks_id à task_id