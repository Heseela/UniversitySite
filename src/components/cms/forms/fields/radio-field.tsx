import { Checkbox } from '@/components/ui/checkbox';
import { FormFieldComponentProps } from './fields'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { TFormDto } from '@/schemas/forms.schema';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Copy, MoreHorizontal, Plus, X } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function RadioField({ idx }: FormFieldComponentProps) {
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

            </section>

            <section className='space-y-6'>
                <OptionsField idx={idx} />

                <section className='flex gap-6'>
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
        </section>
    )
}

function OptionsField({ idx }: FormFieldComponentProps) {
    const form = useFormContext<TFormDto>();

    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: `fields.${idx}.options`,
    });

    return (
        <FormField
            control={form.control}
            name={`fields.${idx}.options`}
            render={() => {
                return (
                    <FormItem className='@container'>
                        <FormLabel>Radio Attribute Options <span className='text-destructive'>*</span></FormLabel>

                        <section className='space-y-2'>
                            {
                                fields.map((field, index) => {
                                    return (
                                        <div key={field.id} className='flex gap-2'>
                                            <FormField
                                                control={form.control}
                                                name={`fields.${idx}.options.${index}.label`}
                                                render={({ field }) => (
                                                    <FormItem className='grow'>
                                                        <FormControl>
                                                            <Input
                                                                className="py-5"
                                                                placeholder='Label'
                                                                required
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`fields.${idx}.options.${index}.value`}
                                                render={({ field }) => (
                                                    <FormItem className='grow'>
                                                        <FormControl>
                                                            <Input
                                                                className="py-5"
                                                                placeholder='Value'
                                                                required
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant={'outline'} size={'icon'} className='p-5'>
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="top">
                                                    {
                                                        index !== 0 && <DropdownMenuItem onClick={() => swap(index, index - 1)}>
                                                            <ChevronUp /> Move Up
                                                        </DropdownMenuItem>
                                                    }
                                                    <DropdownMenuItem onClick={() => swap(index, index + 1)}>
                                                        <ChevronDown /> Move Down
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => insert(index + 1, { label: '', value: '' })}>
                                                        <Plus /> Add Below
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => insert(index + 1, { label: field.label, value: field.value })}><Copy /> Duplicate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => remove(index)}>
                                                        <X /> Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    )
                                })
                            }
                        </section>

                        <FormControl>
                            <section>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs"
                                    onClick={() => append({ label: '', value: '' })}
                                >
                                    <Plus size={16} /> Add Option
                                </Button>
                            </section>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}