"use client";

import { cmsSidebarMenuItems } from '@/components/cms/sidebar/menu-items';
import { Button } from '@/components/ui/button'
import { SITE_TITLE } from '@/CONSTANTS';
import { seed, seedCompleteSite } from '@/db/seed'
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link'
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function CMSPage() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className='container mx-auto'>
      <h1 className="text-4xl mb-4">Hey there!</h1>
      <p>Welcome to the {SITE_TITLE} CMS. Here you can manage your content.</p>
      {
        process.env.NODE_ENV === 'development' && (
          <div className='flex gap-12'>
            <Button
              type="button"
              variant={'link'}
              disabled={isPending}
              className='mt-2 text-blue-500 p-0'
              onClick={() => startTransition(async () => {
                try {
                  await seed();
                  toast.success('Database seeded successfully');
                } catch (e) {
                  console.log(e);
                  toast.error('An unexpected error occurred');
                }
              })}
            >
              {
                isPending && <LoaderCircle className="animate-spin" />
              }
              Click to Seed
            </Button>
            <Button
              type="button"
              variant={'link'}
              disabled={isPending}
              className='mt-2 text-blue-500 p-0'
              onClick={() => startTransition(async () => {
                try {
                  await seedCompleteSite();
                  toast.success('Database seeded successfully');
                } catch (e) {
                  console.log(e);
                  toast.error('An unexpected error occurred');
                }
              })}
            >
              {
                isPending && <LoaderCircle className="animate-spin" />
              }
              Click to seed complete site
            </Button>
          </div>
        )
      }

      <section className='mt-10 space-y-6'>
        {
          cmsSidebarMenuItems.map(r => (
            <section key={r.groupLabel}>
              <h3 className='text-2xl'>{r.groupLabel}</h3>
              <section className='mt-5 max-w-5xl grid grid-cols-5 gap-4'>
                {
                  r.menuItems.map(i => (
                    <Button
                      key={i.url}
                      asChild
                      variant={'outline'}
                      className='py-10'
                    >
                      <Link href={i.url} replace>{i.title}</Link>
                    </Button>
                  ))
                }
              </section>
            </section>
          ))
        }
      </section>
    </div>
  )
}