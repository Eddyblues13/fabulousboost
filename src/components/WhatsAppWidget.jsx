import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "2348108905252"; // Nigeria country code + number

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChat = () => {
        const message = encodeURIComponent(
            "Hello! I need assistance. Can you help me?"
        );
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
            "_blank"
        );
    };

    return (
        <>
            {/* Chat Popup */}
            {isOpen && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        right: "24px",
                        zIndex: 9999,
                        width: "340px",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
                        animation: "whatsappSlideUp 0.3s ease-out",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #075e54, #128c7e)",
                            padding: "16px 20px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255,255,255,0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >
                            <MessageCircle style={{ width: "22px", height: "22px", color: "#fff" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: "15px",
                                    margin: 0,
                                    lineHeight: 1.3,
                                }}
                            >
                                FabulousBoost Support
                            </p>
                            <p
                                style={{
                                    color: "rgba(255,255,255,0.8)",
                                    fontSize: "12px",
                                    margin: 0,
                                    lineHeight: 1.3,
                                }}
                            >
                                Typically replies within minutes
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: "rgba(255,255,255,0.15)",
                                border: "none",
                                borderRadius: "50%",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                            }
                        >
                            <X style={{ width: "16px", height: "16px", color: "#fff" }} />
                        </button>
                    </div>

                    {/* Body */}
                    <div
                        style={{
                            backgroundColor: "#e5ddd5",
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c7bfb0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                            padding: "24px 20px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: "0 12px 12px 12px",
                                padding: "14px 16px",
                                maxWidth: "85%",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                                position: "relative",
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#303030",
                                    lineHeight: 1.5,
                                }}
                            >
                                👋 Hi there! How can we help you today? Click the button below to start a chat with us on WhatsApp.
                            </p>
                            <p
                                style={{
                                    margin: "4px 0 0",
                                    fontSize: "11px",
                                    color: "#999",
                                    textAlign: "right",
                                }}
                            >
                                {new Date().toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "14px 20px",
                        }}
                    >
                        <button
                            onClick={handleChat}
                            style={{
                                width: "100%",
                                padding: "12px 20px",
                                backgroundColor: "#25D366",
                                color: "#fff",
                                border: "none",
                                borderRadius: "24px",
                                fontSize: "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                transition: "all 0.2s",
                                boxShadow: "0 2px 8px rgba(37, 211, 102, 0.3)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#1fb855";
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#25D366";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <MessageCircle style={{ width: "18px", height: "18px" }} />
                            Start Chat
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 9999,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#25D366",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
                    transition: "all 0.3s ease",
                    animation: "whatsappPulse 2s infinite",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow =
                        "0 6px 24px rgba(37, 211, 102, 0.5)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                        "0 4px 16px rgba(37, 211, 102, 0.4)";
                }}
                aria-label="Chat on WhatsApp"
            >
                {isOpen ? (
                    <X style={{ width: "26px", height: "26px", color: "#fff" }} />
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        fill="#fff"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                )}
            </button>

            {/* Animations */}
            <style>{`
        @keyframes whatsappPulse {
          0% { box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 24px rgba(37, 211, 102, 0.6), 0 0 0 8px rgba(37, 211, 102, 0.1); }
          100% { box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); }
        }
        @keyframes whatsappSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
};

export default WhatsAppWidget;
