import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response("Unauthorizes", { status: 401 })
    }

    const body = await req.json()

    const { subredditId } = SubredditSubscriptionValidator.parse(body)

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    })

    if (subscriptionExists) {
      return new Response("You are already subscribed to this subscription", {
        status: 400,
      })
    }

    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    })
  } catch (err) {}
}
