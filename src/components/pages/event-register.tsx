import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, GraduationCap } from "lucide-react";

const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfZLIylwzYMUCRc48w-ce0Sy7UYTxwDpaddqNzRrj9QpUJQ8w/formResponse";

const CLOUDINARY_CLOUD_NAME = "dxohtyx5l";
const CLOUDINARY_UPLOAD_PRESET = "Gods5.0";
const MAX_CV_SIZE_MB = 10;
const MAX_CV_SIZE = MAX_CV_SIZE_MB * 1024 * 1024;

const attendanceOptions = ["In-Person", "Online"];

const formSchema = z
  .object({
    teamName: z.string().min(2, "Team name is required"),
    leaderName: z.string().min(2, "Leader name is required"),
    leaderEmail: z.string().email("Valid email is required"),
    leaderPhone: z.string().min(6, "Phone number is required"),
    leaderAttendance: z.string().min(1, "Select attendance"),
    leaderUniversity: z.string().min(1, "Select university"),
    leaderCountry: z.string().min(1, "Select country"),
    teamSize: z.string().min(1, "Select team size"),
    member1Name: z.string().optional(),
    member1Email: z.string().email("Valid email is required").optional().or(z.literal("")),
    member1Attendance: z.string().optional(),
    member1University: z.string().optional(),
    member2Name: z.string().optional(),
    member2Email: z.string().email("Valid email is required").optional().or(z.literal("")),
    member2Attendance: z.string().optional(),
    additionalInfo: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const size = Number(values.teamSize || "1");
    if (size >= 2) {
      if (!values.member1Name?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member1Name"], message: "Member 1 name is required" });
      }
      if (!values.member1Email?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member1Email"], message: "Member 1 email is required" });
      }
      if (!values.member1Attendance?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member1Attendance"], message: "Member 1 attendance is required" });
      }
      if (!values.member1University?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member1University"], message: "Member 1 university is required" });
      }
    }
    if (size >= 3) {
      if (!values.member2Name?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member2Name"], message: "Member 2 name is required" });
      }
      if (!values.member2Email?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member2Email"], message: "Member 2 email is required" });
      }
      if (!values.member2Attendance?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["member2Attendance"], message: "Member 2 attendance is required" });
      }
    }
  });

type RegisterFormValues = z.infer<typeof formSchema>;

