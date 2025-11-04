import { BlockComponentProps } from './blocks'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form";
import { EOrder, ERefRelation } from '../../../../../../types/global.types';
import { Input } from '@/components/ui/input';
import { NUMBER_REGEX_STRING } from '@/CONSTANTS';
import { InfiniteMultiSelect } from '@/components/forms/infinite-multi-select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TPageDto } from '@/schemas/page.schema';

export default function RefItemBlock({ blockIdx, sectionIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;

    const selected = form.watch(`${blockName}.selected`);

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${blockName}.refRelation`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Reference <span className="text-destructive">*</span></FormLabel>
                        <Select
                            onValueChange={val => {
                                field.onChange(val);
                                form.setValue(`${blockName}.selected`, []); // reset selected on ref change
                            }}
                            defaultValue={field.value}
                            required
                        >
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
                name={`${blockName}.cols`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Columns <span className='text-destructive'>*</span></FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                className='py-5'
                                required
                                pattern={NUMBER_REGEX_STRING}
                                min={1}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex items-center gap-3">
                <Checkbox
                    id="manual"
                    checked={!!form.watch(`${blockName}.selected`)}
                    onCheckedChange={val => {
                        if (val) {
                            form.setValue(`${blockName}.selected`, []);
                        } else {
                            form.setValue(`${blockName}.selected`, undefined);
                        }
                    }}
                />
                <Label htmlFor="manual">Select Manually?</Label>
            </div>

            {
                selected === undefined && (
                    <>
                        <FormField
                            control={form.control}
                            name={`${blockName}.limit`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Limit <span className='text-destructive'>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className='py-5'
                                            required
                                            pattern={NUMBER_REGEX_STRING}
                                            min={1}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={`${blockName}.order`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order <span className="text-destructive">*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger className="w-full py-5">
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                Object.entries(EOrder).map(([key, value]) => (
                                                    <SelectItem key={key} value={value}>{key}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )
            }

            {
                Array.isArray(selected) && (
                    <FormField
                        control={form.control}
                        name={`${blockName}.selected`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Choose Specefic Ones</FormLabel>
                                <FormControl>
                                    <InfiniteMultiSelect
                                        endpoint={`${form.watch(`${blockName}.refRelation`)}/options`}
                                        onSelectionChange={val => {
                                            field.onChange(val)
                                        }}
                                        selected={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            }
        </section>
    )
}