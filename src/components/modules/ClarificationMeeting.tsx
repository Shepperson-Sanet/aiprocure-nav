
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  FileText,
  Upload,
  Send,
  Mic,
  MicOff,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Plus,
  Copy,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClarificationMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  vendorName: string;
  validationId: string;
}

const ClarificationMeeting = ({ isOpen, onClose, vendorName, validationId }: ClarificationMeetingProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("setup");
  const [meetingStatus, setMeetingStatus] = useState<"setup" | "scheduled" | "live" | "completed">("setup");
  
  // Meeting Setup State
  const [meetingTitle, setMeetingTitle] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [duration, setDuration] = useState("30");
  const [agenda, setAgenda] = useState("");
  const [invitedParticipants, setInvitedParticipants] = useState([
    { name: "John Smith", email: "john@company.com", role: "Procurement Lead", type: "internal" },
    { name: "Sarah Wilson", email: "sarah@company.com", role: "Legal Advisor", type: "internal" }
  ]);
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [newParticipantRole, setNewParticipantRole] = useState("");

  // Live Meeting State
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionEnabled, setTranscriptionEnabled] = useState(true);
  const [meetingNotes, setMeetingNotes] = useState("");
  const [currentTranscript, setCurrentTranscript] = useState("");

  // Post-Meeting State
  const [meetingSummary, setSummingSummary] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [meetingOutcome, setMeetingOutcome] = useState("");

  const platforms = [
    "Microsoft Teams",
    "Google Meet", 
    "Zoom",
    "In-App Video Call"
  ];

  const durations = ["15", "30", "60", "90"];

  const aiSuggestedQuestions = [
    "Can you elaborate on assumptions behind this delivery timeline?",
    "What are the cost drivers in this scope?",
    "How will change orders be handled post-award?",
    "Have you delivered similar scope elsewhere? Provide reference.",
    "What contingency plans do you have for potential delays?",
    "Can you provide more details on your quality assurance processes?"
  ];

  const internalRoles = [
    "Procurement Lead",
    "Legal Advisor",
    "Finance Manager",
    "Technical Specialist",
    "Project Manager",
    "Risk Manager"
  ];

  const tabs = [
    { id: "setup", label: "Meeting Setup", icon: CalendarIcon },
    { id: "live", label: "Live Session", icon: Video },
    { id: "ai-support", label: "AI Support", icon: AlertCircle },
    { id: "notes", label: "Meeting Notes", icon: FileText },
    { id: "documents", label: "Documents", icon: Upload },
    { id: "summary", label: "Summary", icon: CheckCircle }
  ];

  const generateMeetingLink = () => {
    const platforms = {
      "Microsoft Teams": "https://teams.microsoft.com/l/meetup-join/...",
      "Google Meet": "https://meet.google.com/abc-defg-hij",
      "Zoom": "https://zoom.us/j/123456789",
      "In-App Video Call": "Internal video call will be initiated"
    };
    return platforms[selectedPlatform as keyof typeof platforms] || "";
  };

  const addParticipant = () => {
    if (newParticipantEmail && newParticipantRole) {
      setInvitedParticipants([
        ...invitedParticipants,
        { 
          name: newParticipantEmail.split('@')[0], 
          email: newParticipantEmail, 
          role: newParticipantRole, 
          type: "vendor" 
        }
      ]);
      setNewParticipantEmail("");
      setNewParticipantRole("");
    }
  };

  const scheduleMeeting = () => {
    if (!meetingTitle || !selectedPlatform || !selectedDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setMeetingStatus("scheduled");
    toast({
      title: "Meeting Scheduled",
      description: `Clarification meeting scheduled with ${vendorName}`,
    });
  };

  const startLiveSession = () => {
    setMeetingStatus("live");
    setActiveTab("live");
    toast({
      title: "Meeting Started",
      description: "Live clarification session is now active",
    });
  };

  const completeMeeting = () => {
    setMeetingStatus("completed");
    setActiveTab("summary");
    toast({
      title: "Meeting Completed",
      description: "Meeting summary and transcript have been saved",
    });
  };

  const copyMeetingLink = () => {
    const link = generateMeetingLink();
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "setup": return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      case "scheduled": return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      case "live": return "bg-green-600/20 text-green-400 border-green-500/30";
      case "completed": return "bg-gray-600/20 text-gray-400 border-gray-500/30";
      default: return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] bg-slate-800 border-slate-700 text-white overflow-hidden">
        <DialogHeader className="border-b border-slate-700 pb-4">
          <DialogTitle className="text-2xl text-white flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-blue-400" />
            Clarification Meeting: {vendorName}
            <Badge className={getStatusColor(meetingStatus)}>
              {meetingStatus.charAt(0).toUpperCase() + meetingStatus.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[75vh]">
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
            {activeTab === "setup" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <CalendarIcon className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Meeting Setup</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Meeting Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-slate-300">Meeting Title *</Label>
                        <Input
                          id="title"
                          value={meetingTitle}
                          onChange={(e) => setMeetingTitle(e.target.value)}
                          placeholder="Scope Clarification Meeting"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="platform" className="text-slate-300">Platform *</Label>
                        <select
                          id="platform"
                          value={selectedPlatform}
                          onChange={(e) => setSelectedPlatform(e.target.value)}
                          className="w-full h-10 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                        >
                          <option value="">Select Platform</option>
                          {platforms.map((platform) => (
                            <option key={platform} value={platform}>{platform}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="duration" className="text-slate-300">Duration (minutes)</Label>
                        <select
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full h-10 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                        >
                          {durations.map((dur) => (
                            <option key={dur} value={dur}>{dur} minutes</option>
                          ))}
                        </select>
                      </div>
                      {selectedPlatform && (
                        <div className="p-3 bg-slate-800/50 rounded-md">
                          <div className="text-sm text-slate-300 mb-2">Meeting Link</div>
                          <div className="flex items-center gap-2">
                            <div className="text-blue-400 text-sm truncate flex-1">
                              {generateMeetingLink()}
                            </div>
                            <Button size="sm" onClick={copyMeetingLink} variant="outline" className="border-slate-600">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Schedule & Agenda</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Date & Time *</Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="bg-slate-800 border border-slate-600 rounded-md p-3"
                        />
                      </div>
                      <div>
                        <Label htmlFor="agenda" className="text-slate-300">Agenda (Optional)</Label>
                        <Textarea
                          id="agenda"
                          value={agenda}
                          onChange={(e) => setAgenda(e.target.value)}
                          placeholder="Meeting agenda items..."
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Participants</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="participantEmail" className="text-slate-300">Email Address</Label>
                        <Input
                          id="participantEmail"
                          type="email"
                          value={newParticipantEmail}
                          onChange={(e) => setNewParticipantEmail(e.target.value)}
                          placeholder="participant@company.com"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="participantRole" className="text-slate-300">Role</Label>
                        <select
                          id="participantRole"
                          value={newParticipantRole}
                          onChange={(e) => setNewParticipantRole(e.target.value)}
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

                    <div className="space-y-2">
                      {invitedParticipants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md">
                          <div>
                            <p className="text-white font-medium">{participant.name}</p>
                            <p className="text-slate-400 text-sm">{participant.email} • {participant.role}</p>
                          </div>
                          <Badge variant={participant.type === "internal" ? "default" : "secondary"}>
                            {participant.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button onClick={scheduleMeeting} className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" onClick={onClose} className="border-slate-600 text-slate-300">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "live" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl font-semibold">Live Session</h3>
                    {meetingStatus === "live" && (
                      <Badge className="bg-red-600/20 text-red-400 border-red-500/30 animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  {meetingStatus === "scheduled" && (
                    <Button onClick={startLiveSession} className="bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-2" />
                      Start Meeting
                    </Button>
                  )}
                  {meetingStatus === "live" && (
                    <Button onClick={completeMeeting} className="bg-red-600 hover:bg-red-700">
                      <Pause className="w-4 h-4 mr-2" />
                      End Meeting
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Meeting Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="transcription" 
                          checked={transcriptionEnabled}
                          onChange={(e) => setTranscriptionEnabled(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="transcription" className="text-slate-300">
                          Enable Real-time Transcription
                        </label>
                      </div>
                      <Button
                        onClick={() => setIsRecording(!isRecording)}
                        className={isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Live Transcript</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-slate-800/50 p-3 rounded-md overflow-y-auto">
                        {transcriptionEnabled ? (
                          <div className="text-slate-300 text-sm">
                            {currentTranscript || "Transcription will appear here during the meeting..."}
                          </div>
                        ) : (
                          <div className="text-slate-400 text-sm">Transcription disabled</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "ai-support" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">AI-Powered Clarification Support</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Suggested Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiSuggestedQuestions.map((question, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-md border border-slate-600">
                          <p className="text-slate-300 mb-3">{question}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                              Use Question
                            </Button>
                            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
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
                  <h3 className="text-xl font-semibold">Meeting Notes</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="pt-6">
                    <Textarea
                      value={meetingNotes}
                      onChange={(e) => setMeetingNotes(e.target.value)}
                      placeholder="Take collaborative notes during the meeting..."
                      className="min-h-[300px] bg-slate-800 border-slate-600 text-white"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Notes
                      </Button>
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        Add Timestamp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "documents" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Document Uploads</h3>
                </div>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardContent className="pt-6">
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <p className="text-slate-300 mb-4">
                        Upload MoM, revised offer letters, updated commercials
                      </p>
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        Choose Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Meeting Summary</h3>
                </div>

                <div className="space-y-4">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Meeting Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={meetingSummary}
                        onChange={(e) => setSummingSummary(e.target.value)}
                        placeholder="Summarize key discussion points..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Action Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={actionItems}
                        onChange={(e) => setActionItems(e.target.value)}
                        placeholder="List action items and follow-ups..."
                        className="min-h-[120px] bg-slate-800 border-slate-600 text-white"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">Meeting Outcome</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <select
                        value={meetingOutcome}
                        onChange={(e) => setMeetingOutcome(e.target.value)}
                        className="w-full h-10 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                      >
                        <option value="">Select Outcome</option>
                        <option value="proceed">Proceed with Scope Approval</option>
                        <option value="revision">Request Scope Revision</option>
                        <option value="review">Require Further Internal Review</option>
                      </select>

                      <div className="flex gap-3 pt-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete Meeting
                        </Button>
                        <Button variant="outline" className="border-slate-600 text-slate-300">
                          Save as Draft
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClarificationMeeting;
