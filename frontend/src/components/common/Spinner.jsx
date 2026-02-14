export default function Spinner({ size = 'md' }) {
  const sizeMap = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-16 w-16' };
  return (
    <div className="flex justify-center py-10">
      <div className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeMap[size]}`} />
    </div>
  );
}
