export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: string
  featured?: boolean
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Arduino Uno R3',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&q=80',
    category: 'Arduino',
    badge: 'Best Seller',
    featured: true,
    description: 'The classic microcontroller board based on ATmega328P. Perfect for beginners and pros.',
  },
  {
    id: 2,
    name: 'Arduino Mega 2560',
    price: 42.99,
    rating: 4.7,
    reviews: 893,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=400&fit=crop&q=80',
    category: 'Arduino',
    featured: true,
    description: 'Advanced microcontroller with 54 digital I/O pins. Ideal for complex projects.',
  },
  {
    id: 3,
    name: 'Raspberry Pi 4 Model B',
    price: 79.99,
    rating: 4.9,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop&q=80',
    category: 'Raspberry Pi',
    badge: 'Hot',
    featured: true,
    description: 'Quad-core ARM Cortex-A72 @ 1.8GHz. 4GB RAM. Dual 4K display support.',
  },
  {
    id: 4,
    name: 'Raspberry Pi Zero 2 W',
    price: 15.99,
    rating: 4.6,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop&q=80',
    category: 'Raspberry Pi',
    description: 'Compact SBC with wireless. Same power as Pi 3 in a tiny form factor.',
  },
  {
    id: 5,
    name: 'DHT11 Temp & Humidity Sensor',
    price: 3.99,
    rating: 4.4,
    reviews: 789,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop&q=80',
    category: 'Sensors',
    description: 'Digital temperature and humidity sensor. Easy Arduino & Pi integration.',
  },
  {
    id: 6,
    name: 'HC-SR04 Ultrasonic Sensor',
    price: 4.49,
    rating: 4.5,
    reviews: 1023,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop&q=80',
    category: 'Sensors',
    description: 'Precise 2cm–400cm distance measurement. Ideal for obstacle avoidance robots.',
  },
  {
    id: 7,
    name: 'L298N Motor Driver Module',
    price: 8.99,
    rating: 4.6,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop&q=80',
    category: 'Modules',
    description: 'Dual H-Bridge motor driver. Controls 2 DC motors or 1 stepper motor.',
  },
  {
    id: 8,
    name: 'ESP32 WiFi+Bluetooth Module',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.8,
    reviews: 1567,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=400&fit=crop&q=80',
    category: 'Modules',
    badge: 'Popular',
    featured: true,
    description: 'Dual-core 240MHz MCU with WiFi 802.11 b/g/n and Bluetooth 4.2/BLE.',
  },
  {
    id: 9,
    name: '37-in-1 Sensor Kit',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.7,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=400&fit=crop&q=80',
    category: 'Sensors',
    badge: 'Value',
    description: '37 essential sensors and modules in one kit. The complete maker starter bundle.',
  },
  {
    id: 10,
    name: 'Complete Robotics Starter Kit',
    price: 89.99,
    rating: 4.9,
    reviews: 334,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop&q=80',
    category: 'Robotics',
    badge: 'New',
    description: 'Everything to build your first robot: chassis, motors, sensors, Arduino & guide.',
  },
  {
    id: 11,
    name: 'OLED Display 0.96" I2C',
    price: 6.99,
    rating: 4.5,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop&q=80',
    category: 'Displays',
    description: '128×64 pixel OLED. I2C interface. Works with Arduino, ESP32, Raspberry Pi.',
  },
  {
    id: 12,
    name: 'Servo Motor SG90',
    price: 5.49,
    rating: 4.4,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop&q=80',
    category: 'Motors',
    description: 'Lightweight 9g micro servo. 180° rotation. Compatible with all major platforms.',
  },
]

export const bestSellers = products.filter(p => p.featured)

export const categoryConfig = [
  { name: 'Arduino', count: products.filter(p => p.category === 'Arduino').length },
  { name: 'Raspberry Pi', count: products.filter(p => p.category === 'Raspberry Pi').length },
  { name: 'Sensors', count: products.filter(p => p.category === 'Sensors').length },
  { name: 'Modules', count: products.filter(p => p.category === 'Modules').length },
  { name: 'Robotics', count: products.filter(p => p.category === 'Robotics').length },
  { name: 'Displays', count: products.filter(p => p.category === 'Displays').length },
  { name: 'Motors', count: products.filter(p => p.category === 'Motors').length },
]
