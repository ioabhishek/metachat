"use client"
import { FC } from "react"
import { Button } from "./Button"

interface SubscribeLeaveToggleProps {}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({}) => {
  const isSubscribed = false

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave Community</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Join to post</Button>
  )
}

export default SubscribeLeaveToggle
