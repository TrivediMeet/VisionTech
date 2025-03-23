# Database Migrations

This directory contains SQL migration files for the Supabase database.

## Migration Files

- `20240101000000_create_orders_tables.sql`: Creates the orders and order_items tables needed for the checkout functionality.

## How to Apply Migrations

These migrations need to be applied to your Supabase project. You can do this through the Supabase dashboard or using the Supabase CLI.

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of the migration file
4. Run the SQL commands

### Using Supabase CLI

```bash
supabase db push
```

This will apply all pending migrations to your database.