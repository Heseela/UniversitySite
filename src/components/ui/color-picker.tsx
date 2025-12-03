"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PRESET_COLORS } from "../editor/editor-ui/colors-config"

interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const handlePresetColor = (color: string) => {
        onChange(color)
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal h-10", !value && "text-muted-foreground")}
                >
                    <div className="flex items-center gap-2 w-full">
                        <div
                            className="h-6 w-6 rounded border border-border"
                            style={{ backgroundColor: value }}
                            aria-label={`Color: ${value}`}
                        />
                        <span className="flex-1 text-foreground">{value}</span>
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-4" align="start">
                <div className="space-y-4">
                    {/* Interactive Color Picker */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Custom Color</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="color"
                                value={value}
                                onChange={handleColorChange}
                                className="h-10 w-16 rounded cursor-pointer border border-border"
                                aria-label="Color picker input"
                            />
                            <Input
                                type="text"
                                value={value}
                                onChange={handleColorChange}
                                placeholder="#000000"
                                className="flex-1 font-mono text-sm"
                                maxLength={7}
                            />
                        </div>
                    </div>

                    {/* Preset Colors */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Preset Colors</label>
                        <div className="grid grid-cols-6 gap-2">
                            {PRESET_COLORS.map((colorObj) => (
                                <button
                                    key={colorObj.value}
                                    onClick={() => handlePresetColor(colorObj.value)}
                                    className={cn(
                                        "h-8 w-8 rounded border-2 transition-all",
                                        value === colorObj.value
                                            ? "border-foreground ring ring-foreground"
                                            : "border-border hover:border-foreground/50",
                                    )}
                                    style={{ backgroundColor: colorObj.value }}
                                    title={colorObj.name}
                                    aria-label={`Select color ${colorObj.name}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
