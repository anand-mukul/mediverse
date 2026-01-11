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
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "(555) 123-4567",
      email: "sarah@example.com",
      priority: 1,
    },
    {
      id: "2",
      name: "Michael Chen",
      relationship: "Brother",
      phone: "(555) 987-6543",
      email: "michael@example.com",
      priority: 2,
    },
    {
      id: "3",
      name: "Dr. Williams",
      relationship: "Primary Doctor",
      phone: "(555) 456-7890",
      email: "dr.williams@hospital.com",
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Emergency Contacts
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddContact}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
        <p className="text-sm text-slate-600">
          These contacts will be notified immediately during an emergency
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
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
                    <h4 className="font-semibold text-slate-900">
                      {contact.name}
                    </h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      {contact.relationship}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3 w-3" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
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
                      ? "bg-red-100 text-red-800"
                      : contact.priority === 2
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  Priority {contact.priority}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditContact(contact)}
                  className="mt-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700">
            📞 Emergency contacts are notified in order of priority. Make sure
            contact information is up-to-date.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
