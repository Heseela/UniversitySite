import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { EAlignment, EAlignmentExcludeCenter } from "../../../../../../types/global.types";
type Props<T> = {
    name: Path<T>,
    label?: string,
    placeholder?: string,
    required?: boolean,
    excludeCenter?: boolean
}

export default function AlignmentSelect<T extends FieldValues>({
    name,
    label = "Alignment",
    placeholder = "Select an option",
    required = false,
    excludeCenter = false,
}: Props<T>) {
    const form = useFormContext<T>();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label} {required && <span className="text-destructive">*</span>}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} required={required}>
                        <FormControl>
                            <SelectTrigger className="w-full py-5">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                                Object.entries(excludeCenter ? EAlignmentExcludeCenter : EAlignment).map(([key, value]) => (
                                    <SelectItem key={key} value={value}>{key}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}