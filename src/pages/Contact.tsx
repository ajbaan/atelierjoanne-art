import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Vul je naam in").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  subject: z.string().trim().min(1, "Vul een onderwerp in").max(200),
  message: z.string().trim().min(1, "Vul een bericht in").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    // mailto fallback
    const mailtoUrl = `mailto:joannegeluk@gmail.com?subject=${encodeURIComponent(
      result.data.subject
    )}&body=${encodeURIComponent(
      `Van: ${result.data.name} (${result.data.email})\n\n${result.data.message}`
    )}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSending(false);
      toast.success("Je e-mailclient wordt geopend!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-200";

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">
            Contact
          </h1>
          <p className="font-body text-muted-foreground">
            Interesse in een kunstwerk of wil je samenwerken? Neem gerust contact op.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {(["name", "email", "subject"] as const).map((field) => (
            <div key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "name"
                    ? "Naam"
                    : field === "email"
                    ? "E-mailadres"
                    : "Onderwerp"
                }
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={inputClass}
              />
              {errors[field] && (
                <p className="mt-1 text-xs text-destructive font-body">{errors[field]}</p>
              )}
            </div>
          ))}

          <div>
            <textarea
              placeholder="Bericht"
              rows={5}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`${inputClass} resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive font-body">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full font-body text-sm tracking-widest uppercase border border-foreground text-foreground py-3 hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50"
          >
            {sending ? "Verzenden..." : "Verstuur bericht"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
