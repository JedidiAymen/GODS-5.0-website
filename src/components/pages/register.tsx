import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Users, GraduationCap, CreditCard, CheckCircle2, Sparkles } from "lucide-react";

// Tunisian Universities
const universities = [
  "ESPRIT - École Supérieure Privée d'Ingénierie et de Technologies",
  "INSAT - Institut National des Sciences Appliquées et de Technologie",
  "ENIT - École Nationale d'Ingénieurs de Tunis",
  "FST - Faculté des Sciences de Tunis",
  "ENSI - École Nationale des Sciences de l'Informatique",
  "ISI - Institut Supérieur d'Informatique",
  "ESSECT - École Supérieure des Sciences Économiques et Commerciales de Tunis",
  "IHEC - Institut des Hautes Études Commerciales de Carthage",
  "ISCAE - Institut Supérieur de Comptabilité et d'Administration des Entreprises",
  "ENSIT - École Nationale Supérieure d'Ingénieurs de Tunis",
  "FSB - Faculté des Sciences de Bizerte",
  "FSJEGJ - Faculté des Sciences Juridiques, Économiques et de Gestion de Jendouba",
  "ENIG - École Nationale d'Ingénieurs de Gabès",
  "ENIS - École Nationale d'Ingénieurs de Sfax",
  "FSS - Faculté des Sciences de Sfax",
  "ISIMS - Institut Supérieur d'Informatique et de Multimédia de Sfax",
  "ISIGK - Institut Supérieur d'Informatique et de Gestion de Kairouan",
  "ISGIS - Institut Supérieur de Gestion Industrielle de Sfax",
  "Université Centrale",
  "Université Libre de Tunis",
  "Mediterranean School of Business",
  "SESAME University",
  "Tunis Business School",
  "Other",
];

// Payment methods
const paymentMethods = [
  { value: "d17", label: "D17" },
  { value: "flouci", label: "Flouci" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash (On-site)" },
];

// Team size options
const teamSizeOptions = [
  { value: "1", label: "1 Member (Solo)" },
  { value: "2", label: "2 Members" },
  { value: "3", label: "3 Members" },
  { value: "4", label: "4 Members" },
  { value: "5", label: "5 Members" },
];

// Member schema
const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  university: z.string().min(1, "Please select university"),
});

