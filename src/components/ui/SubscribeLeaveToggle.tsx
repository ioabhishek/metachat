"use client"
import { FC } from "react"
import { Button } from "./Button"
import { useMutation } from "@tanstack/react-query"

interface SubscribeLeaveToggleProps {}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({}) => {
  const isSubscribed = false

  const {} = useMutation({
    mutationFn: async () => {},
  })

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave Community</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Join to post</Button>
  )
}

export default SubscribeLeaveToggle
