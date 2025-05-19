"use server";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  consumptionMethod: string;
  restaurantId: string;
}

export const createOrder = async (input: CreateOrderInput) => {};
