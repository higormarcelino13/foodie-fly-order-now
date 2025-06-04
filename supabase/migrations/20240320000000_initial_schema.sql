-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    notification_preferences JSONB DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb
);

-- Addresses table
CREATE TABLE addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    street TEXT NOT NULL,
    number TEXT NOT NULL,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    location GEOGRAPHY(POINT),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Restaurant categories
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Restaurants table
CREATE TABLE restaurants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    address TEXT NOT NULL,
    location GEOGRAPHY(POINT) NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    opening_hours JSONB NOT NULL,
    delivery_radius INTEGER NOT NULL, -- in meters
    minimum_order_value DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL,
    average_preparation_time INTEGER NOT NULL, -- in minutes
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Restaurant categories (many-to-many)
CREATE TABLE restaurant_categories (
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, category_id)
);

-- Menu categories
CREATE TABLE menu_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Menu items
CREATE TABLE menu_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    preparation_time INTEGER, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Item customizations
CREATE TABLE item_customizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    max_selections INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    address_id UUID REFERENCES addresses(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivering', 'delivered', 'cancelled')),
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    estimated_delivery_time TIMESTAMP WITH TIME ZONE,
    actual_delivery_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order items
CREATE TABLE order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Order item customizations
CREATE TABLE order_item_customizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
    customization_id UUID REFERENCES item_customizations(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    food_rating INTEGER CHECK (food_rating >= 1 AND food_rating <= 5),
    delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Promotions
CREATE TABLE promotions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
    value DECIMAL(10,2) NOT NULL,
    min_order_value DECIMAL(10,2),
    max_discount DECIMAL(10,2),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User promotion uses
CREATE TABLE user_promotion_uses (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    promotion_id UUID REFERENCES promotions(id) ON DELETE CASCADE,
    uses_count INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, promotion_id)
);

-- Create indexes
CREATE INDEX idx_restaurants_location ON restaurants USING GIST (location);
CREATE INDEX idx_addresses_location ON addresses USING GIST (location);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_restaurant_id ON orders(restaurant_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_menu_items_restaurant_id ON menu_items(restaurant_id);
CREATE INDEX idx_reviews_restaurant_id ON reviews(restaurant_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at
    BEFORE UPDATE ON addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at
    BEFORE UPDATE ON restaurants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON menu_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate delivery fee based on distance
CREATE OR REPLACE FUNCTION calculate_delivery_fee(
    restaurant_location GEOGRAPHY,
    delivery_location GEOGRAPHY,
    base_fee DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
    distance DECIMAL;
BEGIN
    -- Calculate distance in kilometers
    distance := ST_Distance(restaurant_location, delivery_location) / 1000;

    -- Return base fee plus distance-based fee (R$2 per km)
    RETURN base_fee + (distance * 2);
END;
$$ LANGUAGE plpgsql;

-- Function to check if restaurant is open
CREATE OR REPLACE FUNCTION is_restaurant_open(
    restaurant_id UUID,
    check_time TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS BOOLEAN AS $$
DECLARE
    v_opening_hours JSONB;
    v_current_day TEXT;
    v_current_time TIME;
    v_day_schedule JSONB;
BEGIN
    -- Get restaurant opening hours
    SELECT r.opening_hours INTO v_opening_hours
    FROM restaurants r
    WHERE r.id = restaurant_id;

    -- Get current day and time
    v_current_day := LOWER(TO_CHAR(check_time, 'day'));
    v_current_time := (check_time AT TIME ZONE 'UTC')::TIME;

    -- Get schedule for current day
    v_day_schedule := v_opening_hours->v_current_day;

    -- Check if restaurant is open
    RETURN (
        v_day_schedule->>'is_open' = 'true' AND
        v_current_time BETWEEN (v_day_schedule->>'open')::TIME AND (v_day_schedule->>'close')::TIME
    );
END;
$$ LANGUAGE plpgsql;