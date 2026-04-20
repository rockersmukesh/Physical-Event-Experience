import { createOrder } from "@/lib/demo-data";
import type { FulfillmentMode, OrderItemInput } from "@/lib/stadium-data";

type CreateOrderRequest = {
  fulfillmentMode: FulfillmentMode;
  items: OrderItemInput[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderRequest;

    if (!body?.fulfillmentMode || !Array.isArray(body.items)) {
      return Response.json({ error: "Invalid order payload." }, { status: 400 });
    }

    const order = await createOrder({
      fulfillmentMode: body.fulfillmentMode,
      items: body.items,
    });

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    const message = error instanceof Error ? error.message : "Failed to create demo order.";
    return Response.json({ error: message }, { status: 500 });
  }
}