// Form validation schema
const formSchema = z.object({
  // Team Info
  teamName: z.string().min(2, "Team name must be at least 2 characters").max(50, "Team name must be less than 50 characters"),
  teamSize: z.string().min(1, "Please select team size"),
  
  // Leader Info
  leaderName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  leaderEmail: z.string().email("Please enter a valid email address"),
  leaderPhone: z.string().min(8, "Please enter a valid phone number").max(15, "Phone number is too long"),
  leaderUniversity: z.string().min(1, "Please select your university"),
  
  // Additional members (dynamic)
  members: z.array(memberSchema),
  
  // Payment
  paymentMethod: z.string().min(1, "Please select a payment method"),
  
  // Additional
  experience: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function Register() {
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      teamSize: "3",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      leaderUniversity: "",
      members: [
        { name: "", email: "", university: "" },
        { name: "", email: "", university: "" },
      ],
      paymentMethod: "",
      experience: "",
      howDidYouHear: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const watchTeamSize = form.watch("teamSize");
  const currentTeamSize = parseInt(watchTeamSize || "3");

  // Adjust members array when team size changes
  const handleTeamSizeChange = (newSize: string) => {
    const size = parseInt(newSize);
    const membersNeeded = size - 1; // minus leader
    const currentMembers = fields.length;

    if (membersNeeded > currentMembers) {
      // Add more members
      for (let i = currentMembers; i < membersNeeded; i++) {
        append({ name: "", email: "", university: "" });
      }
    } else if (membersNeeded < currentMembers) {
      // Remove excess members
      for (let i = currentMembers - 1; i >= membersNeeded; i--) {
        remove(i);
      }
    }
  };

  // Animations
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, { scope: mainRef });

  function onSubmit(values: FormValues) {
    console.log(values);
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  }

  if (isSubmitted) {
    return (
      <main ref={mainRef} className="min-h-screen bg-background pt-28 sm:pt-32 lg:pt-36 pb-12 px-4 sm:px-6">
        <section className="max-w-2xl mx-auto text-center">
          <Card className="shadow-xl">
            <CardContent className="pt-12 pb-12">
              <CheckCircle2 className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Registration Successful!
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 px-4">
                Thank you for registering for GODS 5.0! We've sent a confirmation email to your team leader's email address.
              </p>
              <div className="bg-primary/10 rounded-xl p-4 sm:p-6 mb-8 mx-4">
                <p className="text-primary font-semibold text-sm sm:text-base">
                  Please complete your payment within 48 hours to confirm your spot.
                </p>
              </div>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                size="lg"
                className="rounded-xl"
              >
                Register Another Team
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main ref={mainRef} className="min-h-screen bg-background pt-28 sm:pt-32 lg:pt-36 pb-16 px-4 sm:px-6 mb-5">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <section className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <header ref={titleRef} className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
              <span className="text-primary">GODS</span>{" "}
              <span className="text-foreground">5.0</span>
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Team Registration
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Join the premier Data Science competition in Tunisia. Form your team of 1-5 members and compete for amazing prizes!
          </p>
        </header>

        {/* Form Card */}
        <Card ref={formRef} className="shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl">Registration Form</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Fill in the details below to register your team for GODS 5.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
              
              {/* Team Info Section */}
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
                            placeholder="Enter your creative team name" 
                            className="h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-xs sm:text-sm">
                          Choose a unique and memorable name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Team Size *</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleTeamSizeChange(value);
                          }} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl text-base">
                              <SelectValue placeholder="Select team size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teamSizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How many people in your team?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Team Leader Section */}
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
                          <Input 
                            placeholder="Enter full name" 
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
                    name="leaderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="email@example.com" 
                            className="h-12 rounded-xl text-base"
                            {...field} 
                          />
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
                        <FormLabel className="text-base">Phone Number *</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+216 XX XXX XXX" 
                            className="h-12 rounded-xl text-base"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="leaderUniversity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">University *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl text-base">
                              <SelectValue placeholder="Select your university" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            {universities.map((uni) => (
                              <SelectItem key={uni} value={uni}>
                                {uni}
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

              {/* Dynamic Team Members Section */}
              {fields.length > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Team Members</h3>
                  </div>

                  {fields.map((field, index) => (
                    <div 
                      key={field.id} 
                      className="p-4 sm:p-6 bg-muted/30 rounded-xl border border-border/50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                          Member {index + 2}
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`members.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">Full Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter full name" 
                                  className="h-12 rounded-xl text-base"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`members.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">Email *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="email@example.com" 
                                  className="h-12 rounded-xl text-base"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`members.${index}.university`}
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel className="text-base">University *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 rounded-xl text-base">
                                    <SelectValue placeholder="Select university" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[300px]">
                                  {universities.map((uni) => (
                                    <SelectItem key={uni} value={uni}>
                                      {uni}
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
                  ))}
                </div>
              )}

              {/* Payment Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Payment Method</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Select Payment Method *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-3 sm:gap-4"
                        >
                          {paymentMethods.map((method) => (
                            <FormItem key={method.value}>
                              <FormControl>
                                <div className="relative">
                                  <RadioGroupItem
                                    value={method.value}
                                    id={method.value}
                                    className="peer sr-only"
                                  />
                                  <label
                                    htmlFor={method.value}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border cursor-pointer transition-all duration-300 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                                  >
                                    <span className="font-semibold text-foreground">{method.label}</span>
                                  </label>
                                </div>
                              </FormControl>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Registration fee: 30 TND per team. Payment details will be sent via email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground pb-2 border-b border-border">
                  Additional Information (Optional)
                </h3>
                
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Team Experience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your team's experience in data science, hackathons, or relevant projects..."
                          className="min-h-[100px] rounded-xl text-base resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="howDidYouHear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">How did you hear about GODS 5.0?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl text-base">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="friends">Friends/Colleagues</SelectItem>
                          <SelectItem value="university">University Announcement</SelectItem>
                          <SelectItem value="previous_edition">Previous Edition</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-12 sm:h-14 rounded-xl text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                >
                  Register Team ({currentTeamSize} {currentTeamSize === 1 ? 'Member' : 'Members'})
                </Button>
                <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4">
                  By registering, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </div>
            </form>
          </Form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default Register;
