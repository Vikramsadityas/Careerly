import React from 'react';
import { Card } from "@nextui-org/react";
import { Check, MoreVertical } from "lucide-react";

const WhatsAppMessages = () => {
  
    const messages = [
        {
          id: 1,
          name: "John Doe",
          message: "Hey, how's it going? Did you check the project files I sent yesterday?",
          time: "10:30 AM",
          unread: 2,
          lastSeen: "online",
          image: "https://robohash.org/johndoe?size=40x40&set=set5"
        },
        {
          id: 2,
          name: "Product Team",
          message: "Alice: The new designs are ready for review 👍",
          time: "9:45 AM",
          unread: 5,
          lastSeen: "2 min ago",
          image: "https://robohash.org/productteam?size=40x40&set=set5"
        },
        {
          id: 3,
          name: "Sarah Wilson",
          message: "Thanks for your help! The issue has been resolved.",
          time: "Yesterday",
          unread: 0,
          lastSeen: "5 min ago",
          image: "https://robohash.org/sarahwilson?size=40x40&set=set5"
        },
        {
          id: 4,
          name: "Tech Support",
          message: "Your ticket #1234 has been updated. Click to view details.",
          time: "Yesterday",
          unread: 1,
          lastSeen: "30 min ago",
          image: "https://robohash.org/techsupport?size=40x40&set=set5"
        },
        {
          id: 5,
          name: "Emily Chen",
          message: "Meeting rescheduled to 2 PM today.",
          time: "1 hour ago",
          unread: 1,
          lastSeen: "online",
          image: "https://robohash.org/emilychen?size=40x40&set=set5"
        },
        {
          id: 6,
          name: "Marketing Team",
          message: "New campaign launch delayed until next quarter.",
          time: "2 hours ago",
          unread: 3,
          lastSeen: "1 hour ago",
          image: "https://robohash.org/marketingteam?size=40x40&set=set5"
        },
        {
          id: 7,
          name: "David Lee",
          message: "Sent you the updated sales report.",
          time: "3 hours ago",
          unread: 2,
          lastSeen: "2 hours ago",
          image: "https://robohash.org/davidlee?size=40x40&set=set5"
        },
        {
          id: 8,
          name: "Customer Support",
          message: "Resolved issue #5678.",
          time: "4 hours ago",
          unread: 0,
          lastSeen: "3 hours ago",
          image: "https://robohash.org/customersupport?size=40x40&set=set5"
        },
        {
          id: 9,
          name: "Jane Smith",
          message: "Wants to discuss project details.",
          time: "Yesterday",
          unread: 1,
          lastSeen: "yesterday",
          image: "https://robohash.org/janesmith?size=40x40&set=set5"
        },
        {
          id: 10,
          name: "Dev Team",
          message: "New build deployed.",
          time: "Yesterday",
          unread: 2,
          lastSeen: "1 hour ago",
          image: "https://robohash.org/devteam?size=40x40&set=set5"
        },
        {
          id: 11,
          name: "Alex Brown",
          message: "Needs feedback on proposal.",
          time: "2 days ago",
          unread: 0,
          lastSeen: "yesterday",
          image: "https://robohash.org/alexbrown?size=40x40&set=set5"
        },
        {
          id: 12,
          name: "Sales Team",
          message: "Q2 targets announced.",
          time: "2 days ago",
          unread: 1,
          lastSeen: "2 days ago",
          image: "https://robohash.org/salesteam?size=40x40&set=set5"
        },
        {
          id: 13,
          name: "Michael Davis",
          message: "Sent contract documents.",
          time: "3 days ago",
          unread: 2,
          lastSeen: "3 days ago",
          image: "https://robohash.org/michaeldavis?size=40x40&set=set5"
        },
        {
          id: 14,
          name: "IT Department",
          message: "System maintenance scheduled.",
          time: "4 days ago",
          unread: 0,
          lastSeen: "4 days ago",
          image: "https://robohash.org/itdepartment?size=40x40&set=set5"
        },
        {
          id: 15,
          name: "Jessica White",
          message: "Wants to discuss project timeline.",
          time: "5 days ago",
          unread: 1,
          lastSeen: "5 days ago",
          image: "https://robohash.org/jessicawhite?size=40x40&set=set5"
        },
        {
          id: 16,
          name: "Patrick Johnson",
          message: "Follow up on meeting notes.",
          time: "5 days ago",
          unread: 0,
          lastSeen: "6 days ago",
          image: "https://robohash.org/patrickjohnson?size=40x40&set=set5"
        },
        {
          id: 17,
          name: "HR Department",
          message: "Your benefits package has been updated.",
          time: "6 days ago",
          unread: 1,
          lastSeen: "6 days ago",
          image: "https://robohash.org/hrdepartment?size=40x40&set=set5"
        },
        {
          id: 18,
          name: "Nancy Moore",
          message: "Let's sync up about the upcoming project.",
          time: "7 days ago",
          unread: 1,
          lastSeen: "7 days ago",
          image: "https://robohash.org/nancymoore?size=40x40&set=set5"
        },
        {
          id: 19,
          name: "Finance Team",
          message: "Quarterly report available for review.",
          time: "7 days ago",
          unread: 3,
          lastSeen: "7 days ago",
          image: "https://robohash.org/financeteam?size=40x40&set=set5"
        },
        {
          id: 20,
          name: "Tom Harris",
          message: "Reminder: Team outing next Friday.",
          time: "1 week ago",
          unread: 0,
          lastSeen: "1 week ago",
          image: "https://robohash.org/tomharris?size=40x40&set=set5"
        },
        {
          id: 21,
          name: "Legal Team",
          message: "Contract negotiations ongoing.",
          time: "1 week ago",
          unread: 2,
          lastSeen: "1 week ago",
          image: "https://robohash.org/legalteam?size=40x40&set=set5"
        }
         
    
        // Continue for other messages
    ];
    
  return (
    <div className="max-w-4xl bg-gray-50 p-4">
      {messages.map((msg) => (
        <Card 
          key={msg.id} 
          className="mb-2 hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="p-3 flex items-center gap-3">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={msg.image}
                alt={msg.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {msg.lastSeen === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            {/* Message Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800 truncate">
                  {msg.name}
                </h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2 ">
                  {msg.time}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[500px]">
                  {msg.unread === 0 && (
                    <span className="inline-flex items-center mr-1 text-blue-600">
                      <Check className="w-4 h-4" />
                      <Check className="w-4 h-4 -ml-3" />
                    </span>
                  )}
                  {msg.message}
                </p>
                <div className="flex items-center gap-2 ml-2">
                  {msg.unread > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {msg.unread}
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {msg.lastSeen !== "online" && (
                <span className="text-xs text-gray-400">
                  {msg.lastSeen}
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WhatsAppMessages;