"use client"

import { useState } from "react"
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Users,
  Shield,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "hello@collegehub.com",
    action: "mailto:hello@collegehub.com",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    value: "+91 98765 43210",
    action: "tel:+919876543210",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: "Bangalore, Karnataka, India",
    action: "#",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "When we're available",
    value: "Mon-Fri: 9AM-6PM IST",
    action: "#",
    color: "bg-purple-100 text-purple-600",
  },
]

const supportCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "college-info", label: "College Information" },
  { value: "technical", label: "Technical Support" },
  { value: "partnership", label: "Partnership" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
]

const faqs = [
  {
    question: "How do I add my college to CollegeHub?",
    answer: "Contact us with your college details and official documentation. Our team will verify and add it to our platform.",
  },
  {
    question: "Is the information on CollegeHub accurate?",
    answer: "We verify all information through official sources and community feedback. However, we recommend cross-checking critical details.",
  },
  {
    question: "Can I contribute reviews anonymously?",
    answer: "Yes, we offer anonymous review options while maintaining authenticity through our verification process.",
  },
  {
    question: "How can I report incorrect information?",
    answer: "Use the 'Report Issue' feature on any college page or contact us directly with the details.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-background overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              Contact Us
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold font-space-grotesk mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-dm-sans leading-relaxed">
              Have questions about colleges, need technical support, or want to partner with us? We're here to help
              you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-20">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                  <CardHeader className="pb-4">
                    <div className={`w-20 h-20 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-xl font-space-grotesk group-hover:text-primary transition-colors duration-300">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-dm-sans mb-4">{info.description}</p>
                    <a
                      href={info.action}
                      className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors font-dm-sans"
                    >
                      {info.value}
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Send Message
                </Badge>
                <h2 className="text-4xl font-bold font-space-grotesk text-foreground mb-4">
                  Let's <span className="gradient-text">Connect</span>
                </h2>
                <p className="text-lg text-muted-foreground font-dm-sans leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Card className="border-2 border-border">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="border-2 border-border focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="border-2 border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                        Category *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-2 border-border focus:border-primary">
                          <SelectValue placeholder="Select inquiry category" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                        Subject *
                      </label>
                      <Input
                        placeholder="Brief subject of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="border-2 border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2 font-dm-sans">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Describe your inquiry in detail..."
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        rows={6}
                        className="border-2 border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                  FAQ
                </Badge>
                <h2 className="text-4xl font-bold font-space-grotesk text-foreground mb-4">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground font-dm-sans leading-relaxed">
                  Quick answers to common questions about CollegeHub.
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-2 border-border hover:border-primary/30 transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-space-grotesk text-foreground flex items-start space-x-3">
                        <HelpCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-dm-sans leading-relaxed pl-9">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold font-space-grotesk text-foreground mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-muted-foreground font-dm-sans mb-4">
                    Can't find what you're looking for? Send us a message and we'll help you out.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Ask a Question
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold font-space-grotesk gradient-text">CollegeHub</span>
          </div>
          <p className="text-muted-foreground font-dm-sans">
            &copy; 2024 CollegeHub. All rights reserved. Made with ❤️ for students.
          </p>
        </div>
      </footer>
    </div>
  )
}
