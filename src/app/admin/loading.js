export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#0F2417] text-white flex items-center justify-center p-6">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#F4A62A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-white/80 font-medium">Loading Admin Dashboard...</p>
      </div>
    </div>
  );
}
