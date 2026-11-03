"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export interface ChatFormProps {
    botName?: string;
    botStatus?: string;
    initialMessage?: string;
    botAvatarColor?: string;
    inputPlaceholder?: string;
    sendIcon?: React.ReactNode;
    onSubmit?: (data: Record<string, string>) => void;
    maxWidth?: string;
    height?: string;
    backgroundColor?: string;
    cardBgColor?: string;
    headerBgColor?: string;
    headerTextColor?: string;
    botAvatarBgColor?: string;
    botAvatarBorderColor?: string;
    messagesBgColor?: string;
    botMessageBgColor?: string;
    botMessageTextColor?: string;
    userMessageBgColor?: string;
    userMessageTextColor?: string;
    inputBgColor?: string;
    inputFocusRingColor?: string;
    buttonBgColor?: string;
    buttonHoverScale?: number;
    buttonIconColor?: string;
    className?: string;
    services?: string[];
}

const DEFAULT_SERVICES = [
    "Bedbugs",
    "Cockroaches",
    "Rodents",
    "Flies",
    "Mosquitoes",
    "Other pests",
    "General inspection",
];

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
}

export const ChatForm: React.FC<ChatFormProps> = ({
    botName = "Fume Assistant",
    botStatus = "Online",
    initialMessage = "Hey! What's your full name?",
    botAvatarColor = "#4ade80",
    inputPlaceholder = "Enter your full name...",
    sendIcon = <Send size={16} />,
    onSubmit,
    maxWidth = "24rem",
    height = "500px",
    backgroundColor = "#eef2ff",
    cardBgColor = "#ffffff",
    headerBgColor = "#4f46e5",
    headerTextColor = "#ffffff",
    botAvatarBgColor = "#4ade80",
    botAvatarBorderColor = "#ffffff",
    messagesBgColor = "#f9fafb",
    botMessageBgColor = "#ffffff",
    botMessageTextColor = "#1f2937",
    userMessageBgColor = "#4f46e5",
    userMessageTextColor = "#ffffff",
    inputBgColor = "#f3f4f6",
    inputFocusRingColor = "#4f46e5",
    buttonBgColor = "#4f46e5",
    buttonHoverScale = 1.05,
    buttonIconColor = "#ffffff",
    className = "",
    services = DEFAULT_SERVICES,
}) => {
    // Step 0: Name, Step 1: Email, Step 2: Service (Dropdown), Step 3: Additional Notes, Step 4: Finished
    const [step, setStep] = useState<number>(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: initialMessage, sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const send = (e: React.FormEvent) => {
        e.preventDefault();
        
        let valueToSend = input.trim();
        if (step === 2) {
            valueToSend = selectedService || input.trim();
        }

        if (!valueToSend) return;

        const userMsg: Message = { id: Date.now(), text: valueToSend, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);

        let updatedData = { ...formData };

        if (step === 0) {
            updatedData.name = valueToSend;
            setFormData(updatedData);
            setInput("");
            setStep(1);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        text: `Nice to meet you, ${valueToSend}! What is your email address?`,
                        sender: "bot",
                    },
                ]);
            }, 600);
        } else if (step === 1) {
            updatedData.email = valueToSend;
            setFormData(updatedData);
            setInput("");
            setStep(2);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        text: "Great! Please select the service needed from the menu below:",
                        sender: "bot",
                    },
                ]);
            }, 600);
        } else if (step === 2) {
            updatedData.service = valueToSend;
            setFormData(updatedData);
            setSelectedService("");
            setInput("");
            setStep(3);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        text: "Got it! Any additional notes? (e.g. property address, severity, or access instructions)",
                        sender: "bot",
                    },
                ]);
            }, 600);
        } else if (step === 3) {
            updatedData.notes = valueToSend;
            setFormData(updatedData);
            setInput("");
            setStep(4);
            setIsSubmitting(true);
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + 1,
                        text: "Thank you! Your site inspection request has been scheduled. Our team will reach out to you shortly.",
                        sender: "bot",
                    },
                ]);
                setIsSubmitting(false);
                onSubmit?.(updatedData);
            }, 600);
        }
    };

    const getPlaceholder = () => {
        switch (step) {
            case 0:
                return "Enter your full name...";
            case 1:
                return "Enter your email address...";
            case 2:
                return "Select service needed...";
            case 3:
                return "Address, severity, or access notes...";
            default:
                return "Inspection scheduled!";
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center p-4 text-black"
            style={{ backgroundColor }}
        >
            <div
                className={`w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col ${className}`}
                style={{
                    maxWidth,
                    height,
                    backgroundColor: cardBgColor,
                }}
            >
                {/* Header */}
                <div
                    className="p-4 flex items-center gap-2"
                    style={{
                        backgroundColor: headerBgColor,
                        color: headerTextColor,
                    }}
                >
                    <div
                        className="w-8 h-8 rounded-full border-2"
                        style={{
                            backgroundColor: botAvatarBgColor,
                            borderColor: botAvatarBorderColor,
                        }}
                    />
                    <div>
                        <h3 className="font-bold text-sm">{botName}</h3>
                        <p className="text-[10px] opacity-80">{botStatus}</p>
                    </div>
                </div>

                {/* Messages Container */}
                <div
                    className="flex-1 p-4 overflow-y-auto space-y-4"
                    style={{ backgroundColor: messagesBgColor }}
                >
                    <AnimatePresence>
                        {messages.map((m) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={cn(
                                    "max-w-[80%] p-3 text-sm rounded-2xl",
                                    m.sender === "bot"
                                        ? "bg-white rounded-tl-none shadow-sm"
                                        : "ml-auto rounded-tr-none shadow-md"
                                )}
                                style={{
                                    backgroundColor:
                                        m.sender === "bot"
                                            ? botMessageBgColor
                                            : userMessageBgColor,
                                    color:
                                        m.sender === "bot"
                                            ? botMessageTextColor
                                            : userMessageTextColor,
                                }}
                            >
                                {m.text}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input / Drag-down form */}
                <form onSubmit={send} className="p-2 bg-white flex gap-2 border-t border-gray-100">
                    {step === 2 ? (
                        <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="flex-1 rounded-full px-4 text-sm focus:outline-none focus:ring-2 cursor-pointer bg-gray-100 text-gray-800"
                            style={{
                                backgroundColor: inputBgColor,
                                borderColor: inputFocusRingColor,
                            }}
                            autoFocus
                        >
                            <option value="">-- Choose service needed --</option>
                            {services.map((svc) => (
                                <option key={svc} value={svc}>
                                    {svc}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={step === 1 ? "email" : "text"}
                            value={input}
                            disabled={step >= 4 || isSubmitting}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 rounded-full px-4 text-sm focus:outline-none focus:ring-2 disabled:opacity-60"
                            style={{
                                backgroundColor: inputBgColor,
                                borderColor: inputFocusRingColor,
                            }}
                            placeholder={getPlaceholder()}
                        />
                    )}
                    <button
                        type="submit"
                        disabled={
                            step >= 4 ||
                            isSubmitting ||
                            (step === 2 ? !selectedService : !input.trim())
                        }
                        className="p-3 rounded-full transition-transform disabled:opacity-50 cursor-pointer"
                        style={{
                            backgroundColor: buttonBgColor,
                            color: buttonIconColor,
                        }}
                        onMouseEnter={(e) => {
                            if (step < 4) {
                                e.currentTarget.style.transform = `scale(${buttonHoverScale})`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        {sendIcon}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default function ChatFormPreview() {
    return <ChatForm />;
}
