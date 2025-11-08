/*
  # Insert SaltySnacks Products

  1. New Data
    - Insert 6 snack products with updated images and prices
    - BBQ Flavored Chips - ₱199
    - Cheese Puffs - ₱149
    - Classic Potato Chips - ₱179
    - Nacho Cheese Tortilla Chips - ₱199
    - Salted Pretzels - ₱199
    - Spicy Jalapeño Chips - ₱199
*/

DELETE FROM products;

INSERT INTO products (name, description, price, image_url, stock) VALUES
('BBQ Flavored Chips', 'Delicious BBQ-flavored crispy chips with authentic smoky taste', 199, 'https://i.ibb.co/nqK8spmv/image.png', 100),
('Cheese Puffs', 'Light and airy cheese puffs with creamy cheddar flavor', 149, 'https://i.ibb.co/KcKhfzpW/image.png', 100),
('Classic Potato Chips', 'Traditional salted potato chips with perfect crunch', 179, 'https://i.ibb.co/sdq3XLLT/image.png', 100),
('Nacho Cheese Tortilla Chips', 'Crispy tortilla chips loaded with tangy nacho cheese flavor', 199, 'https://i.ibb.co/MD642GqC/image.png', 100),
('Salted Pretzels', 'Perfectly twisted pretzels with a light salt coating', 199, 'https://i.ibb.co/gMY21mKM/image.png', 100),
('Spicy Jalapeño Chips', 'Bold and spicy jalapeño-flavored chips with a fiery kick', 199, 'https://i.ibb.co/4w6D8p6t/image.png', 100);
