import { Button } from "@/components/ui/button";
import { Order } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" className="rounded-full">
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map(order => ())}
    </div>
  );
};

export default OrderList;
