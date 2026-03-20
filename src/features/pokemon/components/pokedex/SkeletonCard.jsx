import { Skeleton } from 'primereact/skeleton';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-3 py-5 shadow-sm w-full">
      <div className="flex justify-center items-center mb-4">
        <Skeleton width="6rem" height="6rem" borderRadius="12px"  />
      </div>

      <div className="flex justify-center mb-2">
        <Skeleton width="2.5rem" height="1rem" />
      </div>

      <div className="flex justify-center mb-3">
        <Skeleton width="7rem" height="1.75rem" borderRadius="12px" />
      </div>

      <div className="flex justify-center gap-2">
        <Skeleton width="3.5rem" height="1.75rem" borderRadius="9999px" />
        <Skeleton width="3.5rem" height="1.75rem" borderRadius="9999px" />
      </div>
    </div>
  );
}

export default SkeletonCard;