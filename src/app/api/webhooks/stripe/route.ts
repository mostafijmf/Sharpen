import { createTransaction } from "@/lib/actions/transaction.action";
import { NextResponse } from "next/server";
import stripe from "stripe";

const whSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!;

export const POST = async (request: Request) => {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature") as string;

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, whSecret);
    } catch (error) {
        return NextResponse.json({ message: "Webhook Error", error: error });
    };

    // Get the ID and type
    const eventType = event.type;

    if (eventType === "checkout.session.completed") {
        const { id, amount_total, metadata } = event.data.object;

        const transaction = {
            stripeId: id,
            amount: amount_total ? amount_total / 100 : 0,
            plan: metadata?.plan || "",
            credits: Number(metadata?.credits) || 0,
            buyerId: metadata?.buyerId || "",
        };

        const newTransaction = await createTransaction(transaction);
        return NextResponse.json({ message: "Ok", transaction: newTransaction }, { status: 200 });
    }

    return new Response("", { status: 200 });
};