import React from "react";

type ContactType = "email" | "phone";

type ContactLinkProps = {
  type: ContactType;
  value?: string | null;
  children?: React.ReactNode;
  className?: string;
};

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const contactPattern =
  /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|\+?\(?\d[\d\s()-]{7,}\d)/g;

export function getContactHref(type: ContactType, value: string) {
  if (type === "email") {
    return `mailto:${value.trim()}`;
  }

  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  const prefix = trimmed.startsWith("+") ? "+" : "";

  return `tel:${prefix}${digits}`;
}

function getContactType(value: string): ContactType | null {
  const trimmed = value.trim();

  if (emailPattern.test(trimmed)) {
    return "email";
  }

  const digits = trimmed.replace(/\D/g, "");

  return digits.length >= 10 ? "phone" : null;
}

export function ContactLink({
  type,
  value,
  children,
  className,
}: ContactLinkProps) {
  if (!value) {
    return <span className={className}>{"—"}</span>;
  }

  return (
    <a className={className} href={getContactHref(type, value)}>
      {children ?? value}
    </a>
  );
}

export function LinkifiedContactText({ text }: { text: string }) {
  return (
    <>
      {text.split(contactPattern).map((part, index) => {
        const contactType = getContactType(part);

        if (!contactType) {
          return <React.Fragment key={index}>{part}</React.Fragment>;
        }

        return (
          <ContactLink key={index} type={contactType} value={part}>
            {part}
          </ContactLink>
        );
      })}
    </>
  );
}
