export interface Car {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number | string;
  mileage: string;
  drivetrain: string;
  fuel_type: string;
  transmission: string;
  image: string;
  featured?: number | boolean;
  description?: string;
}
