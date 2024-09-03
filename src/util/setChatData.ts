import { useChatDataStore } from "../context/useChatDataStore"




export const setChatData = (userId: string, rollName: string) => {
  const { setUserId, setRollName } = useChatDataStore.getState()
  setUserId(userId)
  setRollName(rollName)
}