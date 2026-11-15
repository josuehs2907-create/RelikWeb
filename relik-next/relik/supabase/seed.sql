-- Datos mínimos de arranque. Ejecutar después de 0001_init.sql.
insert into tenants (name, slug) values ('Taller Demo', 'demo') returning id;
-- 1) Copia el id devuelto en DEFAULT_TENANT_ID (.env.local).
-- 2) Crea un usuario en Supabase > Authentication > Users.
-- 3) Asócialo al taller (reemplaza los dos valores):
-- insert into memberships (user_id, tenant_id, role) values ('<USER_ID>', '<TENANT_ID>', 'superadmin');
