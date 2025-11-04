import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldComponentProps } from './fields'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { TFormDto } from '@/schemas/forms.schema';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ERefRelation } from '../../../../../types/global.types';

export default function RelationField({ idx }: FormFieldComponentProps) {
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
                                    value={field.value as string | number | undefined}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.dataSource.entity`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Relation To <span className='text-destructive'>*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                <FormControl>
                                    <SelectTrigger className="w-full py-5">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(ERefRelation).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>{key}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`fields.${idx}.dataSource.filter`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Filter</FormLabel>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            <section className='flex gap-6'>
                <FormField
                    control={form.control}
                    name={`fields.${idx}.multiple`}
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
                                    Multiple
                                </FormLabel>
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