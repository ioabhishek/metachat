"use client"
import { FC, startTransition } from "react"
import { Button } from "./Button"
import { useMutation } from "@tanstack/react-query"
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit"
import axios, { AxiosError } from "axios"
import { useCustomeToast } from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface SubscribeLeaveToggleProps {
  subredditId: string
  subredditName: string
  isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  isSubscribed,
  subredditName,
}) => {
  const { loginToast } = useCustomeToast()
  const router = useRouter()

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      }
      const { data } = await axios.post("/api/subreddit/subscribe", payload)
      return data as string
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      })
    },

    onSuccess: () => {
      startTransition(() => router.refresh())
      return toast({
        title: "Subscribed",
        description: `You are now subscribed to r/${subredditName}`,
        variant: "destructive",
      })
    },
  })

  const { mutate: unsubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      }
      const { data } = await axios.post("/api/subreddit/unsubscribe", payload)
      return data as string
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again",
        variant: "destructive",
      })
    },

    onSuccess: () => {
      startTransition(() => router.refresh())
      return toast({
        title: "unSubscribed",
        description: `You are now unsubscribed from r/${subredditName}`,
        variant: "destructive",
      })
    },
  })

  return isSubscribed ? (
    <Button
      isLoading={isUnSubLoading}
      onClick={() => unsubscribe()}
      className="w-full mt-1 mb-4">
      Leave Community
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4">
      Join to post
    </Button>
  )
}

export default SubscribeLeaveToggle
