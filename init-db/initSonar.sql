DO
$do$
BEGIN

   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'sonarqube') THEN

      CREATE DATABASE sonarqube;
   END IF;
END
$do$;