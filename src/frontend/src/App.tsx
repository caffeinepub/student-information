import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitRecord } from "./hooks/useQueries";

const queryClient = new QueryClient();

const NAV_ITEMS = ["Home", "Data Submission", "FAQs", "Contact"] as const;

function Portal() {
  const [rollNumber, setRollNumber] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitMutation = useSubmitRecord();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !rollNumber.trim() ||
      !collegeName.trim() ||
      !courseDetails.trim() ||
      !address.trim() ||
      !phoneNumber.trim() ||
      !studentEmail.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        rollNumber,
        collegeName,
        courseDetails,
        address,
        phoneNumber,
        studentEmail,
      });
      setSubmitSuccess(true);
      setRollNumber("");
      setCollegeName("");
      setCourseDetails("");
      setAddress("");
      setPhoneNumber("");
      setStudentEmail("");
      toast.success("Student record submitted successfully!");
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground leading-none block">
                  Student Information
                </span>
                <span className="text-[11px] text-muted-foreground leading-none">
                  Academic Portal
                </span>
              </div>
            </div>

            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  type="button"
                  key={item}
                  className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  data-ocid={`nav.${item.toLowerCase().replace(/ /g, "_")}.link`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <Button
              variant="default"
              size="sm"
              className="gap-2"
              data-ocid="nav.login.button"
            >
              <Mail className="w-3.5 h-3.5" />
              Student Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className="w-full py-10 border-b border-border"
        style={{ background: "oklch(0.926 0.03 230)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                Academic Records Portal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Student Information System
            </h1>
            <p className="mt-2 text-muted-foreground text-base max-w-xl">
              Submit and manage student records securely. All submissions are
              recorded and linked to the administrative email.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              <span>harithapaadiri@gmail.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Card */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg shadow-card border border-border">
                  <div className="px-6 pt-6 pb-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">
                      Submit Student Record
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Fill in the details below and click Submit to record the
                      information.
                    </p>
                  </div>

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mx-6 mt-4 flex items-center gap-3 p-3 rounded-md bg-green-50 border border-green-200 text-green-700"
                        data-ocid="form.success_state"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">
                          Record submitted successfully! It has been linked to
                          harithapaadiri@gmail.com.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="rollNumber"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Roll Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="rollNumber"
                        placeholder="e.g. 2024CS001"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="bg-input border-border text-sm"
                        data-ocid="form.roll_number.input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="collegeName"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        College / Institute Details{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="collegeName"
                        placeholder="e.g. Sri Ramakrishna Engineering College, Coimbatore"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        className="bg-input border-border text-sm"
                        data-ocid="form.college_name.input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="courseDetails"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Course Details{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="courseDetails"
                        placeholder="e.g. B.Tech Computer Science, MBA Finance"
                        value={courseDetails}
                        onChange={(e) => setCourseDetails(e.target.value)}
                        className="bg-input border-border text-sm"
                        data-ocid="form.course_details.input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="address"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        <MapPin className="inline w-3 h-3 mr-1" />
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter full residential address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="bg-input border-border text-sm resize-none"
                        data-ocid="form.address.textarea"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        <Phone className="inline w-3 h-3 mr-1" />
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-input border-border text-sm"
                        data-ocid="form.phone_number.input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="studentEmail"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        <Mail className="inline w-3 h-3 mr-1" />
                        Student Email{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="studentEmail"
                        type="email"
                        placeholder="e.g. student@college.edu"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="bg-input border-border text-sm"
                        data-ocid="form.student_email.input"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-2 gap-2"
                      disabled={submitMutation.isPending}
                      data-ocid="form.submit.button"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Student Record
                        </>
                      )}
                    </Button>

                    {submitMutation.isError && (
                      <div
                        className="flex items-center gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm"
                        data-ocid="form.error_state"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        Submission failed. Please check your connection and try
                        again.
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-card rounded-lg shadow-card border border-border p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">
                      Important Notices
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {[
                      "Ensure your roll number is correct before submission.",
                      "All fields are mandatory. Incomplete forms will not be processed.",
                      "Contact administration at harithapaadiri@gmail.com for corrections.",
                      "Records are submitted for the current academic year.",
                    ].map((notice) => (
                      <li key={notice} className="flex gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {notice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-lg shadow-card border border-border p-5">
                  <h3 className="font-semibold text-sm text-foreground mb-3">
                    Portal Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background rounded-md p-3 text-center">
                      <div className="text-2xl font-bold text-primary">1</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Admin Account
                      </div>
                    </div>
                    <div className="bg-background rounded-md p-3 text-center">
                      <div className="text-2xl font-bold text-primary">
                        24/7
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Availability
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <div
          style={{ background: "oklch(0.28 0.05 240)" }}
          className="text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-semibold text-sm">
                    Student Information Portal
                  </span>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.75 0.02 240)" }}
                >
                  A secure academic records portal for submitting and managing
                  student information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
                <ul
                  className="space-y-1.5 text-sm"
                  style={{ color: "oklch(0.75 0.02 240)" }}
                >
                  {["Home", "Data Submission", "FAQs"].map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3">Contact</h4>
                <div
                  className="space-y-2 text-sm"
                  style={{ color: "oklch(0.75 0.02 240)" }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <a
                      href="mailto:harithapaadiri@gmail.com"
                      className="hover:text-white transition-colors"
                    >
                      harithapaadiri@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Administrative Office</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ background: "oklch(0.22 0.04 240)" }}
          className="text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs" style={{ color: "oklch(0.65 0.02 240)" }}>
              © {new Date().getFullYear()} Student Information Portal. All
              rights reserved.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.65 0.02 240)" }}>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Portal />
    </QueryClientProvider>
  );
}