function EventRegister() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [leaderCvFile, setLeaderCvFile] = useState<File | null>(null);
  const [member1CvFile, setMember1CvFile] = useState<File | null>(null);
  const [member2CvFile, setMember2CvFile] = useState<File | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      leaderAttendance: "",
      leaderUniversity: "",
      leaderCountry: "",
      teamSize: "3",
      member1Name: "",
      member1Email: "",
      member1Attendance: "",
      member1University: "",
      member2Name: "",
      member2Email: "",
      member2Attendance: "",
      additionalInfo: "",
    },
  });

  const teamSize = Number(form.watch("teamSize") || "1");

  const toFolderSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 60) || "team";

  const validateCvFile = (file: File | null) => {
    if (!file) return null;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return "CV must be a PDF file.";
    if (file.size > MAX_CV_SIZE) return `CV must be at most ${MAX_CV_SIZE_MB}MB.`;
    return null;
  };

  const uploadCv = async (file: File, folder: string) => {
    const formData = new FormData();
    const safeValue = (value?: string) => value ?? "";
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `gods5/cv/${folder}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("CV upload failed.");
    }

    const data = await response.json();
    return data.secure_url as string;
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setUploadError(null);
    const leaderCvError = validateCvFile(leaderCvFile);
    const member1CvError = validateCvFile(member1CvFile);
    const member2CvError = validateCvFile(member2CvFile);

    if (leaderCvError || member1CvError || member2CvError) {
      setUploadError(leaderCvError || member1CvError || member2CvError);
      return;
    }

    setIsUploading(true);
    const teamSlug = toFolderSlug(values.teamName);
    const cvLinks: string[] = [];

    try {
      if (leaderCvFile) {
        const url = await uploadCv(leaderCvFile, `${teamSlug}/leader`);
        cvLinks.push(`Leader CV: ${url}`);
      }
      if (member1CvFile) {
        const url = await uploadCv(member1CvFile, `${teamSlug}/member-1`);
        cvLinks.push(`Member 1 CV: ${url}`);
      }
      if (member2CvFile) {
        const url = await uploadCv(member2CvFile, `${teamSlug}/member-2`);
        cvLinks.push(`Member 2 CV: ${url}`);
      }
    } catch (error) {
      setUploadError("CV upload failed. Please try again.");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("entry.1809864013", safeValue(values.teamName));
    formData.append("entry.1585304413", safeValue(values.leaderName));
    formData.append("entry.455125614", safeValue(values.leaderEmail));
    formData.append("entry.498503970", safeValue(values.leaderPhone));
    formData.append("entry.68415102", safeValue(values.leaderAttendance));
    formData.append("entry.497263609", safeValue(values.leaderUniversity));
    formData.append("entry.682763593", safeValue(values.leaderCountry));
    formData.append("entry.1707833588", safeValue(values.teamSize));
    formData.append("entry.1720792431", safeValue(values.member1Name));
    formData.append("entry.1112413563", safeValue(values.member1Email));
    formData.append("entry.885338123", safeValue(values.member1Attendance));
    formData.append("entry.1784571291", safeValue(values.member1University));
    formData.append("entry.1163587628", safeValue(values.member2Name));
    formData.append("entry.1470151021", safeValue(values.member2Email));
    formData.append("entry.46451145", safeValue(values.member2Attendance));
    formData.append("entry.1636156417", "");
    formData.append("entry.1502424636", "");
    formData.append("entry.1102450313", "");
    const additionalInfo = [values.additionalInfo?.trim(), cvLinks.join(" | ")]
      .filter((value): value is string => Boolean(value))
      .join(" | ");
    formData.append("entry.195544129", additionalInfo);

    try {
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setIsSubmitted(true);
      form.reset();
      setLeaderCvFile(null);
      setMember1CvFile(null);
      setMember2CvFile(null);
    } catch {
      setIsSubmitted(true);
      form.reset();
      setLeaderCvFile(null);
      setMember1CvFile(null);
      setMember2CvFile(null);
    }
    setIsUploading(false);
  };

  return (
    <main ref={mainRef} className="min-h-screen bg-background pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-6 mb-5">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <section className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              <span className="text-primary">GODS</span>{" "}
              <span className="text-foreground">5.0</span>
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Event Registration
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Complete the form below. Your responses are recorded directly in our Google Sheet.
          </p>
        </header>

        <Card className="shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl">Registration Form</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Provide team and member information to register.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Registration received!
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Thanks for registering. We’ll contact you soon.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 rounded-xl"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit another response
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Team Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="teamName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Team Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Team name"
                                className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Team Size *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 sm:h-12 rounded-xl text-sm sm:text-base">
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["1", "2", "3"].map((size) => (
                                  <SelectItem key={size} value={size}>
                                    {size}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Team Leader</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="leaderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
                            <FormControl>
                              <Input className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaderEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Email *</FormLabel>
                            <FormControl>
                              <Input type="email" className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaderPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Phone *</FormLabel>
                            <FormControl>
                              <Input type="tel" className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaderAttendance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Attendance *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10 sm:h-12 rounded-xl text-sm sm:text-base">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {attendanceOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaderUniversity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">University *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your university"
                                className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="leaderCountry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Country *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your country"
                                className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2 space-y-2">
                        <FormLabel className="text-sm sm:text-base">Leader CV (PDF, max 10MB)</FormLabel>
                        <Input
                          type="file"
                          accept="application/pdf"
                          className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                          onChange={(e) => setLeaderCvFile(e.target.files?.[0] ?? null)}
                        />
                      </div>
                    </div>
                  </div>

                  {teamSize >= 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Member 1</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="member1Name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
                              <FormControl>
                                <Input className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="member1Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Email *</FormLabel>
                              <FormControl>
                                <Input type="email" className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="member1Attendance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Attendance *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-10 sm:h-12 rounded-xl text-sm sm:text-base">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {attendanceOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="member1University"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">University *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter university"
                                  className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="md:col-span-2 space-y-2">
                          <FormLabel className="text-sm sm:text-base">Member 1 CV (PDF, max 10MB)</FormLabel>
                          <Input
                            type="file"
                            accept="application/pdf"
                            className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                            onChange={(e) => setMember1CvFile(e.target.files?.[0] ?? null)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {teamSize >= 3 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Member 2</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                          control={form.control}
                          name="member2Name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
                              <FormControl>
                                <Input className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="member2Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Email *</FormLabel>
                              <FormControl>
                                <Input type="email" className="h-10 sm:h-12 rounded-xl text-sm sm:text-base" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="member2Attendance"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm sm:text-base">Attendance *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-10 sm:h-12 rounded-xl text-sm sm:text-base">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {attendanceOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="md:col-span-2 space-y-2">
                          <FormLabel className="text-sm sm:text-base">Member 2 CV (PDF, max 10MB)</FormLabel>
                          <Input
                            type="file"
                            accept="application/pdf"
                            className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                            onChange={(e) => setMember2CvFile(e.target.files?.[0] ?? null)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Additional Info</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any extra details"
                              className="min-h-[120px] rounded-xl text-sm sm:text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {uploadError && (
                    <p className="text-sm text-red-500 text-center">{uploadError}</p>
                  )}

                  <div className="flex justify-center">
                    <Button type="submit" className="rounded-xl px-6 py-2.5" disabled={isUploading}>
                      {isUploading ? "Uploading..." : "Register Team"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default EventRegister;
