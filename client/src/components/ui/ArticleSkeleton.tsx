export default function ArticleSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl overflow-hidden md:h-[260px] animate-pulse"
        >
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/3 h-48 md:h-full bg-gray-200" />
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
              </div>
              <div className="h-4 w-28 bg-gray-200 rounded mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
