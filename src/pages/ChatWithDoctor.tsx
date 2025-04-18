
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  sender: "user" | "doctor";
  text: string;
  timestamp: string;
}

interface ChatThread {
  id: string;
  doctor: {
    id: string;
    name: string;
    specialty: string;
    avatar?: string;
    available: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

export default function ChatWithDoctor() {
  const [currentChat, setCurrentChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  
  // Sample data - in a real app, this would come from an API
  const chatThreads: ChatThread[] = [
    {
      id: "1",
      doctor: {
        id: "d1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        available: true
      },
      lastMessage: "Please let me know if you have any questions about your medication.",
      lastMessageTime: "10:30 AM",
      unread: 1
    },
    {
      id: "2",
      doctor: {
        id: "d2",
        name: "Dr. Michael Chen",
        specialty: "Endocrinologist",
        available: false
      },
      lastMessage: "Your latest test results look good. We'll discuss at your next appointment.",
      lastMessageTime: "Yesterday",
      unread: 0
    }
  ];

  const messages: { [key: string]: Message[] } = {
    "1": [
      {
        id: "m1",
        sender: "doctor",
        text: "Hello! How are you feeling today?",
        timestamp: "10:15 AM"
      },
      {
        id: "m2",
        sender: "user",
        text: "I'm feeling better, but I had a question about the new prescription.",
        timestamp: "10:20 AM"
      },
      {
        id: "m3",
        sender: "doctor",
        text: "Of course, what would you like to know?",
        timestamp: "10:22 AM"
      },
      {
        id: "m4",
        sender: "user",
        text: "Should I take it with food or on an empty stomach?",
        timestamp: "10:25 AM"
      },
      {
        id: "m5",
        sender: "doctor",
        text: "Please take it with food to minimize stomach discomfort. Please let me know if you have any questions about your medication.",
        timestamp: "10:30 AM"
      }
    ],
    "2": [
      {
        id: "m1",
        sender: "doctor",
        text: "I've received your latest blood work results.",
        timestamp: "Yesterday"
      },
      {
        id: "m2",
        sender: "doctor",
        text: "Your latest test results look good. We'll discuss at your next appointment.",
        timestamp: "Yesterday"
      }
    ]
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentChat) return;
    
    // In a real app, this would send the message to an API
    console.log(`Sending message to chat ${currentChat}: ${messageInput}`);
    
    // Reset input field
    setMessageInput("");
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Chat with Doctor</h1>
          <p className="text-muted-foreground">
            Securely message your healthcare providers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-4rem)]">
        <Card className="lg:col-span-1 overflow-hidden">
          <div className="p-4 border-b bg-muted/20">
            <h2 className="font-semibold">Conversations</h2>
          </div>
          <CardContent className="p-0">
            <Tabs defaultValue="active">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="active" className="mt-0">
                <div className="divide-y">
                  {chatThreads.map((thread) => (
                    <div
                      key={thread.id}
                      className={cn(
                        "p-4 cursor-pointer hover:bg-accent",
                        currentChat === thread.id && "bg-accent"
                      )}
                      onClick={() => setCurrentChat(thread.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={thread.doctor.avatar} />
                            <AvatarFallback>
                              {thread.doctor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={cn(
                            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                            thread.doctor.available ? "bg-medical-green" : "bg-gray-300"
                          )} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{thread.doctor.name}</h3>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {thread.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{thread.doctor.specialty}</p>
                          <p className="text-sm truncate mt-1">{thread.lastMessage}</p>
                        </div>
                      </div>
                      {thread.unread > 0 && (
                        <div className="flex justify-end mt-1">
                          <span className="bg-medical-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {thread.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="archived">
                <div className="p-4 text-center text-muted-foreground">
                  No archived conversations
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {currentChat ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={chatThreads.find(t => t.id === currentChat)?.doctor.avatar} />
                    <AvatarFallback>
                      {chatThreads.find(t => t.id === currentChat)?.doctor.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">
                      {chatThreads.find(t => t.id === currentChat)?.doctor.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {chatThreads.find(t => t.id === currentChat)?.doctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    chatThreads.find(t => t.id === currentChat)?.doctor.available ? "bg-medical-green" : "bg-gray-300"
                  )} />
                  <span className="text-sm">
                    {chatThreads.find(t => t.id === currentChat)?.doctor.available ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[currentChat]?.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.sender === "user" 
                          ? "bg-medical-blue text-white rounded-br-none"
                          : "bg-accent rounded-bl-none"
                      )}
                    >
                      <p>{message.text}</p>
                      <div className={cn(
                        "text-xs mt-1",
                        message.sender === "user" ? "text-blue-100" : "text-muted-foreground"
                      )}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Messages are encrypted and comply with healthcare privacy regulations
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
