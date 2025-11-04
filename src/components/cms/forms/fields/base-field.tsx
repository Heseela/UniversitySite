import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldComponentProps } from './fields'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { TFormDto } from '@/schemas/forms.schema';
import { useFormContext } from 'react-hook-form';
import { NUMBER_REGEX_STRING } from '@/CONSTANTS';

export default function BaseField({ idx }: FormFieldComponentProps) {
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
                                    maxLength={50}
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
                                    maxLength={50}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.placeholder`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    maxLength={50}
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
                            <FormLabel>Default Value</FormLabel>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    maxLength={50}
                                    {...field}
                                    value={(field.value || "") as string | number | undefined}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </section>

            <section className='space-y-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.validation`}
                    render={() => {
                        return (
                            <FormItem className='@container'>
                                <FormControl>
                                    <section className='grid @4xl:grid-cols-3 @2xl:grid-cols-2 grid-cols-1 gap-6'>
                                        <FormField
                                            control={form.control}
                                            name={`fields.${idx}.validation.minLength`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Min Length</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="py-5"
                                                            type='number'
                                                            pattern={NUMBER_REGEX_STRING}
                                                            min={0}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`fields.${idx}.validation.maxLength`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Max Length</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="py-5"
                                                            type='number'
                                                            pattern={NUMBER_REGEX_STRING}
                                                            min={0}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`fields.${idx}.validation.minLength`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pattern <span className='text-muted-foreground font-normal'>(a valid regular expression)</span></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="py-5"
                                                            type='string'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </section>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
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