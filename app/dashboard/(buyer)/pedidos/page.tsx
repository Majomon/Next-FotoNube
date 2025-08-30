"use client";

import { useEffect, useState } from "react";
import claraApi from "@/lib/axios";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await claraApi.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;
  if (!orders.length) return <p>No tienes pedidos realizados.</p>;

  return (
    <div className="p-6 space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <p>
            <strong>Álbum:</strong> {order.albumTitle}
          </p>
          <p>
            <strong>Fecha:</strong> {order.createdAt}
          </p>
          <p>
            <strong>Total:</strong> ${order.total}
          </p>
          <p>
            <strong>Estado:</strong> {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}
