import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldComponentProps } from './fields'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { TFormDto } from '@/schemas/forms.schema';
import { useFormContext } from 'react-hook-form';

export default function CheckboxField({ idx }: FormFieldComponentProps) {
    const form = useFormContext<TFormDto>();

    return (
        <section className='@container space-y-6'>
            <section className='grid @2xl:grid-cols-2 grid-cols-1 gap-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name <span className='text-muted-foreground font-normal'>(no whitespace, no special characters)</span> <span className='text-destructive'>*</span></FormLabel>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    required
                                    minLength={3}
                                    maxLength={100}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.label`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    maxLength={100}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.defaultValue`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Default Value
                            </FormLabel>
                            <section className='flex gap-2 items-center'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value as boolean}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <span>
                                    {field.value ? "Checked" : "Unchecked"}
                                </span>
                            </section>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.required`}
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    Required
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
            </section>

        </section>
    )
}