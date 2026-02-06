"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const galleryItems = [
    {
        id: 1,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.01%20PM.jpeg",
        alt: "Warehouse facility",
        title: "Modern Warehouse",
    },
    {
        id: 2,
        type: "video" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Video%202026-01-23%20at%2011.56.20%20PM.mp4", // Placeholder path
        thumbnail: "",
        alt: "Warehouse tour video",
        title: "Facility Tour",
    },
    {
        id: 3,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.03%20PM%20(1).jpeg",
        alt: "Product inventory",
        title: "Product Range",
    },
    {
        id: 4,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.03%20PM.jpeg",
        alt: "Shipping operations",
        title: "Fast Dispatch",
    },
    {
        id: 5,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.05%20PM%20(1).jpeg",
        alt: "Packaging materials",
        title: "Quality Materials",
    },
    {
        id: 6,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.07%20PM%20(3).jpeg",
        alt: "Packaging materials",
        title: "Quality Materials",
    },
    {
        id: 7,
        type: "image" as const,
        src: "https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/BubbleWrapShop/BUBBLEWRAP-ASSETS/WhatsApp%20Image%202026-01-23%20at%2011.56.06%20PM.jpeg",
        alt: "Packaging materials",
        title: "Quality Materials",
    },
];

export function GalleryShowcase() {
    const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

    return (
        <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">

                {/* Section Header */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-3">
                        Behind the Scenes
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Explore our state-of-the-art warehouse, product range, and wholesale operations.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {galleryItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`
                group relative overflow-hidden rounded-xl bg-secondary/50
                transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                ${index === 1 ? 'md:col-span-2 md:row-span-2' : 'aspect-square'}
              `}
                        >
                            {item.type === 'video' ? (
                                <video
                                    src={item.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                    poster={item.thumbnail}
                                />
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    title={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Click to expand indicator for videos */}
                            {item.type === 'video' && (
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                                        Click to expand
                                    </div>
                                </div>
                            )}

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-xs md:text-sm font-semibold">{item.title}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {selectedItem && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.src}
                                    controls
                                    autoPlay
                                    className="w-full h-auto rounded-lg"
                                    poster={selectedItem.thumbnail}
                                />
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={selectedItem.src}
                                        alt={selectedItem.alt}
                                        title="Selected Gallery Item"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto rounded-lg object-contain"
                                    />
                                </div>
                            )}
                            <p className="text-white text-center mt-4 text-sm md:text-base">{selectedItem.title}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
