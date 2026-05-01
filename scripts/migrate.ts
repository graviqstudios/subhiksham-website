// scripts/migrate.ts
// Run with: npx tsx scripts/migrate.ts
// This creates all tables in your Neon DB

import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URI!, { ssl: 'require' });

async function migrate() {
  console.log('🚀 Running migrations...');

  // ── 1. Admin Users ────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id          SERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      email       TEXT        UNIQUE NOT NULL,
      password    TEXT        NOT NULL,          -- bcrypt hash
      role        TEXT        NOT NULL DEFAULT 'admin',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log('  ✓ admin_users');

  // ── 2. Menu Items ─────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id            SERIAL PRIMARY KEY,
      name          TEXT        NOT NULL,
      description   TEXT        NOT NULL DEFAULT '',
      price         NUMERIC(8,2) NOT NULL,
      category      TEXT        NOT NULL
                    CHECK (category IN ('breakfast','lunch','tiffin','specials','desserts')),
      image_url     TEXT,
      available     BOOLEAN     NOT NULL DEFAULT TRUE,
      sort_order    INT         NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log('  ✓ menu_items');

  // ── 3. Gallery Images ─────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id          SERIAL PRIMARY KEY,
      url         TEXT        NOT NULL,
      alt         TEXT        NOT NULL DEFAULT '',
      category    TEXT        NOT NULL DEFAULT 'food'
                  CHECK (category IN ('food','kitchen','ambience')),
      sort_order  INT         NOT NULL DEFAULT 0,
      published   BOOLEAN     NOT NULL DEFAULT TRUE,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log('  ✓ gallery_images');

  // ── 4. Sessions ───────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id          TEXT        PRIMARY KEY,   -- random token
      user_id     INT         NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
      expires_at  TIMESTAMPTZ NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  console.log('  ✓ admin_sessions');

  // ── Seed demo data if menu is empty ──────────────────────────────────────
  const existing = await sql`SELECT COUNT(*) FROM menu_items`;
  if (Number(existing[0].count) === 0) {
    console.log('  📦 Seeding demo menu items...');
    await sql`
      INSERT INTO menu_items (name, description, price, category, available, sort_order) VALUES
        ('Masala Dosa',    'Crispy rice-lentil crepe with spiced potato masala, sambar and chutney', 80,  'breakfast', true,  1),
        ('Idli Sambar',    'Steamed rice cakes with lentil soup and assorted chutneys',             60,  'breakfast', true,  2),
        ('Vada with Chutney', 'Crispy lentil fritters with coconut chutney',                       50,  'breakfast', true,  3),
        ('Pongal',         'Creamy rice and moong dal with pepper, cumin and ghee',                70,  'breakfast', false, 4),
        ('Upma',           'Semolina cooked with mustard seeds, curry leaves and vegetables',       55,  'breakfast', true,  5),
        ('Poori Masala',   'Deep-fried wheat bread with potato masala',                            75,  'breakfast', true,  6),
        ('Meals (Sadya)',  'Traditional Kerala feast with rice, sambar, rasam, avial and payasam', 150, 'lunch',     true,  1),
        ('Sambar Rice',    'Rice mixed with lentil and vegetable stew',                            100, 'lunch',     true,  2),
        ('Curd Rice',      'Cooling yogurt rice tempered with mustard seeds and curry leaves',      80,  'lunch',     true,  3),
        ('Rava Dosa',      'Crispy semolina crepe with onion and green chili',                      90,  'tiffin',    true,  1),
        ('Uthappam',       'Thick rice pancake topped with onions, tomatoes and chilies',           85,  'tiffin',    true,  2),
        ('Palakkad Special Meal', 'Chef''s curated meal featuring Palakkad''s signature dishes',  250, 'specials',  true,  1),
        ('Filter Coffee',  'Traditional South Indian filter coffee with frothed milk',              40,  'specials',  true,  2),
        ('Payasam',        'Traditional vermicelli dessert in sweetened milk with nuts',            50,  'specials',  true,  3),
        ('Gulab Jamun',    'Deep-fried milk dumplings in rose-cardamom syrup',                      50,  'desserts',  true,  1),
        ('Kheer',          'Creamy rice pudding with almonds, cashews and saffron',                 55,  'desserts',  true,  2)
    `;
    console.log('  ✓ Seeded 16 menu items');
  }

  console.log('\n✅ Migration complete!');
  await sql.end();
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});