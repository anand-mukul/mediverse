"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Plus } from "lucide-react";
import { toast } from "sonner";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
}

export default function EmergencyContacts() {
  const emergencyContacts: EmergencyContact[] = [
    {
      id: "1",
      name: "Priya Sharma",
      relationship: "Spouse",
      phone: "+91 98765 43210",
      email: "priya@example.com",
      priority: 1,
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      relationship: "Brother",
      phone: "+91 98234 56789",
      email: "rajesh@example.com",
      priority: 2,
    },
    {
      id: "3",
      name: "Dr. Amit Patel",
      relationship: "Primary Doctor",
      phone: "+91 99876 54321",
      email: "dr.patel@hospital.in",
      priority: 3,
    },
  ];

  const handleAddContact = () => {
    toast.info("Add contact feature coming soon");
  };

  const handleEditContact = (contact: EmergencyContact) => {
    toast.info(`Editing ${contact.name}`);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <User className="h-5 w-5 text-primary" />
            Emergency Contacts
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddContact}
            className="gap-2 cursor-pointer hover:bg-accent bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          These contacts will be notified immediately during an emergency
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white
                  ${
                    contact.priority === 1
                      ? "bg-gradient-to-br from-red-500 to-orange-500"
                      : contact.priority === 2
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }
                `}
                >
                  <User className="h-6 w-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-card-foreground">
                      {contact.name}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                      {contact.relationship}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    contact.priority === 1
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : contact.priority === 2
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  }`}
                >
                  Priority {contact.priority}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditContact(contact)}
                  className="mt-2 text-primary hover:text-primary/80 hover:bg-accent cursor-pointer"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            📞 Emergency contacts are notified in order of priority. Make sure
            contact information is up-to-date.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
