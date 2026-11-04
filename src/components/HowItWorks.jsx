import {
    QrCode,
    Send,
    Bell,
    ArrowRight,
    Zap
} from "lucide-react";

const icons = [QrCode, Send, Bell];

export default function HowItWorks({ steps = [] }) {

    if (!steps.length) return null;

    return (
        <div className="w-full rounded-xl border border-white/10 bg-[#171717] p-5 sm:p-6">

            {/* Heading */}
            <div className="flex items-center gap-2 mb-6">
                <Zap size={20} className="text-green-400" />

                <h3 className="text-white text-lg font-semibold">
                    How it works
                </h3>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">

                {steps.map((step, index) => {
                    const Icon = icons[index % icons.length];

                    return (
                        <div
                            key={step.title}
                            className="relative flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center gap-3 sm:gap-0"
                        >

                            {/* Icon */}

                            <div className="w-12 h-12 shrink-0 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 mb-0 sm:mb-3">
                                <Icon size={23} />
                            </div>

                            {/* Title */}
                            <h4 className="text-white text-sm font-semibold">
                                {step.title}
                            </h4>

                            {/* Description */}
                            <p className="text-gray-400 text-xs mt-1 sm:mt-2 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Arrow */}
                            {index !== steps.length - 1 && (
                                <ArrowRight
                                    size={17}
                                    className="absolute top-4 -right-3 text-gray-500"
                                />
                            )}

                        </div>
                    );
                })}

            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-xs mt-6">
                Simple · Fast · Private
            </p>

        </div>
    );
}
