
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Video, 
  Mic, 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Plus,
  Send
} from "lucide-react";

interface NegotiationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  vendorId: number;
}

const InPersonNegotiation = ({ isOpen, onClose, vendorName, vendorId }: NegotiationDialogProps) => {
  const [activeTab, setActiveTab] = useState("invite");
  const [sessionStatus, setSessionStatus] = useState<"scheduled" | "live" | "completed">("scheduled");
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [discussionSummary, setDiscussionSummary] = useState("");
  const [concessions, setConcessions] = useState("");
  const [redFlags, setRedFlags] = useState("");
  const [outcome, setOutcome] = useState("");
  const [rationale, setRationale] = useState("");

  const [invitedParticipants, setInvitedParticipants] = useState([
    { name: "John Smith", role: "Procurement Lead", type: "internal" },
    { name: "Sarah Wilson", role: "Legal Advisor", type: "internal" },
    { name: "Mike Johnson", role: "Finance", type: "internal" }
  ]);

  const internalRoles = [
    "Procurement Lead",
    "Legal Advisor", 
    "Finance Lead",
    "Technical Specialist",
    "Project Manager",
    "Observer"
  ];

  const aiSuggestions = [
    "Can you explain the longer lead time compared to peers?",
    "What is your contingency plan for delivery delays?",
    "How do you justify the higher pricing for similar specifications?",
    "What are your quality assurance processes?",
    "Can you provide references for similar projects?"
  ];

  const addParticipant = () => {
    if (inviteEmail && selectedRole) {
      setInvitedParticipants([
        ...invitedParticipants,
        { name: inviteEmail, role: selectedRole, type: "vendor" }
      ]);
      setInviteEmail("");
      setSelectedRole("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      case "live": return "bg-green-600/20 text-green-400 border-green-500/30";
      case "completed": return "bg-gray-600/20 text-gray-400 border-gray-500/30";
      default: return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    }
  };

  const tabs = [
    { id: "invite", label: "Invite Stakeholders", icon: Users },
    { id: "session", label: "Live Session", icon: Video },
    { id: "ai-support", label: "AI Support", icon: AlertCircle },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "documents", label: "Documents", icon: Upload },
    { id: "outcome", label: "Outcome", icon: CheckCircle }
  ];

  const TabIcon = tabs.find(tab => tab.id === activeTab)?.icon || Users;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-slate-800 border-slate-700 text-white overflow-hidden">
        <DialogHeader className="border-b border-slate-700 pb-4">
          <DialogTitle className="text-2xl text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            In-Person Negotiation: {vendorName}
            <Badge className={getStatusColor(sessionStatus)}>
              {sessionStatus.charAt(0).toUpperCase() + sessionStatus.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-slate-900/50 border-r border-slate-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "invite" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Invite Stakeholders</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Add Participant</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="participant@company.com"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role" className="text-slate-300">Role</Label>
                        <select
                          id="role"
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="w-full h-10 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                        >
                          <option value="">Select Role</option>
                          {internalRoles.map((role) => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <Button onClick={addParticipant} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Participant
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Invited Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {invitedParticipants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                          <div>
                            <p className="text-white font-medium">{participant.name}</p>
                            <p className="text-slate-400 text-sm">{participant.role}</p>
                          </div>
                          <Badge variant={participant.type === "internal" ? "default" : "secondary"}>
                            {participant.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "session" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Video className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Live Session Setup</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video Conference
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Start Video Call
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                        Join via Zoom
                      </Button>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                        Join via Google Meet
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        Transcription
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="auto-transcribe" className="rounded" />
                        <label htmlFor="auto-transcribe" className="text-slate-300">
                          Enable automatic transcription
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="timestamp" className="rounded" />
                        <label htmlFor="timestamp" className="text-slate-300">
                          Add timestamps
                        </label>
                      </div>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "ai-support" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">AI-Supported Negotiation</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Suggested Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-md border border-slate-600">
                          <p className="text-slate-300 mb-2">{suggestion}</p>
                          <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                            Use This Question
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Negotiation Notes</h3>
                </div>

                <div className="space-y-4">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Discussion Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={discussionSummary}
                        onChange={(e) => setDiscussionSummary(e.target.value)}
                        placeholder="Summarize key discussion points..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Concessions Offered</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={concessions}
                        onChange={(e) => setConcessions(e.target.value)}
                        placeholder="Document any concessions made by either party..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Red Flags Identified</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={redFlags}
                        onChange={(e) => setRedFlags(e.target.value)}
                        placeholder="Note any concerns or red flags..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Document Uploads</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Upload Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <p className="text-slate-300 mb-4">
                        Drop files here or click to upload
                      </p>
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        Choose Files
                      </Button>
                    </div>
                    <p className="text-sm text-slate-400">
                      Supported: MoM, revised offers, updated commercials, contracts
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "outcome" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Negotiation Outcome</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Final Decision</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300">Outcome</Label>
                      <select
                        value={outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                        className="w-full h-10 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                      >
                        <option value="">Select Outcome</option>
                        <option value="proceed">Proceed to Award</option>
                        <option value="reject">Reject Vendor – Proceed to Next Ranked</option>
                        <option value="review">Recommend Further Internal Review</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-slate-300">Rationale</Label>
                      <Textarea
                        value={rationale}
                        onChange={(e) => setRationale(e.target.value)}
                        placeholder="Provide rationale for the decision..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button 
                        className="bg-green-600 hover:bg-green-700 flex-1"
                        disabled={!outcome || !rationale}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Submit Outcome
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={onClose}
                        className="border-slate-600 text-slate-300"
                      >
                        Save as Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InPersonNegotiation;
