


interface ConversationSkeletonProps {
    isGroup?: boolean
}

export default function ConversationSkeleton({
    isGroup
}: ConversationSkeletonProps) {
  return (
    <div className='flex h-auto w-full py-2 gap-1 border-b last:border-b-0 animate-pulse'>
        {
            isGroup
            ? <div className='w-10 h-10 relative flex justify-center items-center'>
                <div className="absolute w-5 h-5 rounded-full bg-gray-300 -top-2 left-0"></div>
                <div className="absolute w-5 h-5 rounded-full bg-gray-300 right-1 bottom-0"></div>
              </div>
            : <div className='w-10 h-10 rounded-full bg-gray-300'></div>
        }

        <div className='w-full flex flex-col'>
          <div className='w-full flex justify-between'>
            <div className='w-32 h-4 bg-gray-300 rounded'></div>
            <div className='w-16 h-4 bg-gray-300 rounded'></div>
          </div>

          <div>
            <div className='w-48 h-4 bg-gray-300 rounded mt-2'></div>
          </div>
        </div>
      </div>
  )
}
