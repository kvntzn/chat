import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { Client, Conversation, State } from '@twilio/conversations'

interface TwilioContextInterface {
  twilioClient: Client
  conversations: Conversation[]
  initializeClient: (token: string) => void
  addConversation: (conversation: Conversation) => void
}

const ConversationContext = createContext<TwilioContextInterface | null>(null)

const ConversationProvider = ({ children }) => {
  const [twilioClient, setTwilioClient] = useState<Client | any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])

  const initializeClient = (token: string) => {
    const client = new Client(token)

    // Before you use the client, subscribe to the `'stateChanged'` event and wait
    // for the `'initialized'` state to be reported.
    client.on('stateChanged', async (state: State) => {
      if (state === 'initialized') {
        // Use the client
        setTwilioClient(client)

        client.on('conversationAdded', (conversation: Conversation) => {
          console.log('conversationAdded', conversation)
          setConversations((oldConversations) =>
            oldConversations.concat(conversation)
          )
        })

        // const paginator = await client.getSubscribedConversations()
        // setConversations(paginator.items)
      }
    })
  }

  const addConversation = (conversation: Conversation) => {
    setConversations([...conversations, conversation])
  }

  const conversationsFullfiller: TwilioContextInterface = {
    conversations,
    twilioClient,
    initializeClient,
    addConversation,
  }

  return (
    <ConversationContext.Provider value={conversationsFullfiller}>
      {children}
    </ConversationContext.Provider>
  )
}

const useConversationContext = () => {
  const context = useContext(ConversationContext)

  if (!context) {
    throw new Error(
      'useConversationContext must be used within ConversationProvider'
    )
  }

  return context
}

export { ConversationProvider, useConversationContext }
