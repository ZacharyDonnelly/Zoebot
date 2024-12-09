import { createSession, getChatHistory, Message } from '@/api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const Chat = () => {
  const [token, setToken] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const socket = useRef<WebSocket | null>(null)

  useEffect(() => {
    const initChat = async () => {
      const accessToken = await AsyncStorage.getItem('access_token')
      setToken(accessToken)

      if (!accessToken) return

      const sessionId = await createSession(accessToken)
      const history = await getChatHistory(accessToken, sessionId)
      setMessages(history)

      socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${sessionId}`)
      socket.current.onmessage = (event) => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: event.data },
        ])
      }
    }

    initChat()

    return () => {
      if (socket.current) {
        socket.current.close()
      }
    }
  }, [token])

  const sendMessage = () => {
    if (!socket.current) return
    const newMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, newMessage])
    socket.current.send(input)
    setInput('')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={msg.role === 'user' ? styles.userMsg : styles.assistantMsg}>
            {msg.content}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  chatBox: {
    flex: 1,
    padding: 10,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '70%',
  },
  assistantMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    color: '#000',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '70%',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ced4da',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
})
