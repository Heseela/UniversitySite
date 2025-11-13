import CloudinaryImage from '@/components/ui/cloudinary-image'
import { TimelineBlockDto } from '@/schemas/page.schema'

export default function RenderTimelineBlock({
    events,
}: TimelineBlockDto) {
    return (
        <section>
            {events.map((event, index) => (
                <TimelineEvent key={index} event={event} />
            ))}
        </section>
    )
}

function TimelineEvent({ event }: { event: TimelineBlockDto["events"][0] }) {
    return (
        <div className={`md:mb-24 mb-12 flex flex-col md:flex-row odd:md:flex-row-reverse md:gap-16 gap-8 items-center`}>
            <div className="w-full lg:w-1/2 pt-6">
                <h2 className="text-2xl font-bold text-pinkish mb-4">{event.title}</h2>
                <p className="text-gray-700 leading-relaxed font-manrope">{event.description}</p>
            </div>

            {
                event.media && (
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <CloudinaryImage
                                src={event.media.secure_url}
                                alt={event.media.alt}
                                fill
                            />
                        </div>
                        {/* Year Badge */}
                        <div className="absolute -bottom-6 -right-4 bg-white rounded-lg px-6 py-2 shadow-md font-manrope">
                            <span className="text-2xl font-bold text-gray-800">{event.date}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}